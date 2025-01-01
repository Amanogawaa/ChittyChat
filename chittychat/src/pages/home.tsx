import EmptyState from "@/components/empty-state";
import MessageInput from "@/components/message/message-input";
import Messages from "@/components/message/messages";
import useConversation from "@/global/useConversation";

const Home = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <>
      {selectedConversation !== null ? (
        <div className="w-full flex flex-col h-screen">
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation?.fullname}
            </span>
          </div>
          <div className="flex-grow">
            <Messages />
          </div>
          <div className="mb-3 mr-3">
            <MessageInput />
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default Home;
