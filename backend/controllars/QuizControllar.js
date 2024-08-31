import { Quiz, QuizResForEach } from "../models/QuizModel.js";  // Adjust the import path as necessary

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('classId').populate('teacherId');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('classId').populate('teacherId');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a quiz by ID
export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new quiz response
export const createQuizResponse = async (req, res) => {
  try {
    const quizResponse = new QuizResForEach(req.body);
    await quizResponse.save();
    res.status(201).json(quizResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get quiz responses for a specific quiz
export const getQuizResponses = async (req, res) => {
  try {
    const quizResponses = await QuizResForEach.find({ quizId: req.params.quizId }).populate('studentId');
    res.status(200).json(quizResponses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
