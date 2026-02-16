import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MessageCircle, MessageSquare, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import type { Tables } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";

type Lead = Tables<"leads">;

function whatsAppUrl(lead: Lead) {
  const msg = `Hi ${lead.full_name}, this is Gazola Solutions. We received your request about ${lead.services.join(", ")} and we're ready to help you start your Florida business.`;
  return `https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
}

function ActionButtons({ lead, size = "sm" }: { lead: Lead; size?: "sm" | "default" }) {
  const h = size === "sm" ? "h-9" : "h-11";
  return (
    <div className="flex gap-2">
      <a href={whatsAppUrl(lead)} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size={size} className={`${h} gap-1.5 border-green-500/30 hover:border-green-500 hover:bg-green-50`}>
          <MessageCircle size={15} className="text-green-600" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>
      </a>
      <a href={`tel:${lead.phone}`}>
        <Button variant="outline" size={size} className={`${h} gap-1.5 border-accent/30 hover:border-accent`}>
          <Phone size={15} className="text-accent" />
          <span className="hidden sm:inline">Call</span>
        </Button>
      </a>
      <a href={`sms:${lead.phone}`}>
        <Button variant="outline" size={size} className={`${h} gap-1.5 border-accent/30 hover:border-accent`}>
          <MessageSquare size={15} className="text-accent" />
          <span className="hidden sm:inline">SMS</span>
        </Button>
      </a>
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
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Service</TableHead>
                  <TableHead className="hidden lg:table-cell">Owners</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(lead)}
                  >
                    <TableCell className="font-medium">{lead.full_name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{lead.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                      {lead.services.join(", ")}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{lead.owners}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {new Date(lead.created_at).toLocaleDateString()}
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
        <SheetContent>
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.full_name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Phone</p>
                  <p className="text-foreground font-medium">{selected.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                  <p className="text-foreground font-medium">{selected.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Services</p>
                  <p className="text-foreground font-medium">{selected.services.join(", ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Owners</p>
                  <p className="text-foreground font-medium">{selected.owners}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Submitted</p>
                  <p className="text-foreground font-medium">
                    {new Date(selected.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Contact</p>
                  <ActionButtons lead={selected} size="default" />
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
