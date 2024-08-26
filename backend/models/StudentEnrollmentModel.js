import mongoose from "mongoose";


const studentEnrollmentSchema = new mongoose.Schema({
 Student:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
 },
 ClassName: {
   type: String,
   required: true

 }


});

const StudentEnrollment = mongoose.model("StudentEnrollment", studentEnrollmentSchema);

export default StudentEnrollment;
