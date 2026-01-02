"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPlaygroundPage = pathname.startsWith("/play-ground");

  return (
    <SidebarProvider
      key={isPlaygroundPage ? "playground" : "default"}
      defaultOpen={!isPlaygroundPage}
      style={
        {
          "--sidebar-width": "380px",
          "--sidebar-width-icon": "82px",
        } as React.CSSProperties
      }
    >
      {!isPlaygroundPage && <AppSidebar />}
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
