"use client";

import PerformaceAnalysisBody from "@/components/PerformaceAnalysis/PerformaceAnalysisBody";
import AttendanceBody from "@/components/Attendance/Backendtesting/attendenceBody";
import LeaderBoardBody from "@/components/Leaderboard/leaderBoardBody";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import QuizHome from "@/components/QuizStudent/QuizHome";
import QuizResponses from "@/components/QuizTeacher/QuizResonses";
import StudentGradeCard from "@/components/Pages/StudentGradeCard";

const slugTitleMap = {
  attendance: "Attendance",
  leaderboard: "Leaderboard",
  performance: "Performance",
  studentQuiz: "Student Quiz",
  quizresonse: "Quiz Responses",
  gradecard: "Grade Card",
};

export default function Page({ params }) {
  const { type, slug, id } = params;

  useEffect(() => {
    if (slug in slugTitleMap) {
      document.title = `${slugTitleMap[slug]} || MyClass`;
    } else {
      document.title = "MyClass";
    }
  }, [slug]);

  switch (slug) {
    case "attendance":
      return type === "teacher" ? <AttendanceBody Id={id} /> : notFound();
    case "leaderboard":
      return type === "student" ? <LeaderBoardBody Id={id} /> : notFound();
    case "performance":
      return type === "student" ? (
        <PerformaceAnalysisBody Id={id} />
      ) : (
        notFound()
      );
    case "gradecard":
      return type === "student" ? <StudentGradeCard id={id} /> : notFound();
    case "studentQuiz":
      return type === "student" ? <QuizHome Id={id} /> : notFound();
    case "quizresponse":
      return type === "teacher" ? <QuizResponses quizId={id} /> : notFound();
    default:
      return notFound();
  }
}
