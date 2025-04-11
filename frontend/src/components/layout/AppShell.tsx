
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppShellProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export const AppShell = ({ sidebar, header, children }: AppShellProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {sidebar}
        <div className="flex-1 flex flex-col min-h-screen">
          {header}
          <main className="flex-1 px-4 md:px-6 py-4 md:py-6 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <footer className="py-6 px-6 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 PulseCare. All rights reserved.</p>
          </footer>
        </div>
        <ShadcnToaster />
        <SonnerToaster />
      </div>
    </SidebarProvider>
  );
};
