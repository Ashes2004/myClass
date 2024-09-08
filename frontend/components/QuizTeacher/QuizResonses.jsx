import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizLayout from '../QuizStudent/QuizLayout';

const QuizResponses = ({ quizId }) => {
  const [responses, setResponses] = useState([]);
  
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/quizzes/${quizId}/responses`);
        const processedData = data.map(response => ({
          studentName: response.studentId.studentName,
          studentRoll: response.studentId.studentRoll,
          correctAnswers: response.scoreEarned,
          wrongAnswers: response.fullScore - response.scoreEarned,
        }));
        // Sort by correct answers
        processedData.sort((a, b) => b.correctAnswers - a.correctAnswers);
        setResponses(processedData);
      } catch (error) {
        console.error('Error fetching quiz responses:', error);
      }
    };

    fetchResponses();
  }, [quizId]);

  return (
    <QuizLayout>
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Quiz Responses</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Roll</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct Answers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wrong Answers</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {responses.map((response, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{response.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{response.studentRoll}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-semibold">{response.correctAnswers}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">{response.wrongAnswers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </QuizLayout>
  );
};

export default QuizResponses;
