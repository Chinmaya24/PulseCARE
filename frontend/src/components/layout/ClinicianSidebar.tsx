
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  CalendarClock,
  ClipboardList,
  FileText,
  Home,
  LucideIcon,
  Pill,
  Settings,
  Users,
  Mic,
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

export const ClinicianSidebar = () => {
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
              to="/clinician/dashboard"
              icon={Home}
              label="Dashboard"
              active={location.pathname === "/clinician/dashboard"}
            />
            <SidebarLink
              to="/clinician/patients"
              icon={Users}
              label="My Patients"
              active={location.pathname.startsWith("/clinician/patients")}
            />
            <SidebarLink
              to="/clinician/rounds"
              icon={ClipboardList}
              label="Daily Rounds"
              active={location.pathname.startsWith("/clinician/rounds")}
            />
            <SidebarLink
              to="/clinician/vitals"
              icon={Activity}
              label="Record Vitals"
              active={location.pathname.startsWith("/clinician/vitals")}
            />
            <SidebarLink
              to="/clinician/medications"
              icon={Pill}
              label="Medications"
              active={location.pathname.startsWith("/clinician/medications")}
            />
          </SidebarMenu>

          <SidebarMenu className="mt-4">
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarLink
              to="/clinician/voice-notes"
              icon={Mic}
              label="Voice Notes"
              active={location.pathname.startsWith("/clinician/voice-notes")}
            />
            <SidebarLink
              to="/clinician/appointments"
              icon={CalendarClock}
              label="Appointments"
              active={location.pathname.startsWith("/clinician/appointments")}
            />
            <SidebarLink
              to="https://us05web.zoom.us/j/82168267609?pwd=fo7QlUbDgXxG9kddzJQ5exGHVBkCzf.1"
              external={true}
              icon={CalendarClock}
              label="Video Meeting"
              active={false} // since it's external, route matching doesn't apply
/>
            <SidebarLink
              to="/clinician/reports"
              icon={FileText}
              label="Reports"
              active={location.pathname.startsWith("/clinician/reports")}
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
