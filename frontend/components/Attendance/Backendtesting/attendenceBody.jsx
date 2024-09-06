"use client";
import React, { useState, useContext, createContext, useEffect } from "react";
import AttendanceLayout from "./attendanceLayout";
import next from "next";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";
const AttendanceBody = () => {
  const [students, setStudents] = useState([]);
  const [rollNumber, setRollNumber] = useState(null);
  const [currStudent, setCurrStudent] = useState(null);
  const [prevStudent, setPrevStudent] = useState(null);
  const [nextStudent, setNextStudent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [Id , setId] = useState("");

const router = useRouter();
  const teacherID = sessionStorage.getItem("teacherID");
  const ID = sessionStorage.getItem("classteacher");
  const [attendenceData, setAttendenceData] = useState({
    date: `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`,
    classId: ID,
    isHoliday: false,
    studentAttendances: [],
  });



  const fetchapi = async() => {
   if(!teacherID)
   {
    router.push("/teacher/teacherLogin");
   } 

   if(!ID)
   {
    Swal.fire("Error", "You are not allocated as class teacher till now", "error");
    return;
   }else{
    setId(ID);
   }



  //  await fetch(`http://localhost/api/teachers/${teacherID}`)
  //  .then((response) => {
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok " + response.statusText);
  //   }
  //   return response.json();
  // })
  // .then((data) => {
  //   setID(data.ClassTea)
    
  // })

    await fetch(`http://localhost/api/classes/classid/${ID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const updatedStudents = data.students.map((student) => ({
          ...student,
          attendanceStatus: "", // Initialize with empty string
        }));
        setStudents(updatedStudents);
        if (updatedStudents.length > 0) {
          setRollNumber(updatedStudents[0].studentRoll);
          setCurrStudent(updatedStudents[0]);
          setNextStudent(updatedStudents[1] || null);
        }

        console.log(data);
        console.log(attendenceData);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        alert("URL is not correct");
      });
  };

  const submitAttendence = () => {
    fetch("http://localhost/api/attendence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendenceData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
           
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${errorData.message} . Please Refresh and Update`
             
            });
            throw new Error(errorData.message || "An unknown error occurred");
          });
        }else{
          Swal.fire({
            title: "Good job!",
            text: "Attendence Submitted Successfully",
            icon: "success"
          });
        }

        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };


  const updateAttendence = () => {
    fetch(`http://localhost/api/attendence/update/${Id}/${attendenceData.date}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendenceData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            alert(errorData.message);
            throw new Error(errorData.message || "An unknown error occurred");
          });
        }else{
          Swal.fire({
            title: "Good job!",
            text: "Attendence Updated Successfully",
            icon: "success"
          });
        }

        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };


  useEffect(()=>{
    window.addEventListener('keypress',handleKeypress);
    return ()=>{
      window.removeEventListener('keypress',handleKeypress);
    }
  })

  
  useEffect(() => {
    fetchapi();
  }, []);

  const handleKeypress = (e) => {
    console.log(e);
    if (e.code === "Numpad1") handlePresent();
    else if (e.code === "Numpad0") handleAbsent();
    else if (
      e.code === "Enter" &&
      currStudent === students[students.length - 1]
    )
      handleSubmit();
  };

  const handleLeft = () => {
    if (prevStudent === null) alert("No previous student record found!");
    else {
      let tempRoll = rollNumber;
      setRollNumber(prevStudent.studentRoll);
      setNextStudent(currStudent);
      let temp = prevStudent;
      if (prevStudent === students[0]) setPrevStudent(null);
      else {
        let index = students.findIndex(
          (student) => student.studentRoll === prevStudent.studentRoll
        );
        setPrevStudent(students[index - 1]);
      }
      setCurrStudent(temp);
    }
  };
  const handleRight = () => {
    if (nextStudent === null) return;
    else {
      let tempRoll = rollNumber;
      setRollNumber(nextStudent.studentRoll);
      setPrevStudent(currStudent);
      setCurrStudent(nextStudent);
      if (nextStudent === students[students.length - 1]) setNextStudent(null);
      else {
        let index = students.findIndex(
          (student) => student.studentRoll === nextStudent.studentRoll
        );
        setNextStudent(students[index + 1]);
      }
    }
  };
  const handlePresent = () => {
    setStudents(
      students.map((student) => {
        if (student.studentRoll === currStudent.studentRoll) {
          let newStudent = { ...student, attendanceStatus: "Present" };

          setCurrStudent(newStudent);

          const studentExists = attendenceData.studentAttendances.find(
            (s) => s.studentId === student._id
          );
          if (!studentExists) {
            setAttendenceData((prevData) => ({
              ...prevData,
              studentAttendances: [
                ...prevData.studentAttendances,
                {
                  studentId: student._id,
                  present: true,
                },
              ],
            }));
          } else {
            setAttendenceData((prevData) => ({
              ...prevData,
              studentAttendances: prevData.studentAttendances.map((s) =>
                s.studentId === student._id ? { ...s, present: true } : s
              ),
            }));
          }

          return newStudent;
        } else return student;
      })
    );
    handleRight();
  };
  const handleAbsent = () => {
    setStudents(
      students.map((student) => {
        if (student.studentRoll === currStudent.studentRoll) {
          let newStudent = { ...student, attendanceStatus: "Absent" };
          setCurrStudent(newStudent);

          const studentExists = attendenceData.studentAttendances.find(
            (s) => s.studentId === student._id
          );
          if (!studentExists) {
            setAttendenceData((prevData) => ({
              ...prevData,
              studentAttendances: [
                ...prevData.studentAttendances,
                {
                  studentId: student._id,
                  present: false,
                },
              ],
            }));
          } else {
            setAttendenceData((prevData) => ({
              ...prevData,
              studentAttendances: prevData.studentAttendances.map((s) =>
                s.studentId === student._id ? { ...s, present: false } : s
              ),
            }));
          }

          return newStudent;
        } else return student;
      })
    );
    handleRight();
  };
  const handleHoliday = () => {
    console.log("Holiday");
    setStudents(
      students.map((student) => {
        let newStudent = { ...student, attendanceStatus: "Holiday" };
        return newStudent;
      })
    );
    setAttendenceData((prevData) => ({
      ...prevData,
      isHoliday: true,
      studentAttendances: [],
    }));
    setRollNumber(students[students.length - 1].studentRoll);
    setCurrStudent(students[students.length - 1]);
    console.log("holiday: ", attendenceData);
  };
  const handleSubmit = () => {
    console.log(students);
    console.log("submit : ", attendenceData);
    submitAttendence();
  };

  const handleUpdate = () => {
    console.log(students);
    console.log("update : ", attendenceData);
    updateAttendence();
  };

  const getStudent = (student, currStudent, prevStudent, nextStudent) => {
    let temp = currStudent;

    setCurrStudent(student);
    setRollNumber(student.studentRoll);
    setNextStudent(temp);
    setIsOpen(false);
  };

  const openBodyInSide = () => {
    console.log("yoo");
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };
  return (
    <attendanceContext.Provider
      value={{
        isOpen,
      
        rollNumber,
        attendenceData,
        students,
        currStudent,
        prevStudent,
        nextStudent,
        handleLeft,
        handleRight,
        handlePresent,
        handleAbsent,
        handleHoliday,
        handleSubmit,
        handleUpdate,
        setRollNumber,
        setPrevStudent,
        setNextStudent,
        setCurrStudent,
        openBodyInSide,
      }}
    >
      <AttendanceLayout>
        <div
          className={`bg-white h-full rounded-lg shadow-md shadow-slate-500 ${
            isOpen ? "fixed right-0 top-0 z-10" : "hidden md:block"
          }`}
        >
          <p className="md:mt-1 text-center p-3 md:text-xl font-bold tracking-wider bg-slate-400 text-white rounded-tl-lg md:rounded-tr-lg text-sm">
            Live Attendance Tracking System
          </p>
          <div
            className={` ${
              isOpen ? "grid-cols-3" : ""
            } grid  md:m-3 mt-1 xl:grid-cols-12 lg:grid-cols-8 md:grid-cols-6 gap-3 md:p-3 px-4 py-3`}
          >
            {students.map((student) => (
              <button
                onClick={() =>
                  getStudent(student, currStudent, prevStudent, nextStudent)
                }
                key={student._id}
                className={`p-3 shadow-md shadow-slate-500 ${
                  student.attendanceStatus === "Present" ? "bg-green-500" : ""
                } ${student.attendanceStatus === "" ? "bg-yellow-500" : ""} ${
                  student.attendanceStatus === "Absent" ? "bg-red-500" : ""
                } ${
                  student.attendanceStatus === "Holiday" ? "bg-slate-500" : ""
                } text-white text-center rounded-md font-medium`}
              >
                {student.studentRoll}
              </button>
            ))}
          </div>
        </div>
      </AttendanceLayout>
    </attendanceContext.Provider>
  );
};

export default AttendanceBody;

export const attendanceContext = createContext([]);
export const useAttendanceContext = () => {
  return useContext(attendanceContext);
};
