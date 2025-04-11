import { Link, useLocation } from "react-router-dom";
import {
  BarChart,
  Calendar,
  FileText,
  Globe,
  Home,
  Layout,
  LucideIcon,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, active }: SidebarLinkProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <Link
        to={to}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 lg:h-[60px] items-center border-b px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg text-sidebar-primary"
        >
          <span className="h-6 w-6 rounded-full bg-sidebar-primary"></span>
          <span>PulseCare</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <SidebarMenu>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarLink
              to="/admin/dashboard"
              icon={Home}
              label="Dashboard"
              active={location.pathname === "/admin/dashboard"}
            />
            <SidebarLink
              to="/admin/doctors"
              icon={UserCog}
              label="Doctors"
              active={location.pathname.startsWith("/admin/doctors")}
            />
            <SidebarLink
              to="/admin/patients"
              icon={Users}
              label="Patients"
              active={location.pathname.startsWith("/admin/patients")}
            />
            <SidebarLink
              to="/admin/ngos"
              icon={Globe}
              label="NGOs"
              active={location.pathname.startsWith("/admin/ngos")}
            />
          </SidebarMenu>

          <SidebarMenu className="mt-4">
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarLink
              to="/admin/appointments"
              icon={Calendar}
              label="Appointments"
              active={location.pathname.startsWith("/admin/appointments")}
            />
            <SidebarLink
              to="/admin/campaigns"
              icon={Layout}
              label="Campaigns"
              active={location.pathname.startsWith("/admin/campaigns")}
            />
            <SidebarLink
              to="/admin/reports"
              icon={FileText}
              label="Reports"
              active={location.pathname.startsWith("/admin/reports")}
            />
            <SidebarLink
              to="/admin/analytics"
              icon={BarChart}
              label="Analytics"
              active={location.pathname.startsWith("/admin/analytics")}
            />
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2">
          <SidebarMenu>
            <SidebarLink
              to="/settings"
              icon={Settings}
              label="Settings"
              active={location.pathname === "/settings"}
            />
          </SidebarMenu>
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
