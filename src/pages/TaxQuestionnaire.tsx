import { useState, useRef, FormEvent, ChangeEvent, DragEvent } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { taxQ, type TaxLang } from "@/i18n/taxQuestionnaire";

import "@/styles/tax-questionnaire.css";

function Section({ num, title }: { num: number; title: string }) {
  return (
    <div className="tq-section-header">
      <div className="tq-section-num">{num}</div>
      <div className="tq-section-title">{title}</div>
      <div className="tq-section-line" />
    </div>
  );
}

function QCard({ children }: { children: React.ReactNode }) {
  return <div className="tq-q-card">{children}</div>;
}

function QLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div className="tq-q-label">
      <span>
        {children}
        {required && <span className="tq-required-star"> *</span>}
      </span>
    </div>
  );
}

function QHint({ children }: { children: React.ReactNode }) {
  return <div className="tq-q-hint">{children}</div>;
}

type Values = Record<string, string | string[]>;

function FormBody() {
  const { lang } = useLanguage();
  const t = taxQ[lang as TaxLang] ?? taxQ.en;

  const [values, setValues] = useState<Values>({});
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const setVal = (name: string, value: string | string[]) =>
    setValues((p) => ({ ...p, [name]: value }));

  const onCheckbox = (name: string, value: string, checked: boolean) => {
    setValues((p) => {
      const current = Array.isArray(p[name]) ? (p[name] as string[]) : [];
      const next = checked ? [...current, value] : current.filter((v) => v !== value);
      return { ...p, [name]: next };
    });
  };

  const onFilesPicked = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list).slice(0, 10));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFilesPicked(e.dataTransfer.files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("fields", JSON.stringify(values));
      files.slice(0, 10).forEach((f) => fd.append("files", f, f.name));
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-tax-questionnaire`;
      await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: fd,
      }).catch((err) => console.error("submit error", err));
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  const radio = (name: string, value: string, label: string) => (
    <label className="tq-opt-label" key={value}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={values[name] === value}
        onChange={(e) => setVal(name, e.target.value)}
      />{" "}
      {label}
    </label>
  );

  const check = (name: string, value: string, label: string) => {
    const arr = Array.isArray(values[name]) ? (values[name] as string[]) : [];
    return (
      <label className="tq-opt-label" key={value}>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={arr.includes(value)}
          onChange={(e) => onCheckbox(name, value, e.target.checked)}
        />{" "}
        {label}
      </label>
    );
  };

  return (
    <div className="tq-root">
      <div className="tq-hero">
        <div className="tq-hero-inner">
          <div className="tq-brand-tag">Gazzola Solutions</div>
          <h1 className="tq-h1">
            {t.heroTitle1}
            <br />
            <span>{t.heroTitle2}</span>
          </h1>
          <div className="tq-hero-sub">{t.heroSub}</div>
          <div className="tq-intro-box">
            {t.introA} <b>Gazzola Solutions</b> {t.introB}
            <div className="tq-returning">
              <b>{t.returningLabel}</b> {t.returningBody}
            </div>
          </div>
        </div>
      </div>

      <div className="tq-form-wrap">
        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate>
            {/* Section 1 */}
            <Section num={1} title={t.s1.title} />

            <QCard>
              <QLabel required>{t.s1.email}</QLabel>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={(values.email as string) || ""}
                onChange={(e) => setVal("email", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s1.name}</QLabel>
              <input
                type="text"
                placeholder={t.s1.namePh}
                required
                value={(values.name as string) || ""}
                onChange={(e) => setVal("name", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s1.taxid}</QLabel>
              <QHint>{t.s1.taxidHint}</QHint>
              <input
                type="text"
                placeholder="XXX-XX-XXXX"
                value={(values.taxid as string) || ""}
                onChange={(e) => setVal("taxid", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s1.dob}</QLabel>
              <input
                type="text"
                placeholder="MM / DD / YYYY"
                value={(values.dob as string) || ""}
                onChange={(e) => setVal("dob", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s1.address}</QLabel>
              <QHint>{t.s1.addressHint}</QHint>
              <textarea
                placeholder={t.s1.addressPh}
                value={(values.address as string) || ""}
                onChange={(e) => setVal("address", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s1.position}</QLabel>
              <QHint>{t.s1.positionHint}</QHint>
              <input
                type="text"
                placeholder={t.s1.positionPh}
                value={(values.position as string) || ""}
                onChange={(e) => setVal("position", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s1.resident}</QLabel>
              <div className="tq-options-grid tq-single-col" style={{ marginTop: 8 }}>
                {t.s1.residentOpts.map(([v, l]) => radio("resident", v, l))}
              </div>
              <div className="tq-other-field">
                <input
                  type="text"
                  placeholder={t.s1.residentOtherPh}
                  value={(values.resident_other as string) || ""}
                  onChange={(e) => setVal("resident_other", e.target.value)}
                />
              </div>
            </QCard>

            {/* Section 2 */}
            <Section num={2} title={t.s2.title} />

            <QCard>
              <QLabel required>{t.s2.spouse}</QLabel>
              <QHint>{t.s2.spouseHint}</QHint>
              <textarea
                placeholder={t.s2.spousePh}
                value={(values.spouse as string) || ""}
                onChange={(e) => setVal("spouse", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s2.spouseIncome}</QLabel>
              <div className="tq-options-grid tq-single-col" style={{ marginTop: 8 }}>
                {t.s2.spouseIncomeOpts.map(([v, l]) => radio("spouse_income", v, l))}
              </div>
            </QCard>

            <QCard>
              <QLabel required>{t.s2.dependents}</QLabel>
              <QHint>{t.s2.dependentsHint}</QHint>
              <textarea
                placeholder={t.s2.dependentsPh}
                value={(values.dependents as string) || ""}
                onChange={(e) => setVal("dependents", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s2.daycare}</QLabel>
              <QHint>{t.s2.daycareHint}</QHint>
              <textarea
                placeholder={t.s2.daycarePh}
                value={(values.daycare as string) || ""}
                onChange={(e) => setVal("daycare", e.target.value)}
              />
            </QCard>

            {/* Section 3 */}
            <Section num={3} title={t.s3.title} />

            <QCard>
              <QLabel required>{t.s3.income}</QLabel>
              <QHint>{t.s3.incomeHint}</QHint>
              <div className="tq-options-grid" style={{ marginTop: 8 }}>
                {t.s3.incomeOpts.map(([v, l]) => check("income", v, l))}
              </div>
              <div className="tq-other-field">
                <input
                  type="text"
                  placeholder={t.s3.incomeOtherPh}
                  value={(values.income_other as string) || ""}
                  onChange={(e) => setVal("income_other", e.target.value)}
                />
              </div>
            </QCard>

            <QCard>
              <QLabel required>{t.s3.rental}</QLabel>
              <QHint>{t.s3.rentalHint}</QHint>
              <textarea
                placeholder={t.s3.rentalPh}
                value={(values.rental_capital as string) || ""}
                onChange={(e) => setVal("rental_capital", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s3.foreign}</QLabel>
              <QHint>{t.s3.foreignHint}</QHint>
              <div className="tq-options-grid tq-single-col" style={{ marginTop: 8 }}>
                {t.s3.foreignOpts.map(([v, l]) => radio("foreign", v, l))}
              </div>
            </QCard>

            <QCard>
              <QLabel required>{t.s3.student}</QLabel>
              <QHint>{t.s3.studentHint}</QHint>
              <div className="tq-options-grid tq-single-col" style={{ marginTop: 8 }}>
                {t.s3.studentOpts.map(([v, l]) => radio("student", v, l))}
              </div>
            </QCard>

            <QCard>
              <QLabel required>{t.s3.ira}</QLabel>
              <QHint>{t.s3.iraHint}</QHint>
              <textarea
                placeholder={t.s3.iraPh}
                value={(values.ira as string) || ""}
                onChange={(e) => setVal("ira", e.target.value)}
              />
            </QCard>

            {/* Section 4 */}
            <Section num={4} title={t.s4.title} />

            <QCard>
              <QLabel required>{t.s4.mortgage}</QLabel>
              <QHint>{t.s4.mortgageHint}</QHint>
              <div className="tq-options-grid tq-single-col" style={{ marginTop: 8 }}>
                {t.s4.mortgageOpts.map(([v, l]) => radio("mortgage", v, l))}
              </div>
              <div className="tq-other-field">
                <input
                  type="text"
                  placeholder={t.s4.notesPh}
                  value={(values.mortgage_other as string) || ""}
                  onChange={(e) => setVal("mortgage_other", e.target.value)}
                />
              </div>
            </QCard>

            <QCard>
              <QLabel required>{t.s4.health}</QLabel>
              <QHint>{t.s4.healthHint}</QHint>
              <div className="tq-options-grid tq-single-col" style={{ marginTop: 8 }}>
                {t.s4.healthOpts.map(([v, l]) => radio("health", v, l))}
              </div>
              <div className="tq-other-field">
                <input
                  type="text"
                  placeholder={t.s4.notesPh}
                  value={(values.health_other as string) || ""}
                  onChange={(e) => setVal("health_other", e.target.value)}
                />
              </div>
            </QCard>

            {/* Section 5 */}
            <Section num={5} title={t.s5.title} />

            <QCard>
              <QLabel required>{t.s5.events}</QLabel>
              <QHint>{t.s5.eventsHint}</QHint>
              <div className="tq-options-grid" style={{ marginTop: 8 }}>
                {t.s5.eventsOpts.map(([v, l]) => check("events", v, l))}
              </div>
              <div className="tq-other-field">
                <input
                  type="text"
                  placeholder={t.s5.eventsOtherPh}
                  value={(values.events_other as string) || ""}
                  onChange={(e) => setVal("events_other", e.target.value)}
                />
              </div>
            </QCard>

            <QCard>
              <QLabel>{t.s5.banking}</QLabel>
              <QHint>{t.s5.bankingHint}</QHint>
              <textarea
                placeholder={t.s5.bankingPh}
                value={(values.banking as string) || ""}
                onChange={(e) => setVal("banking", e.target.value)}
              />
            </QCard>

            {/* Section 6 */}
            <Section num={6} title={t.s6.title} />

            <QCard>
              <QLabel>{t.s6.notes}</QLabel>
              <QHint>{t.s6.notesHint}</QHint>
              <textarea
                placeholder={t.s6.notesPh}
                value={(values.notes as string) || ""}
                onChange={(e) => setVal("notes", e.target.value)}
              />
            </QCard>

            <QCard>
              <QLabel required>{t.s6.upload}</QLabel>
              <QHint>
                {t.s6.uploadHint}{" "}
                <a href="https://www.ilovepdf.com" target="_blank" rel="noopener noreferrer">
                  www.ilovepdf.com
                </a>
                {" — "}
                {t.s6.uploadHintTail}
              </QHint>
              <div
                className="tq-upload-zone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
              >
                <div className="tq-upload-icon">📎</div>
                <p>{t.s6.uploadCta}</p>
                <small>{t.s6.uploadLimits}</small>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.heic"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onFilesPicked(e.target.files)}
                  style={{ display: "none" }}
                />
                <div>
                  <span className="tq-upload-btn">{t.s6.browse}</span>
                </div>
              </div>
              {files.length > 0 && (
                <div className="tq-file-list">
                  {files.map((f, i) => (
                    <div key={i}>
                      📄 {f.name} ({(f.size / 1024).toFixed(0)} KB)
                    </div>
                  ))}
                </div>
              )}
            </QCard>

            <div className="tq-submit-area">
              <button type="submit" className="tq-submit-btn" disabled={submitting}>
                {submitting ? t.submitting : t.submit} →
              </button>
              <p className="tq-submit-note">
                {t.submitNote}
                <br />
                {t.submitContact}{" "}
                <a href="mailto:gazzolasolutions@gmail.com">gazzolasolutions@gmail.com</a>
              </p>
            </div>
          </form>
        ) : (
          <div ref={successRef} className="tq-success">
            <h2>{t.successTitle}</h2>
            <p>
              {t.successBody}
              <br />
              <br />
              <strong>Gazzola Solutions</strong> · gazzolasolutions@gmail.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const TaxQuestionnaire = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <FormBody />
      <Footer />
      <StickyMobileCTA />
    </div>
  </LanguageProvider>
);

export default TaxQuestionnaire;
