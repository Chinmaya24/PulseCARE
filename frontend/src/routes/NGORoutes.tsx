import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Use lazy loading for optimization
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full p-8">
    <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
);

// Use lazy loading for optimization with proper error handling
const NGODashboard = lazy(() => 
  import("@/pages/ngo/NGODashboard").then(module => ({ 
    default: module.default 
  }))
);
const Campaigns = lazy(() => import("@/pages/ngo/Campaigns"));
const PatientsReferred = lazy(() => import("@/pages/ngo/PatientsReferred"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const HealthDrives = lazy(() => import("@/pages/ngo/HealthDrives"));
const Reports = lazy(() => import("@/pages/ngo/Reports"));
const Impact = lazy(() => import("@/pages/ngo/Impact"));
const HealthcareFacilities = lazy(() => import("@/pages/ngo/HealthcareFacilities"));


export const NGORoutes = () => {
  return (
    <Routes>
      <Route 
        element={
          <ProtectedRoutes 
            userType="ngo" 
            userName="HealthHope Foundation" 
            userRole="Healthcare NGO"
          />
        }
      >
        <Route path="dashboard" element={
          <Suspense fallback={<LoadingFallback />}>
            <NGODashboard />
          </Suspense>
        } />
        <Route path="campaigns" element={
          <Suspense fallback={<LoadingFallback />}>
            <Campaigns />
          </Suspense>
        } />
        <Route path="patients" element={
          <Suspense fallback={<LoadingFallback />}>
            <PatientsReferred />
          </Suspense>
        } />
        <Route path="health-drives" element={
          <Suspense fallback={<LoadingFallback />}>
            <HealthDrives />
          </Suspense>
        } />
        <Route path="reports" element={
          <Suspense fallback={<LoadingFallback />}>
            <Reports />
          </Suspense>
        } />
        <Route path="impact" element={
          <Suspense fallback={<LoadingFallback />}>
            <Impact />
          </Suspense>
        } />
        <Route path="facilities" element={
          <Suspense fallback={<LoadingFallback />}>
            <HealthcareFacilities />
          </Suspense>
        } />
    </Routes>
  );
};