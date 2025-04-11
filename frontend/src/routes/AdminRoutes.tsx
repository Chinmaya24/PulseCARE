
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

// Use lazy loading for optimization
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route 
        element={
          <ProtectedRoutes 
            userType="admin" 
            userName="Admin User" 
            userRole="System Administrator"
          />
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="doctors" element={<div>Doctors Management</div>} />
        <Route path="patients" element={<div>Patients Management</div>} />
        <Route path="ngos" element={<div>NGOs Management</div>} />
        <Route path="appointments" element={<div>Appointments Oversight</div>} />
        <Route path="campaigns" element={<div>Campaign Control</div>} />
        <Route path="reports" element={<div>Reports</div>} />
        <Route path="analytics" element={<div>Analytics</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
