"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";

import StudentBody from "@/components/Student/studentBody";
import TeacherBody from "@/components/Teacher/teacher";
import AdminitratorBody from "@/components/Administrator/adminitrator";
import DigitalLibrary from "@/components/structComponents/DigitalLibrary";

import AddClassRoutineForm from "@/components/Administrator/RoutineManagement/AddClassRoutineForm";

import EnrollmentForm from "@/components/Student/StudentRegistrationForm";
import TeacherEnrollmentForm from "@/components/Teacher/TeacherEnrollmentForm";
import StudentProfilePage from "@/components/Pages/StudentProfilePage";
import TeacherProfilePage from "@/components/Pages/TeacherProfilePage";
import AdminProfilePage from "@/components/Pages/AdminProfilePage";
import Timetable from "@/components/Pages/Timetable";
import SubjectMaterials from "@/components/Pages/SubjectMaterial";
import NoticeBoard from "@/components/Pages/NoticeBoard";

const pageTitleMap = {
  student: "Student",
  teacher: "Teacher",
  administrator: "Admin",
  library: "Digital Library",
  classroutineform: "Class Routine Form",
  studentRegistration: "Student Enrollment",
  teacherEnrollment: "Teacher Enrollment",
  studentProfile: "My Profile",
  teacherProfile: "My Profile",
  adminProfile: "My Profile",
  timetable: "Class Routine",
  subjectMaterial: "Subject Materials",
  notice: "Notice Board",
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
    case "studentProfile":
      return <StudentProfilePage /> || notFound();
    case "subjectMaterial":
      return <SubjectMaterials /> || notFound();
    case "teacherProfile":
      return <TeacherProfilePage /> || notFound();
    case "adminProfile":
      return <AdminProfilePage /> || notFound();
    case "library":
      return <DigitalLibrary /> || notFound();
    case "classroutineform":
      return <AddClassRoutineForm /> || notFound();
    case "timetable":
      return <Timetable /> || notFound();

    case "studentRegistration":
      return <EnrollmentForm /> || notFound();
    case "notice":
      return <NoticeBoard /> || notFound();

    
    case "teacherEnrollment":
      return <TeacherEnrollmentForm /> || notFound();
    default:
      return notFound();
  }
}
