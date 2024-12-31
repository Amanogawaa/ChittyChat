import EmptyState from "@/components/empty-state";
import useConversation from "@/global/useConversation";

const Home = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <>
      {selectedConversation !== null ? (
        <div className="w-full flex flex-col">
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation?.fullname}
            </span>
          </div>
          {/* <Messages />
        <MessageInput /> */}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default Home;
