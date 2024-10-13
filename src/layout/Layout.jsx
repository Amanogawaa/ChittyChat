import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Login from "./../pages/Login";
import Chat from "./../pages/Chat";

const Layout = () => {
  const [user] = useAuthState(auth);

  console.log(user);
  return (
    <>
      <div>{!user ? <Login /> : <Chat />}</div>
    </>
  );
};

export default Layout;
