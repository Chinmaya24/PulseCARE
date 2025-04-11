
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, Moon, Search, Settings, Sun, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  userType: "clinician" | "patient" | "admin" | "ngo";
  userName: string;
  userRole?: string;
}

export const Navbar = ({ userType, userName, userRole }: NavbarProps) => {
  const isMobile = useIsMobile();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const initialLetter = userName.charAt(0).toUpperCase();

  const getColorBasedOnType = () => {
    switch(userType) {
      case "clinician": return "bg-medical-primary text-white";
      case "patient": return "bg-patient-primary text-white";
      case "admin": return "bg-admin-primary text-white";
      case "ngo": return "bg-ngo-primary text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
        {isMobile ? (
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SidebarTrigger>
        ) : null}
        <Link to="/" className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-primary"></span>
          <span className="font-bold">PulseCare</span>
        </Link>
      </div>
      <div className="flex-1">
        {!isMobile && (
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:w-2/3 lg:w-1/3"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={userName} />
                <AvatarFallback className={getColorBasedOnType()}>
                  {initialLetter}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{userName}</p>
                {userRole && (
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer w-full flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer w-full flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => {
                // Handle logout here
                window.location.href = "/login";
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
