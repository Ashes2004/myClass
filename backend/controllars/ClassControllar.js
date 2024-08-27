import Class from "../models/ClassModel.js";
import Student from "../models/StudentModel.js";
import Teacher from "../models/TeacherModel.js";
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()  .populate({
      path: 'students',
      select: '  _id studentName studentId studentRoll', // specify fields to include
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassByClassId = async (req, res) => {
  try {
    const classItem = await Class.findOne({classId : req.params.id}).populate('students');
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClass = async (req, res) => {
  try {
    const classItem = new Class(req.body);

    if (req.body.students && req.body.students.length > 0) {
      for (let i = 0; i < req.body.students.length; i++) {
        await Student.findByIdAndUpdate(req.body.students[i], {
          $set: { classId: classItem._id, studentRoll: (i + 1).toString() }
        });
      }
    }

    if (req.body.allocatedTeachers && req.body.allocatedTeachers.length > 0) {
      await Teacher.updateMany(
        { _id: { $in: req.body.allocatedTeachers } },
        { $addToSet: { allocatedClasses: classItem._id } }
      );
    }
   const ClassTeacherAdd = await Teacher.findById( req.body.
    classTeacher);
    ClassTeacherAdd.ClassTeacher = classItem._id;
    await ClassTeacherAdd.save();

    await classItem.save();
    res.status(201).json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });

    // Determine which students are no longer in the class
    const currentStudentIds = classItem.students.map((s) => s.toString());
    const updatedStudentIds = req.body.students.map((s) => s.toString());

    const removedStudents = currentStudentIds.filter(
      (id) => !updatedStudentIds.includes(id)
    );

    // Update removed students to clear classId and studentRoll
    await Student.updateMany(
      { _id: { $in: removedStudents } },
      { $unset: { classId: "", studentRoll: "" } }
    );

    // Prepare for updating/assigning roll numbers
    let nextRollNumber = 1; // Start roll number from 1
    for (let i = 0; i < updatedStudentIds.length; i++) {
      const studentId = updatedStudentIds[i];
      const student = await Student.findById(studentId);

      if (student && student.studentRoll) {
        // Retain existing roll number if present
        nextRollNumber = parseInt(student.studentRoll) + 1;
      } else {
        // Assign new roll number if not present
        await Student.findByIdAndUpdate(studentId, {
          $set: { classId: classItem._id, studentRoll: nextRollNumber.toString() }
        });
        nextRollNumber++; // Increment roll number for next student
      }
    }

    // Update the class with the new list of students
    classItem.students = updatedStudentIds;

    // Update teachers' allocated classes
    if (req.body.allocatedTeachers && req.body.allocatedTeachers.length > 0) {
      await Teacher.updateMany(
        { _id: { $in: req.body.allocatedTeachers } },
        { $addToSet: { allocatedClasses: classItem._id } }
      );
    }

    // Handle class teacher update
    if (classItem.classTeacher !== req.body.classTeacher) {
      if (req.body.classTeacher) {
        const newClassTeacher = await Teacher.findById(req.body.classTeacher);
        if (newClassTeacher) {
          newClassTeacher.ClassTeacher = classItem._id;
          await newClassTeacher.save();
        } else {
          return res.status(404).json({ message: "New class teacher not found" });
        }
      }

      if (classItem.classTeacher) {
        const oldClassTeacher = await Teacher.findById(classItem.classTeacher);
        if (oldClassTeacher) {
          oldClassTeacher.ClassTeacher = null;
          await oldClassTeacher.save();
        } else {
          return res.status(404).json({ message: "Previous class teacher not found" });
        }
      }
    }

    await classItem.save();
    res.status(200).json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });

    await Student.updateMany(
      { classId: classItem._id },
      { $set: { classId: null } } 
    );

    const PrevclassTeacherAdd = await Teacher.findById(classItem.classTeacher);
    PrevclassTeacherAdd.ClassTeacher = "";
    await PrevclassTeacherAdd.save();

    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
