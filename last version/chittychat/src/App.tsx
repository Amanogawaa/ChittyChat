import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";
import { Toaster } from "sonner";
import ProtectRoutes from "./utils/protectRoutes";
import Layout from "./components/layout";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<ProtectRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
