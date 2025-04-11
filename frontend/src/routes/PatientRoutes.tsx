
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Use lazy loading for optimization
const PatientDashboard = lazy(() => import("@/pages/patient/PatientDashboard"));
const PatientEducation = lazy(() => import("@/pages/patient/PatientEducation"));
const PatientDietaryPlan = lazy(() => import("@/pages/patient/PatientDietaryPlan"));
const PatientVisualizations = lazy(() => import("@/pages/patient/PatientVisualizations"));
const PatientAppointments = lazy(() => import("@/pages/patient/PatientAppointments"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
        <Route index element={<PatientDashboard />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="health-diary" element={<div>Health Diary</div>} />
        <Route path="vitals" element={<div>My Vitals</div>} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="education" element={<PatientEducation />} />
        <Route path="diet" element={<PatientDietaryPlan />} />
        <Route path="visualizations" element={<PatientVisualizations />} />
        <Route path="messages" element={<div>Message Doctor</div>} />
        <Route path="reports" element={<div>Medical Reports</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
