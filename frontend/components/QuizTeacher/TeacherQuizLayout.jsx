"use client";
import { arrow_back } from "@/public/Icons";
import Image from "next/image";
import React from "react";
import Link from "next/link";
const TeacherQuizLayout = ({ children }) => {
  return (
    <>
      <header className="bg-violet-600 sticky w-full px-3 py-3  shadow-md shadow-violet-400 grid grid-cols-12 align-middle">
        <Link href="/teacher" className="col-span-2 flex">
          <Image
            src={arrow_back}
            width={24}
            height={24}
            className="invert"
            alt="back-arrow"
          />
        </Link>
        <p className="text-center col-span-8 md:text-2xl font-bold text-white text-lg">
          Quiz
        </p>
      </header>
      <div className="w-full h-screen">{children}</div>
    </>
  );
};

export default TeacherQuizLayout;
