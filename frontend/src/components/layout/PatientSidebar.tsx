
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  Calendar,
  FileText,
  Flame,
  Home,
  Info,
  LucideIcon,
  MessageSquare,
  Settings,
  StickyNote,
  Utensils,
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

export const PatientSidebar = () => {
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
              to="/patient/dashboard"
              icon={Home}
              label="Dashboard"
              active={location.pathname === "/patient/dashboard" || location.pathname === "/patient"}
            />
            <SidebarLink
              to="/patient/health-diary"
              icon={StickyNote}
              label="Health Diary"
              active={location.pathname.startsWith("/patient/health-diary")}
            />
            <SidebarLink
              to="/patient/vitals"
              icon={Activity}
              label="My Vitals"
              active={location.pathname.startsWith("/patient/vitals")}
            />
            <SidebarLink
              to="/patient/appointments"
              icon={Calendar}
              label="Appointments"
              active={location.pathname.startsWith("/patient/appointments")}
            />
          </SidebarMenu>

          <SidebarMenu className="mt-4">
            <SidebarGroupLabel>Resources</SidebarGroupLabel>
            <SidebarLink
              to="https://pulcareedu.netlify.app/"
              external={true}
              icon={Info}
              label="Health Education"
              active={false} // since it's external, route matching doesn't apply
/>
            <SidebarLink
              to="/patient/diet"
              icon={Utensils}
              label="Dietary Plan"
              active={location.pathname.startsWith("/patient/diet")}
            />
            <SidebarLink
              to="/patient/visualizations"
              icon={Flame}
              label="3D Visualizations"
              active={location.pathname.startsWith("/patient/visualizations")}
            />
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2">
          <SidebarMenu>
            <SidebarLink
              to="/patient/messages"
              icon={MessageSquare}
              label="Message Doctor"
              active={location.pathname.startsWith("/patient/messages")}
            />
            <SidebarLink
              to="/patient/reports"
              icon={FileText}
              label="Medical Reports"
              active={location.pathname.startsWith("/patient/reports")}
            />
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
                // Handle logout logic
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
