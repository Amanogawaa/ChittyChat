import React from "react";
import { Button } from "./ui/button";
import useLogout from "@/hooks/use-logout";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();

    if (response.success) {
      navigate("/login");
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
