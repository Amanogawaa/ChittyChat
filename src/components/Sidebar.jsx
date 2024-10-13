import React from "react";
import Chatroom from "./Chatroom";
import UserList from "./UserList";

const Sidebar = () => {
  return (
    <>
      <UserList />
      <Chatroom />
    </>
  );
};

export default Sidebar;
