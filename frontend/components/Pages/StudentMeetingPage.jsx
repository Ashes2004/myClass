"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { video_calling } from "@/public/Images";
import { useRouter } from "next/navigation";

const StudentMeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [liveMeetings, setLiveMeetings] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  const classId = sessionStorage.getItem("studentClassId");
  const router = useRouter();

  const reformatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM" || modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!classId) {
      router.push("/student/studentLogin");
    }

    const fetchMeetings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/online-class/class/${classId}`
        );
        const data = await res.json();
        setMeetings(data);
        categorizeMeetings(data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    const categorizeMeetings = (meetings) => {
      const currentTime = new Date();

      const live = [];
      const upcoming = [];
      const past = [];

      meetings.forEach((meeting) => {
        const reformattedDate = reformatDate(meeting.Date);
        const time24 = convertTo24HourFormat(meeting.StartTime);
        const meetingDateTime = new Date(`${reformattedDate}T${time24}:00`);
        const meetingEndTime = new Date(
          meetingDateTime.getTime() + 2 * 60 * 60 * 1000
        );

        if (meetingDateTime <= currentTime && currentTime <= meetingEndTime) {
          live.push(meeting);
        } else if (meetingDateTime > currentTime) {
          upcoming.push(meeting);
        } else {
          past.push(meeting);
        }
      });

      setLiveMeetings(live);
      setUpcomingMeetings(upcoming);
      setPastMeetings(past);
    };

    fetchMeetings();
  }, [classId]);

  return (
    <>
      <header className="flex items-center w-full p-4 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <Link href="/student" className="w-1/12">
          <Image src={video_calling} width={24} height={24} alt="back-arrow" />
        </Link>
        <p className="text-white text-2xl font-semibold text-center w-10/12">
          Meetings
        </p>
      </header>

      <div className="mx-4 my-8">
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            Live Meetings
          </h1>
          {liveMeetings.length > 0 ? (
            liveMeetings.map((meeting, i) => (
              <div
                key={i}
                className="bg-white shadow-lg border border-blue-300 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xl font-semibold text-blue-600">
                    {meeting.Subject}
                  </p>
                  <p className="bg-green-400 rounded-md shadow w-auto p-2 text-black">
                    {meeting.Teacher.name}
                  </p>
                  <a
                    href={meeting.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                  >
                    Join
                  </a>
                </div>
                <p className="text-sm text-gray-600">
                  {meeting.Date} {meeting.StartTime}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-600">
              No live meetings available.
            </p>
          )}
        </section>

        <section className="mb-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            Upcoming Meetings
          </h1>
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((meeting, i) => (
              <div
                key={i}
                className="bg-white shadow-lg border border-blue-300 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xl font-semibold text-blue-600">
                    {meeting.Subject}
                  </p>
                  <p className="bg-green-400 rounded-md shadow w-auto p-2 text-black">
                    {meeting.Teacher.name}
                  </p>
                  <div />
                </div>
                <p className="text-sm text-gray-600">
                  {meeting.Date} {meeting.StartTime}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-600">
              No upcoming meetings.
            </p>
          )}
        </section>

        <section>
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            Past Meetings
          </h1>
          {pastMeetings.length > 0 ? (
            pastMeetings.map((meeting, i) => (
              <div
                key={i}
                className="bg-white shadow-lg border border-blue-300 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xl font-semibold text-blue-600">
                    {meeting.Subject}
                  </p>
                  <p className="bg-green-400 rounded-md shadow w-auto p-2 text-black">
                    {meeting.Teacher.name}
                  </p>
                  <div />
                </div>
                <p className="text-sm text-gray-600">
                  {meeting.Date} {meeting.StartTime}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-600">
              No past meetings.
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default StudentMeetingsPage;
