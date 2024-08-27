import React from "react";
import Link from "next/link";
import { studentSubject } from "@/app/constants";
import StudentLayout from "../Student/studentLayout";
import Image from "next/image";

const SubjectMaterials = () => {
  return (
    <StudentLayout>
      <div className="h-full py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Subject Materials
        </h1>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {studentSubject.map((subject) => (
              <div
                key={subject.id}
                className={`p-6 rounded-xl shadow-xl text-white ${subject.bg}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white rounded-full p-3">
                    <Image
                      src={subject.icon}
                      width={24}
                      height={24}
                      alt="icon"
                      className="object-cover"
                    />
                  </div>

                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{subject.sub}</h2>
                </div>
                <p className="mb-4">
                  <span className="font-semibold">Type:</span> {subject.type}
                </p>
                <Link href={subject.link}>
                  <h2 className="inline-block px-4 py-2 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-300 duration-200">
                    View Materials
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default SubjectMaterials;
