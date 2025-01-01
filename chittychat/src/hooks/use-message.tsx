import useConversation from "@/global/useConversation";
import { post } from "@/service/request";
import React, { useState } from "react";

const useMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { message, setMessage, selectedConversation } = useConversation();

  const sendMessage = async (newMessage: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await post(
        `/message/send/${selectedConversation?._id}`,
        { newMessage }
      );

      if (!response.success) {
        throw new Error(response.error);
      }

      setMessage([...message, newMessage]);

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

  return { loading, error, sendMessage };
};

export default useMessage;
