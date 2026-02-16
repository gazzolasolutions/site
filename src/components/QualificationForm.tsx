import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Check, Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

interface QualificationFormProps {
  open: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 5;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function QualificationForm({ open, onClose }: QualificationFormProps) {
  const { lang } = useLanguage();
  const t = translations.form;

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    services: [] as string[],
    owners: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const serviceOptions = t.serviceOptions[lang];
  const ownerOptions = t.ownerOptions[lang];

  useEffect(() => {
    if (open) {
      setStep(0);
      setDir(1);
      setError("");
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && step >= 3 && step <= 5) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [step, open]);

  const goNext = useCallback(() => {
    if (step === 1 && form.services.length === 0) {
      setError(t.errors.selectOne[lang]);
      return;
    }
    if (step === 2 && !form.owners) {
      setError(t.errors.selectOption[lang]);
      return;
    }
    if (step === 3 && !form.fullName.trim()) {
      setError(t.errors.enterName[lang]);
      return;
    }
    if (step === 4 && !form.phone.trim()) {
      setError(t.errors.enterPhone[lang]);
      return;
    }
    if (step === 5) {
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setError(t.errors.validEmail[lang]);
        return;
      }
    }

    setError("");
    setDir(1);

    if (step === 5) {
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

  const handleSubmitLead = async () => {
    setSubmitting(true);
    try {
      await supabase.from("leads").insert({
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        services: form.services,
        owners: form.owners,
        source: "typeform",
      });
    } catch {}
    setSubmitting(false);
    setDir(1);
    setStep(6);
  };

  const handleFinish = () => {
    onClose();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
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

            {/* STEP 1 — Services */}
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

            {/* STEP 2 — Owners */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {t.step2Title[lang]}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step2Subtitle[lang]}</p>
                <div className="space-y-3">
                  {ownerOptions.map((opt, i) => (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => selectOption("owners", opt)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 text-base font-medium transition-all flex items-center gap-3 ${
                        form.owners === opt
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 transition-all ${
                        form.owners === opt
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-muted-foreground/30"
                      }`}>
                        {form.owners === opt && <Check size={14} />}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
                {error && <p className="text-sm text-destructive mt-2">{error}</p>}
              </motion.div>
            )}

            {/* STEP 3 — Name */}
            {step === 3 && (
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

            {/* STEP 4 — Phone */}
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
                <Input
                  ref={inputRef}
                  type="tel"
                  placeholder="+1 (786) 000-0000"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-14 rounded-xl text-lg border-2 border-border focus:border-accent px-4"
                  autoComplete="tel"
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

            {/* STEP 5 — Email */}
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

                <Button
                  onClick={handleFinish}
                  className="h-14 w-full max-w-xs mx-auto rounded-2xl text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg gap-2"
                >
                  <CalendarCheck size={18} /> {t.scheduleCall[lang]}
                </Button>

                <div className="flex gap-3 justify-center mt-4 max-w-xs mx-auto">
                  <a href="https://calendly.com/gazzolasolutions/30min" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl font-semibold gap-1.5 border-accent/30 hover:border-accent"
                    >
                      <CalendarCheck size={16} className="text-accent" />
                      Calendly
                    </Button>
                  </a>
                  <a href="tel:+17869732556" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl font-semibold gap-1.5 border-accent/30 hover:border-accent"
                    >
                      <Phone size={16} className="text-accent" />
                      {translations.mobile.call[lang]}
                    </Button>
                  </a>
                  <a href="https://wa.me/17869732556" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl font-semibold gap-1.5 border-green-500/30 hover:border-green-500"
                    >
                      <MessageCircle size={16} className="text-green-600" />
                      WhatsApp
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-muted-foreground mt-5">
                  {t.preferTalk[lang]}
                </p>
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
