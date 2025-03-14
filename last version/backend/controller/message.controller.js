import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  const message = req.body.message;
  const { id: receiver } = req.params;
  const sender = req.user._id;

  if (!message || !receiver) {
    return res.status(400).json({
      success: false,
      error: "Message content and receiver ID are required",
    });
  }

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
      });
    }

    const newMessage = new Message({
      sender,
      receiver,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiver } = req.params;
    const sender = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("message");

    if (!conversation) {
      return res.status(200).json({
        success: true,
        error: "No conversation found with the given user",
        data: [],
      });
    }

    res.status(200).json({ success: true, data: conversation.message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
