import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import StudentLayout from '../Student/studentLayout';

const StudentPoll = () => {
  const [polls, setPolls] = useState([]);
  const [showPollModal, setShowPollModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const classId = sessionStorage.getItem('studentClassId'); 
  const studentId = sessionStorage.getItem('studentID'); 
  const router = useRouter();

  useEffect(() => {
    if (!classId) {
      router.push('/student/studentLogin');
    }

    const fetchPolls = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/poll/class/${classId}`);
        setPolls(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPolls();
  }, [classId]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const submitResponse = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/poll/${selectedPoll._id}/response`, {
        studentId,
        option: selectedOption,
      });
      setShowPollModal(false);
      setSelectedOption('');
      Swal.fire({
        title: "Good job!",
        text: "Response submitted successfully",
        icon: "success",
      });
      console.log(response);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
      console.error(error);
    }
  };

  const buttonColors = {
    A: 'bg-red-500',
    B: 'bg-blue-500',
    C: 'bg-purple-500',
    D: 'bg-yellow-500',
  };

  return (
    <StudentLayout>
    <div className="poll-manager min-h-screen bg-gray-50 py-8">
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Active Polls</h2>
      </div>

      <ul className="poll-list max-w-4xl mx-auto space-y-6">
        {polls?.map((poll) => (
          <li key={poll._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-700">Poll by {poll.teacher.name}</p> 
              <button
                onClick={() => {
                  setSelectedPoll(poll);
                  setShowPollModal(true);
                }}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-800 transition"
              >
                Take Poll
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showPollModal && selectedPoll && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Your Option</h2>
            <p className="mb-6 text-gray-600">{selectedPoll.question}</p>
            <div className="grid grid-cols-2 gap-4">
              {['A', 'B', 'C', 'D'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`py-3 px-6 rounded-lg text-white font-bold ${
                    selectedOption === option ? 'border-4 border-black' : 'opacity-80'
                  } ${buttonColors[option]} hover:opacity-100 transition`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={submitResponse}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
              <button
                onClick={() => setShowPollModal(false)}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          animation: slide-down 0.4s ease;
        }
        @keyframes slide-down {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
    </StudentLayout>
  );
};

export default StudentPoll;
