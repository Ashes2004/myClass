import mongoose from "mongoose";

// Teacher schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
 
  password: {
    type: String,
    required: true
  },
  teacherId: {
    type: String,
    unique: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
  },
  allocatedClasses:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  }
  ],
  TeacherRoutine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherRoutine",
  },
  quizzesCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  examsConducted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams",
    },
  ],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
