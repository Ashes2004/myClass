import express from 'express';

import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from '../controllars/StudentControllar.js';

const router = express.Router();

// Get all students
router.get('/' , getAllStudents);
// Create a new student
router.post('/' , createStudent);
// Get a student by ID
router.get('/:id', getStudentById);
// Update a student
router.patch('/:id', updateStudent);
// Delete a student
router.delete('/:id',deleteStudent );

export default router;





















