import { ApiResponse } from "@/models/response";
import { post } from "@/service/request";
import React, { useState } from "react";

type LoginProps = {
  username: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async ({
    username,
    password,
  }: LoginProps): Promise<ApiResponse> => {
    setError(null);

    setLoading(true);

    try {
      const response = await post("auth/login", {
        username,
        password,
      });

      const data = await response.json();

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        return { success: false, error: data.error };
      }

      return { success: true, data };
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

  return { loading, error, login };
};

export default useLogin;
