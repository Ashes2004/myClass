"use client";

import { useEffect } from "react";

import StudentBody from "@/components/Student/studentBody";
import TeacherBody from "@/components/Teacher/teacher";
import AdminitratorBody from "@/components/Administrator/adminitrator";
import DigitalLibrary from "@/components/structComponents/DigitalLibrary";
import { notFound } from "next/navigation";


const pageTitleMap = {
  student: "Student",
  teacher: "Teacher",
  administrator: "Admin",
  library: "Digital Library",
};

export default function Page({ params }) {
  const type = params.type;
  console.log(type);
  useEffect(() => {
    if (type in pageTitleMap) {
      document.title = `${pageTitleMap[type]} || MyClass`;
    } else {
      document.title = "Page Not Found || MyClass";
    }
  }, [type]);

  switch (type) {
    case "student":
      return <StudentBody /> || notFound();
    case "teacher":
      return <TeacherBody /> || notFound();
    case "administrator":
      return <AdminitratorBody /> || notFound();
    case "library":
      return <DigitalLibrary /> || notFound();
    default:
      return notFound();
  }
}
