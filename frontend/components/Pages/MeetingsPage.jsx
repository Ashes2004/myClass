"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { video_calling, close, alarm_clock, trash } from "@/public/Images";
import { arrow_back } from "@/public/Icons";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const MeetingsPage = () => {
  const [isReminderClicked, setIsReminderClicked] = useState(false);
  const [overallMargin, setOverallMargin] = useState({ left: 0, top: 0 });
  const [createMeetingWindowVisible, setCreateMeetingWindowVisible] =
    useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [toBeDeletedMeetings, setToBeDeletedMeetings] = useState([]);
  const [meetingInputTime, setMeetingInputTime] = useState("");
  const [meetingInputDate, setMeetingInputDate] = useState("");
  const [inputSubject, setInputSubject] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingClassInput, setMeetingClassInput] = useState("");
  const [reminderClickedId, setReminderClickedId] = useState(0);
  const [reminderTime, setReminderTime] = useState("");
  const [allocatedClasses, setAllocatedClasses] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const teacherId = sessionStorage.getItem("teacherID");
  const teacherToken = sessionStorage.getItem("teacherToken");
  const router = useRouter();

  useEffect(() => {
    if (!teacherId || !teacherToken) {
      router.push("/teacher/teacherLogin");
    }

    const fetchAllocatedClasses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/teachers/${teacherId}`);
        const data = await res.json();
        setAllocatedClasses(data.allocatedClasses);
        console.log("allocated classes: ", allocatedClasses);
      } catch (error) {
        console.error("Error fetching allocated classes:", error);
      }
    };

    const fetchMeetings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/online-class/teacher/${teacherId}`
        );
        const data = await res.json();
        setMeetings(data);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Show the error message from the response
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        }
        console.error("Error fetching meetings:", error);
      }
    };

    fetchAllocatedClasses();
    fetchMeetings();

    const getOverallMargin = () => {
      if (window.innerWidth < 350)
        return [(window.innerWidth - 300) / 2, (window.innerHeight - 463) / 2];
      return [(window.innerWidth - 400) / 2, (window.innerHeight - 400) / 2];
    };
    let marginArray = getOverallMargin();
    setOverallMargin({ left: marginArray[0], top: marginArray[1] });
  }, [teacherId]);



  const createMeeting = async () => {
    let [hours, minutes] = meetingInputTime.split(":").map(Number);
    let period = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
    let timeIn12HrFormat = `${hours}:${minutes
      .toString()
      .padStart(2, "0")}${period}`;

    const newMeeting = {
      Subject: inputSubject,
      Teacher: teacherId,
      Class: meetingClassInput,
      Date: meetingInputDate,
      StartTime: timeIn12HrFormat,
      Link: meetingLink,
    };
    console.log("new meet: ", newMeeting);
    try {
      const res = await fetch("http://localhost:5000/api/online-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeeting),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log("New meeting data:", data); // Debugging line

      // Ensure that `data` is an object representing the new meeting
      if (data && typeof data === "object") {
        if (meetings.length > 0) {
          meetings.push(data);
        }else{
          window.location.reload();
        }
        Swal.fire({
          title: "Good job!",
          text: "Meeting created successfully .",
          icon: "success",
        });
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong",
      });
    }

    // Clear form fields
    setMeetingClassInput("");
    setInputSubject("");
    setMeetingInputDate("");
    setMeetingInputTime("");
    setMeetingLink("");
    setCreateMeetingWindowVisible(false);
  };

 

  const deleteTheseMeetings = async (id) => {
    const updatedMeetings = meetings.filter(
      (meeting) => (meeting._id != id) // Use _id if that's the key
    );
    
   try {
    const res = await fetch(`http://localhost:5000/api/online-class/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("succesfully deleted!!");
    
   } catch (error) {
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message || "Something went wrong",
    });

   }
    console.log(updatedMeetings);
    
    setMeetings(updatedMeetings);
  
    setDeleteClicked(false);
  };

  const createReminder = (id) => {
    setIsReminderClicked(!isReminderClicked);
    setReminderClickedId(id);
  };

  const setReminder = () => {
    setMeetings(
      meetings.map((meeting) => {
        if (meeting._id === reminderClickedId)
          // Use _id if that's the key
          return { ...meeting, reminderTime: reminderTime };
        else return meeting;
      })
    );
    setReminderClickedId(0);
    setReminderTime("");
    setIsReminderClicked(false);
  };

  return (
    <>
      <header className="flex items-center w-full p-3 bg-violet-600">
        <Link href="/teacher" className="w-1/12">
          <Image
            src={arrow_back}
            width={24}
            height={24}
            alt="back-arrow"
            className="invert"
          />
        </Link>
        <p className="text-white text-lg tracking-wider font-medium text-center w-10/12">
          Meeting
        </p>
      </header>

      <div
        className={`z-50 mt-10 flex-1 fixed ${
          createMeetingWindowVisible ? "block" : "hidden"
        } bg-white rounded-md border-2 border-violet-500 p-6 w-[400px] md:w-[400px]`}
        style={{ left: overallMargin.left, top: overallMargin.top }}
      >
        <div className="flex justify-end px-3">
          <button
            onClick={() => setCreateMeetingWindowVisible(false)}
            className="bg-violet-500 p-1 rounded-md"
          >
            <Image
              src={close}
              width={14}
              height={14}
              alt="close"
              className="invert"
            />
          </button>
        </div>
        <p className="text-xl font-bold tracking-wide text-center text-violet-500">
          Create Meeting
        </p>
        <div className="m-6 flex flex-col gap-2 ">
          <p className="text-[14px] text-violet-400">Subject Name</p>
          <input
            type="text"
            className="w-full border-b border-violet-500 outline-none text-[14px] text-violet-500"
            onChange={(e) => setInputSubject(e.target.value)}
            value={inputSubject}
          />
          <div className="mt-3 flex items-center gap-3">
            <p className="text-[14px] text-violet-400">Class</p>
            <select
              className="border-b border-violet-400 text-[14px] text-violet-500 w-[100px] outline-none"
              onChange={(e) => setMeetingClassInput(e.target.value)}
              value={meetingClassInput}
            >
              <option value="">Select Class</option>
              {allocatedClasses.map((allocatedClass) => (
                <option key={allocatedClass._id} value={allocatedClass._id}>
                  {allocatedClass.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-3 justify-between">
            <p className="text-[14px] text-violet-400">Set Date</p>
            <input
              type="date"
              className="text-[14px] text-violet-500"
              onChange={(e) =>
                setMeetingInputDate(
                  e.target.value.split("-").reverse().join("/")
                )
              }
            />
          </div>
          <div className="flex mt-3 justify-between">
            <p className="text-[14px] text-violet-400">Set Time</p>
            <input
              type="time"
              className="text-violet-500"
              onChange={(e) => setMeetingInputTime(e.target.value)}
            />
          </div>
          <div className="flex mt-3 justify-between">
            <p className="text-[14px] text-violet-400">Meeting Link</p>
            <input
              type="text"
              className="w-full border-b border-violet-500 outline-none text-[14px] text-violet-500"
              onChange={(e) => setMeetingLink(e.target.value)}
              value={meetingLink}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <button
              onClick={createMeeting}
              className="p-2 rounded-md border-2 border-violet-500 shadow-md shadow-violet-300 bg-white text-violet-500 font-semibold tracking-wide"
            >
              Create
            </button>
          </div>
        </div>
      </div>
      {/* Meeting list */}
      <div className={`mx-2 my-6`}>
        <div className="flex justify-between px-4 py-4 items-center">
          <h1 className="text-lg font-bold text-violet-500 tracking-wider">
            Scheduled Meetings
          </h1>
          <button
            className="text-sm tracking-wide px-4 py-2 bg-violet-500 text-white rounded-md shadow-lg shadow-violet-300"
            onClick={() => setCreateMeetingWindowVisible(true)}
          >
            Create Meeting
          </button>
        </div>
        {meetings.length > 0 ? (
          <div className="flex flex-col gap-3">
            {meetings.map((meeting, i) => (
              <div
                key={i}
                className="border-violet-400 bg-violet-100 border-2 mx-4 p-3 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <p className="text-violet-600 font-semibold tracking-wide">
                    {meeting.Subject}
                  </p>
                  <div className="flex gap-4">
                    {/* <button
                      className="p-1 bg-violet-500 text-white rounded-md"
                      onClick={() => createReminder(meeting._id)}
                    >
                      <Image
                        src={alarm_clock}
                        alt="reminder"
                        width={16}
                        height={16}
                      />
                    </button> */}
                    <button
                      className="p-1 bg-violet-500 text-white rounded-md"
                      onClick={()=>{
                        deleteTheseMeetings(meeting._id);
                      }}
                    >
                      <Image src={trash} alt="delete" width={16} height={16} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[14px] text-violet-400">{meeting.Date}</p>
                  <p className="text-[14px] text-violet-400">
                    {meeting.StartTime}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[14px] text-violet-400">
                    Link: {meeting.Link}
                  </p>
                  <a
                    href={meeting.Link}
                    className="text-violet-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {meeting.Link}
                  </a>
                </div>
              </div>
            ))}
            {deleteClicked ? (
              <div className="flex justify-end">
                <button
                  onClick={deleteTheseMeetings}
                  className="text-sm tracking-wide px-4 py-2 bg-violet-500 text-white rounded-md shadow-lg shadow-violet-300 mx-6"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-center text-sm text-violet-400 tracking-wide">
            No meetings available.
          </p>
        )}
      </div>
    </>
  );
};

export default MeetingsPage;
