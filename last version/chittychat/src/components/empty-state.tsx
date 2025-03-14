import { MessageCircle } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all hover:scale-105 duration-300">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
            <MessageCircle className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          No Conversations Yet
        </h1>

        <p className="text-gray-600 mb-8">
          Start a conversation by selecting a user from your contacts!
        </p>

        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all duration-200 hover:-translate-y-1"
          aria-label="Start new chat"
        >
          Start New Chat
        </button>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            Connect with friends and family through instant messaging
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
