import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SeeAllQuizzes = ({ teacherId }) => {
  const [quizzes, setQuizzes] = useState([]);
 
 const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost/api/quizzes');
        const data = await response.json();
        const filteredQuizzes = data.filter(quiz => quiz.teacherId._id === teacherId);
        setQuizzes(filteredQuizzes);
      
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [teacherId]);

  const handleEditClick = (index) => {
    const quiz = quizzes[index];
   
    router.push(`/teacher/quizresponse/${quiz._id}`);
    
  };

 
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Quizzes</h2>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={quiz._id} className="mb-4 border-b-2 border-gray-200 pb-2">
          
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{quiz.quizName}</span>
                <span className="text-md ">[{quiz.classId.name}]</span>
                <button
                  onClick={() => handleEditClick(index)}
                  className="bg-violet-500 text-white py-1 px-4 rounded-lg shadow-sm hover:bg-violet-600"
                >
                  See Results
                </button>
              </div>
        
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeeAllQuizzes;
