
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Use lazy loading for optimization
// Use lazy loading for optimization - with error boundaries and proper suspense
const PatientDashboard = lazy(() => 
  import("@/pages/patient/PatientDashboard").then(module => ({ 
    default: module.default 
  }))
);
const PatientEducation = lazy(() => import("@/pages/patient/PatientEducation"));
const PatientDietaryPlan = lazy(() => import("@/pages/patient/PatientDietaryPlan"));
const PatientVisualizations = lazy(() => import("@/pages/patient/PatientVisualizations"));
const PatientAppointments = lazy(() => import("@/pages/patient/PatientAppointments"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PatientMessageDoctor = lazy(() => import("@/pages/patient/PatientMessageDoctor"));
const PatientVitals = lazy(() => import("@/pages/patient/PatientVitals"));
const PatientHealthDiary = lazy(() => import("@/pages/patient/PatientHealthDiary"));
// Simple loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full p-8">
    <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
);

export const PatientRoutes = () => {
  return (
    <Routes>
      <Route 
        element={
          <ProtectedRoutes 
            userType="patient" 
            userName="Sarah Jones" 
            userRole="Patient"
          />
        }
      >
        <Route index element={
          <Suspense fallback={<LoadingFallback />}>
            <PatientDashboard />
          </Suspense>
        } />
        <Route path="dashboard" element={
          <Suspense fallback={<LoadingFallback />}>
            <PatientDashboard />
          </Suspense>
        } />
        <Route path="health-diary" element={<PatientHealthDiary />} />
        <Route path="vitals" element={<PatientVitals />} />
        <Route path="appointments" element={
          <Suspense fallback={<LoadingFallback />}>
            <PatientAppointments />
          </Suspense>
        } />
        <Route path="education" element={
          <Suspense fallback={<LoadingFallback />}>
            <PatientEducation />
          </Suspense>
        } />
        <Route path="diet" element={
          <Suspense fallback={<LoadingFallback />}>
            <PatientDietaryPlan />
          </Suspense>
        } />
        <Route path="visualizations" element={
          <Suspense fallback={<LoadingFallback />}>
            <PatientVisualizations />
          </Suspense>
        } />
        <Route path="messages" element={<PatientMessageDoctor />} />
        <Route path="reports" element={<div>Medical Reports</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
