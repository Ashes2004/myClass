import Link from "next/link";
import React from "react";
import { ArrowLeftIcon, CaretLeftIcon } from "@radix-ui/react-icons";
import { useLeaderboard } from "./leaderBoardBody";
const LeaderBoardLayout = ({ children }) => {
  const { isOpen, showQuizBoard, showAssignmentBoard } = useLeaderboard();
  const windowWidth = window.innerWidth;
  const translate = (windowWidth - 142.95) / 2;
  return (
    <>
      <header className="p-3 flex bg-violet-600">
        <div className="w-1/12">
          <Link href="/student" className="invert">
            <ArrowLeftIcon width="20" height="20" />
          </Link>
        </div>
        <p className="text-center w-10/12 text-white font-bold tracking-wide text-xl md:pl-3 lg:pl-8">
          Leaderboard
        </p>
      </header>
      <div className="fixed z-50 shadow-xl md:hidden transition-all delay-300 duration-300 -right-40 hover:-right-0 flex p-4 gap-2 justify-center items-center text-white bg-blue-800 rounded-l-full">
        <CaretLeftIcon width={24} height={24} />
        <Link href="/performance">Performace Analysis</Link>
      </div>
      <div
        className={`flex justify-center items-center fixed gap-2 bg-violet-900 p-1 tracking-wider shadow-xl lg:translate-y-1/2 rounded-full  text-[10px] md:text-sm`}
        style={{ translate: translate }}
      >
        <button
          onClick={() => showQuizBoard()}
          className={`${
            isOpen ? "bg-violet-400" : "bg-violet-900"
          } px-3 py-1 rounded-full text-white`}
        >
          Quiz
        </button>
        <button
          onClick={() => showAssignmentBoard()}
          className={`${
            isOpen ? "bg-violet-900" : "bg-violet-400"
          } px-3 py-1 rounded-full text-white`}
        >
          Assignment
        </button>
      </div>
      <Link
        href="/student/performance"
        className="fixed hidden md:flex z-50 shadow-xl hover:scale-110 transition delay-150 duration-200 right-0 p-4 gap-2 justify-center items-center text-white bg-blue-800 rounded-l-full"
      >
        <CaretLeftIcon width={24} height={24} />
        Performace Analysis
      </Link>
      <div className="flex w-full h-screen md:p-8 pt-2 bg-gradient-to-b from-violet-600 to-white">
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default LeaderBoardLayout;
