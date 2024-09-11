import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import TeacherLayout from "../Teacher/teacherLayout";

const TeacherPoll = () => {
  const [polls, setPolls] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [timer, setTimer] = useState(0);
  const [responseData, setResponseData] = useState({});
  const [currentPoll, setCurrentPoll] = useState(null);
  const [refresh , setRefresh] = useState(false);
  const [countdown, setCountdown] = useState("00:00");
  const countdownRef = useRef(null);
  const teacherId = sessionStorage.getItem("teacherID");

  useEffect(() => {
    // Fetch polls
    const fetchPolls = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/poll/teacher/${teacherId}`
        );
        setPolls(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch allocated classes for the teacher
    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/teachers/${teacherId}`
        );
        setClasses(res.data.allocatedClasses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPolls();
    fetchClasses();
  }, [teacherId , refresh]);

  // Create Poll
  const createPoll = async () => {
    try {
      const newPoll = {
        teacherId,
        classId: selectedClass,
        timer,
      };
      const res = await axios.post(
        "http://localhost:5000/api/poll/create",
        newPoll
      );
      setPolls([...polls, res.data.poll]);
      setShowCreateModal(false);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Poll
  const deletePoll = async (pollId) => {
    try {
      await axios.delete(`http://localhost:5000/api/poll/delete/${pollId}`);
      setPolls(polls.filter((poll) => poll._id !== pollId));
    } catch (error) {
      console.error(error);
    }
  };

  // Show Poll Response (in a chart)
  const showPollResponse = async (pollId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/poll/${pollId}/pollresponse`
      );
      setResponseData(res.data.results);
      setShowResponseModal(true);
      setTimeout(() => {
        displayChart(res.data.results);
      }, 100);
    } catch (error) {
      console.error(error);
    }
  };

  const startPoll = async (pollId) => {
    try {
      const poll = polls.find((p) => p._id === pollId);
      if (poll) {
        setCurrentPoll(poll);
        setCountdown(poll.Timer * 60);
        setShowStartModal(true);

        countdownRef.current = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownRef.current);
              setShowStartModal(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  // Display chart for poll responses
  const displayChart = (data) => {
    const ctx = document.getElementById("responseChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["A", "B", "C", "D"],
        datasets: [
          {
            label: "Poll Responses",
            data: [data.A, data.B, data.C, data.D],
            backgroundColor: ["#f39c12", "#2ecc71", "#3498db", "#e74c3c"],
          },
        ],
      },
    });
  };

  return (
    <TeacherLayout>
    <div className="poll-manager h-screen container mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-4xl dark:text-light-gray font-semibold">Poll Manager</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Create Poll
        </button>
      </div>
      <ul className="space-y-4">
        {polls.map((poll) => (
          <li
            key={poll._id}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
          >
            <p className="text-lg font-medium">Class: {poll.class.classId}</p>
            <p className="text-sm text-gray-600">Timer: {poll.Timer} minutes</p>
            <div className="space-x-4 mt-2">
              <button
                onClick={() => deletePoll(poll._id)}
                className="bg-red-600 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Delete Poll
              </button>
              <button
                onClick={() => startPoll(poll._id)}
                className="bg-yellow-600 text-white py-1 px-3 rounded-lg shadow-md hover:bg-yellow-700 transition"
              >
                Start Poll
              </button>
              <button
                onClick={() => showPollResponse(poll._id)}
                className="bg-green-600 text-white py-1 px-3 rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Show Response
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Create Poll Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Create Poll</h2>

            <label className="block mb-2 text-sm font-medium">
              Select Class
            </label>
            <select
              className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>

            <label className="block mb-2 text-sm font-medium">Set Timer</label>
            <div className="flex items-center mb-4">
              <select
                className="border p-2 mb-4 w-full"
                onChange={(e) => setTimer(e.target.value)}
              >
                <option value="0">Select Timer</option>
                <option value="0.25">0:15 minutes</option>
                <option value="0.50">0:30 minutes</option>
                <option value="0.75">0:45 minutes</option>
                <option value="1">1:00 minute</option>
                <option value="1.50">1:30 minutes</option>
                <option value="2">2:00 minutes</option>
                <option value="2.50">2:30 minutes</option>
                <option value="3">3:00 minutes</option>
                <option value="3.50">3:30 minutes</option>
                <option value="4">4:00 minutes</option>
                <option value="4.50">4:30 minutes</option>
                <option value="5">5:00 minutes</option>
              </select>
            </div>

            <button
              onClick={createPoll}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Create Poll
            </button>
            <button
              onClick={() => setShowCreateModal(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition ml-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Poll Response Modal */}
      {showResponseModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Poll Responses</h2>
            <canvas id="responseChart"></canvas>
            <button
              onClick={() => setShowResponseModal(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Start Poll Modal */}
      {showStartModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4">Poll is Live</h2>
            <p className="text-9xl text-green-500 text-center mb-4">
              {" "}
              {formatTime(countdown)}
            </p>
            <button
              onClick={() => setShowStartModal(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              Close
            </button>
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
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 80%;
          max-width: 500px;
          position: relative;
        }
        .modal-content button {
          margin-top: 10px;
        }
      `}</style>
    </div>
    </TeacherLayout>
  );
};

export default TeacherPoll;
