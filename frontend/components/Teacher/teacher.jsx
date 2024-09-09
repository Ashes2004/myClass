import React, { useState, useEffect } from "react";
import TeacherLayout from "./teacherLayout";
import Link from "next/link";
import Image from "next/image";
import { sampleProfile } from "@/public/Images";
import {
  book_outline,
  calendar_outline,
  rightArrow,
} from "@/public/Icons/index";
import { CalendarDemo } from "../structComponents/CalendarDemo";
import { useRouter } from "next/navigation";
import SearchBar from "../structComponents/SearchBar";
import { notices } from "@/app/constants";

const TeacherBody = () => {
  const [userTeacher, setUserTeacher] = useState({ name: "Dr. Subhamita" });
  const [courses, setCourses] = useState([
    {
      subject: "AI",
      image: "Image",
      noOfUnits: 12,
      department: "IT",
      type: "Practical",
      courseID: 1,
      bgColour: "bg-yellow-300 dark:bg-yellow-500",
    },
    {
      image: "Image",
      noOfUnits: 6,
      department: "CSCS",
      type: "Theory",
      subject: "DSA",
      courseID: 2,
      bgColour: "bg-blue-300 dark:bg-blue-500",
    },
    {
      image: "Image",
      noOfUnits: 5,
      department: "IT",
      type: "Theory",
      subject: "AI",
      courseID: 3,
      bgColour: "bg-green-300 dark:bg-green-500",
    },
  ]);
  const [dailySchedule, setDailySchedule] = useState([
    {
      subjectName: "AI",
      subjectCode: "PEC-IT501B",
      time: "12:20 PM",
      classType: "Offline Lecture",
      sem: "5th",
      lectureID: 1,
      department: "IT",
      section: "B",
      bgColour: "bg-red-300 dark:bg-red-500",
    },
    {
      subjectName: "AI",
      subjectCode: "PEC-IT501B",
      time: "9:50 AM",
      classType: "Offline Lecture",
      sem: "5th",
      lectureID: 3,
      department: "IT",
      section: "A",
      bgColour: "bg-green-300 dark:bg-green-500",
    },
    {
      subjectName: "DSA",
      subjectCode: "PCC-CS301",
      time: "2:00 PM",
      classType: "Offline Lecture",
      sem: "3rd",
      lectureID: 4,
      department: "CSCS",
      bgColour: "bg-purple-300 dark:bg-purple-500",
    },
  ]);

  const router = useRouter();
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("teacherToken");
    if (!token) {
      // Redirect to login if no token is present
      router.push("/teacher/teacherLogin");
    } else {
      // Fetch student data if token is present
      const fetchTeacherData = async () => {
        try {
          console.log("token: ", token);
          const response = await fetch(
            "http://localhost:5000/api/teachers/get/teacher",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            router.push("/teacher/teacherLogin");
            throw new Error("Failed to fetch student data");
          }

          const data = await response.json();
          setTeacherData(data);
          sessionStorage.setItem("teacherID", data._id);
          sessionStorage.setItem(
            "classteacher",
            data?.ClassTeacher?.classId || null
          );
          console.log("teacherData: ", teacherData);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      fetchTeacherData();
    }
  }, [router]); // Depend on `router` to avoid using `token` directly (to prevent race conditions)

  if (!teacherData) {
    return <p>Loading...</p>; // Display a loading state while fetching data
  }

  return (
    <TeacherLayout>
      <div className="h-full border-transparent p-3 md:p-6 box-border text-black dark:text-light-gray border-r-2 md:grid grid-cols-6 gap-3 ">
        <div className="col-span-4 rounded-md md:p-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center rounded-md">
            <h1 className="text-xl md:text-3xl font-bold">
              Welcome back, {teacherData?.name || "subhomita"} 👋
            </h1>
            <div className="flex sm:flex-row justify-start gap-3 md:justify-center items-center mt-3 mb-3 md:mb-0">
              <SearchBar />
              <Link href="/teacherProfile" className="bg-white rounded-full">
                <Image
                  src={teacherData?.profilePhoto || sampleProfile}
                  alt="profile"
                  width={42}
                  height={42}
                  className="object-cover cursor-pointer rounded-full"
                />
              </Link>
            </div>
          </div>
          <div className="pt-3 md:pl-4 md:pr-6 pb-2 md:mt-2 flex justify-between p-4">
            <h3 className="font-bold text-md  md:text-lg tracking-wide">
              Class Materials
            </h3>
            <Link
              href="#"
              className="hover:underline decoration-solid underline-offset-4 cursor-pointer hover:text-green-500 duration-200"
            >
              View All
            </Link>
          </div>
          <div className="mt-1 md:grid grid-cols-3 gap-3 mx-3">
            {courses.map((course) => {
              return (
                <Link
                  href="#"
                  className="rounded-xl grid grid-rows-2 mb-3 bg-white dark:bg-dark-gray shadow-xl "
                  key={course.courseID}
                >
                  <div className="flex justify-around p-2 md:p-4 m-2 gap-3">
                    <div
                      className={`rounded-full flex justify-center items-center p-4 ${course.bgColour}`}
                    >
                      <Image src={book_outline} height={20} width={20}></Image>
                    </div>
                    <div className="flex flex-col">
                      <div className="md:font-semibold font-medium">
                        {course.subject}
                      </div>
                      <div className="dark:text-dim-gray">
                        {course.noOfUnits} Units
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-around md:p-4 m-2">
                    <div className="flex flex-col ">
                      <div>Dept.</div>
                      <div className="md:font-semibold font-medium">
                        {course.department}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div>Type</div>
                      <div className="md:font-semibold font-medium">
                        {course.type}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="bg-white dark:bg-dark-gray mt-6 md:mt-3 md:ml-3 md:mr-3 rounded-lg p-3 shadow-xl">
            <p className="font-semibold text-xl mb-3 ml-3 tracking-wider">
              Daily Schedule
            </p>
            <div className="flex flex-col gap-3">
              {dailySchedule.map((lecture) => {
                return (
                  <div
                    className="md:flex justify-between grid grid-rows-2 grid-cols-2 items-center md:bg-transparent rounded-md bg-gray-50"
                    key={lecture.lectureID}
                  >
                    <div className="md:flex items-center row-span-1 col-span-2 p-3 md:w-1/2">
                      <div
                        className={`${lecture.bgColour} md:rounded-full rounded-tl-md rounded-tr-md md:mr-3 p-3 flex items-center justify-center`}
                      >
                        <Image
                          src={calendar_outline}
                          alt="calender"
                          width={20}
                          height={20}
                          className="object-cover"
                        />
                      </div>
                      <div className="md:flex flex-col mt-2 ml-2 mr-2">
                        <div className="md:font-semibold font-medium md:text-md text-sm tracking-wide">
                          {lecture.subjectCode} {lecture.subjectName}
                        </div>
                        <div className="text-sm tracking-wider dark:text-dim-gray">
                          {lecture.classType} {lecture.department}
                          {lecture.section} {lecture.sem} Sem
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/4 md:mr-3 md:ml-3 mr-5 ml-5 flex flex-col col-span-1">
                      <div className="text-sm font-medium md:text-md md:font-semibold ">
                        Time
                      </div>
                      <div className="text-sm dark:text-dim-gray">
                        {lecture.time}
                      </div>
                    </div>
                    <div className="md:w-1/4 flex justify-end mr-3 ml-3">
                      <Link
                        href="#"
                        className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3"
                      >
                        <Image
                          src={rightArrow}
                          alt="arrow"
                          height={24}
                          width={24}
                          className="object-cover cursor-pointer"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-md">
          {/* Notice Board Section */}
          <div className="col-span-1 bg-white dark:bg-dark-gray shadow-xl rounded-xl p-4">
            <h2 className="font-bold text-lg text-center">Notice Board</h2>
            <div className="flex flex-col gap-1 text-base pt-2">
              {notices.map(
                (item, index) =>
                  index < 5 && (
                    <Link
                      href={`${item.link}`}
                      key={item.id}
                      className={`flex justify-between items-center mb-1 ${
                        index % 2 == 0
                          ? "bg-slate-300 hover:bg-slate-400 dark:bg-[#18A0FB] dark:hover:bg-[#5582e2]"
                          : "bg-slate-400 hover:bg-slate-500 dark:bg-[#1976D2] dark:hover:bg-[#6597f3]"
                      } rounded-lg px-2 py-3 duration-200`}
                    >
                      <h2 className="font-bold">{item.title}</h2>
                      <p className="font-semibold">{item.date}</p>
                    </Link>
                  )
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 drop-shadow-xl">
            <CalendarDemo />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherBody;
