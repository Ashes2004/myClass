import React, { useEffect, useState } from "react";
import QuizLayout from "./QuizLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";

const QuizBody = () => {
  const [liveQuiz, setLiveQuiz] = useState([]);
  const [upcomingQuiz, setUpcomingQuiz] = useState([]);
  const [pastQuiz, setPastQuiz] = useState([]);
  const [quizData, setQuizData] = useState([]);
  
  const [classId, setClassId] = useState("");
  const router = useRouter();

  // Fetch student data
  useEffect(() => {
    const token = sessionStorage.getItem("studentToken");
    if (!token) {
      router.push("/student/studentLogin");
      return;
    }
    const classID = sessionStorage.getItem("studentClassId");
    console.log("class: " , classID);
    setClassId(classID);
    // const fetchStudentData = async () => {
    //   try {
    //     const response = await fetch(
    //       "http://localhost/api/students/get/student",
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     if (!response.ok) {
    //       throw new Error("Failed to fetch student data");
    //     }

    //     const data = await response.json();
    //     setStudentData(data);
    //     localStorage.setItem("student: " , data.);
    //     setClassId(data.classId._id);
    //   } catch (error) {
    //     console.error("Error fetching student data:", error);
    //     router.push("/student/studentLogin");
    //   }
    // };

    // fetchStudentData();
  }, [router ]);

  // Fetch quizzes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/api/quizzes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchData();
  }, []);

  // Categorize quizzes
  useEffect(() => {
    const currentDate = new Date();

    const categorizeQuizzes = () => {
      const live = [];
      const upcoming = [];
      const past = [];

      quizData.forEach((quiz) => {
        if (classId && quiz.classId._id !== classId) {
          return; // Skip this quiz if classId doesn't match
        }
        const quizStart = new Date(`${quiz.quizDate} ${quiz.quizStartTime}`);
        const quizEnd = new Date(`${quiz.quizDate} ${quiz.quizEndTime}`);

        const totalQuestions = quiz.questions.length;
        const quizDuration = totalQuestions; // Duration in minutes

        const quizWithDetails = {
          ...quiz,
          status:
            currentDate >= quizStart && currentDate <= quizEnd
              ? "Live"
              : currentDate < quizStart
              ? "Upcoming"
              : "Past",
          totalMarks: totalQuestions,
          duration: quizDuration,
          attemptStatus:
            currentDate >= quizStart && currentDate <= quizEnd
              ? "Live"
              : currentDate < quizStart
              ? "Upcoming"
              : "Unattempted",
        };

        if (quizWithDetails.status === "Live") {
          live.push(quizWithDetails);
        } else if (quizWithDetails.status === "Upcoming") {
          upcoming.push(quizWithDetails);
        } else {
          past.push(quizWithDetails);
        }
      });

      setLiveQuiz(live);
      setUpcomingQuiz(upcoming);
      setPastQuiz(past);
    };

    if (quizData.length > 0) {
      categorizeQuizzes();
      localStorage.removeItem("quizTimer");
    }
  }, [quizData, classId]);

 

  return (
    <QuizLayout >
      {/* Render live, upcoming, and past quizzes */}
      <div className="mb-6">
        <div className="text-2xl lg:text-4xl font-bold py-2 px-2 text-gray-700">
          Live Quizzes
        </div>
        <div className="p-4 pl-6 md:mt-2 rounded-t-md bg-purple-500 text-white grid grid-cols-4 items-center gap-2 text-[16px]">
          <p>Name</p>
          <p className="hidden md:block">Date</p>
          <p className="hidden md:block whitespace-pre">Marks</p>
          <p className="hidden md:block">Duration</p>
        </div>
        {liveQuiz.map((quiz) => (
          <div
            key={quiz._id}
            className="md:p-4 px-2 py-2 grid grid-cols-2 md:grid-rows-1 md:grid-cols-4 items-center gap-1 md:gap-2 border-b-2 border-b-violet-500 bg-slate-100"
          >
            <p>
              <Link
                href={`/student/studentQuiz/${quiz._id}`}
                className="text-blue-600 underline underline-offset-2"
              >
                {quiz.quizName}
              </Link>
            </p>
            <p className="whitespace-pre font-bold text-red-600 md:text-lg tracking-wide">
              {quiz.status}
            </p>
            <p className="whitespace-pre hidden md:block">{quiz.totalMarks}</p>
            <p className="hidden md:block">{quiz.duration} mins</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="text-2xl lg:text-4xl font-bold py-2 px-2 text-gray-700">
          Upcoming Quizzes
        </div>
        <div className="p-4 pl-6 md:mt-2 rounded-t-md bg-purple-500 text-white grid grid-cols-4 items-center gap-2 text-[16px]">
          <p>Name</p>
          <p className="hidden md:block">Date</p>
          <p className="hidden md:block whitespace-pre">Marks</p>
          <p className="hidden md:block">Duration</p>
        </div>
        {upcomingQuiz.map((quiz) => (
          <div
            key={quiz._id}
            className="md:p-4 px-2 py-1 grid grid-rows-2 md:grid-rows-1 md:grid-cols-4 items-center gap-1 md:gap-2 border-b-2 border-b-violet-500 bg-slate-100 pb-1"
          >
            <p>
              <Link
                href={`/student/studentQuiz`}
                className="text-blue-600 underline underline-offset-2"
              >
                {quiz.quizName}
              </Link>
            </p>
            <p className="whitespace-pre">
              {quiz.quizDate} {quiz.quizStartTime}
            </p>
            <p className="whitespace-pre hidden md:block">{quiz.totalMarks}</p>
            <p className="hidden md:block">{quiz.duration} mins</p>
          </div>
        ))}
      </div>

      <div>
        <div className="text-2xl lg:text-4xl font-bold py-2 px-2 text-gray-700">
          Past Quizzes
        </div>
        <div className="p-4 pl-6 md:mt-2 rounded-t-md bg-purple-500 text-white grid grid-cols-4 items-center gap-2 text-[16px]">
          <p>Name</p>
          <p className="hidden md:block">Status</p>
          <p className="hidden md:block whitespace-pre">Marks</p>
          <p className="hidden md:block">Duration</p>
        </div>
        {pastQuiz.map((quiz) => (
          <div
            key={quiz._id}
            className="md:p-4 p-2 grid grid-cols-2 md:grid-rows-1 md:grid-cols-4 items-center gap-8 md:gap-2 border-b-2 border-b-violet-500 bg-slate-100 pb-1"
          >
            <p className="overflow-hidden h-6">
              <Link
                href={`/student/studentQuiz/${quiz._id}`}
                className="text-blue-600 underline underline-offset-2"
              >
                {quiz.quizName}
              </Link>
            </p>
            <p
              className={`text-white ${
                quiz.attemptStatus === "Attempted"
                  ? "bg-green-500"
                  : "bg-red-500"
              } w-24  pl-2 rounded-full text-[14px] py-0.5`}
            >
              {quiz.attemptStatus}
            </p>
            <p className="whitespace-pre hidden md:block">{quiz.totalMarks}</p>
            <p className="hidden md:block">{quiz.duration} mins</p>
          </div>
        ))}
      </div>
    </QuizLayout>
  );
};

export default QuizBody;
