import { studentAssignments } from "@/app/constants";
import React from "react";
import StudentLayout from "../Student/studentLayout";
import Image from "next/image";
import Link from "next/link";

const AssignmentPage = () => {
  return (
    <StudentLayout>
      <div className="h-full px-6">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-2">
          Student Assignments
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className={`${assignment.bg} p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative`}
            >
              <div className="absolute -top-5 -right-5 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <Image
                  src={assignment.icon}
                  alt="Icon"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <span
                  className={`text-xs uppercase tracking-wide font-semibold px-3 py-1 rounded-full ${
                    assignment.status === "done"
                      ? "bg-green-600 text-white"
                      : assignment.status === "progress"
                      ? "bg-yellow-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {assignment.statusDesc}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {assignment.task}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Due:</span> {assignment.due}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Time:</span> {assignment.time}
              </p>

              <div className="flex justify-between items-center">
                <Link
                  href={assignment.link}
                  className="text-sm font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
                >
                  View Details
                </Link>

                <div className="flex flex-col items-center space-y-2 w-full md:w-auto md:flex-row md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                  <input
                    type="file"
                    className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-auto"
                  />
                  <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-full md:w-auto">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default AssignmentPage;
