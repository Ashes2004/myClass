import mongoose from "mongoose";

// Schema for the class period object
const classPeriodSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher", // Reference to the Teacher model
  },
  roomNumber: {
    type: String,
    required: true,
  },
  startPeriod: {
    type: String,
    required: true,
  },
  endPeriod: {
    type: String,
    required: true,
    
  },
});

const teacherDailyRoutineSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  periods: [classPeriodSchema],
});

const teacherRoutineSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher", // Reference to the Teacher model
  },
  routine: [teacherDailyRoutineSchema],
});

const classDailyRoutineSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  periods: [classPeriodSchema],
});

const classRoutineSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Class", // Reference to the Class model
  },
  routine: [classDailyRoutineSchema],
});

const ClassRoutine = mongoose.model("ClassRoutine", classRoutineSchema);
const TeacherRoutine = mongoose.model("TeacherRoutine", teacherRoutineSchema);
export { ClassRoutine, TeacherRoutine };
