import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Lazy loaded components
const ClinicianDashboard = lazy(() => import("@/pages/clinician/ClinicianDashboard"));
const Patients = lazy(() => import("@/pages/clinician/Patients"));
const DailyRounds = lazy(() => import("@/pages/clinician/DailyRounds"));
const RecordVitals = lazy(() => import("@/pages/clinician/RecordVitals"));
const Medications = lazy(() => import("@/pages/clinician/Medications"));
const VoiceNotes = lazy(() => import("@/pages/clinician/VoiceNotes"));
const Appointments = lazy(() => import("@/pages/clinician/Appointments"));
const Reports = lazy(() => import("@/pages/clinician/Reports"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const ClinicianRoutes = () => {
  return (
    <Routes>
      <Route 
      element={
      <ProtectedRoutes userType="clinician" 
      userName="Dr. Sarah Johnson" 
      userRole="Cardiologist" />}>
        <Route path="dashboard" element={<ClinicianDashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="rounds" element={<DailyRounds />} />
        <Route path="vitals" element={<RecordVitals />} />
        <Route path="medications" element={<Medications />} />
        <Route path="voice-notes" element={<VoiceNotes />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
