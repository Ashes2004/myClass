// import express from 'express';
// import Quiz from '../models/QuizModel.js';

// const router = express.Router();

// // Create a new quiz
// router.post('/', async (req, res) => {
//   try {
//     const quiz = new Quiz(req.body);
//     await quiz.save();
//     res.status(201).json(quiz);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get quizzes for a class
// router.get('/class/:classId', async (req, res) => {
//   try {
//     const quizzes = await Quiz.find({ classId: req.params.classId }).populate('teacherId');
//     res.json(quizzes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get a quiz by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id).populate('teacherId');
//     if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
//     res.json(quiz);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
