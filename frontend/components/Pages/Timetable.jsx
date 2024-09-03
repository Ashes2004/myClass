import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentLayout from "../Student/studentLayout";

const colorArray = [
  "bg-red-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-teal-200",
  "bg-orange-200",
  "bg-violet-400",
  "bg-gray-200",
];

// Function to assign colors sequentially
const assignColorsSequentially = (subjects) => {
  const colorMap = {};
  subjects.forEach((subject, index) => {
    colorMap[subject] = colorArray[index % colorArray.length];
  });
  return colorMap;
};

const Timetable = () => {
  const [studentData, setStudentData] = useState(null);
  const [routineData, setRoutineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectColors, setSubjectColors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = sessionStorage.getItem("studentToken");
      if (!token) {
        router.push("/student/studentLogin");
        return;
      }

      try {
        const response = await fetch("http://localhost/api/students/get/student", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          router.push("/student/studentLogin");
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setStudentData(data);
        console.log(data);
        // Fetch routine data based on class ID
        fetchRoutineData(data?.classId?._id);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchRoutineData = async (classid) => {
      try {
        if(classid){
        const response = await fetch(`http://localhost/api/class-routine/${classid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch class routine data");
        }

        const data = await response.json();
        setRoutineData(data?.routine); // Assuming routine data is in the `routine` field

        // Set colors for each unique subject
        const uniqueSubjects = [...new Set(data.routine.flatMap(day => day.periods.map(p => p.subject)))];
        const colors = assignColorsSequentially(uniqueSubjects);
        setSubjectColors(colors);
      }else{
        return <Text className = "text-3xl text-blue-500 font-semibold text-center">You have not enrolled any Classes</Text>
      }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      
    };
  

    fetchStudentData();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!routineData.length) return <p className = "text-3xl text-blue-500 font-semibold text-center">No routine data available</p>;

  const periods = [
    { desc: "1st Period", time: "09:00 - 09:40" },
    { desc: "2nd Period", time: "09:40 - 10:20" },
    { desc: "3rd Period", time: "10:20 - 11:00" },
    { desc: "4th Period", time: "11:00 - 11:40" },
    { desc: "5th Period", time: "11:40 - 12:20" },
    { desc: "BREAK", time: "12:20 - 13:00" },
    { desc: "6th Period", time: "13:00 - 13:40" },
    { desc: "7th Period", time: "13:40 - 14:20" },
    { desc: "8th Period", time: "14:20 - 15:00" },
  ];

  // Create a map of days to periods
  const timetableMap = routineData.reduce((acc, dayData) => {
    acc[dayData.day] = dayData.periods;
    return acc;
  }, {});

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <StudentLayout>
      <div className="h-full flex flex-col gap-7 justify-center items-center p-4">
        <h2 className="font-bold text-center text-3xl md:text-6xl underline">
          Class Routine of {studentData ? studentData.classId?.name : "Loading..."}
        </h2>
        <h3 className="font-semibold text-xl md:text-3xl">
          Class Teacher: {studentData ? studentData.classId?.classTeacher?.name : "Loading..."}
        </h3>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-2 py-3 border border-gray-300">
                  Day / Period
                </th>
                {studentData?.classId && periods.map((period, index) => (
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
              {days.map((day, dayIndex) => {
                const dayPeriods = timetableMap[day] || [];
                return (
                  <tr key={dayIndex}>
                    <td className="px-2 py-3 border border-gray-300 font-bold text-center">
                      {day}
                    </td>
                    {periods.map((period, periodIndex) => {
                      const periodData = dayPeriods.find(p => {
                        const currentPeriodStart = period.time.split(" - ")[0];
                        const currentPeriodEnd = period.time.split(" - ")[1];
                        return (currentPeriodStart >= p.startPeriod && currentPeriodEnd <= p.endPeriod);
                      }) || {};

                      return (
                        <td
                          key={periodIndex}
                          className={`px-2 py-3 border border-gray-300 text-center ${period.desc === "BREAK" ? "bg-white" : subjectColors[periodData.subject] || "bg-white"}`}
                        >
                          {period.desc === "BREAK" ? "BREAK" : periodData.subject || "FREE"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Timetable;
