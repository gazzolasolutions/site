import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MessageCircle, MessageSquare, ArrowLeft, Users, Briefcase, Clock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import type { Tables } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";

type Lead = Tables<"leads">;

function whatsAppUrl(lead: Lead) {
  const msg = `Hi ${lead.full_name}, this is Gazola Solutions. We received your request about ${lead.services.join(", ")} and we're ready to help you with your Florida business.`;
  return `https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
}

function ActionButtons({ lead, size = "sm" }: { lead: Lead; size?: "sm" | "default" }) {
  const isLarge = size === "default";
  return (
    <div className={`flex gap-2 ${isLarge ? "flex-col sm:flex-row" : ""}`}>
      <a href={whatsAppUrl(lead)} target="_blank" rel="noopener noreferrer" className={isLarge ? "flex-1" : ""}>
        <Button
          variant="outline"
          size={size}
          className={`${isLarge ? "w-full h-12" : "h-9"} gap-1.5 border-green-500/30 hover:border-green-500 hover:bg-green-500/5 transition-all hover:shadow-sm`}
        >
          <MessageCircle size={isLarge ? 18 : 15} className="text-green-600" />
          <span className={isLarge ? "" : "hidden sm:inline"}>WhatsApp</span>
        </Button>
      </a>
      <a href={`tel:${lead.phone}`} className={isLarge ? "flex-1" : ""}>
        <Button
          variant="outline"
          size={size}
          className={`${isLarge ? "w-full h-12" : "h-9"} gap-1.5 border-accent/30 hover:border-accent hover:bg-accent/5 transition-all hover:shadow-sm`}
        >
          <Phone size={isLarge ? 18 : 15} className="text-accent" />
          <span className={isLarge ? "" : "hidden sm:inline"}>Call</span>
        </Button>
      </a>
      <a href={`sms:${lead.phone}`} className={isLarge ? "flex-1" : ""}>
        <Button
          variant="outline"
          size={size}
          className={`${isLarge ? "w-full h-12" : "h-9"} gap-1.5 border-accent/30 hover:border-accent hover:bg-accent/5 transition-all hover:shadow-sm`}
        >
          <MessageSquare size={isLarge ? 18 : 15} className="text-accent" />
          <span className={isLarge ? "" : "hidden sm:inline"}>SMS</span>
        </Button>
      </a>
    </div>
  );
}

function DetailField({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
          <Icon size={14} className="text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">{label}</p>
        <p className="text-foreground font-medium text-sm break-words">{value}</p>
      </div>
    </div>
  );
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setLeads(data ?? []);
        setLoading(false);
      });
  }, []);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formatDateTime = (d: string) => new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Leads</h1>
              <p className="text-sm text-muted-foreground">{leads.length} total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <p className="text-muted-foreground text-center py-12">Loading...</p>
        ) : leads.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No leads yet.</p>
        ) : (
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold">Service</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold">Owners</TableHead>
                  <TableHead className="hidden sm:table-cell font-semibold">Date</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={() => setSelected(lead)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{lead.full_name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{lead.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{lead.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {lead.services.map((s) => (
                          <span key={s} className="inline-block text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{lead.owners}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {formatDate(lead.created_at)}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <ActionButtons lead={lead} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="pb-2">
                <SheetTitle className="text-xl">{selected.full_name}</SheetTitle>
                <SheetDescription className="text-xs">
                  Lead submitted via {selected.source}
                </SheetDescription>
              </SheetHeader>

              {/* Contact Info */}
              <div className="mt-6">
                <h3 className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">Contact Info</h3>
                <div className="space-y-4 bg-muted/30 rounded-xl p-4">
                  <DetailField label="Full Name" value={selected.full_name} icon={User} />
                  <DetailField label="Phone" value={selected.phone} icon={Phone} />
                  <DetailField label="Email" value={selected.email} icon={Mail} />
                </div>
              </div>

              {/* Business Request */}
              <div className="mt-6">
                <h3 className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">Business Request</h3>
                <div className="space-y-4 bg-muted/30 rounded-xl p-4">
                  <DetailField label="Service Needed" value={selected.services.join(", ")} icon={Briefcase} />
                  <DetailField label="Number of Owners" value={selected.owners || "Not specified"} icon={Users} />
                </div>
              </div>

              {/* System Info */}
              <div className="mt-6">
                <h3 className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">System Info</h3>
                <div className="space-y-4 bg-muted/30 rounded-xl p-4">
                  <DetailField label="Submitted" value={formatDateTime(selected.created_at)} icon={Clock} />
                  <DetailField label="Source" value={selected.source} />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">Contact Lead</h3>
                <ActionButtons lead={selected} size="default" />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
