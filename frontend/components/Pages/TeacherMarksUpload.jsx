import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherLayout from '../Teacher/teacherLayout';
import { useRouter } from 'next/navigation';

const TeacherMarksUpload = () => {
  const [classTeacher, setClassTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedExamName, setSelectedExamName] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [examOptions, setExamOptions] = useState([]);
  const [marks, setMarks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

 
  const router = useRouter();
  const teacherID = sessionStorage.getItem('teacherID');
  useEffect(() => {
  
    const fetchClassTeacher = async () => {
      if (!teacherID) {
        router.push('/teacher');
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/teachers/${teacherID}`);
        if (response.data.ClassTeacher) {
          setClassTeacher(response.data.ClassTeacher);
          fetchClassSubjects(response.data.ClassTeacher._id);
          fetchStudents(response.data.ClassTeacher._id);
          fetchExams(); // Fetch exams when teacher data is available
        } else {
          setErrorMessage('You have not been assigned as a class teacher yet.');
        }
      } catch (error) {
        console.error('Error fetching teacher data', error);
        setErrorMessage('Failed to fetch data. Please try again.');
      }
    };
    fetchClassTeacher();
  }, [teacherID]);

  const fetchClassSubjects = async (classId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/classes/${classId}`);
      setSubjects(response.data.subjects);
      setMarks(response.data.subjects.map(subject => ({
        subject: subject.subjectName,
        TotalMarks: 100,
        obtainMarks: 0
      })));
    } catch (error) {
      console.error('Error fetching class subjects', error);
    }
  };

  const fetchStudents = async (classId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/classes/ID/${classId}`);
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/result');
      const exams = response.data;
      setExamOptions(exams);
    } catch (error) {
      console.error('Error fetching exams', error);
    }
  };

  const handleMarksChange = (index, field, value) => {
    const updatedMarks = [...marks];
    updatedMarks[index][field] = value;
    setMarks(updatedMarks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultData = {
      examName: selectedExamName,
      year: selectedYear,
      classID: classTeacher._id,
      studentID: selectedStudentId,
      subjects: marks,
    };

    try {
      const resp = await axios.patch('http://localhost:5000/api/result', resultData);
      alert('Result updated successfully');
    } catch (error) {
      console.error('Error updating result', error);
      alert('Failed to update result');
    }
  };

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Marks Upload Panel</h2>
        
        {errorMessage && (
          <p className="text-red-500 font-semibold mb-4">{errorMessage}</p>
        )}

        {classTeacher && (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Class: {classTeacher.classId}</h3>

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">Exam Name</label>
                <select
                  value={selectedExamName}
                  onChange={(e) => {
                    const selectedOption = examOptions.find(exam => exam.examName === e.target.value);
                    setSelectedExamName(e.target.value);
                    console.log("target option: ", selectedOption);
                    
                    setSelectedYear(selectedOption ? selectedOption.year : 'no');
                  }}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>Select an exam</option>
                  {examOptions.map(exam => (
                    <option key={exam._id} value={exam.examName}>
                      {exam.examName} : {exam.year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Year</label>
                <input
                  type="text"
                  value={selectedYear}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Select Student</label>
                <select
                  value={selectedStudentId || ''}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>Select a student</option>
                  {students.map(student => (
                    <option key={student._id} value={student._id}>
                      {student.studentName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marks Table */}
              <h4 className="text-xl font-semibold text-gray-700">Marks for Subjects</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-50 shadow-md rounded-md">
                  <thead>
                    <tr className="bg-indigo-600 text-white text-left">
                      <th className="p-4">Subject</th>
                      <th className="p-4">Total Marks</th>
                      <th className="p-4">Obtain Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => (
                      <tr key={subject.subjectName} className="bg-white border-b">
                        <td className="p-4 font-semibold text-gray-700">{subject.subjectName}</td>
                        <td className="p-4">
                          <input
                            type="number"
                            value={marks[index].TotalMarks}
                            onChange={(e) => handleMarksChange(index, 'TotalMarks', e.target.value)}
                            required
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            value={marks[index].obtainMarks}
                            onChange={(e) => handleMarksChange(index, 'obtainMarks', e.target.value)}
                            required
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
              >
                Submit Marks
              </button>
            </form>
          </>
        )}
      </div>
    </TeacherLayout>
  );
};

export default TeacherMarksUpload;
