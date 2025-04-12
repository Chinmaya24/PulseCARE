
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Use lazy loading for optimization
const NGODashboard = lazy(() => import("@/pages/ngo/NGODashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
        <Route path="dashboard" element={<NGODashboard />} />
        <Route path="campaigns" element={<div>My Campaigns</div>} />
        <Route path="patients" element={<div>Patients Referred</div>} />
        <Route path="doctors" element={<div>Partner Doctors</div>} />
        <Route path="health-drives" element={<div>Health Drives</div>} />
        <Route path="reports" element={<div>Reports</div>} />
        <Route path="impact" element={<div>Impact</div>} />
        <Route path="facilities" element={<div>Healthcare Facilities</div>} />
        <Route path="support" element={<div>Support</div>} />
        <Route path="statistics" element={<div>Statistics</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
