"use client";

import PerformaceAnalysisBody from "@/components/PerformaceAnalysis/PerformaceAnalysisBody";
import AttendanceBody from "@/components/Attendance/attendanceBody";
// import AttendanceBody from "@/components/Attendance/Backendtesting/attendenceBody";
import LeaderBoardBody from "@/components/Leaderboard/leaderBoardBody";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import AttendanceChart from "@/components/Administrator/Attendence/StudentAttendence";
import ClassForm from "@/components/Administrator/ClassMaker";
import StudentEnrollRequest from "@/components/Student/Enrollment/StudentEnrollRequest";
import StudentEnrollmentManagement from "@/components/Administrator/Enrollment/StudentEnrollment";
const slugTitleMap = {
  attendance: "Attendance",
  leaderboard: "Leaderboard",
  performance: "Performace",
  studentattendance: "Student Attendance",
  classmaker : "Class Form",
  studentEnrollRequest : "Student Enroll Form",
  studentEnrollment: "Student Enrollment"
};
export default function Page({ params }) {
  const { type, slug } = params;
  useEffect(() => {
    if (slug in slugTitleMap) {
      document.title = `${slugTitleMap[slug]} || MyClass`;
    } else {
      document.title = "Page Not Found || MyClass";
    }
  }, [slug]);

  switch (slug) {
    case "attendance":
      return type === "teacher" ? <AttendanceBody /> : notFound();
    case "leaderboard":
      return type === "student" ? <LeaderBoardBody /> : notFound();
    case "performance":
      return type === "student" ? <PerformaceAnalysisBody /> : notFound();
    case "studentEnrollRequest":
      return type === "student" ? <StudentEnrollRequest /> : notFound();  
    case "studentattendance":
        return type === "admin" ? <AttendanceChart /> : notFound();  
    case "classmaker":
          return type === "admin" ? <ClassForm /> : notFound(); 
    case "studentEnrollment":
      return type === "admin" ? <StudentEnrollmentManagement /> : notFound();             
    default:
      return notFound();
  }
}
