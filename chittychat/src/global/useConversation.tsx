import { create } from "zustand";

interface Conversation {
  _id: string;
  image: string;
  fullname: string;
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  message: string[];
  setMessage: (message: string[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  message: [],
  setMessage: (message) => set({ message }),
}));

export default useConversation;
