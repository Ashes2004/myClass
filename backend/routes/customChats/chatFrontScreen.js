import express from "express";
import {
  getMyChatsList,
  getOrCreateConversation
} from "../../controllars/chatControllers/getDetails.js";
const router = express.Router();

// Get all Chats for a Student
router.get("/getMyChatsList/:userType/:userID", getMyChatsList);

//Get a Personal Chat by ID (DM)
router.get("/getPersonalChat/:recieverID/:senderID", getOrCreateConversation);

export default router;
