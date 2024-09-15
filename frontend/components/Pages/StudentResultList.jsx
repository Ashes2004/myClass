import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import StudentLayout from "../Student/studentLayout";

const StudentResultList = () => {
  const [results, setResults] = useState([]);
  const router = useRouter();
  const StudentId = sessionStorage.getItem("studentId");

  useEffect(() => {
    if (!StudentId) {
      router.push("/student");
    }
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/result/student/${StudentId}`
        );
        setResults(response.data.studentResults);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  // Handle navigation to result details page
  const handleSeeResult = (resultId) => {
    router.push(`/student/gradecard/${resultId}`);
  };

  return (
    <StudentLayout>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-200 p-10">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 drop-shadow-lg">
          Exam Results
        </h1>

        <div className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
          <table className="w-full  border-collapse border border-gray-300 bg-white shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-300 p-3 text-left">
                  Exam Name
                </th>
                <th className="border border-gray-300 p-3 text-left"> Date</th>
                <th className="border border-gray-300 p-3 text-left"></th>
              </tr>
            </thead>
            <tbody >
              {results?.map(
                (result) =>
                  result.visibility && (
                    <tr
                      key={result.ResultId}
                      className=" hover:bg-blue-50  transition duration-300"
                    >
                      <td className="border border-gray-300 p-3">
                        {result.examName}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {result.publishDate ? result.publishDate : result.year}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <button
                          onClick={() => handleSeeResult(result.ResultId)}
                          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        >
                          See Result
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentResultList;
