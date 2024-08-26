import Teacher from "../models/TeacherModel.js";

export const getTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based in JavaScript

    const yearMonthPrefix = `${currentYear}${currentMonth}`;

    // Find the highest serial number for the current year and month
    const latestTeacher = await Teacher.findOne({ teacherId: { $regex: `^${yearMonthPrefix}` } })
      .sort({ teacherId: -1 })
      .limit(1);

    let serialNumber = 1;
    if (latestTeacher) {
      const latestSerial = parseInt(latestTeacher.teacherId.slice(-2));
      serialNumber = latestSerial + 1;
    }

    // Format serial number with leading zeros if necessary
    const serialNumberStr = serialNumber.toString().padStart(2, '0');
    const teacherId = `${yearMonthPrefix}${serialNumberStr}`;
    console.log(teacherId);
    // Create new teacher with generated teacherId
    const teacherData = { ...req.body, teacherId };
    const teacher = new Teacher(teacherData);

    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
