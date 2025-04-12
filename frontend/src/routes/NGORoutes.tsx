import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Loading spinner fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full p-8">
    <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
);

// Lazy loaded components
const NGODashboard = lazy(() => import("@/pages/ngo/NGODashboard"));
const Campaigns = lazy(() => import("@/pages/ngo/Campaigns"));
const PatientsReferred = lazy(() => import("@/pages/ngo/PatientsReferred"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const HealthDrives = lazy(() => import("@/pages/ngo/HealthDrives"));
const Reports = lazy(() => import("@/pages/ngo/Reports"));
const Impact = lazy(() => import("@/pages/ngo/Impact"));
const HealthcareFacilities = lazy(() => import("@/pages/ngo/HealthcareFacilities"));
const GovernmentSchemes = lazy(() => import("@/pages/ngo/Scheme"));

export const NGORoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes userType="ngo" 
            userName="healthcare Foundations" 
            userRole="Healthcare NGO" />}>
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NGODashboard />
            </Suspense>
          }
        />
        <Route
          path="campaigns"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Campaigns />
            </Suspense>
          }
        />
        <Route
          path="patients"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientsReferred />
            </Suspense>
          }
        />
        <Route
          path="health-drives"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <HealthDrives />
            </Suspense>
          }
        />
        <Route
          path="reports"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Reports />
            </Suspense>
          }
        />
        <Route
          path="impact"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Impact />
            </Suspense>
          }
        />
        <Route
          path="facilities"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <HealthcareFacilities />
            </Suspense>
          }
        />
        <Route
          path="schemes"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <GovernmentSchemes />
            </Suspense>
          }
        />
      </Route>

      {/* Fallback for unmatched routes */}
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};
