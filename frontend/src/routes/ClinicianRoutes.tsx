
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Use lazy loading for optimization
const ClinicianDashboard = lazy(() => import("@/pages/clinician/ClinicianDashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const ClinicianRoutes = () => {
  return (
    <Routes>
      <Route 
        element={
          <ProtectedRoutes 
            userType="clinician" 
            userName="Dr. Sarah Johnson" 
            userRole="Cardiologist"
          />
        }
      >
        <Route path="dashboard" element={<ClinicianDashboard />} />
        <Route path="patients" element={<div>Patients</div>} />
        <Route path="rounds" element={<div>Daily Rounds</div>} />
        <Route path="vitals" element={<div>Record Vitals</div>} />
        <Route path="medications" element={<div>Medications</div>} />
        <Route path="voice-notes" element={<div>Voice Notes</div>} />
        <Route path="appointments" element={<div>Appointments</div>} />
        <Route path="reports" element={<div>Reports</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
