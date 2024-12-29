import { post } from "@/service/request";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  token: string | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialToken = sessionStorage.getItem("token");

  const [token, setToken] = useState<string | null>(initialToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    console.log("Login function called");
    setLoading(true);
    setError(null);

    try {
      const data = await post("auth/login", { username, password });

      if (!data.success) {
        setError(data.error || "Login failed");
        return { success: false, error: data.error };
      }

      const token = data.data;
      setToken(token);
      sessionStorage.setItem("token", token);
      setSuccess(true);

      return { success: true, data };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during login";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    setSuccess(false);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        loading,
        error,
        success,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
