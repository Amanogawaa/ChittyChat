import { get } from "@/service/request";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  fullname: string;
  username: string;
  gender: string;
  image: string;
};

const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const respose = await get("users/getusers");

      if (!respose) {
        setError(respose.error || "Failed to fetch users");
        return { success: false, error: respose.error };
      }

      setUsers(respose.data);

      return { success: true, data: users };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during signup";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { loading, error, users };
};

export default useUsers;
