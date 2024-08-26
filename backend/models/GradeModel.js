import mongoose from "mongoose";

// Schema for the exam object
const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The name of the exam, e.g., "Midterm", "Final Exam"
  },
  fullMarks: {
    type: Number,
    required: true, // The full marks for the exam
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true, // Reference to the teacher who conducted the exam
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true, // Reference to the class for which the exam was conducted
  },
  date: {
    type: Date,
    required: true, // Date when the exam was conducted
  },
});

// Schema for the grade object
const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true, // Reference to the student who took the exam
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true, // Reference to the exam
  },
  marksObtained: {
    type: Number,
    required: true, // Marks obtained by the student in the exam
  },
  grade: {
    type: String,
    required: true, // Grade awarded based on the marks obtained
  },
  term: {
    type: String,
    required: true, // Term or session in which the exam was conducted, e.g., "Spring 2024"
  },
});

// Schema to hold an array of exams
const examsSchema = new mongoose.Schema({
  exams: [examSchema],
});

// Schema to hold an array of grades
const gradesSchema = new mongoose.Schema({
  grades: [gradeSchema],
});

// Models
const Exams = mongoose.model("Exams", examsSchema);
const Grades = mongoose.model("Grades", gradesSchema);

export { Exams, Grades };
