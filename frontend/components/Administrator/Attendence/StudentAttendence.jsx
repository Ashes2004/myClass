import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceBox = () => {
  const [classNames, setClassNames] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState("Today");
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const fetchClassNames = async () => {
      try {
        const response = await axios.get("http://localhost/api/classes");
        const classes = response.data.reduce((acc, cls) => {
          acc[cls.classId] = cls.name;
          return acc;
        }, {});
        setClassNames(classes);
        fetchAttendanceData(Object.keys(classes));
      } catch (error) {
        console.error("Error fetching class names:", error);
      }
    };

    fetchClassNames();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async (classIds) => {
      try {
        const today = new Date();
        let startDate;

        switch (selectedDateRange) {
          case "Yesterday":
            startDate = new Date(today.setDate(today.getDate() - 1));
            break;
         
          case "Today":
          default:
            startDate = new Date();
        }

        const formattedDate = (date) => {
          const day = date.getDate().toString().padStart(1, '0');
          const month = (date.getMonth() + 1).toString().padStart(1, '0');
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };

        const formattedStartDate = formattedDate(startDate);

        const dataPromises = classIds.map(async (classId) => {
          try {
            const response = await axios.get(`http://localhost/api/attendence/${classId}/${formattedStartDate}`);
            return {
              classId,
              className: classNames[classId] || classId,
              presentCount: response.data.presentCount,
              absentCount: response.data.absentCount,
            };
          } catch (error) {
            console.error(`Error fetching attendance data for ${classId}:`, error);
            return null; // Return null for classes with fetch errors
          }
        });

        const data = await Promise.all(dataPromises);
        // Filter out null values (classes with fetch errors)
        setDisplayData(data.filter(item => item !== null));
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    if (Object.keys(classNames).length > 0) {
      fetchAttendanceData(Object.keys(classNames));
    }
  }, [selectedDateRange, classNames]);

  const handleDateRangeChange = (e) => {
    setSelectedDateRange(e.target.value);
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Attendance Overview</h2>

      {/* Date Range Dropdown */}
      <div className="mb-8">
        <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
          Select Date Range:
        </label>
        <select
          id="dateRange"
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
         
        </select>
      </div>

      {/* Display Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayData.length > 0 ? (
          displayData.map((data) => (
            <div key={data.classId} className="bg-white shadow-md rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="text-xl font-semibold text-blue-700">{data.className}</h3>
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-medium text-green-600">Present: <span className="text-black font-bold">{data.presentCount}</span></p>
                <p className="text-lg font-medium text-red-600">Absent: <span className="text-black font-bold">{data.absentCount}</span></p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No attendance data available for the selected date range.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceBox;
