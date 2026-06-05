import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { SignJWT, importPKCS8 } from "npm:jose@5";

const GOOGLE_SERVICE_ACCOUNT_JSON = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
const GOOGLE_DRIVE_FOLDER_ID = Deno.env.get("GOOGLE_DRIVE_FOLDER_ID");

async function getAccessToken(): Promise<string> {
  if (!GOOGLE_SERVICE_ACCOUNT_JSON) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON");
  const sa = JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON);
  const privateKey = await importPKCS8(sa.private_key, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    scope: "https://www.googleapis.com/auth/drive",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(sa.client_email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .setSubject(sa.client_email)
    .sign(privateKey);
  // jose's setAudience sets "aud"; we also need "iss","scope","aud","exp","iat" which we have.

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${t}`);
  }
  const data = await res.json();
  return data.access_token as string;
}

async function createFolder(token: string, name: string, parent: string): Promise<string> {
  const res = await fetch("https://www.googleapis.com/drive/v3/files?supportsAllDrives=true", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parent],
    }),
  });
  if (!res.ok) throw new Error(`Folder create failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.id as string;
}

async function uploadFile(
  token: string,
  parent: string,
  name: string,
  mimeType: string,
  body: Uint8Array | Blob,
): Promise<void> {
  const metadata = { name, parents: [parent] };
  const boundary = "----LovableBoundary" + crypto.randomUUID();
  const enc = new TextEncoder();
  const pre = enc.encode(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
      `--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`,
  );
  const post = enc.encode(`\r\n--${boundary}--`);
  const bodyBytes = body instanceof Blob ? new Uint8Array(await body.arrayBuffer()) : body;
  const combined = new Uint8Array(pre.length + bodyBytes.length + post.length);
  combined.set(pre, 0);
  combined.set(bodyBytes, pre.length);
  combined.set(post, pre.length + bodyBytes.length);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: combined,
    },
  );
  if (!res.ok) throw new Error(`Upload failed (${name}): ${res.status} ${await res.text()}`);
}

function formatSummary(fields: Record<string, unknown>): string {
  const sections: Array<{ title: string; keys: Array<[string, string]> }> = [
    {
      title: "1. CLIENT INFORMATION",
      keys: [
        ["email", "Email Address"],
        ["name", "Full Legal Name"],
        ["taxid", "Tax ID (SSN or ITIN)"],
        ["dob", "Date of Birth"],
        ["address", "Current Mailing Address"],
        ["position", "Occupation / Line of Work"],
        ["resident", "Full-year Florida resident?"],
        ["resident_other", "Resident — Other"],
      ],
    },
    {
      title: "2. FILING STATUS & DEPENDENTS",
      keys: [
        ["spouse", "Marital Status & Spouse Information"],
        ["spouse_income", "Spouse Income"],
        ["dependents", "Dependents"],
        ["daycare", "Childcare expenses"],
      ],
    },
    {
      title: "3. INCOME",
      keys: [
        ["income", "Income types"],
        ["income_other", "Income — Other"],
        ["rental_capital", "Rental / capital gains / misc income"],
        ["foreign", "Foreign financial accounts"],
        ["student", "Student tax forms (1098-T / 1098-E)"],
        ["ira", "IRA contributions or distributions"],
      ],
    },
    {
      title: "4. DEDUCTIONS & CREDITS",
      keys: [
        ["mortgage", "Mortgage on primary residence"],
        ["mortgage_other", "Mortgage notes"],
        ["health", "Health insurance coverage"],
        ["health_other", "Health notes"],
      ],
    },
    {
      title: "5. OTHER TAX EVENTS & BANKING",
      keys: [
        ["events", "Tax events"],
        ["events_other", "Events — Other"],
        ["banking", "Bank info (direct deposit / debit)"],
      ],
    },
    {
      title: "6. NOTES",
      keys: [["notes", "Additional Notes"]],
    },
  ];

  const lines: string[] = [];
  lines.push("GAZZOLA SOLUTIONS — TAX RETURN QUESTIONNAIRE");
  lines.push("Submitted: " + new Date().toISOString());
  lines.push("");
  for (const s of sections) {
    lines.push(s.title);
    lines.push("=".repeat(s.title.length));
    for (const [k, label] of s.keys) {
      const v = fields[k];
      if (v == null || v === "") continue;
      const value = Array.isArray(v) ? v.join(", ") : String(v);
      lines.push(`${label}: ${value}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!GOOGLE_DRIVE_FOLDER_ID) throw new Error("Missing GOOGLE_DRIVE_FOLDER_ID");

    const form = await req.formData();
    const fieldsJson = form.get("fields");
    if (typeof fieldsJson !== "string") {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const fields = JSON.parse(fieldsJson) as Record<string, unknown>;
    const clientName = (fields.name as string) || "Unknown Client";

    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const yyyy = now.getFullYear();
    const folderName = `Tax Questionnaire — ${clientName} — ${mm}/${dd}/${yyyy}`;

    const token = await getAccessToken();
    const subfolderId = await createFolder(token, folderName, GOOGLE_DRIVE_FOLDER_ID);

    const summary = formatSummary(fields);
    await uploadFile(
      token,
      subfolderId,
      "Tax_Questionnaire_Responses.txt",
      "text/plain; charset=utf-8",
      new TextEncoder().encode(summary),
    );

    const files = form.getAll("files");
    for (const f of files) {
      if (f instanceof File) {
        await uploadFile(token, subfolderId, f.name, f.type || "application/octet-stream", f);
      }
    }

    return new Response(JSON.stringify({ ok: true, folderId: subfolderId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-tax-questionnaire error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err instanceof Error ? err.message : err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
