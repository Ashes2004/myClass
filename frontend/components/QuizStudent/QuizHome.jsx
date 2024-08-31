import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; 
import './QuizHome.css'; 

const QuizHome = ({ Id, quizName }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [timer, setTimer] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const router = useRouter(); // Initialize useRouter if you're using Next.js

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost/api/quizzes/${Id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuiz(data);

        // Retrieve previous responses from localStorage or initialize defaults
        const storedResponses = JSON.parse(localStorage.getItem('quizResponses') || '{}');
        const initialResponses = {};
        data.questions.forEach(question => {
          initialResponses[question.questionId] = storedResponses[question.questionId] ?? null; // Use stored value or default to null
        });
        setResponses(initialResponses);

        // Set the timer to the total duration of the quiz
        const initialTime = localStorage.getItem('quizTimer');
        if (initialTime) {
          setTimer(parseInt(initialTime, 10));
        } else {
          setTimer(data.questions.length * 60); // Start with full duration
        }

        // Set submission status from localStorage
        const submissionStatus = JSON.parse(localStorage.getItem('isQuizSubmitted') || 'false');
        setIsSubmitted(submissionStatus);
        
        // Reset submission status and timer if previously submitted
        if (submissionStatus) {
          setIsSubmitted(false); // Reset submission status
          setTimer(data.questions.length * 60); // Reset timer
          localStorage.setItem('quizTimer', data.questions.length * 60);
          localStorage.setItem('isQuizSubmitted', false); // Update localStorage
        }

      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [Id]);

  useEffect(() => {
    if (!quiz) return;

    const timerInterval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleSubmit();
          localStorage.removeItem('quizTimer'); // Clear timer from localStorage upon submission
          return 0;
        }
        const newTime = prev - 1;
        localStorage.setItem('quizTimer', newTime); // Save timer to localStorage
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      localStorage.setItem('quizTimer', timer); // Save the timer value when the component unmounts
    };
  }, [quiz]);

  const handleAnswerChange = (questionId, answer) => {
    const updatedResponses = { ...responses, [questionId]: answer };
    setResponses(updatedResponses);

    // Save the updated responses to localStorage
    localStorage.setItem('quizResponses', JSON.stringify(updatedResponses));
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Good job!",
      text: "Quiz Submitted",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        router.push('/student/studentQuiz'); 
      }
    });
    console.log(responses);
    setIsSubmitted(true); 
    localStorage.removeItem('quizResponses'); // Clear responses from localStorage upon submission
    localStorage.removeItem('quizTimer'); // Clear timer from localStorage upon submission
    localStorage.setItem('isQuizSubmitted', true); // Save submission status
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (!quiz) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto relative">
      <h1 className="text-3xl font-bold mb-4 text-center">{quizName}</h1> {/* Added heading here */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <div className="text-lg font-bold mb-2">Time Left: {formatTime(timer)}</div>
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
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        {quiz.questions.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Question {currentQuestionIndex + 1}</h2>
            <p className="mb-4">{quiz.questions[currentQuestionIndex].name}</p>
            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`mb-2 flex items-center p-2 bg-white rounded-lg shadow-sm cursor-pointer ${responses[quiz.questions[currentQuestionIndex].questionId] === index ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handleAnswerChange(quiz.questions[currentQuestionIndex].questionId, index)}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={index}
                  checked={responses[quiz.questions[currentQuestionIndex].questionId] === index}
                  onChange={() => handleAnswerChange(quiz.questions[currentQuestionIndex].questionId, index)}
                  className="hidden"
                />
                <label className="ml-2">{option}</label>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousQuestion}
            className="p-2 bg-gray-300 text-black rounded-lg"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            className="p-2 bg-gray-300 text-black rounded-lg"
            disabled={currentQuestionIndex === quiz.questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition"
      >
        Submit Quiz
      </button>

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
                  className={`question-circle ${responses[quiz.questions[index].questionId] !== null ? 'bg-green-500 text-white' : 'bg-gray-200'} ${currentQuestionIndex === index ? 'border-2 border-blue-500' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizHome;
