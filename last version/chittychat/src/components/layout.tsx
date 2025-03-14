import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./conversation-sidebar/sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex ">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
