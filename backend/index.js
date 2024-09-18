import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http"
import { Server } from "socket.io";
import Message from "./models/ChatDM/MessageModel.js";
import Conversation from "./models/ChatDM/ConversationModel.js";
import studentRoutes from "./routes/StudentRoutes.js";
import teacherRoutes from "./routes/TeacherRoutes.js";
import classRoutineRoutes from "./routes/classRoutineRoutes.js";
import teacherRoutineRoutes from "./routes/TeacherRoutineRoutes.js";
import classRoutes from './routes/ClassRoutes.js';
import roomRoutes from './routes/RoomRoutes.js';
import studentEnrollRoutes from './routes/StudentEnrollment.js'
import cors from 'cors';
import quizRoutes from './routes/QuizRoutes.js';
// import studentQuizRoutes from './routes/StudentQuizRoutes.js';
import administrativeRoutes from './routes/AdminRoutes.js';
// import authenticateToken from './middleware/authMiddleware.js';
import errorHandler from "./middleware/errorHandler.js";
import admin from 'firebase-admin';
import onlineClassRoutes from "./routes/OnlineClassRoutes.js"
import attendenceRoutes from './routes/AttendenceRoutes.js';
import alertRoutes from './routes/AlertTokenRoutes.js';
import chatBotRoutes from './routes/ChatBot.js'
import pollRoutes from './routes/pollRoutes.js';
import resultRoutes from './routes/ResultRoutes.js'
import serviceAccount from './myclass-6cf84-firebase-adminsdk-r71sl-388ebdf077.json' assert { type: "json" };
dotenv.config();




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());
/*const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"],
    credentials:"true"
  },
});

const userConnections = {}; // Store userID -> socket.id mapping

io.on('connection', (socket) => {
    console.log('A new user connected:', socket.id);

    // Handle user joining with a persistent user ID
    socket.on('join', async({userID,userType}) => {
        // Map the user ID to the current socket ID
        userConnections[userID] = socket.id;

        console.log(`User ${userID} joined with socket ID ${socket.id}`);

        // Check for undelivered messages
        const undeliveredMessages = await Message.find({ receiverId: userID, delivered: false })
        if(undeliveredMessages) {
          undeliveredMessages.forEach(async (msg) => {
              socket.emit('message', msg); // Send undelivered messages
              msg.delivered = true;
              await msg.save(); // Mark them as delivered
          });
        }  ;
    });

    // Handle message sending
    socket.on('sendMessage', async ({ sender, receiver, content, conversationId }) => {
      const conversation = await Conversation.findById(conversationId);
      const message = new Message({
          senderId:sender,
          senderModel,
          receiverId:receiver,
          receiverModel,
          message:content,
          delivered: false,
      });
      conversation.messages.push(message._id);
      await conversation.save();
      try {
          await message.save();
          // Look up the socket ID of the receiver from our connections
          const receiverSocketID = userConnections[receiver];
          
          // Attempt to send the message if the receiver is online
          if (receiverSocketID) {
            io.to(receiverSocketID).emit('message', message);
            
            // Mark the message as delivered if the receiver is online
            message.delivered = true;
            await message.save();
          }
      } catch (error) {
          console.error('Message save error:', error);
      }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User with socket ID ${socket.id} disconnected`);

        // Optionally, you can remove the user's socket ID from the mapping if needed
        // For example, if you have a way to track user disconnections by userID
    });
});
*/

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/class-routine", classRoutineRoutes);
app.use("/api/teacher-routine", teacherRoutineRoutes);
app.use('/api/classes',  classRoutes);
app.use('/api/quizzes', quizRoutes);
// app.use('/api/student-quizzes', studentQuizRoutes);
app.use('/api/attendence', attendenceRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/student-enroll', studentEnrollRoutes);
app.use('/api/admin',  administrativeRoutes);
app.use('/api/online-class' ,onlineClassRoutes );
app.use('/api/alert' , alertRoutes);
app.use('/api/chat' , chatBotRoutes);
app.use('/api/poll' , pollRoutes);
app.use('/api/result' , resultRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
