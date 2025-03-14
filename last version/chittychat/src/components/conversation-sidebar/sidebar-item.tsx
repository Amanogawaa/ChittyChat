import React from "react";
import { SidebarMenuItem } from "../ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import useConversation from "@/global/useConversation";

interface Conversation {
  _id: string;
  image: string;
  fullname: string;
}

interface SidebarItemProps {
  conversation: Conversation;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <SidebarMenuItem
      key={conversation._id}
      className={`flex w-full items-center p-3.5 border border-slate-500 rounded-lg hover:cursor-pointer hover:bg-slate-200 ${
        isSelected ? "bg-slate-500 text-white" : ""
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <Avatar className="mr-3">
        <AvatarImage src={conversation.image} className="max-w-8" />
        <AvatarFallback>{conversation.fullname.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="flex-1">{conversation.fullname}</span>
    </SidebarMenuItem>
  );
};

export default SidebarItem;
