import React from "react";
import { Input } from "../ui/input";
import useMessage from "@/hooks/use-message";
import { Button } from "../ui/button";

const MessageInput = () => {
  const [messages, setMessages] = React.useState("");
  const { sendMessage, loading } = useMessage();

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messages) return;

    await sendMessage(messages);
    setMessages("");
  };

  return (
    <div>
      <form onSubmit={handleMessage}>
        <Input value={messages} onChange={(e) => setMessages(e.target.value)} />

        <Button type="submit">Send this fucker</Button>
      </form>
    </div>
  );
};

export default MessageInput;
