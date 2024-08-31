import React, { useState } from "react";
import TeacherLayout from "./teacherLayout";
import Link from "next/link";
import Image from "next/image";
import {
  book_outline,
  calendar_outline,
  rightArrow,
} from "@/public/Icons/index";
import { CalendarDemo } from "../structComponents/CalendarDemo";

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
      bgColour: "bg-card-yellow",
    },
    {
      image: "Image",
      noOfUnits: 6,
      department: "CSCS",
      type: "Theory",
      subject: "DSA",
      courseID: 2,
      bgColour: "bg-custom-skin",
    },
    {
      image: "Image",
      noOfUnits: 5,
      department: "IT",
      type: "Theory",
      subject: "AI",
      courseID: 3,
      bgColour: "bg-card-mint",
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
      bgColour: "bg-card-orange",
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
      bgColour: "bg-card-gold",
    },
    {
      subjectName: "DSA",
      subjectCode: "PCC-CS301",
      time: "2:00 PM",
      classType: "Offline Lecture",
      sem: "3rd",
      lectureID: 4,
      department: "CSCS",
      bgColour: "bg-card-dark-blue",
    },
  ]);
  const [notices, setNotices] = useState([
    "MAKAUT Even Sem Results Published",
    "Holiday on Monday",
    "NBA Visit Notice",
    "CA2 Submission Date",
  ]);
  return (
    <TeacherLayout>
      <div className="h-full border-transparent p-3 md:p-6 box-border text-black border-r-2 md:grid grid-cols-6 gap-3 ">
        <div className="col-span-4 rounded-md md:p-3">
          <h1 className=" text-xl md:text-3xl md:h-12 pl-4 pt-3 font-bold md:font-bold md:tracking-wider">
            Welcome back {userTeacher.name}👋
          </h1>
          <div className="pt-3 md:pl-4 md:pr-6 pb-2 md:mt-2 flex justify-between p-4">
            <h3 className="font-bold text-md  md:text-lg tracking-wide">
              Class Materials
            </h3>
            <Link
              href="#"
              className="text-sm underline decoration-solid underline-offset-4"
            >
              View All
            </Link>
          </div>
          <div className="mt-1 md:grid grid-cols-3 gap-3 mx-3">
            {courses.map((course) => {
              return (
                <Link
                  href="#"
                  className="rounded-xl grid grid-rows-2 mb-3 bg-white shadow-xl "
                  key={course.courseID}
                >
                  <div className="flex justify-around p-2 md:p-4 m-2 gap-3">
                    <div
                      className={`rounded-full flex justify-center items-center p-4 ${course.bgColour}`}
                    >
                      <Image
                        src={book_outline}
                        height={20}
                        width={20}
                        alt="image"
                      ></Image>
                    </div>
                    <div className="flex flex-col">
                      <div className="md:font-semibold font-medium">
                        {course.subject}
                      </div>
                      <div>{course.noOfUnits} Units</div>
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
          <div className="bg-white mt-6 md:mt-3 md:ml-3 md:mr-3 rounded-lg p-3 shadow-xl">
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
                          width={20}
                          height={20}
                          alt="image"
                        />
                      </div>
                      <div className="md:flex flex-col mt-2 ml-2 mr-2">
                        <div className="md:font-semibold font-medium md:text-md text-sm tracking-wide">
                          {lecture.subjectCode} {lecture.subjectName}
                        </div>
                        <div className="text-sm tracking-wider">
                          {lecture.classType} {lecture.department}
                          {lecture.section} {lecture.sem} Sem
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/4 md:mr-3 md:ml-3 mr-5 ml-5 flex flex-col col-span-1">
                      <div className="text-sm font-medium md:text-md md:font-semibold ">
                        Time
                      </div>
                      <div className="text-sm">{lecture.time}</div>
                    </div>
                    <div className="md:w-1/4 flex justify-end mr-3 ml-3">
                      <Link
                        href="#"
                        className="md:bg-slate-200 bg-slate-300 p-2 rounded-lg"
                      >
                        <Image
                          src={rightArrow}
                          height={20}
                          width={20}
                          alt="image"
                        ></Image>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-md">
          <div className="md:m-3 md:mx-0 bg-white rounded-md mt-6 shadow-xl pb-2 md:pb-0">
            <div className="flex justify-between items-center bg-teacher-notice-board rounded-tl-md rounded-tr-md">
              <p className="p-3 md:font-semibold md:text-md text-sm font-medium">
                Notice Board
              </p>
              <Link
                href="#"
                className="mr-3 tracking-wider text-blue-800 bg-card-white rounded-lg p-1 text-sm md:text-md"
              >
                Read More
              </Link>
            </div>
            {notices.map((notice) => {
              return (
                <Link
                  href="#"
                  key={Math.random()}
                  className="text-blue-900 p-3 block border-t-0 border-b-2 border-black text-sm md:text-md"
                >
                  {notice}
                </Link>
              );
            })}
          </div>
          <div className="mt-10 md:mr-16 md:ml-16 -ml-2 hidden md:block shadow-xl">
            <CalendarDemo />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherBody;
