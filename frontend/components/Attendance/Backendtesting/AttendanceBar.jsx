import React, { useEffect, useState } from "react";
import Image from "next/image";
import { arrow_left_filled, arrow_right_filled } from "@/public/Icons";
import { useAttendanceContext } from "./attendenceBody";
const AttendanceBar = () => {
  const {
    isOpen,
    Id,
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
  const fetchapi = () => {
    let attendenceDate = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    console.log(Id + " ***" + attendenceDate);
    fetch(`http://localhost/api/attendence/${Id}/${attendenceDate}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        } else {
          setAttendenceTaken(true);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
  useEffect(() => {
    fetchapi();
  }, []);

  const d = new Date();
  const date = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const [holidayDisabled, setHolidayDisabled] = useState(false);
  const [attendanceDisable, setAttendanceDisabled] = useState(false);

  const handleLeftClick = () => {
    handleLeft();
  };
  const handleRightClick = () => {
    handleRight();
  };
  const handlePresentClick = () => {
    handlePresent();
    setHolidayDisabled(true);
    //setIsPresentClicked(false);
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
  };

  const handleUpdateClick = () => {
    handleUpdate();
  };

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
        Date:{date}/{month}/{year}
      </p>
      <div className="md:flex justify-between grid grid-cols-3 gap-3 mt-6 items-center outline outline-black outline-2 p-4 rounded-lg shadow-md shadow-slate-500">
        <button onClick={() => handleLeftClick()}>
          <Image src={arrow_left_filled} width={50} height={50} />
        </button>
        <div className="flex-row">
          <div className=" text-black outline-black  outline-1 outline md:px-6 py-3  text-center rounded-lg bg-white">
            {rollNumber}
          </div>
          <h3 className="text-center p-1">{currStudent?.studentName}</h3>
        </div>
        <button onClick={() => handleRightClick()}>
          <Image src={arrow_right_filled} width={50} height={50} />
        </button>
      </div>

      <div className="mt-10 flex flex-col md:gap-6 gap-3">
        <button
          onClick={() => handlePresentClick()}
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
          onClick={() => handleAbsentClick()}
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
          onClick={() => handleHolidayClick()}
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
             ( (currStudent && currStudent.attendanceStatus != "" &&
              
              currStudent === students[students.length - 1]) || ( !holidayDisabled && currStudent != students[0]))
                ? "visible"
                : "hidden"
            } shadow-slate-600 bg-blue-500 text-white hover:opacity-80`}
          >
            {attendenceTaken ? "Update" : "Submit"} 
          </span>
        </button>
      </div>
    </div>
  );
};

export default AttendanceBar;
