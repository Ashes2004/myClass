"use client"
import Link from "next/link";
import StudentLayout from "./studentLayout";
import SearchBar from "../structComponents/SearchBar";
import {
  notices,
  studentAssignments,
  studentProgress,
  studentSchedule,
  studentSubject,
} from "@/app/constants";
import Image from "next/image";
import { chatbot, rightArrow } from "@/public/Icons";
import { sampleProfile } from "@/public/Images";
import AlertSystem from "../structComponents/AlarmSystem";
import { CalendarDemo } from "../structComponents/CalendarDemo";
import { useRouter } from "next/navigation";
import { useState , useEffect  } from "react";




const DemoStudentBody = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
 

 
  useEffect(() => {
    const token = sessionStorage.getItem("studentToken");
    if (!token) {
      // Redirect to login if no token is present
      router.push("/student/studentLogin");
    } else {
      // Fetch student data if token is present
      const fetchStudentData = async () => {
        try {
          console.log("token: ", token);
          const response = await fetch("http://localhost/api/students/get/student", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            router.push("/student/studentLogin");
            throw new Error("Failed to fetch student data");
            
          }

          const data = await response.json();
          setStudentData(data);
       
        } catch (error) {
            
          console.error("Error fetching student data:", error);
        }
      };

      fetchStudentData();
    }
  }, [router]); // Depend on `router` to avoid using `token` directly (to prevent race conditions)

  if (!studentData) {
    return <p>Loading...</p>; // Display a loading state while fetching data
  }

  

     return (

    <StudentLayout>
      <div className="bg-cream text-black flex flex-col p-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center rounded-md">
          <h1 className="text-xl md:text-3xl font-bold">
            Welcome back, {studentData?.studentName} 👋
          </h1>
          <div className="flex sm:flex-row justify-start gap-3 md:justify-center items-center mt-3 mb-3 md:mb-0">
            <SearchBar />
            <Link href="/studentProfile" className="bg-white rounded-full">
              <Image
                src={studentData?.profilePhoto ||  sampleProfile}
                alt="profile"
                width={42}
                height={42}
                className="object-cover cursor-pointer rounded-full"
              />
            </Link>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Section - Subject Materials & Schedule */}
          <div className="col-span-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg md:text-xl">
                Subject Materials
              </h3>
              <Link
                href="/subjectMaterial"
                className="hover:underline decoration-solid underline-offset-4 cursor-pointer hover:text-green-500 duration-200"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {studentSubject.map(
                (item, index) =>
                  index < 3 && (
                    <Link
                      href={`${item.link}`}
                      key={item.id}
                      className="bg-white p-4 rounded-lg shadow-xl hover:scale-105 duration-300"
                    >
                      <div>
                        <div
                          className={`rounded-full flex justify-center items-center ${item.bg} w-8 h-8`}
                        >
                          <Image
                            src={item.icon}
                            alt={item.sub}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        <div className="font-bold">{item.sub}</div>
                        <div className="font-semibold">{item.type}</div>
                      </div>
                    </Link>
                  )
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Today's Schedule Section */}
              <div className="bg-white shadow-xl rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg md:text-xl">
                    Today's Schedule
                  </h3>
                  <Link
                    href="/timetable"
                    className="hover:underline decoration-solid underline-offset-4 cursor-pointer hover:text-green-500 duration-200"
                  >
                    View All
                  </Link>
                </div>
                {studentSchedule.map(
                  (item, index) =>
                    index < 3 && (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 rounded-lg"
                      >
                        <div className="flex gap-2 items-center">
                          <div className={`rounded-full ${item.bg} p-3`}>
                            <Image
                              src={item.icon}
                              alt={item.subject}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="font-bold">{item.subject}</h2>
                            <h2 className="font-semibold text-xs">
                              {item.duration} min
                            </h2>
                            <h2 className="font-semibold">
                              Teacher: {item.teacher}
                            </h2>
                          </div>
                        </div>

                        <Link
                          href={`${item.link}`}
                          className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3"
                        >
                          <Image
                            src={rightArrow}
                            alt="arrow"
                            width={24}
                            height={24}
                            className="object-cover cursor-pointer"
                          />
                        </Link>
                      </div>
                    )
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Chatbot Section */}
                <div className="col-span-1 bg-white flex flex-col shadow-xl rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="bg-purple-300 rounded-full p-2">
                      <Image
                        src={chatbot}
                        alt="bot"
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-bold text-lg">Chat with EduBot 🤖</h2>
                      <p className="font-semibold text-sm">
                        Ask any instant doubts!
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm font-semibold mb-3">
                    <h2 className="text-base font-bold">
                      EduBot: Hi there! I am EduBot, your virtual study buddy.
                      How can I assist you today?
                    </h2>
                    <p>Help with Homework 📚</p>
                    <p>Assignment Reminders ⏰</p>
                    <p>Ask a Question ❓</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <Link
                      href="/"
                      className="bg-green-300 hover:bg-green-600 duration-300 rounded-full p-3 flex justify-center items-center cursor-pointer"
                    >
                      <h2 className="font-bold">Ask Doubts</h2>
                      <Image
                        src={rightArrow}
                        alt="arrow"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </Link>
                  </div>
                </div>

                {/* Notice Board Section */}
                <div className="col-span-1 bg-white shadow-xl rounded-xl p-4">
                  <h2 className="font-bold text-lg text-center">
                    Notice Board
                  </h2>
                  <div className="flex flex-col gap-1 text-base pt-2">
                    {notices.map(
                      (item, index) =>
                        index < 5 && (
                          <Link
                            href={`${item.link}`}
                            key={item.id}
                            className={`flex justify-between items-center mb-1 ${
                              index % 2 == 0
                                ? "bg-slate-300 hover:bg-slate-400"
                                : "bg-slate-400 hover:bg-slate-500"
                            } rounded-lg px-2 py-3 duration-200`}
                          >
                            <h2 className="font-bold">{item.title}</h2>
                            <p className="font-semibold">{item.date}</p>
                          </Link>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center my-3">
              <h3 className="font-bold text-lg md:text-xl">
                Track Your Progress
              </h3>
              <Link
                href="/"
                className="hover:underline hover:text-green-500 duration-200 decoration-solid underline-offset-4 cursor-pointer"
              >
                Check
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {studentProgress.map(
                (item, index) =>
                  index < 2 && (
                    <div
                      key={item.id}
                      className="bg-white shadow-xl flex justify-between items-center p-3 rounded-lg"
                    >
                      <div className="flex gap-2 items-center">
                        <div className={`${item.bg} rounded-full p-3`}>
                          <Image
                            src={item.icon}
                            alt={item.progress}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h2 className="font-bold">{item.progress}</h2>
                        </div>
                      </div>
                      <Link
                        href={`${item.link}`}
                        className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3"
                      >
                        <Image
                          src={rightArrow}
                          alt="arrow"
                          width={24}
                          height={24}
                          className="object-cover cursor-pointer"
                        />
                      </Link>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 pt-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-center bg-white p-2 rounded-lg shadow-xl">
                <h2 className="font-bold text-center md:text-xl lg:text-2xl">
                  This is an Alarm System. Raise this alarm ONLY in case of FIRE
                  or any other EMERGENCY!!!
                </h2>
                <AlertSystem />
              </div>
              <div className="flex justify-center items-center mt-4 drop-shadow-xl">
                <CalendarDemo />
              </div>
              <div className="flex justify-between items-center mt-3 mb-1">
                <h3 className="font-bold text-lg md:text-xl">Assignments</h3>
                <Link
                  href="/"
                  className="hover:underline hover:text-green-500 duration-200 decoration-solid underline-offset-4 cursor-pointer"
                >
                  See All
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {studentAssignments.map(
                  (item, index) =>
                    index < 3 && (
                      <div
                        key={item.id}
                        className="bg-white shadow-xl flex justify-between items-center p-3 rounded-lg"
                      >
                        <div className="flex gap-2 items-center">
                          <div className={`${item.bg} rounded-full p-3`}>
                            <Image
                              src={item.icon}
                              alt={item.task}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="font-bold">{item.task}</h2>
                            <h2>
                              Due Date: {item.due} {item.time}
                            </h2>
                          </div>
                        </div>
                        <div
                          className={`p-2 px-3 rounded-full ${
                            item.status === "done"
                              ? "bg-green-400"
                              : item.status === "progress"
                              ? "bg-purple-400"
                              : "bg-red-400"
                          }`}
                        >
                          <h2 className="text-xs">{item.statusDesc}</h2>
                        </div>
                        <Link
                          href={`${item.link}`}
                          className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3"
                        >
                          <Image
                            src={rightArrow}
                            alt="arrow"
                            width={24}
                            height={24}
                            className="object-cover cursor-pointer"
                          />
                        </Link>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
   
  );

};

export default DemoStudentBody;

