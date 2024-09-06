import React, { useEffect, useState } from "react";
import Image from "next/image";
import { arrow_left_filled, arrow_right_filled } from "@/public/Icons";
import { useAttendanceContext } from "./attendenceBody";

const AttendanceBar = () => {
  const {
    isOpen,
    rollNumber,
    handleAbsent,
    handleUpdate,
    handleHoliday,
    handlePresent,
    handleRight,
    handleLeft,
    handleSubmit,
    currStudent,
    students,
  } = useAttendanceContext();

  const [attendenceTaken, setAttendenceTaken] = useState(false);
  const [holidayDisabled, setHolidayDisabled] = useState(false);
  const [attendanceDisable, setAttendanceDisabled] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchAttendance = async () => {
      const ID = sessionStorage.getItem("classteacher");
      try {
        let attendenceDate = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
        console.log(ID + " ***" + attendenceDate);

        const response = await fetch(`http://localhost/api/attendence/${ID}/${attendenceDate}`);
        if (response.ok) {
          setAttendenceTaken(true); // Attendance has been taken for the day
        } else {
          setAttendenceTaken(false); // No attendance for today
        }
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      } finally {
        setLoading(false); // Fetch completed
      }
    };
    fetchAttendance();
  }, []); // Run this effect only once when the component mounts

  const handleLeftClick = () => handleLeft();
  const handleRightClick = () => handleRight();
  const handlePresentClick = () => {
    handlePresent();
    setHolidayDisabled(true);
  };
  const handleAbsentClick = () => {
    setHolidayDisabled(true);
    handleAbsent();
  };
  const handleHolidayClick = () => {
    setAttendanceDisabled(true);
    handleHoliday();
  };
  const handleSubmitClick = () => {
    handleSubmit();
    setAttendenceTaken(true); // Set state to reflect that attendance has been taken
  };
  const handleUpdateClick = () => handleUpdate();

  const d = new Date();
  const date = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return (
    <div
      className={`sticky bg-slate-300 md:w-[32rem] rounded-md md:ml-6 px-8 shadow-md shadow-slate-900 md:mb-18 md:mt-12 mx-3 ${
        isOpen ? "opacity-20" : ""
      }`}
    >
      <p className="md:text-lg text-sm font-medium md:font-semibold text-center mt-3 pt-3 tracking-wider ">
        Attendance Sheet
      </p>
      <p className="text-center tracking-wider font-medium text-sm md:text-md md:font-semibold underline underline-offset-4 p-1  ">
        Date: {date}/{month}/{year}
      </p>
      <div className="md:flex justify-between grid grid-cols-3 gap-3 mt-6 items-center outline outline-black outline-2 p-4 rounded-lg shadow-md shadow-slate-500">
        <button onClick={handleLeftClick}>
          <Image src={arrow_left_filled} width={50} height={50} />
        </button>
        <div className="flex-row">
          <div className=" text-black outline-black  outline-1 outline md:px-6 py-3  text-center rounded-lg bg-white">
            {rollNumber}
          </div>
          <h3 className="text-center p-1">{currStudent?.studentName}</h3>
        </div>
        <button onClick={handleRightClick}>
          <Image src={arrow_right_filled} width={50} height={50} />
        </button>
      </div>

      <div className="mt-10 flex flex-col md:gap-6 gap-3">
        {/* Show buttons only when loading is complete */}
        {!loading && (
          <>
            <button
              onClick={handlePresentClick}
              disabled={attendanceDisable}
              className="mb-1 p-4"
            >
              <span
                className={` ${
                  attendanceDisable ? "opacity-30 hover:opacity-30" : ""
                } w-1/2 p-3 rounded-md shadow-md shadow-slate-600 bg-green-500 text-white hover:opacity-80 `}
              >
                Present
              </span>
            </button>
            <button
              onClick={handleAbsentClick}
              disabled={attendanceDisable}
              className="mb-1 p-4"
            >
              <span
                className={` ${
                  attendanceDisable ? "opacity-30 hover:opacity-30" : ""
                } w-1/2 p-3 rounded-md  shadow-md shadow-slate-600 bg-red-500 text-white hover:opacity-80 `}
              >
                Absent
              </span>
            </button>
            <button
              onClick={handleHolidayClick}
              disabled={holidayDisabled}
              className="md:mb-20 mb-10 p-4"
            >
              <span
                className={` ${
                  holidayDisabled ? "opacity-30 hover:opacity-30" : ""
                } w-1/2 p-3 rounded-md  shadow-md shadow-slate-600 bg-gray-600 text-white hover:opacity-80 `}
              >
                Holiday
              </span>
            </button>

            <button
              onClick={() => {
                attendenceTaken ? handleUpdateClick() : handleSubmitClick();
              }}
              className="p-4 mb-3"
            >
              <span
                className={`w-1/2 p-3 rounded-md shadow-md ${
                  (currStudent &&
                    currStudent.attendanceStatus !== "" &&
                    currStudent === students[students.length - 1]) ||
                  (!holidayDisabled && currStudent !== students[0])
                    ? "visible"
                    : "hidden"
                } shadow-slate-600 bg-blue-500 text-white hover:opacity-80`}
              >
                {attendenceTaken ? "Update" : "Submit"}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceBar;
