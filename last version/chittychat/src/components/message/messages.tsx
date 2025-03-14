import useGetMessage from "@/hooks/use-getmessage";

const Messages = () => {
  const { loading, message } = useGetMessage();
  console.log("Messages", message);
  return <div>Messages</div>;
};

export default Messages;
