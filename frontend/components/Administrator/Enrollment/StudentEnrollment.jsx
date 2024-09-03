import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const StudentEnrollmentManagement = () => {
  const [classes, setClasses] = useState([]);
  const [studentEnrollments, setStudentEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMainClass, setSelectedMainClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentIds, setStudentIds] = useState([]);
  const [studentNameData, setStudentNameData] = useState([]);

  useEffect(() => {
    // Fetch classes from the API
    axios.get('http://localhost/api/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch student enrollments from the API
    axios.get('http://localhost/api/student-enroll')
      .then(response => {
        setStudentEnrollments(response.data.studentenrollments || []);
      })
      .catch(error => {
        console.error('Error fetching student enrollments:', error);
        setStudentEnrollments([]);
      });
  }, []);

  useEffect(() => {
    // Fetch students when the main class is selected
    if (selectedMainClass) {
      const studentsInMainClass = studentEnrollments
        .filter(enrollment => enrollment.ClassName === selectedMainClass)
        .map(enrollment => enrollment.Student);

      setStudents(studentsInMainClass);
    }
  }, [selectedMainClass, studentEnrollments]);

  useEffect(() => {
    if (selectedClass) {
      // Fetch students from the selected class
      axios.get(`http://localhost/api/classes/ID/${selectedClass}`)
        .then(response => {
          console.log(response);
          const existingStudents =  [];
          const exitingNameData = [];
          for (const student of response?.data?.students) {
            existingStudents.push(student._id);
            exitingNameData.push(`${student.studentName}  ${student.studentId}`);
          }
          setStudentIds(existingStudents);
          setStudentNameData(exitingNameData);
        })
        .catch(error => {
          console.error('Error fetching students for the selected class:', error);
          setStudentIds([]);
        });
    }
  }, [selectedClass]);

  const handleAddStudent = () => {
    if (selectedStudent) {
      // Fetch student ID using the selected student name
      axios.get(`http://localhost/api/students/find/${selectedStudent}`)
        .then(response => {
          const studentId = response.data._id; // Assuming the API returns an object with _id
          const studentNamedata = `${response.data.studentName} ${response.data.studentId}`;
          // Check if studentId is already in the studentIds array
          if (!studentIds.includes(studentId)) {
            setStudentIds([...studentIds, studentId]);
            setStudentNameData([...studentNameData , studentNamedata]);

          }

          setSelectedStudent(''); // Clear selection
        })
        .catch(error => {
          console.error('Error fetching student ID:', error);
        });
    }
  };

  const handleDeleteStudent = (id) => {
    setStudentIds(studentIds.filter(studentId => studentId !== id));
  };

  const updateClassStudents = () => {
    if (selectedClass && studentIds.length > 0) {
      axios.patch(`http://localhost/api/classes/${selectedClass}`, { students: studentIds })
        .then(response => {
          console.log('Class students updated successfully:', response.data);
          Swal.fire({
            title: "Good job!",
            text: "Students Enrolled Successfully",
            icon: "success"
          });
          // Optionally, reset the state or provide feedback to the user

          deleteRequest();

        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            // Show the error message from the response
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
          }
          console.error('Error updating class students:', error);
        });
    }
  };



  const deleteRequest = async()=>{
    for (const studentID of studentIds) {
      try {
          const response = await fetch(`http://localhost/api/student-enroll/${studentID}`, {
              method: 'DELETE',
          });

          if (response.ok) {
              console.log(`Successfully deleted student with ID: ${studentID}`);
          } else {
              console.error(`Failed to delete student with ID: ${studentID}. Status: ${response.status}`);
          }
      } catch (error) {
          console.error(`Error deleting student with ID: ${studentID}`, error);
      }
  }
   
  }

  const handleSubmit = async () => {
    console.log('Student IDs array:', studentIds);

    // Loop through each studentID and send a DELETE request
   

    updateClassStudents(); 

   
};

const handleDelete = ()=>{
  setStudentIds([]);
  setStudentNameData([]);
}


  const uniqueMainClasses = Array.from(new Set(studentEnrollments.map(enrollment => enrollment.ClassName)));

  return (
    <div className="min-h-screen flex bg-gray-100 p-4">
      <div className="flex flex-1 justify-between">
        {/* Form Column */}
        <div className="w-1/2 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Manage Student Enrollment</h2>

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
                <option key={index} value={cls._id}>{`Class ${cls.classId}`}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="mainClass" className="block text-sm font-medium text-gray-700">Requested Class</label>
            <select
              id="mainClass"
              value={selectedMainClass}
              onChange={(e) => setSelectedMainClass(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Main Class</option>
              {uniqueMainClasses.map((mainClass, index) => (
                <option key={index} value={mainClass}>{mainClass}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="student" className="block text-sm font-medium text-gray-700">Student</label>
            <select
              id="student"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Student</option>
              {students.map((student, index) => (
                <option key={index} value={student}>{student}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleAddStudent}
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            Add Student
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="mt-4 w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            Delete All Students
          </button>
        </div>

        {/* Selected Students Column */}
        <div className="w-1/2 bg-white p-6 rounded-md shadow-md ml-4">
          <h3 className="text-lg font-semibold mb-2">Selected Students</h3>
          {studentIds.length > 0 ? (
            studentIds.map((studentId, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-200 p-2 rounded mb-2">
                <span className="text-gray-700">{studentId}..... {studentNameData[index]}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteStudent(studentId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No students selected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentManagement;
