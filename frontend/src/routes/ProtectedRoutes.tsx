
import { Navigate, Outlet } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ClinicianSidebar } from "@/components/layout/ClinicianSidebar";
import { PatientSidebar } from "@/components/layout/PatientSidebar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { NGOSidebar } from "@/components/layout/NGOSidebar";
import { Navbar } from "@/components/layout/Navbar";

interface ProtectedRoutesProps {
  userType: "clinician" | "patient" | "admin" | "ngo";
  userName: string;
  userRole?: string;
}

export const ProtectedRoutes = ({ userType, userName, userRole }: ProtectedRoutesProps) => {
  // Simplified auth check - in a real app, you'd check if the user is logged in
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Select the appropriate sidebar based on user type
  const getSidebar = () => {
    switch (userType) {
      case "clinician":
        return <ClinicianSidebar />;
      case "patient":
        return <PatientSidebar />;
      case "admin":
        return <AdminSidebar />;
      case "ngo":
        return <NGOSidebar />;
      default:
        return null;
    }
  };

  return (
    <AppShell 
      sidebar={getSidebar()} 
      header={<Navbar userType={userType} userName={userName} userRole={userRole} />}
    >
      <Outlet />
    </AppShell>
  );
};
