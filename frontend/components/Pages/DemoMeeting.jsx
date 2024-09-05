"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { video_calling, close, alarm_clock, trash } from "@/public/Images";
import { arrow_back } from "@/public/Icons";
const monthMap = (month) => {
  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  return months[Number(month)];
};
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
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      meetingTime: "8:00 AM",
      meetingDate: "05/09/2024",
      withClass: "9",
      section: "B",
      reminder: "7:30 AM",
      subject: "Physical Science",
      meetingLink: "https://meet.google.com/abc-mnop-xyz",
    },
    {
      id: 2,
      meetingTime: "10:00 AM",
      meetingDate: "05/09/2024",
      withClass: "10",
      section: "B",
      reminder: "9:45 AM",
      subject: "Biology",
      meetingLink: "https://meet.google.com/abc-mnop-kmn",
    },
    {
      id: 3,
      meetingTime: "12:00 PM",
      meetingDate: "05/09/2024",
      withClass: "8",
      section: "A",
      reminder: "11:50 AM",
      subject: "Chemistry",
      meetingLink: "https://meet.google.com/abc-mnop-qrs",
    },
  ]);
  useEffect(() => {
    const getOverallMargin = () => {
      if (window.innerWidth < 350)
        return [(window.innerWidth - 300) / 2, (window.innerHeight - 463) / 2];
      return [(window.innerWidth - 400) / 2, (window.innerHeight - 400) / 2];
    };
    let marginArray = getOverallMargin();
    setOverallMargin({ left: marginArray[0], top: marginArray[1] });
  }, []);
  const deleteMeetings = (e, id) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setToBeDeletedMeetings((prev) => [...prev, id]);
    } else {
      setToBeDeletedMeetings(toBeDeletedMeetings.filter((Id) => Id !== id));
    }
    console.log(toBeDeletedMeetings);
  };

  const createMeeting = () => {
    let [hours, minutes] = meetingInputTime.split(":").map(Number);
    let period = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
    let timeIn12HrFormat = `${hours}:${minutes
      .toString()
      .padStart(2, "0")}${period}`;
    setMeetings((prev) => [
      ...prev,
      {
        id: Math.random(),
        meetingDate: meetingInputDate,
        meetingTime: timeIn12HrFormat,
        subject: inputSubject,
        withClass: meetingClassInput,
        meetingLink: meetingLink,
      },
    ]);
    setMeetingClassInput("");
    setInputSubject("");
    setMeetingInputDate("");
    setMeetingInputTime("");
    setMeetingLink("");
    setCreateMeetingWindowVisible(false);
  };

  const deleteTheseMeetings = () => {
    console.log(toBeDeletedMeetings);
    const updatedMeetings = meetings.filter(
      (meeting) => !toBeDeletedMeetings.includes(meeting.id)
    );
    setMeetings(updatedMeetings);
    setToBeDeletedMeetings([]);
    console.log(updatedMeetings);
    setDeleteClicked(false);
  };

  const createReminder = (id) => {
    setIsReminderClicked(!isReminderClicked);
    setReminderClickedId(id);
  };

  const setReminder = () => {
    setMeetings(
      meetings.map((meeting) => {
        if (meeting.id === reminderClickedId)
          return { ...meeting, reminderTime: reminderTime };
        else return meeting;
      })
    );
    console.log(reminderClickedId);
    console.log(meetings);
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
        className={`z-50 fixed top-1/3 left-11 lg:left-1/2 ${
          isReminderClicked ? "block" : "hidden"
        } left-6 top-0.5 text-black p-3 w-[240px] bg-slate-100 border border-violet-500 shadow-md shadow-violet-300 rounded-md blur-none`}
      >
        <p className="mb-1 text-violet-600 font-medium text-[14px]">Set Time</p>
        <input
          type="time"
          className="px-3 py-1.5 rounded-md w-full border border-violet-500 text-violet-500 bg-gradient-to-tl from-slate-300 to-slate-100"
          onChange={(e) => setReminderTime(e.target.value)}
        />
        <div className="flex justify-center items-center mt-6 text-violet-500 gap-3">
          <button
            onClick={() => setIsReminderClicked(!isReminderClicked)}
            className="text-white bg-violet-500 shadow-md shadow-violet-300 p-1 rounded-md font-medium border-2 border-white"
          >
            Cancel
          </button>
          <button
            onClick={() => setReminder()}
            className="bg-white p-1 rounded-md shadow-md font-medium shadow-violet-300 border-2 border-violet-500"
          >
            Set Reminder
          </button>
        </div>
      </div>
      <div
        className={`z-50 fixed ${
          createMeetingWindowVisible ? "block" : "hidden"
        } bg-white rounded-md border-2 border-violet-500 p-6 w-[300px] md:w-[400px]`}
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
            className="w-full border-b border-violet-500 outline-none text[14px] text-violet-500 "
            onChange={(e) => setInputSubject(e.target.value)}
            value={inputSubject}
          ></input>
          <div className="mt-3 flex items-center gap-3">
            <p className="text-[14px] text-violet-400">Class</p>
            <input
              type="text"
              className="border-b border-violet-400 text-[14px] text-violet-500 w-[100px] outline-none"
              onChange={(e) => setMeetingClassInput(e.target.value)}
              value={meetingClassInput}
            />
          </div>
          <div className="flex mt-3 justify-between">
            <p className="text-[14px] text-violet-400 ">Set Date</p>
            <input
              type="date"
              className="text-[14px] text-violet-500"
              onChange={(e) =>
                setMeetingInputDate(
                  e.target.value.split("-").reverse().join("/")
                )
              }
            ></input>
          </div>
          <div className="flex mt-3 justify-between">
            <p className="text-[14px] text-violet-400 ">Set Time</p>
            <input
              type="time"
              className="text-violet-500"
              onChange={(e) => setMeetingInputTime(e.target.value)}
            ></input>
          </div>
          <p className="text-[14px] text-violet-400 mt-2">
            Provide Meeting Link
          </p>
          <input
            className="w-full border-b border-violet-500 outline-none text[14px] text-violet-500"
            onChange={(e) => setMeetingLink(e.target.value)}
            value={meetingLink}
          ></input>
          <div className="flex justify-center items-center mt-2">
            <button
              onClick={(e) => createMeeting()}
              className="p-2 rounded-md border-2 border-violet-500 shadow-md shadow-violet-300 bg-white text-violet-500 font-semibold tracking-wide"
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div
        className={`mx-2 xl:mx-80 lg:mx-6 ${
          createMeetingWindowVisible ? "blur-sm" : ""
        } ${isReminderClicked ? "blur-sm" : ""}`}
      >
        <div className="bg-white mt-6 md:mt-3 md:ml-3 md:mr-3 rounded-lg p-3 shadow-xl z-0">
          <p className="text-xl font-semibold px-3 tracking-wide">
            Meeting Schedule
          </p>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setCreateMeetingWindowVisible(true)}
              className="text-[12px] px-2 py-1 bg-purple-400 rounded-xl text-white shadow-md shadow-purple-300"
            >
              <span className="mr-1">➕</span>Create Meeting
            </button>
            <button
              onClick={() => setDeleteClicked(!deleteClicked)}
              className={`ml-3 p-1.5 rounded-full shadow-inner shadow-red-600`}
            >
              <Image src={trash} width={20} height={20} alt="delete" />
            </button>
          </div>
          <div className="mt-2">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex justify-between items-center "
              >
                <div className="flex md:gap-3 items-center w-8/12">
                  <div
                    className={`flex justify-center items-center m-3 ${
                      !deleteClicked
                        ? "w-[36px] h-[36px] shadow-md shadow-purple-400 bg-purple-500"
                        : ""
                    } rounded-lg  `}
                  >
                    {!deleteClicked ? (
                      <Image
                        src={video_calling}
                        width={24}
                        height={24}
                        alt="video-calling"
                        className="invert"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        onChange={(e) => deleteMeetings(e, meeting.id)}
                        className="w-9 h-9 accent-purple-500"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="flex gap-2 text-[12px] md:text-sm tracking-wide">
                      From{" "}
                      <span className="font-semibold">
                        {meeting.meetingTime}
                      </span>
                    </p>
                    <p className="text-[12px] md:text-sm tracking-wide">
                      With{" "}
                      <span className="font-semibold">
                        Class {meeting.withClassOrTeacher}
                        {meeting.section}
                      </span>
                    </p>
                  </div>
                  <div
                    className={`relative md:hidden ${
                      isReminderClicked ? "block" : ""
                    } ml-3.5 flex justify-center items-center rounded-full `}
                  >
                    <button onClick={() => createReminder(meeting.id)}>
                      <Image
                        src={alarm_clock}
                        width={20}
                        height={20}
                        alt="alarm-clock"
                      />
                    </button>
                  </div>
                  <div className="xl:mx-16 md text-[14px] hidden md:block rounded-full bg-purple-400 text-white py-1 px-2 shadow-md shadow-purple-300 justify-self-end">
                    <button onClick={() => createReminder(meeting.id)}>
                      Set Reminder
                    </button>
                  </div>
                  <div className="bg-purple-400 hidden lg:block rounded-full shadow-md shadow-purple-300">
                    <p className="text-[14px] text-white px-2 py-1">
                      {meeting.meetingDate}
                    </p>
                  </div>
                </div>
                <div className="bg-purple-400 text-white px-2 py-1 rounded-full shadow-md shadow-purple-300">
                  <Link href={"#"} className="text-[12px] md:text-sm">
                    {"See Details" || "Join Meeting"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`flex justify-center items-center mt-3 ${
              toBeDeletedMeetings.length >= 1 ? "visible" : "hidden"
            }`}
          >
            <button
              onClick={() => deleteTheseMeetings()}
              className={`p-1.5 bg-red-400 rounded-md text-white font-semibold`}
            >
              {toBeDeletedMeetings?.length >= 1 ? "Delete" : ""}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingsPage;
