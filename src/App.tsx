import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Secondary routes are code-split so the landing page loads fast
const Leads = lazy(() => import("./pages/Leads"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TaxQuestionnaire = lazy(() => import("./pages/TaxQuestionnaire"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Resources = lazy(() => import("./pages/Resources"));
const Article = lazy(() => import("./pages/Article"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const queryClient = new QueryClient();

const RouteFallback = () => <div className="min-h-screen bg-background" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/es/resources" element={<Resources />} />
            <Route path="/pt/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<Article />} />
            <Route path="/es/resources/:slug" element={<Article />} />
            <Route path="/pt/resources/:slug" element={<Article />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/es/*" element={<Index />} />
            <Route path="/pt/*" element={<Index />} />
            <Route path="/tax-questionnaire" element={<TaxQuestionnaire />} />
            <Route path="/es/tax-questionnaire" element={<TaxQuestionnaire />} />
            <Route path="/pt/tax-questionnaire" element={<TaxQuestionnaire />} />
            <Route path="/login" element={<Login />} />
            <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
