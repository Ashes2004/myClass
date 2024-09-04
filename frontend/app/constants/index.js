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
  library,
  quiz,
  computer,
  physics,
  bookfair,
  feedback,
  inventory,
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
    link: "/assignments",
  },
  {
    id: 2,
    label: "Subject Materials",
    icon: materials,
    link: "/subjectMaterial",
  },
  {
    id: 3,
    label: "Schedule",
    icon: book,
    link: "/timetable",
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
    id: 8,
    label: "Leaderboard",
    icon: leaderboard,
    link: "/student/leaderboard",
  },
  {
    id: 9,
    label: "Quiz",
    icon: quiz,
    link: "/student/studentQuiz",
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
    label: "Quiz",
    icon: quiz,
    link: "/teacher/teacherQuiz",
  },
  {
    id: 4,
    label: "Meeting",
    icon: classes,
    link: "/teacher/meeting",
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
    link: "/dataReports",
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
    link: "/managementOptions",
  },
  {
    id: 4,
    label: "Tasks",
    icon: approval,
    link: "/tasks",
  },
  {
    id: 5,
    label: "Inventory",
    icon: inventory,
    link: "/inventory",
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
    id: 3,
    icon: materials,
    sub: "Chemistry",
    type: "Science",
    link: "/",
    bg: "bg-blue-400",
  },
  {
    id: 4,
    icon: materials,
    sub: "Computer",
    type: "Practical",
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
    link: "/timetable",
  },
  {
    id: 1,
    subject: "English",
    teacher: "Name2",
    duration: 40,
    icon: book,
    bg: "bg-blue-400",
    link: "/timetable",
  },
  {
    id: 2,
    subject: "Maths",
    teacher: "Name3",
    duration: 40,
    icon: book,
    bg: "bg-orange-400",
    link: "/timetable",
  },
  {
    id: 3,
    subject: "Chemistry",
    teacher: "Name4",
    duration: 40,
    icon: book,
    bg: "bg-purple-400",
    link: "/timetable",
  },
  {
    id: 4,
    subject: "Biology",
    teacher: "Name5",
    duration: 40,
    icon: book,
    bg: "bg-green-400",
    link: "/timetable",
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
    link: "/",
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
    link: "/",
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
    link: "/",
  },
  {
    id: 4,
    task: "Physics Lab Report",
    due: "05.09.24",
    time: "01:00 PM",
    icon: physics,
    status: "progress",
    statusDesc: "In Progress",
    bg: "bg-green-300",
    link: "/",
  },
  {
    id: 5,
    task: "Biology Presentation",
    due: "06.09.24",
    time: "10:00 AM",
    icon: chem,
    status: "not done",
    statusDesc: "Not Done",
    bg: "bg-pink-300",
    link: "/",
  },
  {
    id: 6,
    task: "Computer Science Assignment",
    due: "07.09.24",
    time: "11:59 PM",
    icon: computer,
    status: "done",
    statusDesc: "Completed",
    bg: "bg-red-300",
    link: "/",
  },
];

export const notices = [
  {
    id: 1,
    title: "Holiday Notice",
    date: "25.08.24",
    description:
      "School will remain closed on Monday due to the public holiday.",
    link: "/notice",
  },
  {
    id: 2,
    title: "PTA Meeting",
    date: "28.08.24",
    description:
      "Parents-Teachers Association meeting will be held at 10:00 AM in the auditorium.",
    link: "/notice",
  },
  {
    id: 3,
    title: "Science Fair",
    date: "10.09.24",
    description:
      "The annual science fair will take place in the school gymnasium. All students are encouraged to participate.",
    link: "/notice",
  },
  {
    id: 4,
    title: "Project Work",
    date: "19.09.24",
    description:
      "Project Work starts in school. Timetable will be provided in due time.",
    link: "/notice",
  },
  {
    id: 5,
    title: "School Holiday",
    date: "02.10.24",
    description: "School will remain closed due to the Gandhi Jayanti.",
    link: "/notice",
  },
  {
    id: 6,
    title: "Sports Day",
    date: "15.10.24",
    description:
      "Annual Sports Day will be held on the school grounds. All students must wear sports uniforms.",
    link: "/notice",
  },
  {
    id: 7,
    title: "Midterm Exams",
    date: "20.11.24",
    description:
      "Midterm exams will start from 20th November. Students are advised to prepare accordingly.",
    link: "/notice",
  },
  {
    id: 8,
    title: "Winter Vacation",
    date: "23.12.24",
    description:
      "The school will remain closed from 23rd December for winter vacation and will reopen on 3rd January.",
    link: "/notice",
  },
];

