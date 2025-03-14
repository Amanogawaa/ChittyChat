import useUsers from "@/hooks/use-users";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchInput from "../forms/search-input";
import SidebarItem from "./sidebar-item";
import Loader from "../loader";
import Logout from "../logout";

const SidebarContents = () => {
  const { loading, users } = useUsers();

  return (
    <SidebarContent>
      <SidebarHeader className="flex items-center p-3.5">
        <SearchInput />
      </SidebarHeader>
      <SidebarMenu className="flex flex-col w-full px-3.5 gap-2">
        {users.map((user, index) => (
          <SidebarItem conversation={user} key={index} />
        ))}
      </SidebarMenu>
      <Logout />
    </SidebarContent>
  );
};

export default SidebarContents;
