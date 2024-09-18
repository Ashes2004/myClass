import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../Administrator/administratorLayout";
import Swal from "sweetalert2";
const AdminResultPublish = () => {
  const [results, setResults] = useState([]);
  const [selectedResultId, setSelectedResultId] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studentResults, setStudentResults] = useState(null);
  const [showClassStudentModal, setShowClassStudentModal] = useState(false);
  const [showStudentResultModal, setShowStudentResultModal] = useState(false);
  const [showCreateResultModal, setShowCreateResultModal] = useState(false);
  const [examName, setExamName] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/result");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results", error);
      }
    };
    fetchResults();
  }, []);


  const handleCreateResult = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/result", {
        examName,
        year,
      });
      setResults([...results, response.data]);
      setShowCreateResultModal(false);
      Swal.fire({
        title: "Good job!",
        text: "Exam created successfully .",
        icon: "success",
      });
    } catch (error) {
      console.error("Error creating result", error);
      alert("Failed to create result");
    }
  };

  const handleDeleteResult = async (ResultID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/result/${ResultID}`);
  
    Swal.fire({
      title: "Good job!",
      text: "Exam deleted successfully .",
      icon: "success",
    });
    window.location.reload();
    } catch (error) {
      console.error("Error creating result", error);
      alert("Failed to create result");
    }
  };

  useEffect(() => {
    if (selectedResultId) {
      const result = results.find((r) => r._id === selectedResultId);
      if (result) {
        setClassList(result.ClassDetails);
        setSelectedClass(null);
        setStudentList([]);
        setSelectedStudent(null);
        setStudentResults(null);
      }
    }
  }, [selectedResultId]);

  useEffect(() => {
    if (selectedClass) {
      const classDetails = classList.find((cls) => cls._id === selectedClass);
      if (classDetails) {
        setStudentList(classDetails.class.students);
      }
    }
  }, [selectedClass]);

  const handleToggleVisibility = (resultId) => {
    setResults((prevResults) =>
      prevResults.map((result) =>
        result._id === resultId
          ? { ...result, visibility: !result.visibility }
          : result
      )
    );
  };

  const handlePublish = async (resultId) => {
    const publishDate = new Date().toLocaleDateString("en-IN");

    try {
      await axios.patch(`http://localhost:5000/api/result/admin/${resultId}`, {
        visibility: results.find((result) => result._id === resultId)
          .visibility,
        publishDate,
      });
      Swal.fire({
        title: "Good job!",
        text: "Result Updated successfully .",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating result", error);
      alert("Failed to update result");
    }
  };

  const handleShowResult = async () => {
    if (selectedStudent) {
      const result = results.find((r) => r._id === selectedResultId);
      if (result) {
        const classDetails = result.ClassDetails.find(
          (cls) => cls._id === selectedClass
        );
        if (classDetails) {
          const student = classDetails.class.students.find(
            (s) => s.student._id === selectedStudent
          );
          if (student) {
            console.log("hiii");

            setStudentResults(student);
            setShowStudentResultModal(true);
          } else {
            console.log("hiii-bye", classDetails);
            console.log("selected student", selectedStudent);
          }
        }
      }
    }
  };

  const handleCloseClassStudentModal = () => {
    setShowClassStudentModal(false);
  };

  const handleCloseStudentResultModal = () => {
    setShowStudentResultModal(false);
  };

  const publishedResults = results.filter((result) => result.publishDate);
  const unpublishedResults = results.filter((result) => !result.publishDate);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Results List
        </h2>

        <button
          onClick={() => setShowCreateResultModal(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300 mb-6"
        >
          Create Result
        </button>

        {results.length === 0 ? (
          <p className="text-center text-gray-500">No results available.</p>
        ) : (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                Unpublished Results
              </h3>
              {unpublishedResults.length === 0 ? (
                <p className="text-center text-gray-500">
                  No unpublished results.
                </p>
              ) : (
                unpublishedResults.map((result) => (
                  <div
                    key={result._id}
                    className="border-b border-gray-200 py-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-gray-700">
                        {result.examName} ({result.year})
                      </h4>
                      <div className="flex items-center">
                        <label className="mr-3 text-gray-700">Visibility</label>
                        <input
                          type="checkbox"
                          checked={result.visibility}
                          onChange={() => handleToggleVisibility(result._id)}
                          className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                      </div>
                      <button
                        onClick={() => handlePublish(result._id)}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300 mt-2"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => handleDeleteResult(result._id)}
                        className="bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition duration-300 mt-2"
                      >
                        delete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedResultId(result._id);
                          setShowClassStudentModal(true);
                        }}
                        className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition duration-300 mt-2 ml-2"
                      >
                        Show Result
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                Published Results
              </h3>
              {publishedResults.length === 0 ? (
                <p className="text-center text-gray-500">
                  No published results.
                </p>
              ) : (
                publishedResults.map((result) => (
                  <div
                    key={result._id}
                    className="border-b border-gray-200 py-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <h4 className="text-xl font-semibold text-gray-700">
                        {result.examName} ({result.year})
                      </h4>
                      <h4 className="text-xl font-semibold text-gray-700">
                        Published On {result.publishDate}
                      </h4>
                    </div>
                      <div className="flex items-center">
                        <label className="mr-3 text-gray-700">Visibility</label>
                        <input
                          type="checkbox"
                          checked={result.visibility}
                          onChange={() => handleToggleVisibility(result._id)}
                          className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                      </div>
                      <button
                        onClick={() => handlePublish(result._id)}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300 mt-2"
                      >
                        Update Publish
                      </button>
                      <button
                        onClick={() => handleDeleteResult(result._id)}
                        className="bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition duration-300 mt-2"
                      >
                        delete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedResultId(result._id);
                          setShowClassStudentModal(true);
                        }}
                        className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition duration-300 mt-2 ml-2"
                      >
                        Show Result
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {showClassStudentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-bold mb-4">
              Select Class and Student
            </h3>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Class</label>
              <select
                value={selectedClass || ""}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="form-select block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Class</option>
                {classList.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.class.classID.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Student</label>
              <select
                value={selectedStudent || ""}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="form-select block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Student</option>
                {studentList.map((student) => (
                  <option key={student.student._id} value={student.student._id}>
                    {student.student.studentName}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleShowResult}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Show Result
            </button>
            <button
              onClick={handleCloseClassStudentModal}
              className="bg-red-600 text-white py-2 ml-6 px-4 rounded-md font-semibold hover:bg-red-700 transition duration-300 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showStudentResultModal && studentResults && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-bold mb-4">Student Result</h3>
            <p>
              <strong>Student Name:</strong>{" "}
              {studentResults.student.studentName}
            </p>

            <div className="mt-4">
              <h4 className="font-bold mb-2">Marks:</h4>
              <ul>
                {studentResults.marks.map((mark, index) => (
                  <li key={index} className="mb-1">
                    <strong>{mark.subject}:</strong> {mark.obtainMarks}/
                    {mark.TotalMarks}
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                {(() => {
                  const totalMarks = studentResults.marks.reduce(
                    (acc, mark) => acc + mark.TotalMarks,
                    0
                  );
                  const obtainedMarks = studentResults.marks.reduce(
                    (acc, mark) => acc + mark.obtainMarks,
                    0
                  );
                  const averageMarks = (obtainedMarks / totalMarks) * 100;

                  let grade = "";
                  if (averageMarks >= 90) {
                    grade = "A";
                  } else if (averageMarks >= 80) {
                    grade = "B";
                  } else if (averageMarks >= 70) {
                    grade = "C";
                  } else if (averageMarks >= 60) {
                    grade = "D";
                  } else {
                    grade = "F";
                  }

                  return (
                    <div>
                      <p>
                        <strong>Total Marks:</strong> {obtainedMarks}/
                        {totalMarks}
                      </p>
                      <p>
                        <strong>Grade:</strong> {grade}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>

            <button
              onClick={handleCloseStudentResultModal}
              className="bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition duration-300 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}



{showCreateResultModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-bold mb-4">Create New Result</h3>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Exam Name</label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={handleCreateResult}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Submit
            </button>
            <button
              onClick={() => setShowCreateResultModal(false)}
              className="bg-red-600 text-white py-2 ml-4 px-4 rounded-md font-semibold hover:bg-red-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminResultPublish;
