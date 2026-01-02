import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import SidebarComponent from "./sidebar";

const SidebarWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "380px",
            "--sidebar-width-icon": "80px",
          } as React.CSSProperties
        }
      >
        <SidebarComponent>{children}</SidebarComponent>
      </SidebarProvider>
    </>
  );
};

export default SidebarWrapper;
