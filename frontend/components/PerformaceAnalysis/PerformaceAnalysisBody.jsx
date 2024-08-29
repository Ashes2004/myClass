import React, { useState } from "react";
import PerformanceAnalysisLayout from "./PerformanceAnalysisLayout";
import BarChart from "../structComponents/BarChart";
import DoughnutChart from "../structComponents/DoughnutChart";
import SyllabusCoverDoughnutChart from "../structComponents/SyllabusCoverDoughnutChart";
import Image from "next/image";
import { caret_back, caret_forward } from "@/public/Icons";
const PerformaceAnalysisBody = () => {
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [performance, setPerformance] = useState({
    _id: 1,
    name: "",
    rollNumber: 1,
    lastFourResults: [70, 73, 76, 68, 65],
    highest: 76,
    average: 70.4,
    classPerformance: {
      average: 65,
      highest: 98,
    },
    subjectwisePerformance: [
      {
        subjectName: "Physical Science",
        corrects: 60,
        notAttempted: 20,
      },
      {
        subjectName: "Mathematics",
        corrects: 56,
        notAttempted: 25,
      },
      {
        subjectName: "Geography",
        corrects: 80,
        notAttempted: 5,
      },
      {
        subjectName: "English",
        corrects: 95,
        notAttempted: 0,
      },
      {
        subjectName: "History",
        corrects: 71,
        notAttempted: 12,
      },
    ],
    topicwisePerformance: [
      {
        subjectName: "Physical Science",
        topics: [
          {
            topicName: "Light",
            totalQuestions: 27,
            attempted: 25,
            corrects: 25,
          },
          {
            topicName: "Human Eyes",
            totalQuestions: 16,
            attempted: 15,
            corrects: 14,
          },
          {
            topicName: "Electricity",
            totalQuestions: 25,
            attempted: 22,
            corrects: 21,
          },
          {
            topicName: "Magnetic Effects",
            totalQuestions: 20,
            attempted: 20,
            corrects: 16,
          },
          {
            topicName: "Source of Energy",
            totalQuestions: 12,
            attempted: 12,
            corrects: 12,
          },
        ],
      },
      {
        subjectName: "Mathematics",
        topics: [
          {
            topicName: "Coordinate Geometry",
            totalQuestions: 27,
            attempted: 25,
            corrects: 10,
          },
          {
            topicName: "Real Numbers",
            totalQuestions: 27,
            attempted: 25,
            corrects: 25,
          },
          {
            topicName: "Trigonometry",
            totalQuestions: 16,
            attempted: 15,
            corrects: 14,
          },
          {
            topicName: "Polynomials",
            totalQuestions: 20,
            attempted: 20,
            corrects: 7,
          },
          {
            topicName: "Quadratic Equations",
            totalQuestions: 12,
            attempted: 12,
            corrects: 5,
          },
        ],
      },
      {
        subjectName: "Geography",
        topics: [
          {
            topicName: "Forest & Wildlife Res.",
            totalQuestions: 27,
            attempted: 25,
            corrects: 25,
          },
          {
            topicName: "Water Resources",
            totalQuestions: 16,
            attempted: 15,
            corrects: 14,
          },
          {
            topicName: "Mineral & Energy Res.",
            totalQuestions: 25,
            attempted: 22,
            corrects: 21,
          },
          {
            topicName: "Manufacturing Industries",
            totalQuestions: 20,
            attempted: 20,
            corrects: 16,
          },
          {
            topicName: "National Economy",
            totalQuestions: 12,
            attempted: 12,
            corrects: 12,
          },
        ],
      },
    ],
  });
  const noOfSubjects = performance?.subjectwisePerformance?.length;
  const noOfSubs = performance?.topicwisePerformance?.length;
  const swipeLeft = (option) => {
    switch (option) {
      case "subject":
        {
          if (index === 0) setIndex(noOfSubjects - 1);
          else setIndex((index) => index - 1);
        }
        break;
      case "syllabus": {
        if (index2 === 0) setIndex2(noOfSubs - 1);
        else setIndex2((index2) => index2 - 1);
      }
    }
  };
  const swipeRight = (option) => {
    switch (option) {
      case "subject":
        {
          if (index === noOfSubjects - 1) setIndex(0);
          else setIndex((index) => index + 1);
        }
        break;
      case "syllabus": {
        if (index2 === noOfSubs - 1) setIndex2(0);
        else setIndex2((index2) => index2 + 1);
      }
    }
  };
  return (
    <PerformanceAnalysisLayout>
      <div className="md:flex">
        <div className="shadow-2xl shadow-gray-300 rounded-md p-2 md:w-1/2 bg-white">
          <p className="text-md font-medium text-center md:mb-2 mb-1.5">
            Performance Graph
          </p>
          <BarChart performance={performance} />
          <div className="mt-4 mx-2 md:flex justify-evenly">
            <div className="text-[10px] md:text-[12px] pb-3 flex items-center tracking-wider gap-1.5">
              <div className="bg-red-500 w-[10px] h-[10px] rounded-full"></div>
              Your Highest Score- {performance.highest}
            </div>
            <div className="text-[10px] md:text-[12px] pb-3 flex items-center tracking-wider gap-1.5">
              <div className="bg-purple-500 w-[10px] h-[10px] rounded-full"></div>
              Your Average Score- {performance.average}
            </div>
            <div className="text-[10px] md:text-[12px] flex items-center pb-3 tracking-wider gap-1.5">
              <div className="bg-blue-500 w-[10px] h-[10px] rounded-full"></div>
              Class Average Score- {performance.classPerformance.average}
            </div>
          </div>
        </div>
        <div className="rounded-md shadow-xl p-2 mt-3 md:mt-0 md:ml-3 md:w-1/2 bg-white">
          <p className="text-md font-medium text-center mb-2.5">
            Subjectwise Performance Analysis
          </p>
          <div className="grid md:grid-cols-5 grid-cols-7">
            <button
              onClick={() => swipeLeft("subject")}
              className="col-span-1 flex justify-center items-center rounded-tl-lg rounded-bl-lg bg-slate-200 hover:bg-slate-400 "
            >
              <Image src={caret_back} width={60} height={60} alt="image"/>
            </button>
            <div className="md:col-span-3 col-span-5 text-center">
              <DoughnutChart performance={performance} index={index} />
              <p className="md:-mt-5 md:pb-2 mt-3 md:text-sm font-medium text-[10px] tracking-wider bg-green-400 text-white mx-12 md:mx-36 rounded-full p-1 md:pt-1">
                {performance.subjectwisePerformance[index].subjectName}
              </p>
            </div>
            <button
              onClick={() => swipeRight("subject")}
              className="col-span-1 flex justify-center items-center rounded-tr-lg rounded-br-lg bg-slate-200 hover:bg-slate-400 "
            >
              <Image src={caret_forward} width={60} height={60} alt="image"/>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 md:mt-6 p-2 rounded-md shadow-xl bg-white">
        <div className="md:grid grid-cols-2">
          <div>
            <div className="flex justify-center">
              <span className="md:text-sm text-[12px] font-medium text-center tracking-wider bg-green-400 p-1 md:px-6 md:py-2 px-3 rounded-full text-white mb-1.5">
                {performance.topicwisePerformance[index2].subjectName}
              </span>
            </div>
            <div className="grid md:grid-cols-5 grid-cols-7">
              <button
                onClick={() => swipeLeft("syllabus")}
                className="col-span-1 flex justify-center items-center rounded-tl-lg rounded-bl-lg bg-slate-200 hover:bg-slate-400 "
              >
                <Image src={caret_back} width={60} height={60} alt="image"/>
              </button>
              <div className="md:col-span-3 col-span-5">
                <SyllabusCoverDoughnutChart
                  performance={performance}
                  index={index2}
                />
              </div>
              <button
                onClick={() => swipeRight("syllabus")}
                className="col-span-1 flex justify-center items-center rounded-tr-lg rounded-br-lg bg-slate-200 hover:bg-slate-400 "
              >
                <Image src={caret_forward} width={60} height={60} alt="image"/>
              </button>
            </div>
          </div>
          <div className="md:pl-4">
            <p className="md:text-sm text-[12px] font-medium text-center md:py-2 tracking-wider mt-3 md:mt-0">
              Topicwise Analysis
            </p>
            <div className="grid md:grid-cols-2 m-2 text-center gap-2 text-[12px] md:text-sm">
              {performance.topicwisePerformance[index2].topics.map((topic) => (
                <div
                  key={topic.topicName}
                  className="md:py-3.5 md:whitespace-pre bg-green-400 text-white rounded-full p-1.5 font-medium tracking-wider col-span-1"
                >
                  {topic.topicName} X{topic.totalQuestions} X{topic.attempted} X
                  {topic.corrects}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PerformanceAnalysisLayout>
  );
};

export default PerformaceAnalysisBody;
