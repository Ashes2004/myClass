import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import "./QuizHome.css";
import QuizLayout from "./QuizLayout";
import Image from "next/image";

const QuizHome = ({ Id }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [timer, setTimer] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [studentResponses, setStudentResponses] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(true); // State to track quiz active status

  const router = useRouter();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost/api/quizzes/${Id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuiz(data);

        const storedResponses = JSON.parse(
          localStorage.getItem("quizResponses") || "{}"
        );
        const initialResponses = {};
        data.questions.forEach((question) => {
          initialResponses[question.questionId] =
            storedResponses[question.questionId] ?? null;
        });
        setResponses(initialResponses);

        const initialTime = localStorage.getItem("quizTimer");
        if (initialTime) {
          setTimer(parseInt(initialTime, 10));
        } else {
          setTimer(data.questions.length * 60);
        }

        const submissionStatus = JSON.parse(
          localStorage.getItem("isQuizSubmitted") || "false"
        );
        setIsSubmitted(submissionStatus);

        if (submissionStatus) {
          setIsSubmitted(false);
          setTimer(data.questions.length * 60);
          localStorage.setItem("quizTimer", data.questions.length * 60);
          localStorage.setItem("isQuizSubmitted", false);
        }

        // Check if the quiz date and time have passed
        const currentDateTime = new Date();
        const quizEndDateTime = new Date(
          `${data.quizDate}T${data.quizEndTime}:00`
        );
        if (currentDateTime > quizEndDateTime) {
          setIsQuizActive(false);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [Id]);

  useEffect(() => {
    const fetchStudentResponses = async () => {
      const studentId = sessionStorage.getItem("studentId");
      try {
        const response = await fetch(
          `http://localhost/api/quizzes/${Id}/responses`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch responses");
        }
        const responseData = await response.json();
        const filteredResponses = responseData.filter(
          (response) => response.studentId._id === studentId
        );
        setStudentResponses(filteredResponses);

        // Disable quiz if the student has already submitted responses
        if (filteredResponses.length !== 0) {
          setIsQuizActive(false);
        }
      } catch (error) {
        console.error("Error fetching student responses:", error);
      }
    };

    fetchStudentResponses();
  }, [Id]);

  useEffect(() => {
    if (!quiz || !isQuizActive) return;

    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleSubmit();
          localStorage.removeItem("quizTimer");
          return 0;
        }
        const newTime = prev - 1;
        localStorage.setItem("quizTimer", newTime);
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      localStorage.setItem("quizTimer", timer);
    };
  }, [quiz, isQuizActive]);

  const handleAnswerChange = (questionId, answer) => {
    const updatedResponses = { ...responses, [questionId]: answer };
    setResponses(updatedResponses);
    localStorage.setItem("quizResponses", JSON.stringify(updatedResponses));
  };

  const handleSubmit = async () => {
    if (studentResponses.length === 0) {
      const studentId = sessionStorage.getItem("studentId");

      let score = 0;
      quiz.questions.forEach((q) => {
        let id = q.questionId;
        if (responses[id] !== null && responses[id] + 1 === q.correctAnswer) {
          score += 1;
        }
      });

      const responsePayload = {
        studentId,
        quizId: Id,
        answers: Object.entries(responses).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
        scoreEarned: score,
        fullScore: quiz.questions.length,
      };

      try {
        const response = await fetch(
          `http://localhost/api/quizzes/${Id}/responses`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(responsePayload),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit quiz responses");
        }

        const result = await response.json();
        console.log(result);

        Swal.fire({
          title: "Good job!",
          text: "Quiz Submitted",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            router.push("/student/studentQuiz");
          },
        });

        setIsSubmitted(true);
        localStorage.removeItem("quizResponses");
        localStorage.removeItem("quizTimer");
        localStorage.setItem("isQuizSubmitted", true);
      } catch (error) {
        console.error("Error submitting quiz:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to submit quiz",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (!quiz) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  return (
    <QuizLayout>
      <div className="p-4 max-w-3xl mx-auto relative">
        <h1 className="text-3xl font-bold mb-4 text-center">{quiz.quizName}</h1>
        {!isQuizActive &&
          (studentResponses.length != 0 ? (
            <h1 className="text-xl text-blue-600 font-bold mb-4 text-center">
              Your score is : {studentResponses[0].scoreEarned} out of{" "}
              {studentResponses[0].fullScore}{" "}
            </h1>
          ) : (
            <h1 className="text-xl text-blue-600 font-bold mb-4 text-center">
              You did not attempt the quiz
            </h1>
          ))}
        <div className="flex justify-between items-center mb-4">
          {isQuizActive ? (
            <>
              <div className="flex-1">
                <div className="text-lg font-bold mb-2">
                  Time Left: {formatTime(timer)}
                </div>
              </div>
              <div className="flex-none">
                <div className="flex flex-wrap gap-2 justify-end">
                  <button
                    onClick={() => setShowModal(true)}
                    className="p-2 bg-blue-500 text-white rounded-lg shadow-md"
                  >
                    See All Questions
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-lg font-bold text-red-500">
              Quiz is no longer active
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          {quiz.questions.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                Question {currentQuestionIndex + 1}{" "}
                {!isQuizActive && (
                  <div className="text-green-600">
                    [Correct Answer: option (
                    {quiz.questions[currentQuestionIndex].correctAnswer})]{" "}
                  </div>
                )}
              </h2>
              <p className="mb-4">
                {quiz.questions[currentQuestionIndex].name}
              </p>
              {quiz?.questions?.[currentQuestionIndex]?.image && (
                <Image
                  src={quiz.questions[currentQuestionIndex].image}
                  height={200}
                  width={200}
                  className="mb-3"
                />
              )}

              {quiz.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <div
                    key={index}
                    className={`mb-2 flex items-center p-2 bg-white rounded-lg shadow-sm cursor-pointer ${
                      responses[
                        quiz.questions[currentQuestionIndex].questionId
                      ] === index
                        ? "bg-blue-100"
                        : ""
                    }`}
                    onClick={() =>
                      handleAnswerChange(
                        quiz.questions[currentQuestionIndex].questionId,
                        index
                      )
                    }
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      checked={
                        responses[
                          quiz.questions[currentQuestionIndex].questionId
                        ] === index
                      }
                      readOnly
                    />
                    <span className="ml-2">{option}</span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="p-2 bg-gray-300 text-gray-700 rounded-lg shadow-md"
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === quiz.questions.length - 1}
            className="p-2 bg-blue-500 text-white rounded-lg shadow-md"
          >
            Next
          </button>
        </div>

        {isQuizActive && (
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md"
            >
              Submit Quiz
            </button>
          </div>
        )}

       
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">All Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    setShowModal(false);
                  }}
                  className={`question-circle ${responses[quiz.questions[index].questionId] !== undefined ? 'bg-green-500 text-white' : 'bg-gray-200'} ${currentQuestionIndex === index ? 'border-2 border-blue-500' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </QuizLayout>
  );
};

export default QuizHome;
