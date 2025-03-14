import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarTrigger,
} from "../ui/sidebar";
import SidebarContents from "./sidebar-items";

const AppSidebar = () => {
  return (
    <Sidebar variant={"sidebar"}>
      <SidebarContents />
    </Sidebar>
  );
};

export default AppSidebar;
