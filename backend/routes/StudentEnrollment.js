import StudentEnrollment from "../models/StudentEnrollmentModel.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {

    try{
        let studentenrollments = await StudentEnrollment.find()
        .populate({
          path: 'Student',
          select: 'studentName _id', // specify fields to include
        });
              
        	res.status(200).json({studentenrollments});
    }catch(error)
    {
        res.status(500).json({ message: error.message });
        console.log("Error in fetching student enrollments", error);
    }    
})

router.post("/", async (req, res) => {

    try{
        let studentenrollments = new StudentEnrollment(req.body); 	
           await studentenrollments.save();	
        	res.status(200).json({studentenrollments});
    }catch(error)
    {
        res.status(500).json({ message: error.message });
        console.log("Error in fetching student enrollments", error);
    }    
})

router.delete("/:id", async (req, res) => {

    try{
        let studentenrollments = await StudentEnrollment.findByIdAndDelete(req.params.id); 	
        if (!studentenrollments) return res.status(404).json({ message: "studentenrollments not found" });
        	res.status(200).json({message: " studentenrollments Deleted successfully"});
    }catch(error)
    {
        res.status(500).json({ message: error.message });
        console.log("Error in fetching student enrollments", error);
    }    
})

export default router;