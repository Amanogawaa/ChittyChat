import useConversation from "@/global/useConversation";
import { get } from "@/service/request";
import React, { useEffect, useState } from "react";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { message, selectedConversation, setMessage } = useConversation();

  const getMessage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await get(`/message/${selectedConversation?._id}`);

      if (!response.success) {
        throw new Error(response.error);
      }

      setMessage(response);

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

  useEffect(() => {
    if (selectedConversation) {
      getMessage();
    }
  }, [selectedConversation?._id, setMessage]);

  return { loading, error, message };
};

export default useGetMessage;
