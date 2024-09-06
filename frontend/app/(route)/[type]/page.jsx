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

import AssignmentPage from "@/components/Pages/AssignmentPage";

import AdminDataReportPage from "@/components/Pages/DataReports";
import AdminSubjectManagementPage from "@/components/Pages/ManagementOptions";
import TaskManagement from "@/components/Pages/TaskPage";

import Inventory from "@/components/structComponents/Inventory";
import StationaryOrderPage from "@/components/Pages/StationaryOrderPage";
import InventoryOrderPage from "@/components/Pages/InventoryOrderPage";

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
  assignments: "Assignments",
  dataReports: "Data Reports",
  managementOptions: "Management Options",
  tasks: "Manage Tasks",
  inventory: "School Inventory",
  "stationary-order": "Stationary Order Form",
  "inventory-order": "Inventory Order Form",
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
    case "assignments":
      return <AssignmentPage /> || notFound();
    case "studentRegistration":
      return <EnrollmentForm /> || notFound();
    case "notice":
      return <NoticeBoard /> || notFound();

    case "teacherEnrollment":
      return <TeacherEnrollmentForm /> || notFound();
    case "dataReports":
      return <AdminDataReportPage /> || notFound();
    case "managementOptions":
      return <AdminSubjectManagementPage /> || notFound();
    case "tasks":
      return <TaskManagement /> || notFound();
    case "inventory":
      return <Inventory /> || notFound();
    case "stationary-order":
      return <StationaryOrderPage /> || notFound();
    case "inventory-order":
      return <InventoryOrderPage /> || notFound();
    default:
      return notFound();
  }
}
