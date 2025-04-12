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
const AdminDashboard = lazy(() => 
  import("@/pages/admin/AdminDashboard").then(module => ({ 
    default: module.default 
  }))
);
const Doctors = lazy(() => import("@/pages/admin/Doctors"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Patients = lazy(() => import("@/pages/admin/Patients"));
const NGOs = lazy(() => import("@/pages/admin/NGOs"));
const Appointments = lazy(() => import("@/pages/admin/Appointments"));
const Campaigns = lazy(() => import("@/pages/admin/Campaigns"));
const Reports = lazy(() => import("@/pages/admin/Reports"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));


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
        </Route>
      <Route path="dashboard" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboard />
          </Suspense>
        } />
        <Route path="doctors" element={
          <Suspense fallback={<LoadingFallback />}>
            <Doctors />
          </Suspense>
        } />
        <Route path="patients" element={
          <Suspense fallback={<LoadingFallback />}>
            <Patients />
          </Suspense>
        } />
        <Route path="ngos" element={
          <Suspense fallback={<LoadingFallback />}>
            <NGOs />
          </Suspense>
        } />
        <Route path="appointments" element={
          <Suspense fallback={<LoadingFallback />}>
            <Appointments />
          </Suspense>
        } />
        <Route path="campaigns" element={
          <Suspense fallback={<LoadingFallback />}>
            <Campaigns />
          </Suspense>
        } />
        <Route path="reports" element={
          <Suspense fallback={<LoadingFallback />}>
            <Reports />
          </Suspense>
        } />
        <Route path="analytics" element={
          <Suspense fallback={<LoadingFallback />}>
            <Analytics />
          </Suspense>
        } />
    </Routes>
    
  );
};