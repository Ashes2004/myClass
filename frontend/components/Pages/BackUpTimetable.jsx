import React from "react";
import StudentLayout from "../Student/studentLayout";

const subjects = {
  Math: "bg-red-200",
  Physics: "bg-green-200",
  History: "bg-blue-200",
  English: "bg-yellow-200",
  PE: "bg-purple-200",
  Chemistry: "bg-pink-200",
  Biology: "bg-teal-200",
  Computer: "bg-orange-200",
  Geography: "bg-violet-400",
};

const Timetable = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [
    {
      desc: "1st Period",
      time: "9-9.40 AM",
    },
    {
      desc: "2nd Period",
      time: "9.40-10.20 AM",
    },
    {
      desc: "3rd Period",
      time: "10.20-11 AM",
    },
    {
      desc: "4th Period",
      time: "11-11.40 AM",
    },
    {
      desc: "5th Period",
      time: "11.40-12.20 PM",
    },
    {
      desc: "BREAK",
      time: "12.20-1 PM",
    },
    {
      desc: "6th Period",
      time: "1-1.40 PM",
    },
    {
      desc: "7th Period",
      time: "1.40-2.20 PM",
    },
    {
      desc: "8th Period",
      time: "2.20-3 PM",
    },
  ];

  const timetableData = [
    [
      "English",
      "Physics",
      "History",
      "Computer",
      "PE",
      "B",
      "Biology",
      "Math",
      "Geography",
    ],
    [
      "English",
      "Math",
      "Geography",
      "History",
      "Biology",
      "R",
      "Chemistry",
      "Physics",
      "Computer",
    ],
    [
      "English",
      "Geography",
      "Math",
      "Physics",
      "Chemistry",
      "E",
      "PE",
      "History",
      "Computer",
    ],
    [
      "Math",
      "History",
      "Physics",
      "Computer",
      "PE",
      "A",
      "Biology",
      "English",
      "Geography",
    ],
    [
      "English",
      "Chemistry",
      "Biology",
      "Math",
      "Physics",
      "K",
      "Computer",
      "Geography",
      "PE",
    ],
  ];

  return (
    <StudentLayout>
      <div className="h-full flex flex-col gap-7 justify-center items-center p-4">
        <h2 className="font-bold text-center text-3xl md:text-6xl underline">
          Class Routine of Class X-B
        </h2>
        <h3 className="font-semibold text-xl md:text-3xl">
          Class Teacher: Teacher Name
        </h3>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-2 py-3 border border-gray-300">
                  Day / Period
                </th>
                {periods.map((period, index) => (
                  <th key={index} className="px-2 py-3 border border-gray-300">
                    <h2 className="text-xs md:text-lg font-bold">
                      {period.desc}
                    </h2>
                    <p className="text-xs font-semibold">({period.time})</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex}>
                  <td className="px-2 py-3 border border-gray-300 font-bold text-center">
                    {day}
                  </td>
                  {timetableData[dayIndex].map((subject, periodIndex) => (
                    <td
                      key={periodIndex}
                      className={`px-2 py-3 border border-gray-300 text-center ${subjects[subject]}`}
                    >
                      {subject === "B" ||
                      subject === "R" ||
                      subject === "E" ||
                      subject === "A" ||
                      subject === "K"
                        ? "BREAK"
                        : subject}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Timetable;
