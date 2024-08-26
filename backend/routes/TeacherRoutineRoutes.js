import express from 'express';
import { 
    getTeacherRoutines, 
    getTeacherRoutineById, 
    createTeacherRoutine, 
    updateTeacherRoutine, 
    deleteTeacherRoutine 
} from '../controllars/TeacherRoutineController.js';

const router = express.Router();

router.get('/', getTeacherRoutines); // Get all teacher routines
router.get('/:id', getTeacherRoutineById); // Get a specific teacher routine by ID
router.post('/', createTeacherRoutine); // Create a new teacher routine
router.put('/:id', updateTeacherRoutine); // Update a teacher routine by ID
router.delete('/:id', deleteTeacherRoutine); // Delete a teacher routine by ID

export default router;
