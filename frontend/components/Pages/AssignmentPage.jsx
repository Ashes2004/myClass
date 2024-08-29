import { studentAssignments } from "@/app/constants";
import React from "react";
import StudentLayout from "../Student/studentLayout";
import Image from "next/image";

const AssignmentPage = () => {
  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Student Assignments
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className={`${assignment.bg} p-4 rounded-lg shadow-md flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white p-3 rounded-full">
                    <Image src={assignment.icon} alt="icon" width={24} height={24} className="object-cover" />
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    assignment.status === "done"
                      ? "bg-green-500 text-white"
                      : assignment.status === "progress"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {assignment.statusDesc}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{assignment.task}</h2>
              <p className="text-gray-700">Due: {assignment.due}</p>
              <p className="text-gray-700">Time: {assignment.time}</p>
              <a
                href={assignment.link}
                className="mt-4 text-blue-500 underline"
              >
                View Details
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-4">
            Upload Assignment
          </h2>
          <div className="flex flex-col items-center">
            <input
              type="file"
              className="border border-gray-300 p-2 rounded-lg mb-4"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
              Upload
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AssignmentPage;
