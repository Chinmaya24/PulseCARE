import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Lazy load patient components
const PatientDashboard = lazy(() => import("@/pages/patient/PatientDashboard"));
const PatientEducation = lazy(() => import("@/pages/patient/PatientEducation"));
const PatientDietaryPlan = lazy(() => import("@/pages/patient/PatientDietaryPlan"));
const PatientVisualizations = lazy(() => import("@/pages/patient/PatientVisualizations"));
const PatientAppointments = lazy(() => import("@/pages/patient/PatientAppointments"));
const PatientMessageDoctor = lazy(() => import("@/pages/patient/PatientMessageDoctor"));
const PatientVitals = lazy(() => import("@/pages/patient/PatientVitals"));
const PatientHealthDiary = lazy(() => import("@/pages/patient/PatientHealthDiary"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full p-8">
    <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
);

export const PatientRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes userType="patient" userName={""} />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientDashboard />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientDashboard />
            </Suspense>
          }
        />
        <Route
          path="health-diary"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientHealthDiary />
            </Suspense>
          }
        />
        <Route
          path="vitals"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientVitals />
            </Suspense>
          }
        />
        <Route
          path="appointments"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientAppointments />
            </Suspense>
          }
        />
        <Route
          path="education"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientEducation />
            </Suspense>
          }
        />
        <Route
          path="diet"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientDietaryPlan />
            </Suspense>
          }
        />
        <Route
          path="visualizations"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientVisualizations />
            </Suspense>
          }
        />
        <Route
          path="messages"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PatientMessageDoctor />
            </Suspense>
          }
        />
        <Route
          path="reports"
          element={<div>Medical Reports</div>}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
