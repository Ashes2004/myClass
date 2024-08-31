import express from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  createQuizResponse,
  getQuizResponses
} from '../controllars/QuizControllar.js';

const router = express.Router();

// Quiz routes
router.post('/', createQuiz);  // Create a new quiz
router.get('', getAllQuizzes);  // Get all quizzes
router.get('/:id', getQuizById);  // Get a single quiz by ID
router.put('/:id', updateQuiz);  // Update a quiz by ID
router.delete('/:id', deleteQuiz);  // Delete a quiz by ID

// Quiz response routes
router.post('/:quizId/responses', createQuizResponse);  // Create a new quiz response
router.get('/:quizId/responses', getQuizResponses);  // Get responses for a specific quiz

export default router;
