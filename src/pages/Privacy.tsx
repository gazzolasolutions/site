import { LegalLayout } from "@/components/LegalLayout";

const Privacy = () => (
  <LegalLayout
    title="Privacy Policy"
    description="How Gazzola Solutions collects, uses, and protects your personal information."
    path="/privacy"
    lastUpdated="July 14, 2026"
  >
    <section>
      <h2>Who we are</h2>
      <p>
        Gazzola Solutions ("we", "us") helps non-residents and immigrants start and manage their US businesses.
        You can reach us at <a href="mailto:gazzolasolutions@gmail.com">gazzolasolutions@gmail.com</a>.
      </p>
    </section>

    <section>
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you provide:</strong> when you fill out our contact form we collect your name,
          phone number, email address, and the services you are interested in.
        </li>
        <li>
          <strong>Usage information:</strong> if analytics are enabled, we collect anonymous usage data
          (pages visited, buttons clicked, approximate location, device type) through Google Analytics.
        </li>
      </ul>
    </section>

    <section>
      <h2>How we use your information</h2>
      <ul>
        <li>To contact you about the services you requested.</li>
        <li>To schedule consultations you ask for.</li>
        <li>To improve our website and services.</li>
      </ul>
      <p className="mt-3">We do not sell your personal information to third parties.</p>
    </section>

    <section>
      <h2>Where your information is stored</h2>
      <p>
        Form submissions are stored in our customer database (hosted on Supabase) and our internal lead
        tracking spreadsheet (Google Workspace). When you schedule a call, your information is processed by
        Calendly. When you contact us through WhatsApp, your messages are handled by WhatsApp/Meta under
        their own privacy policies.
      </p>
    </section>

    <section>
      <h2>Data retention and your rights</h2>
      <p>
        We keep your contact information for as long as needed to serve you. You may request access to,
        correction of, or deletion of your personal information at any time by emailing{" "}
        <a href="mailto:gazzolasolutions@gmail.com">gazzolasolutions@gmail.com</a>. We will respond within a
        reasonable timeframe.
      </p>
    </section>

    <section>
      <h2>Cookies</h2>
      <p>
        Our website uses only the cookies required for analytics (if enabled) and essential site
        functionality. You can block cookies in your browser settings without losing access to the site.
      </p>
    </section>

    <section>
      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The "Last updated" date at the top reflects the most
        recent revision.
      </p>
    </section>
  </LegalLayout>
);

export default Privacy;
