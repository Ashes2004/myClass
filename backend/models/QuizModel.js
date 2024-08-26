import mongoose from "mongoose";

// Schema for the question object
const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
});

// Schema for each student's quiz response
const quizResForEachSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  answers: [
    {
      questionId: {
        type: String,
        required: true,
      },
      answer: {
        type: Number,
        required: true,
      },
    },
  ],
  scoreEarned: {
    type: Number,
    required: true,
  },
  fullScore: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model for storing each student's quiz response

// Schema for the quiz object
const quizSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  questions: [questionSchema],
  quizResForEach: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizResForEach",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model for storing quizzes
const Quiz = mongoose.model("Quiz", quizSchema);
const QuizResForEach = mongoose.model("QuizResForEach", quizResForEachSchema);

export {Quiz , QuizResForEach} ;
