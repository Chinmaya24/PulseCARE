import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Building,
  Calendar,
  FileText,
  Home,
  Layout,
  LucideIcon,
  MessageSquare,
  Settings,
  Tally5,
  UserRound,
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

export const NGOSidebar = () => {
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
              to="/ngo/dashboard"
              icon={Home}
              label="Dashboard"
              active={location.pathname === "/ngo/dashboard"}
            />
            <SidebarLink
              to="/ngo/campaigns"
              icon={Layout}
              label="My Campaigns"
              active={location.pathname.startsWith("/ngo/campaigns")}
            />
            <SidebarLink
              to="/ngo/patients"
              icon={Users}
              label="Patients Referred"
              active={location.pathname.startsWith("/ngo/patients")}
            />
          </SidebarMenu>

          <SidebarMenu className="mt-4">
            <SidebarGroupLabel>Activities</SidebarGroupLabel>
            <SidebarLink
              to="/ngo/health-drives"
              icon={Calendar}
              label="Health Drives"
              active={location.pathname.startsWith("/ngo/health-drives")}
            />
            <SidebarLink
              to="/ngo/reports"
              icon={FileText}
              label="Reports"
              active={location.pathname.startsWith("/ngo/reports")}
            />
            <SidebarLink
              to="/ngo/impact"
              icon={BarChart3}
              label="Impact"
              active={location.pathname.startsWith("/ngo/impact")}
            />
            <SidebarLink
              to="/ngo/facilities"
              icon={Building}
              label="Healthcare Facilities"
              active={location.pathname.startsWith("/ngo/facilities")}
            />
            <SidebarLink
              to="/ngo/schemes"
              icon={Building}
              label="Government Schemes"
              active={location.pathname.startsWith("/ngo/schemes")}
            />
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2">
          <SidebarMenu>
            <SidebarLink
              to="/ngo/support"
              icon={MessageSquare}
              label="Support"
              active={location.pathname.startsWith("/ngo/support")}
            />
            <SidebarLink
              to="/ngo/statistics"
              icon={Tally5}
              label="Statistics"
              active={location.pathname.startsWith("/ngo/statistics")}
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
