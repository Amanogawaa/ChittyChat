import { post } from "@/service/request";
import React, { useState } from "react";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await post("auth/logout", {});

      if (!response) {
        setError(response.error || "Logout failed");
        return { success: false, error: response.error };
      }

      sessionStorage.removeItem("token");

      return { success: true, data: response };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during signup";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, logout };
};

export default useLogout;
