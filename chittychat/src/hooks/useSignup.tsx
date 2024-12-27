import { useState } from "react";
import { validateSignup } from "@/utils/validations";
import { post } from "@/service/request";
import { ApiResponse } from "@/models/response";

type SignupProps = {
  fullname: string;
  username: string;
  gender: string;
  password: string;
  confirmPassword: string;
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async ({
    fullname,
    username,
    gender,
    password,
    confirmPassword,
  }: SignupProps): Promise<ApiResponse> => {
    setError(null);

    const validationResult = validateSignup({
      fullname,
      username,
      gender,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      setError(validationResult.error?.toString() || "Validation failed");
      return { success: false, error: validationResult.error };
    }

    setLoading(true);

    try {
      const response = await post("auth/register", {
        fullname,
        username,
        gender,
        password,
        confirmPassword,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
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

  return { loading, error, signup };
};

export default useSignup;
