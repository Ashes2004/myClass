
import {
  alarm,
  attendance,
  book,
  chatbot,
  chem,
  classes,
  eng,
  home,
  marks,
  materials,
  maths,
  notes,
  attendace_logo,
  exam,
  teachers,
  course,
  budget,
  parent_teacher,
  staff,
  student,
  approval,
  document,
  leaderboard,
  library
} from "@/public/Icons";

export const studentSidebarLinks = [
  {
    id: 0,
    label: "Home",
    icon: home,
    link: "/student",
  },
  {
    id: 1,
    label: "Assignments",
    icon: notes,
    link: "/",
  },
  {
    id: 2,
    label: "Subject Materials",
    icon: notes,
    link: "/",
  },
  {
    id: 3,
    label: "Schedule",
    icon: book,
    link: "/",
  },
  {
    id: 4,
    label: "EduBot",
    icon: chatbot,
    link: "/",
  },
  {
    id: 5,
    label: "E-library",
    icon: library,
    link: "/library",
  },
  {
    id: 6,
    label: "Progress",
    icon: attendance,
    link: "/",
  },
  {
    id:8,
    label:"Leaderboard",
    icon: leaderboard,
    link:"/student/leaderboard"
  },
  {
    id: 7,
    label: "Raise Alarm",
    icon: alarm,
    link: "/",
  },
];


export const teacherSidebarLinks = [
  {
    id: 0,
    label: "Home",
    icon: home,
    link: "/teacher",
  },
  {
    id: 1,
    label: "Classes",
    icon: classes,
    link: "/",
  },
  {
    id: 2,
    label: "Attendance",
    icon: attendace_logo,
    link: "/teacher/attendance",
  },
  {
    id: 3,
    label: "Classes",
    icon: classes,
    link: "/",
  },
  {
    id: 4,
    label: "Classes",
    icon: classes,
    link: "/",
  },
];

export const adminSidebarLinks = [
  {
    id: 0,
    label: "Home",
    icon: home,
    link: "/administrator",
  },
  {
    id: 1,
    label: "Data Reports",
    icon: attendance,
    link: "/",
  },
  {
    id: 2,
    label: "Schedule",
    icon: book,
    link: "/",
  },
  {
    id: 3,
    label: "Management",
    icon: staff,
    link: "/",
  },
  {
    id: 4,
    label: "Tasks",
    icon: approval,
    link: "/",
  },
];

// STUDENT DATA MAPPINGS
export const studentSubject = [
  {
    id: 0,
    icon: materials,
    sub: "English",
    type: "Language",
    link: "/",
    bg: "bg-orange-400",
  },
  {
    id: 1,
    icon: materials,
    sub: "Mathametics",
    type: "Practical",
    link: "/",
    bg: "bg-green-400",
  },
  {
    id: 2,
    icon: materials,
    sub: "Physics",
    type: "Science",
    link: "/",
    bg: "bg-purple-400",
  },
  {
    id: 0,
    icon: materials,
    sub: "Chemistry",
    type: "Science",
    link: "/",
    bg: "bg-blue-400",
  },
  {
    id: 0,
    icon: materials,
    sub: "GK",
    type: "Language",
    link: "/",
    bg: "bg-red-400",
  },
];

export const studentSchedule = [
  {
    id: 0,
    subject: "Physics",
    teacher: "Name1",
    duration: 40,
    icon: book,
    bg: "bg-green-400",
  },
  {
    id: 1,
    subject: "English",
    teacher: "Name2",
    duration: 40,
    icon: book,
    bg: "bg-blue-400",
  },
  {
    id: 2,
    subject: "Maths",
    teacher: "Name3",
    duration: 40,
    icon: book,
    bg: "bg-orange-400",
  },
  {
    id: 3,
    subject: "Chemistry",
    teacher: "Name4",
    duration: 40,
    icon: book,
    bg: "bg-purple-400",
  },
  {
    id: 4,
    subject: "Biology",
    teacher: "Name5",
    duration: 40,
    icon: book,
    bg: "bg-green-400",
  },
];

export const studentProgress = [
  {
    id: 0,
    progress: "Attendance",
    icon: attendance,
    link: "/",
    bg: "bg-purple-300",
  },
  {
    id: 1,
    progress: "Marks",
    icon: marks,
    link: "/",
    bg: "bg-green-300",
  },
  {
    id: 2,
    progress: "Marks",
    icon: marks,
    link: "/",
    bg: "bg-orange-300",
  },
];

