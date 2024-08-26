import { TeacherRoutine } from '../models/RoutineModal.js';
import Teacher from '../models/TeacherModel.js';
// Get all teacher routines
export const getTeacherRoutines = async (req, res) => {
    try {
        const teacherRoutines = await TeacherRoutine.find().populate('teacherId');
        res.json(teacherRoutines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific teacher routine by ID
export const getTeacherRoutineById = async (req, res) => {
    try {
        const teacherRoutine = await TeacherRoutine.findById(req.params.id).populate('teacherId');
        if (!teacherRoutine) return res.status(404).json({ message: 'Teacher routine not found' });
        res.json(teacherRoutine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new teacher routine
export const createTeacherRoutine = async (req, res) => {
    const teacherRoutine = new TeacherRoutine(req.body);
   
    try {
        const newTeacherRoutine = await teacherRoutine.save();
        const teacher = await Teacher.findById( req.body.teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Update the teacher's routine with the new routine ID
        teacher.TeacherRoutine = newTeacherRoutine._id;
        await teacher.save();
        
        res.status(201).json(newTeacherRoutine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a teacher routine by ID
export const updateTeacherRoutine = async (req, res) => {
    try {
        const updatedTeacherRoutine = await TeacherRoutine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeacherRoutine) return res.status(404).json({ message: 'Teacher routine not found' });
        res.json(updatedTeacherRoutine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a teacher routine by ID
export const deleteTeacherRoutine = async (req, res) => {
    try {
        // Find the teacher routine by ID and delete it
        const teacherRoutine = await TeacherRoutine.findByIdAndDelete(req.params.id);
        
        // If the teacher routine is not found, return a 404 error
        if (!teacherRoutine) {
            return res.status(404).json({ message: 'Teacher routine not found' });
        }
        
        // If the teacher is associated with this routine, update or remove the reference
        const teacher = await Teacher.findOne({ TeacherRoutine: req.params.id });
        if (teacher) {
            teacher.TeacherRoutine = null; // Or any other logic to handle removing the reference
            await teacher.save();
        }
        
        res.json({ message: 'Teacher routine deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

