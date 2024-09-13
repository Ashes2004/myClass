import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  examName: {
    type: String,
    required: true,
  },
  marks: [
    {
      subject: {
        type: String,
      },
      TotalMarks: {
        type: Number,
      },
      obtainMarks: {
        type: Number,
      },
    },
  ],
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    reuired: true,
  },
  visibility: {
    type: Boolean,
    default: false,
  },
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
