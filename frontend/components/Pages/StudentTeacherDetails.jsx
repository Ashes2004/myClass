import React, { useState, useEffect } from 'react';
import AdminLayout from '../Administrator/administratorLayout';

const TeacherStudentToggle = () => {
    const [activeTab, setActiveTab] = useState('teacher');
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudentOption, setSelectedStudentOption] = useState('All');

    useEffect(() => {
        if (activeTab === 'teacher') {
            fetchTeachers();
        } else {
            fetchStudents();
        }
    }, [activeTab]);

    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://localhost/api/teachers');
            const data = await response.json();
            setTeachers(data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost/api/students');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleStudentOptionChange = (event) => {
        setSelectedStudentOption(event.target.value);
    };

    return (
        <AdminLayout>
            <div className="p-8 bg-gradient-to-br from-purple-300 to-blue-400 min-h-screen flex flex-col">
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setActiveTab('teacher')}
                        className={`px-6 py-2 mx-2 rounded-full transition duration-300 ${activeTab === 'teacher' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                    >
                        Teachers
                    </button>
                    <button
                        onClick={() => setActiveTab('student')}
                        className={`px-6 py-2 mx-2 rounded-full transition duration-300 ${activeTab === 'student' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                    >
                        Students
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'teacher' ? (
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Teacher Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {teachers.map((teacher, index) => (
                                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                                        <h3 className="text-2xl font-bold mb-2 text-gray-800">{teacher.name}</h3>
                                        <p className="text-gray-600 mb-1"><b>Email:</b> {teacher.email}</p>
                                        <p className="text-gray-600 mb-1"><b>Password:</b> {teacher.password}</p>
                                        <p className="text-gray-600"><b>Subjects:</b> {teacher?.subjects?.join(", ") || " "}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Student Details</h2>
                            <div className="flex flex-col items-center">
                                <select
                                    value={selectedStudentOption}
                                    onChange={handleStudentOptionChange}
                                    className="mb-6 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="All">Select Class</option>
                                    {Array.from(new Set(students.map(student => student?.classId?.classId))).map((classId, index) => (
                                        <option key={index} value={classId}>{classId}</option>
                                    ))}
                                </select>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                                    {selectedStudentOption === 'All'
                                        ? students.map((student, index) => (
                                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                                                <h3 className="text-2xl font-bold mb-2 text-gray-800">{student.studentName}</h3>
                                                <p className="text-gray-600 mb-1">Student ID: {student.studentId}</p>
                                                <p className="text-gray-600 mb-1">Password: {student.password}</p>
                                                <p className="text-gray-600">Class: {student?.classId?.classId|| "NA"}</p>
                                            </div>
                                        ))
                                        : students
                                            .filter(student => student?.classId?.classId === selectedStudentOption)
                                            .map((student, index) => (
                                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                                                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{student.studentName}</h3>
                                                    <p className="text-gray-600 mb-1">Student ID: {student.studentId}</p>
                                                    <p className="text-gray-600">Class: {student?.classId?.classId}</p>
                                                </div>
                                            ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default TeacherStudentToggle;