export const studentAssignments = [
  {
    id: 0,
    task: "English Project Submission",
    due: "01.09.24",
    time: "11.59 PM",
    icon: eng,
    status: "done",
    statusDesc: "completed",
    bg: "bg-orange-300",
  },
  {
    id: 1,
    task: "Chemistry Project Submission",
    due: "02.09.24",
    time: "11.59 PM",
    icon: chem,
    status: "progress",
    statusDesc: "in progress",
    bg: "bg-blue-300",
  },
  {
    id: 2,
    task: "Maths Project Submission",
    due: "01.09.24",
    time: "11.59 PM",
    icon: maths,
    status: "not done",
    statusDesc: "not done",
    bg: "bg-purple-300",
  },
];

// TEACHER DATA MAPPINGS
export const adminSubjectManagement = [
  {
    id: 0,
    icon: course, // Placeholder for an appropriate icon related to management
    sub: "Add New Course",
    type: "Administrative",
    link: "/",
    bg: "bg-blue-400",
  },
  {
    id: 1,
    icon: teachers, // Placeholder for an appropriate icon related to management
    sub: "Manage Teachers",
    type: "Administrative",
    link: "/",
    bg: "bg-green-400",
  },
  {
    id: 2,
    icon: notes, // Placeholder for an appropriate icon related to management
    sub: "Review Curriculum",
    type: "Administrative",
    link: "/",
    bg: "bg-purple-400",
  },
  {
    id: 3,
    icon: classes, // Placeholder for an appropriate icon related to management
    sub: "Allocate Classes",
    type: "Administrative",
    link: "/",
    bg: "bg-orange-400",
  },
  {
    id: 4,
    icon: exam, // Placeholder for an appropriate icon related to management
    sub: "Schedule Exams",
    type: "Administrative",
    link: "/",
    bg: "bg-red-400",
  },
];

export const adminSchedule = [
  {
    id: 0,
    subject: "Staff Meeting",
    organizer: "Principal",
    duration: 60,
    icon: staff, // Placeholder for a calendar or meeting icon
    bg: "bg-green-400",
  },
  {
    id: 1,
    subject: "Parent-Teacher Meeting",
    organizer: "Admin Team",
    duration: 90,
    icon: parent_teacher, // Placeholder for a calendar or meeting icon
    bg: "bg-blue-400",
  },
  {
    id: 2,
    subject: "Curriculum Review",
    organizer: "Head of Departments",
    duration: 120,
    icon: notes, // Placeholder for a calendar or review icon
    bg: "bg-orange-400",
  },
  {
    id: 3,
    subject: "Examination Planning",
    organizer: "Exams Committee",
    duration: 180,
    icon: exam, // Placeholder for a planning icon
    bg: "bg-purple-400",
  },
  {
    id: 4,
    subject: "Budget Review",
    organizer: "Finance Team",
    duration: 60,
    icon: budget, // Placeholder for a finance icon
    bg: "bg-red-400",
  },
];

export const adminProgressTracking = [
  {
    id: 0,
    progress: "Teacher Performance",
    icon: staff, // Placeholder for a performance icon
    link: "/",
    bg: "bg-purple-300",
  },
  {
    id: 1,
    progress: "Student Enrollment",
    icon: student, // Placeholder for an enrollment icon
    link: "/",
    bg: "bg-green-300",
  },
  {
    id: 2,
    progress: "Budget Utilization",
    icon: budget, // Placeholder for a budget icon
    link: "/",
    bg: "bg-orange-300",
  },
];

export const adminTasks = [
  {
    id: 0,
    task: "Finalize Annual Report",
    due: "01.09.24",
    time: "05:00 PM",
    icon: document, // Placeholder for a document or report icon
    status: "in progress",
    statusDesc: "in progress",
    bg: "bg-blue-300",
  },
  {
    id: 1,
    task: "Approve New Teachers",
    due: "02.09.24",
    time: "03:00 PM",
    icon: approval, // Placeholder for a teacher or approval icon
    status: "pending",
    statusDesc: "pending approval",
    bg: "bg-green-300",
  },
  {
    id: 2,
    task: "Budget Allocation",
    due: "01.09.24",
    time: "11:59 PM",
    icon: budget, // Placeholder for a budget or finance icon
    status: "completed",
    statusDesc: "completed",
    bg: "bg-purple-300",
  },
];

export const adminDataReview = [
  {
    id: 0,
    data: "Student Attendance",
    icon: student,
    bg: "bg-green-300",
  },
  {
    id: 1,
    data: "Teacher Attendance",
    icon: teachers,
    bg: "bg-blue-300",
  },
  {
    id: 2,
    data: "Student Performance",
    icon: attendance,
    bg: "bg-purple-300",
  },
];
