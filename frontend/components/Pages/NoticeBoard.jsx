import React from "react";
import Link from "next/link";
import { notices } from "@/app/constants";
import StudentLayout from "../Student/studentLayout";

const NoticeBoard = () => {
  return (
    <StudentLayout>
      <div className="h-full py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          School Notice Board
        </h1>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white hover:bg-slate-100 hover:scale-105 duration-300 p-6 rounded-xl shadow-xl"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {notice.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Date:</span> {notice.date}
                </p>
                <p className="text-gray-700 mb-4">{notice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default NoticeBoard;