// TEACHER DATA MAPPINGS
export const adminSubjectManagement = [
  {
    id: 0,
    icon: classes, // Placeholder for an appropriate icon related to management
    sub: "Add New Course",
    type: "Administrative",
    link: "/admin/classmaker",
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
    icon: approval, // Placeholder for an appropriate icon related to management
    sub: "Enroll Students into course",
    type: "Administrative",
    link: "/admin/studentEnrollment",
    bg: "bg-orange-400",
  },
  {
    id: 3,
    icon: notes, // Placeholder for an appropriate icon related to management
    sub: "Review Curriculum",
    type: "Administrative",
    link: "/",
    bg: "bg-purple-400",
  },
  {
    id: 4,
    icon: exam, // Placeholder for an appropriate icon related to management
    sub: "Schedule Exams",
    type: "Administrative",
    link: "/",
    bg: "bg-red-400",
  },
  {
    id: 5,
    icon: alarm, // Placeholder for an appropriate icon related to management
    sub: "Notices",
    type: "Administrative",
    link: "/",
    bg: "bg-yellow-400",
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
    link: "/",
  },
  {
    id: 1,
    task: "Register New Teachers",
    due: "02.09.24",
    time: "03:00 PM",
    icon: approval, 
    status: "pending",
    statusDesc: "pending approval",
    bg: "bg-green-300",
    link: "/teacherEnrollment",
  },
  {
    id: 2,
    task: "Register New Students",
    due: "02.09.24",
    time: "03:00 PM",
    icon: teachers,
    status: "pending",
    statusDesc: "pending approval",
    bg: "bg-yellow-300",
    link: "/studentRegistration",
  },
  // {
  //   id: 3,
  //   task: "Budget Allocation",
  //   due: "01.09.24",
  //   time: "11:59 PM",
  //   icon: budget, // Placeholder for a budget or finance icon
  //   status: "completed",
  //   statusDesc: "completed",
  //   bg: "bg-purple-300",
  //   link: "/",
  // },
];

export const adminDataReview = [
  {
    id: 0,
    data: "Student Attendance",
    icon: student,
    bg: "bg-green-300",
    link: "/admin/studentattendance",
  },
  {
    id: 1,
    data: "Teacher Attendance",
    icon: teachers,
    bg: "bg-blue-300",
    link: "/",
  },
  {
    id: 2,
    data: "Student Performance",
    icon: attendance,
    bg: "bg-purple-300",
    link: "/",
  },
  {
    id: 3,
    data: "Classroom Management",
    icon: classes,
    bg: "bg-yellow-300",
    link: "/",
  },
  {
    id: 4,
    data: "School Events",
    icon: bookfair,
    bg: "bg-red-300",
    link: "/",
  },
  {
    id: 5,
    data: "Finance Reports",
    icon: budget,
    bg: "bg-orange-300",
    link: "/",
  },
  {
    id: 6,
    data: "Parent Feedback",
    icon: feedback,
    bg: "bg-pink-300",
    link: "/",
  },

  {
    id: 7,
    data: "Student & Teacher Details",
    icon: parent_teacher,
    bg: "bg-purple-300",
    link: "/admin/studentteacherdetails",
  },
];
