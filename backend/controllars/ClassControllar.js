import Class from "../models/ClassModel.js";
import Student from "../models/StudentModel.js";
import Teacher from "../models/TeacherModel.js";
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("students");
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).populate("students").populate("allocatedTeachers");
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassByClassId = async (req, res) => {
  try {
    const classItem = await Class.findOne({classId : req.params.id}).populate("students").populate("allocatedTeachers");
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
   

    await classItem.save();
    res.status(201).json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!classItem) return res.status(404).json({ message: "Class not found" });

    // Update students' classId to the new classId
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

    res.json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });

    // Optionally, remove the classId from students
    await Student.updateMany(
      { classId: classItem._id },
      { $set: { classId: null } } // or use $unset to remove the field
    );

  

    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
