import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Leads from "./pages/Leads";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TaxQuestionnaire from "./pages/TaxQuestionnaire";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/es/*" element={<Index />} />
          <Route path="/pt/*" element={<Index />} />
          <Route path="/tax-questionnaire" element={<TaxQuestionnaire />} />
          <Route path="/es/tax-questionnaire" element={<TaxQuestionnaire />} />
          <Route path="/pt/tax-questionnaire" element={<TaxQuestionnaire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
