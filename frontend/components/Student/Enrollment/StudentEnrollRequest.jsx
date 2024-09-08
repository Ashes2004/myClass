import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const StudentEnrollRequest = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the classes from the API
    axios.get('http://localhost:5000/api/classes')
      .then(response => {
        const data = response.data;
        // Extract main classes by filtering unique class IDs (main part before any letter)
        const mainClasses = Array.from(new Set(data.map(item => item.classId.match(/\d+/)[0])));
        setClasses(mainClasses);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data to be sent to the server
    const enrollmentData = {
      Student: studentId,
      Password: password,
      ClassName: selectedClass
    };

    // POST request to submit the enrollment data
    axios.post('http://localhost:5000/api/student-enroll', enrollmentData)
      .then(response => {
        setMessage('Enrollment request sent successfully!');
        Swal.fire({
          title: "Good job!",
          text: "Enrollment request sent successfully",
          icon: "success"
        });
        console.log('Enrollment response:', response.data);
      })
      .catch(error => {
        setMessage('Enrollment failed. Please try again.');

        if (error.response && error.response.data && error.response.data.message) {
          // Show the error message from the response
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message
          });
        }
        console.error('Error submitting enrollment:', error);
      });

    // Reset form fields
    setStudentId('');
    setPassword('');
    setSelectedClass('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Student Enrollment</h2>
        
        {message && <p className="text-center mb-4 text-green-500">{message}</p>}

        <div className="mb-4">
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>{`Class ${cls}`}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Submit</button>
      </form>
    </div>
  );
};

export default StudentEnrollRequest;
