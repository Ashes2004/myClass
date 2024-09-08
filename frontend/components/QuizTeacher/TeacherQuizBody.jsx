import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherQuizLayout from "./TeacherQuizLayout";
import Image from "next/image";
import { question_mark } from "@/public/Icons";
import { storage } from "@/app/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import SeeAllQuizzes from "./SeeAllQuizzes";
import QuizList from "./QuizList";
const TeacherQuizBody = () => {
  const [isCreateActive, setIsCreateActive] = useState(true);
  const [isShowAnswerActive, setIsShowAnswerActive] = useState(false);
  const [isShowResultActive, setIsShowResultActive] = useState(false);
  const [isImageChecked, setImageChecked] = useState(false);

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questionNo, setQuestionNumber] = useState(0); // Start from 0
  const [quizName, setQuizName] = useState("");
  const [quizDate, setQuizDate] = useState("");
  const [quizStartTime, setQuizStartTime] = useState("");
  const [quizEndTime, setQuizEndTime] = useState("");
  const [classID, setClassID] = useState("");
  const [teacherId, setTeacherID] = useState("");
  const [allocatedClasses, setAllocatedClasses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const teacherID = sessionStorage.getItem("teacherID");
        if (!teacherID) {
          router.push("/teacher/teacherLogin");
          return;
        }
        setTeacherID(teacherID);
        const response = await fetch(
          `http://localhost:5000/api/teachers/${teacherID}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong. Failed to fetch teacher");
        }
        const data = await response.json();
        setAllocatedClasses(data.allocatedClasses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeacher();
  }, []);

  useEffect(() => {
    if (quiz.length > 0) {
      const currentQuestion = quiz[questionNo] || {};
      setQuestion(currentQuestion.name || "");
      setDescription(currentQuestion.details || "");
      setOption1(currentQuestion.options ? currentQuestion.options[0] : "");
      setOption2(currentQuestion.options ? currentQuestion.options[1] : "");
      setOption3(currentQuestion.options ? currentQuestion.options[2] : "");
      setOption4(currentQuestion.options ? currentQuestion.options[3] : "");
      setFile(currentQuestion.image || null);
      setCorrectAnswer(currentQuestion.correctAnswer || 0);
    }
  }, [questionNo, quiz]);

  const activateCreateQuiz = () => {
    setIsCreateActive(true);
    setIsShowAnswerActive(false);
    setIsShowResultActive(false);
  };

  const activateSeeAnswers = () => {
    setIsCreateActive(false);
    setIsShowAnswerActive(true);
    setIsShowResultActive(false);
  };

  const activateShowResults = () => {
    setIsCreateActive(false);
    setIsShowAnswerActive(false);
    setIsShowResultActive(true);
  };

  const checked = (e) => {
    setImageChecked(e.target.checked);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `quizImages/${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setFile(downloadURL);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleQuestion = () => {
    const currentOptions = [option1, option2, option3, option4];
    const updatedQuiz = [...quiz];
    updatedQuiz[questionNo] = {
      name: question,
      details: description,
      image: file,
      options: currentOptions,
      correctAnswer: correctAnswer,
      questionId: `Q${questionNo + 1}`, // Display question ID starting from 1
    };
    setQuiz(updatedQuiz);
    setQuestionNumber((prev) => prev + 1);
    resetFields();
  };

  const resetFields = () => {
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer(0);
    setQuestion("");
    setDescription("");
    setFile(null);
    setImageChecked(false);
  };

  const handleSubmitQuiz = async () => {
    try {
     


      const response = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({quizName,
          classId: classID,
          teacherId,
          quizDate,
          quizStartTime,
          quizEndTime,
          questions: quiz}),
      });
  if(!response.ok)
  {
    throw new Error("error ");
    
  }
      Swal.fire({
        title: "Good job!",
        text: "Student Registerd successfully",
        icon: "success",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }

      console.error("Error submitting quiz:", error);
    }
  };

  const viewPreviousQuestions = () => {
    // Logic to view previous questions
    console.log("View Previous Questions clicked");
  };

  const handleNextQuestion = () => {
    if (questionNo < quiz.length - 1) {
      setQuestionNumber((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionNo > 0) {
      setQuestionNumber((prev) => prev - 1);
    }
  };

  return (
    <TeacherQuizLayout>
      <ul className="list-none flex justify-evenly gap-3 md:gap-9 p-2 text-white md:justify-center items-center">
        <li>
          <button
            onClick={activateCreateQuiz}
            className={`${
              isCreateActive
                ? "border-b-2 border-b-violet-500 text-violet-600"
                : "text-gray-500"
            }`}
          >
            Create Quiz
          </button>
        </li>
        <li>
          <button
            onClick={activateSeeAnswers}
            className={`${
              isShowAnswerActive
                ? "border-b-2 border-b-violet-500 text-violet-600"
                : "text-gray-500"
            }`}
          >
            See Quizzes
          </button>
        </li>
        <li>
          <button
            onClick={activateShowResults}
            className={`${
              isShowResultActive
                ? "border-b-2 border-b-violet-500 text-violet-600"
                : "text-gray-500"
            }`}
          >
            Show Result
          </button>
        </li>
      </ul>
     { isCreateActive && <div
        className={`${
          isCreateActive ? "visible" : "hidden"
        } bg-slate-100 md:mx-60 mx-2 md:mt-6 mt-2 rounded-md shadow-xl border-violet-500 border pb-3 md:pb-6`}
      >
        <div className="text-xl lg:text-2xl font-semibold md:flex justify-between p-2 md:p-6 border-b-2 border-violet-400 text-gray-700">
          <div className="text-lg flex md:gap-2 gap-1 justify-items-start md:pl-4 items-center">
            <p>Quiz Name</p>
            <input
              onChange={(e) => setQuizName(e.target.value)}
              value={quizName}
              placeholder="Enter quiz name"
              className="py-1 px-2 rounded-md border border-violet-400 w-full"
            />
          </div>
        </div>
        <div className="p-2 md:px-6 pt-6">
          <div className="flex bg-violet-500 text-white md:py-2 py-1 rounded-t-md px-1 items-center justify-start gap-2">
            <Image
              src={question_mark}
              height={24}
              width={24}
              alt="question-mark"
              className="invert"
            />
            <p>
              Question No. {questionNo + 1}{" "}
              {/* Display question number starting from 1 */}
            </p>
          </div>
        </div>
        <div className="px-4 md:px-10">
          <p>Question</p>
          <input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            placeholder="Type here"
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
          <p>Description (optional)</p>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Type here"
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="checkBox"
              onChange={checked}
              checked={isImageChecked}
              className="mt-2"
            />
            <label className="text-sm">Include Image</label>
          </div>
          {isImageChecked && (
            <div className="mt-3">
              <input type="file" onChange={uploadImage} />
              {file && (
                <Image
                  src={file}
                  width={100}
                  height={100}
                  alt="Uploaded preview"
                  className="mt-2"
                />
              )}
            </div>
          )}
        </div>
        <div className="px-4 md:px-10">
          <p>Option 1</p>
          <input
            onChange={(e) => setOption1(e.target.value)}
            value={option1}
            placeholder="Type here"
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
          <p>Option 2</p>
          <input
            onChange={(e) => setOption2(e.target.value)}
            value={option2}
            placeholder="Type here"
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
          <p>Option 3</p>
          <input
            onChange={(e) => setOption3(e.target.value)}
            value={option3}
            placeholder="Type here"
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
          <p>Option 4</p>
          <input
            onChange={(e) => setOption4(e.target.value)}
            value={option4}
            placeholder="Type here"
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
          <p>Correct Answer</p>
          <input
            type="number"
            onChange={(e) => setCorrectAnswer(Number(e.target.value))}
            value={correctAnswer}
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
        </div>
        <div className="px-4 md:px-10">
          <p>Quiz Date</p>
          <input
            type="date"
            onChange={(e) => setQuizDate(e.target.value)}
            value={quizDate}
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
          <p>Quiz Start Time</p>
          <input
            type="time"
            onChange={(e) => setQuizStartTime(e.target.value)}
            value={quizStartTime}
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
          <p>Quiz End Time</p>
          <input
            type="time"
            onChange={(e) => setQuizEndTime(e.target.value)}
            value={quizEndTime}
            className="py-1 my-2 rounded-md border border-violet-400 w-full px-1"
          />
        </div>
        <div className="p-4 md:px-10">
          <p>Select Class</p>
          <select
            value={classID}
            onChange={(e) => setClassID(e.target.value)}
            className="w-full p-2 border border-violet-400 rounded-md mt-2"
          >
            <option value="" disabled>
              Select a class
            </option>
            {allocatedClasses.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between px-4 md:px-10 pb-4">
          <button
            onClick={handlePreviousQuestion}
            disabled={questionNo === 0} // Disable if at first question
            className="bg-gray-500 text-white py-1 px-4 rounded-md mt-2"
          >
            Previous
          </button>
          <button
            onClick={handleQuestion}
            className="bg-violet-500 text-white py-1 px-4 rounded-md mt-2"
          >
            Add Question
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={questionNo >= quiz.length - 1} // Disable if at last question
            className="bg-gray-500 text-white py-1 px-4 rounded-md mt-2"
          >
            Next
          </button>
          <button
            onClick={handleSubmitQuiz}
            className="bg-violet-500 text-white py-1 px-4 rounded-md mt-2"
          >
            Submit Quiz
          </button>
        </div>
      </div> }


   {isShowAnswerActive &&  <div>
         <SeeAllQuizzes teacherId={teacherId}/>
      </div> }
      {isShowResultActive && <div>
           <QuizList teacherId={teacherId} />
        </div>}
    </TeacherQuizLayout>
  );
};

export default TeacherQuizBody;
