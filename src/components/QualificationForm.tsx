import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QualificationFormProps {
  open: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  "Florida LLC Formation",
  "EIN Application",
  "ITIN Application",
  "Not sure yet",
];

const OWNER_OPTIONS = [
  "Just me (Single Member)",
  "2 or more owners (Multi Member)",
  "Not sure yet",
];

export function QualificationForm({ open, onClose }: QualificationFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    owners: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.service) e.service = "Please select an option";
    if (!form.owners) e.owners = "Please select an option";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    // Simulate brief loading, then redirect / show success
    setTimeout(() => {
      setSubmitting(false);
      // Store data for potential future use
      try {
        sessionStorage.setItem("gz_qualification", JSON.stringify(form));
      } catch {}
      // For now, scroll to services or show success state
      onClose();
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  }

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-md bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[95dvh] overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                Start Your Florida Business
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Answer a few quick questions to begin.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label htmlFor="qf-name" className="text-sm font-medium text-foreground">Full Name</Label>
                  <Input
                    id="qf-name"
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className="mt-1.5 h-12 rounded-xl text-base"
                    autoComplete="name"
                  />
                  {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="qf-email" className="text-sm font-medium text-foreground">Email Address</Label>
                  <Input
                    id="qf-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="mt-1.5 h-12 rounded-xl text-base"
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="qf-phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                  <Input
                    id="qf-phone"
                    type="tel"
                    placeholder="+1 (786) 000-0000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="mt-1.5 h-12 rounded-xl text-base"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>

                {/* Service Select */}
                <div>
                  <Label className="text-sm font-medium text-foreground">What do you need help with?</Label>
                  <div className="grid grid-cols-1 gap-2 mt-1.5">
                    {SERVICE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("service", opt)}
                        className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          form.service === opt
                            ? "border-accent bg-accent/10 text-foreground ring-1 ring-accent"
                            : "border-border bg-background text-muted-foreground hover:border-accent/40"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
                </div>

                {/* Owners Select */}
                <div>
                  <Label className="text-sm font-medium text-foreground">How many owners will the company have?</Label>
                  <div className="grid grid-cols-1 gap-2 mt-1.5">
                    {OWNER_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("owners", opt)}
                        className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          form.owners === opt
                            ? "border-accent bg-accent/10 text-foreground ring-1 ring-accent"
                            : "border-border bg-background text-muted-foreground hover:border-accent/40"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.owners && <p className="text-xs text-destructive mt-1">{errors.owners}</p>}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-13 rounded-xl text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
                  style={{ height: "52px" }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>

                {/* Trust microcopy */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
                  <ShieldCheck size={14} className="text-accent" />
                  Secure and guided process.
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
