import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Check, Phone, MessageCircle, CalendarCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useCalendlyPopup } from "@/hooks/useCalendlyPopup";

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+54", flag: "🇦🇷", label: "AR" },
  { code: "+61", flag: "🇦🇺", label: "AU" },
  { code: "+55", flag: "🇧🇷", label: "BR" },
  { code: "+1", flag: "🇨🇦", label: "CA" },
  { code: "+56", flag: "🇨🇱", label: "CL" },
  { code: "+86", flag: "🇨🇳", label: "CN" },
  { code: "+57", flag: "🇨🇴", label: "CO" },
  { code: "+49", flag: "🇩🇪", label: "DE" },
  { code: "+34", flag: "🇪🇸", label: "ES" },
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+39", flag: "🇮🇹", label: "IT" },
  { code: "+81", flag: "🇯🇵", label: "JP" },
  { code: "+52", flag: "🇲🇽", label: "MX" },
  { code: "+51", flag: "🇵🇪", label: "PE" },
  { code: "+351", flag: "🇵🇹", label: "PT" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+58", flag: "🇻🇪", label: "VE" },
];

interface QualificationFormProps {
  open: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 4;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function QualificationForm({ open, onClose }: QualificationFormProps) {
  const { lang } = useLanguage();
  const t = translations.form;
  const openCalendly = useCalendlyPopup();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: COUNTRY_CODES[0],
    services: [] as string[],
    owners: "",
  });
  const [countryOpen, setCountryOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const serviceOptions = t.serviceOptions[lang];
  

  useEffect(() => {
    if (open) {
      setStep(0);
      setDir(1);
      setError("");
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && step >= 2 && step <= 4) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [step, open]);

  const goNext = useCallback(() => {
    if (step === 1 && form.services.length === 0) {
      setError(t.errors.selectOne[lang]);
      return;
    }
    if (step === 2 && !form.fullName.trim()) {
      setError(t.errors.enterName[lang]);
      return;
    }
    if (step === 3 && !form.phone.trim()) {
      setError(t.errors.enterPhone[lang]);
      return;
    }
    if (step === 4) {
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setError(t.errors.validEmail[lang]);
        return;
      }
    }

    setError("");
    setDir(1);

    if (step === 4) {
      handleSubmitLead();
      return;
    }

    setStep((s) => s + 1);
  }, [step, form, lang]);

  const goBack = () => {
    if (step <= 0) return;
    setError("");
    setDir(-1);
    setStep((s) => s - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goNext();
    }
  };

  const fullPhone = `${form.countryCode.code} ${form.phone}`;

  const handleSubmitLead = async () => {
    setSubmitting(true);
    try {
      await supabase.from("leads").insert({
        full_name: form.fullName,
        email: form.email,
        phone: fullPhone,
        services: form.services,
        owners: form.owners,
        source: "typeform",
      });
    } catch {}

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzuZcUuzaJgXpB8eioq-AfGBlU846DFg_jrcGTcuqa8cx7LYBSQNW0nC2wt6REUq80/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            name: form.fullName,
            email: form.email,
            phone: fullPhone.replace(/^\+/, ""),
            services: Array.isArray(form.services) ? form.services.join(", ") : (form.services || ""),
            owners: form.owners || "",
            source: "lovable_form",
          }),
        }
      );
    } catch {}

    setSubmitting(false);
    setDir(1);
    setStep(5);
  };

  const handleFinish = () => {
    onClose();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 0) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const update = (field: string, value: string) => {
    const formatted = field === "phone" ? formatPhone(value) : value;
    setForm((f) => ({ ...f, [field]: formatted }));
    if (error) setError("");
  };

  const selectOption = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
    setTimeout(() => {
      setDir(1);
      setStep((s) => s + 1);
    }, 300);
  };

  if (!open) return null;

  const progressPercent = step === 0 ? 0 : step > TOTAL_STEPS ? 100 : (step / TOTAL_STEPS) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-card flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2">
        <button
          onClick={step > 0 ? goBack : onClose}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors p-1.5 -ml-1.5 rounded-lg"
        >
          {step > 0 ? (
            <>
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{t.back[lang]}</span>
            </>
          ) : (
            <span className="text-xs font-medium">{t.close[lang]}</span>
          )}
        </button>

        {step > 0 && step <= TOTAL_STEPS && (
          <span className="text-xs font-medium text-muted-foreground">
            {t.step[lang]} {step} {t.of[lang]} {TOTAL_STEPS}
          </span>
        )}

        {step === 0 && <div />}
        {step > TOTAL_STEPS && <div />}
      </div>

      {/* Progress bar */}
      {step > 0 && (
        <div className="px-4 sm:px-6 pb-2">
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-cta)" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8 overflow-hidden">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait" custom={dir}>
            {/* INTRO */}
            {step === 0 && (
              <motion.div
                key="intro"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
                  {t.introTitle[lang]}
                </h1>
                <p className="text-muted-foreground mb-8 text-base">
                  {t.introSubtitle[lang]}
                </p>
                <Button
                  onClick={goNext}
                  className="h-14 px-10 rounded-2xl text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg gap-2"
                >
                  {t.start[lang]}
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            )}

            {/* STEP 1 - Services */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {t.step1Title[lang]}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step1Subtitle[lang]}</p>
                <div className="space-y-3">
                  {serviceOptions.map((opt, i) => {
                    const selected = form.services.includes(opt);
                    return (
                      <motion.button
                        key={opt}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => {
                          const next = selected
                            ? form.services.filter((s) => s !== opt)
                            : [...form.services, opt];
                          setForm((f) => ({ ...f, services: next }));
                          if (error) setError("");
                        }}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 text-base font-medium transition-all flex items-center gap-3 ${
                          selected
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-accent/40 hover:bg-accent/5"
                        }`}
                      >
                        <span className={`flex items-center justify-center w-6 h-6 rounded-md border-2 shrink-0 transition-all ${
                          selected
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-muted-foreground/30"
                        }`}>
                          {selected && <Check size={14} />}
                        </span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
                {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                <Button
                  onClick={goNext}
                  disabled={form.services.length === 0}
                  className="mt-6 w-full rounded-xl text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  style={{ height: 52 }}
                >
                  {t.continue[lang]}
                  <ArrowRight size={16} />
                </Button>
              </motion.div>
            )}




            {/* STEP 2 - Name */}
            {step === 2 && (
              <motion.div
                key="step3"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {t.step3Title[lang]}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step3Subtitle[lang]}</p>
                <Input
                  ref={inputRef}
                  placeholder={t.step3Placeholder[lang]}
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-14 rounded-xl text-lg border-2 border-border focus:border-accent px-4"
                  autoComplete="name"
                />
                {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                <Button
                  onClick={goNext}
                  className="mt-6 w-full rounded-xl text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  style={{ height: 52 }}
                >
                  {t.continue[lang]}
                  <ArrowRight size={16} />
                </Button>
              </motion.div>
            )}

            {/* STEP 4 - Phone */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {t.step4Title[lang]}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step4Subtitle[lang]}</p>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCountryOpen(!countryOpen)}
                      className="h-14 px-3 rounded-xl border-2 border-border bg-background flex items-center gap-1.5 text-base hover:border-accent/40 transition-colors min-w-[90px]"
                    >
                      <span className="text-xl leading-none">{form.countryCode.flag}</span>
                      <span className="text-sm font-medium text-foreground">{form.countryCode.code}</span>
                      <ChevronDown size={14} className="text-muted-foreground" />
                    </button>
                    {countryOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto w-48">
                        {COUNTRY_CODES.map((cc, i) => (
                          <button
                            key={`${cc.label}-${i}`}
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, countryCode: cc }));
                              setCountryOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-muted/50 transition-colors text-left"
                          >
                            <span className="text-lg leading-none">{cc.flag}</span>
                            <span className="text-muted-foreground">{cc.label}</span>
                            <span className="font-medium text-foreground ml-auto">{cc.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Input
                    ref={inputRef}
                    type="tel"
                    placeholder="(786) 000-0000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-14 rounded-xl text-lg border-2 border-border focus:border-accent px-4 flex-1"
                    autoComplete="tel"
                  />
                </div>
                {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                <Button
                  onClick={goNext}
                  className="mt-6 w-full rounded-xl text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  style={{ height: 52 }}
                >
                  {t.continue[lang]}
                  <ArrowRight size={16} />
                </Button>
              </motion.div>
            )}

            {/* STEP 5 - Email */}
            {step === 5 && (
              <motion.div
                key="step5"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {t.step5Title[lang]}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step5Subtitle[lang]}</p>
                <Input
                  ref={inputRef}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-14 rounded-xl text-lg border-2 border-border focus:border-accent px-4"
                  autoComplete="email"
                />
                {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                <Button
                  onClick={goNext}
                  disabled={submitting}
                  className="mt-6 w-full rounded-xl text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  style={{ height: 52 }}
                >
                  {submitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> {t.submitting[lang]}</>
                  ) : (
                    <>{t.submit[lang]} <ArrowRight size={16} /></>
                  )}
                </Button>
              </motion.div>
            )}

            {/* FINAL SCREEN */}
            {step === 6 && (
              <motion.div
                key="final"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {t.finalTitle[lang]}
                </h2>
                <p className="text-muted-foreground mb-8 text-base max-w-sm mx-auto">
                  {t.finalSubtitle[lang]}
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  <Button
                    onClick={openCalendly}
                    className="h-14 w-full rounded-2xl text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg gap-2"
                  >
                    <CalendarCheck size={18} /> {t.scheduleCall[lang]}
                  </Button>

                  <div className="flex gap-3">
                    <a href="tel:+17869732556" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl font-semibold gap-1.5 border-border hover:border-accent"
                      >
                        <Phone size={16} className="text-accent" />
                        {translations.mobile.call[lang]}
                      </Button>
                    </a>
                    <a href="https://wa.me/17869732556" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl font-semibold gap-1.5 border-border hover:border-accent"
                      >
                        <MessageCircle size={16} className="text-accent" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-5">
                  {t.preferTalk[lang]}
                </p>

                <button
                  onClick={onClose}
                  className="mt-4 text-sm text-muted-foreground/60 hover:text-muted-foreground underline underline-offset-2 transition-colors"
                >
                  {lang === "pt" ? "← Voltar ao site" : "← Back to website"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Keyboard hint */}
      {step >= 3 && step <= 5 && (
        <div className="hidden sm:flex justify-center pb-6">
          <span className="text-xs text-muted-foreground/60">
            {t.enterToContinue[lang]} <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[11px]">Enter ↵</kbd> {t.enterLabel[lang]}
          </span>
        </div>
      )}
    </motion.div>
  );
}
