import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SeeAllQuizzes = ({ teacherId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [updatedQuiz, setUpdatedQuiz] = useState({
    name: '',
    description: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    date: '',
    quizStartTime: '',
    quizEndTime: '',
    questions: []
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost/api/quizzes');
        const data = await response.json();
        const filteredQuizzes = data.filter(quiz => quiz.teacherId._id === teacherId);
        setQuizzes(filteredQuizzes);
        if (filteredQuizzes.length > 0) {
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [teacherId]);

  const handleEditClick = (index) => {
    const quiz = quizzes[index];
    setEditingQuizId(quiz._id);
    setUpdatedQuiz({
      quizName: quiz.quizName,
      description: quiz.description || '',
      options: quiz.options || ['', '', '', ''],
      correctAnswer: quiz.correctAnswer || 0,
      quizDate: quiz.quizDate || '',
      quizStartTime: quiz.quizStartTime || '',
      quizEndTime: quiz.quizEndTime || '',
      questions: quiz.questions || []
    });
    setCurrentIndex(index);
  };

  const handleUpdateQuiz = async () => {
    try {
      const response = await axios.patch(`http://localhost/api/quizzes/${editingQuizId}`, updatedQuiz);
      Swal.fire({
        title: 'Success!',
        text: 'Quiz updated successfully',
        icon: 'success',
      });
      setQuizzes((prev) =>
        prev.map((quiz) =>
          quiz._id === editingQuizId ? { ...quiz, ...updatedQuiz } : quiz
        )
      );
      setEditingQuizId(null);
    } catch (error) {
      console.error("Error updating quiz:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update quiz',
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      handleEditClick(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleEditClick(currentIndex - 1);
    }
  };

  const handleDeleteQuestion = (qIndex) => {
    const newQuestions = updatedQuiz.questions.filter((_, index) => index !== qIndex);
    setUpdatedQuiz({ ...updatedQuiz, questions: newQuestions });
  };

  const handleAddQuestion = () => {
    const newQuestion = { name: '', options: ['', '', '', ''], correctAnswer: 0 };
    setUpdatedQuiz({ ...updatedQuiz, questions: [...updatedQuiz.questions, newQuestion] });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Quizzes</h2>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={quiz._id} className="mb-4 border-b-2 border-gray-200 pb-2">
            {editingQuizId === quiz._id ? (
              <div>
                <div className="flex flex-col gap-4 mb-4">
                  <input
                    type="text"
                    value={updatedQuiz.quizName}
                    onChange={(e) => setUpdatedQuiz({ ...updatedQuiz, quizName: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg shadow-sm"
                    placeholder="Quiz Name"
                  />
                  <textarea
                    value={updatedQuiz.description}
                    onChange={(e) => setUpdatedQuiz({ ...updatedQuiz, description: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg shadow-sm"
                    placeholder="Description"
                  />
                  {updatedQuiz.questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-4 border p-4 rounded-lg bg-gray-50">
                      <input
                        type="text"
                        value={question.name}
                        onChange={(e) => {
                          const newQuestions = [...updatedQuiz.questions];
                          newQuestions[qIndex].name = e.target.value;
                          setUpdatedQuiz({ ...updatedQuiz, questions: newQuestions });
                        }}
                        className="border border-gray-300 p-2 rounded-lg shadow-sm w-full"
                        placeholder={`Question ${qIndex + 1}`}
                      />
                      {question.options.map((option, oIndex) => (
                        <input
                          key={oIndex}
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newQuestions = [...updatedQuiz.questions];
                            newQuestions[qIndex].options[oIndex] = e.target.value;
                            setUpdatedQuiz({ ...updatedQuiz, questions: newQuestions });
                          }}
                          className="border border-gray-300 p-2 rounded-lg shadow-sm mt-2 w-full"
                          placeholder={`Option ${oIndex + 1}`}
                        />
                      ))}
                      <input
                        type="number"
                        value={question.correctAnswer}
                        onChange={(e) => {
                          const newQuestions = [...updatedQuiz.questions];
                          newQuestions[qIndex].correctAnswer = Number(e.target.value);
                          setUpdatedQuiz({ ...updatedQuiz, questions: newQuestions });
                        }}
                        className="border border-gray-300 p-2 rounded-lg shadow-sm mt-2 w-full"
                        placeholder="Correct Answer Index"
                      />
                      <button
                        onClick={() => handleDeleteQuestion(qIndex)}
                        className="bg-red-500 text-white py-1 px-2 rounded-lg shadow-sm mt-2 hover:bg-red-600"
                      >
                        Delete Question
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddQuestion}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-green-600"
                  >
                    Add Question
                  </button>
                  <input
                    type="date"
                    value={updatedQuiz.quizDate}
                    onChange={(e) => setUpdatedQuiz({ ...updatedQuiz, quizDate: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg shadow-sm"
                    placeholder="Quiz Date"
                  />
                  <input
                    type="time"
                    value={updatedQuiz.quizStartTime}
                    onChange={(e) => setUpdatedQuiz({ ...updatedQuiz, quizStartTime: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg shadow-sm"
                    placeholder="Start Time"
                  />
                  <input
                    type="time"
                    value={updatedQuiz.quizEndTime}
                    onChange={(e) => setUpdatedQuiz({ ...updatedQuiz, quizEndTime: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg shadow-sm"
                    placeholder="End Time"
                  />
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={handleUpdateQuiz}
                    className="bg-violet-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-violet-600"
                  >
                    Update Changes
                  </button>
                  <button
                    onClick={() => setEditingQuizId(null)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
                {/* <div className="flex gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="bg-gray-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-gray-600"
                  >
                    Previous quiz
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === quizzes.length - 1}
                    className="bg-gray-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-gray-600"
                  >
                    Next quiz
                  </button>
                </div> */}
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{quiz.quizName}</span>
                <span className="text-md ">[{quiz.classId.name}]</span>
                <button
                  onClick={() => handleEditClick(index)}
                  className="bg-violet-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-violet-600"
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeeAllQuizzes;
