// import Student from "../../models/StudentModel";
import Message from "../../models/ChatDM/MessageModel"
import Conversation from "../../models/ChatDM/ConversationModel";
// export const getMyChatsList = async (req, res) => {
//   try {
//     const classes = await Class.find().populate("students");
//     res.json(classes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getPersonalChat = async (req, res) => {};

// chat inbox Storage

// Student,teacher
// studentMessage=

export const getMyChatsList = async(req,res) => {
    try {
        const {userType, userID} = req.body;
        if(userType!=="Teacher" && userType!=="Student") throw new Error("UserType is neither Teacher nor Student");
        if(userType==="Student") {
            const getChats = await Message.findOne({senderId:userID})
            if(!getChats) throw new Error("Couldn't find anyone in chatlist");
            return res.status(200).json({
                getChats, userID
            })
        }
        else{
            const getChats = await Message.findOne({receiverId:userID})
            if(!getChats) throw new Error("Couldn't find anyone in chatlist");
            return res.status(200).json({
                getChats, userID
            })
        }
    } catch (error) {
        return res.status(500).json({message:"Server Error",error});
    }
}

export const getOrCreateConversation = async (req, res) => {
  const { teacherId, studentId } = req.body;

  try {
    let conversation = await Conversation.findOne({ teacherId, studentId })
      .populate("messages")
      .exec();

    if (!conversation) {
      // If no conversation exists, create one
      conversation = new Conversation({ teacherId, studentId });
      await conversation.save();
    }

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

// Add a message to a conversation
/*export const addMessage = async (req, res) => {
  const { conversationId, senderId, content } = req.body;

  try {
    // Find the conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Create a new message
    const newMessage = new Message({
      sender: senderId,
      content: content,
    });

    // Save the message
    await newMessage.save();

    // Add the message to the conversation's messages array
    conversation.messages.push(newMessage._id);
    await conversation.save();

    return res.status(201).json({ message: "Message sent", newMessage });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};*/

// Fetch all messages in a conversation
/*export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    // Find the conversation and populate messages
    const conversation = await Conversation.findById(conversationId)
      .populate({
        path: "messages",
        populate: { path: "sender", select: "name" }, // Populating sender information
      })
      .exec();

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};*/
