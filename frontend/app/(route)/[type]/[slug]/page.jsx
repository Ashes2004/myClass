"use client";

import PerformaceAnalysisBody from "@/components/PerformaceAnalysis/PerformaceAnalysisBody";

// import AttendanceBody from "@/components/Attendance/Backendtesting/attendenceBody";
import LeaderBoardBody from "@/components/Leaderboard/leaderBoardBody";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import AttendanceChart from "@/components/Administrator/Attendence/StudentAttendence";
import ClassForm from "@/components/Administrator/ClassMaker";
import StudentEnrollRequest from "@/components/Student/Enrollment/StudentEnrollRequest";
import StudentEnrollmentManagement from "@/components/Administrator/Enrollment/StudentEnrollment";
import StudentLoginForm from "@/components/Student/studentLogin";
import QuizBody from "@/components/QuizStudent/QuizBody";
import TeacherQuizBody from "@/components/QuizTeacher/TeacherQuizBody";
import TeacherLogin from "@/components/Teacher/teacherLogin";
import StudentTeacherDetails from "@/components/Pages/StudentTeacherDetails";
import Edubot from "@/components/Pages/Edubot";
import AdminAuth from "@/components/Administrator/adminAuth";
import AssignmentMarksSubmission from "@/components/Pages/AssignmentMarksSubmission";
import MeetingsPage from "@/components/Pages/MeetingsPage";
import StudentMeetingsPage from "@/components/Pages/StudentMeetingPage";
import RoomManagement from "@/components/Pages/RoomManagement";
import AttendanceBody from "@/components/Attendance/Backendtesting/attendenceBody";

const slugTitleMap = {
  attendance: "Attendance",
  leaderboard: "Leaderboard",
  performance: "Performace",
  studentattendance: "Student Attendance",
  classmaker: "Class Form",
  studentEnrollRequest: "Student Enroll Form",
  studentEnrollment: "Student Enrollment",
  studentLogin: "Student Login",
  teacherLogin: "Teacher Login",
  teacherQuiz: "Quiz",
  studentQuiz: "Quiz",
  studentteacherdetails: "Student and Teacher Details",
  edubot: "Edubot",
  adminAuth: "Admin Auth",
  assignmentMarks: "Assignments",
  meeting: "Meeting",
  studentmeeting: "Meeting",
  rooms: "Rooms"
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
    case "studentLogin":
      return type === "student" ? <StudentLoginForm /> : notFound();
    case "leaderboard":
      return type === "student" ? <LeaderBoardBody /> : notFound();
    case "performance":
      return type === "student" ? <PerformaceAnalysisBody /> : notFound();
    case "studentEnrollRequest":
      return type === "student" ? <StudentEnrollRequest /> : notFound();
    case "edubot":
      return type === "student" ? <Edubot /> : notFound();
    case "studentQuiz":
      return type === "student" ? <QuizBody /> : notFound();
    case "studentattendance":
      return type === "admin" ? <AttendanceChart /> : notFound();
    case "classmaker":
      return type === "admin" ? <ClassForm /> : notFound();
    case "studentEnrollment":
      return type === "admin" ? <StudentEnrollmentManagement /> : notFound();
    case "studentteacherdetails":
      return type === "admin" ? <StudentTeacherDetails /> : notFound();
    case "adminAuth":
      return type === "admin" ? <AdminAuth /> : notFound();
    case "rooms":
      return type === "admin" ? <RoomManagement /> : notFound();
    case "teacherQuiz":
      return type === "teacher" ? <TeacherQuizBody /> : notFound();
    case "teacherLogin":
      return type === "teacher" ? <TeacherLogin /> : notFound();
    case "assignmentMarks":
      return type === "teacher" ? <AssignmentMarksSubmission /> : notFound();
    case "meeting":
      return type === "teacher" ? <MeetingsPage /> : notFound();
    case "studentmeeting":
      return type === "student" ? <StudentMeetingsPage /> : notFound();
    default:
      return notFound();
  }
}
