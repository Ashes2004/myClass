"use client";

import PerformaceAnalysisBody from "@/components/PerformaceAnalysis/PerformaceAnalysisBody";
import AttendanceBody from "@/components/Attendance/attendanceBody";
// import AttendanceBody from "@/components/Attendance/Backendtesting/attendenceBody";
import LeaderBoardBody from "@/components/Leaderboard/leaderBoardBody";
import { notFound } from "next/navigation";
import { useEffect } from "react";
const slugTitleMap = {
  attendance: "Attendance",
  leaderboard: "Leaderboard",
  performance: "Performace",
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
    default:
      return notFound();
  }
}
