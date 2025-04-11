import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AccessibilityToolbar from "@/components/accessibility/AccessibilityToolbar";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

// Lazy load components for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load route components
const ClinicianRoutes = lazy(() => import("./routes/ClinicianRoutes").then(module => ({ default: module.ClinicianRoutes })));
const PatientRoutes = lazy(() => import("./routes/PatientRoutes").then(module => ({ default: module.PatientRoutes })));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes").then(module => ({ default: module.AdminRoutes })));
const NGORoutes = lazy(() => import("./routes/NGORoutes").then(module => ({ default: module.NGORoutes })));

// Create React Query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Add accessibility toolbar here, outside of Suspense to always be available */}
          <AccessibilityToolbar />
          
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          }>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes */}
              <Route path="/clinician/*" element={<ClinicianRoutes />} />
              <Route path="/patient/*" element={<PatientRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/ngo/*" element={<NGORoutes />} />
              
              {/* Fallbacks */}
              <Route path="/clinician" element={<Navigate to="/clinician/dashboard" replace />} />
              <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/ngo" element={<Navigate to="/ngo/dashboard" replace />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;