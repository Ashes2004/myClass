import mongoose from "mongoose";


const studentEnrollmentSchema = new mongoose.Schema({
 Student:{
  type: String,
  required: true
 },
 Password:{
  type: String,
  required: true
 },
 ClassName: {
   type: String,
   required: true

 }


});

const StudentEnrollment = mongoose.model("StudentEnrollment", studentEnrollmentSchema);

export default StudentEnrollment;
