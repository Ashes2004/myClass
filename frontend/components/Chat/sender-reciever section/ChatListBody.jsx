"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { broadcast, chatBubble, home, peopleOutline } from "@/public/Icons";
import { sampleProfile } from "@/public/Images";
import ChatBody from "../Chat head/ChatBody";
const ChatListBody = () => {
  const pathname = usePathname();
  const type = pathname.split("/")[1];
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [profileClicked, setProfileClicked] = useState(false);
  const [profile, setProfile] = useState({});
  const [profiles, setProfiles] = useState([
    {
      name:"Ashes Das",
      class:12,
      unseenMessages:5,
      lastMessage:"15:30"
    },
    {
      name:"Tanish Mitra",
      class:12,
      unseenMessages:2,
      lastMessage:"20:55"
    },
    {
      name:"Meholi Jha",
      class:5,
      unseenMessages:1,
      lastMessage:"17:36"
    },
    {
      name:"Nilanjan Saha",
      class:10,
      unseenMessages:5,
      lastMessage:"16:46"
    },
    {
      name:"Supratim Das",
      class:9,
      unseenMessages:2,
      lastMessage:"9:30"
    },
    {
      name:"Tanu Priya",
      class:11,
      unseenMessages:3,
      lastMessage:"18:12"
    }
  ]);
  useEffect(() => {
    const getScrollableHeight = () => {
        return (window.innerHeight - 140);
    }
    setScrollHeight(getScrollableHeight());
  },[])
  return (
    <div className="w-full h-full">
      <div className="text-4xl py-4 px-3 bg-black text-white font-bold tracking-wide">
        DoubtDesk
      </div>
      <div className="lg:w-[400px] md:[285px] h-screen  fixed bg-gray-700">
        <div className="lg:w-[60px] bg-black h-screen fixed">
          <div className="flex flex-col justify-between h-full my-3">
            <div className="flex flex-col gap-3 items-center">
              <Link
                href={`/${type}`}
                className="hover:bg-sidebar-neon rounded-full p-1.5 opacity-80"
              >
                <Image
                  src={home}
                  width={24}
                  height={24}
                  alt="dashboard"
                  className="invert"
                />
              </Link>
              <button
                onClick={() => setIsChatOpen(true)}
                className={`${
                  pathname.split("/")[2] === "doubtDesk" && isChatOpen
                    ? "border-2 border-sidebar-neon shadow-inner shadow-sidebar-neon opacity-80"
                    : ""
                } hover:bg-sidebar-neon rounded-full p-1 opacity-80 `}
              >
                <Image
                  src={chatBubble}
                  width={24}
                  height={24}
                  alt="chatbubble"
                  className="invert"
                />
              </button>
              {type === "student" ? (
                <button
                  className={`${
                    pathname.split("/")[2] === "doubtDesk" && !isChatOpen
                      ? "border-2 border-sidebar-neon shadow-inner shadow-sidebar-neon opacity-80"
                      : ""
                  } hover:bg-sidebar-neon rounded-full p-1.5 opacity-80`}
                  onClick={() => setIsChatOpen(false)}
                >
                  <Image
                    src={peopleOutline}
                    width={24}
                    height={24}
                    className="invert"
                  />
                </button>
              ) : (
                ""
              )}
              {type === "teacher" ? (
                <button
                  className={`${
                    pathname.split("/")[2] === "doubtDesk" && !isChatOpen
                      ? "border-2 border-sidebar-neon shadow-inner shadow-sidebar-neon opacity-80"
                      : ""
                  } hover:bg-sidebar-neon rounded-full p-1.5 opacity-80`}
                  onClick={() => setIsChatOpen(false)}
                >
                  <Image
                    src={broadcast}
                    width={24}
                    height={24}
                    className="invert"
                  />
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col items-center mb-32">
                <Image src={sampleProfile} width={40} height={20} alt='profile-picture'/>
            </div>
          </div>
        </div>
        <div className="lg:ml-16 md:ml-10 mt-1.5 px-2 mr-1 border-b border-gray-400 pb-3">
          <input
            className="w-full p-2.5 bg-gray-400 text-white outline-none rounded-full placeholder:text-gray-100 placeholder:opacity-75"
            placeholder="Search Here"
          ></input>
        </div>
        <div className="lg:ml-16 md:ml-10 mt-1 flex-col gap-1 mr-1 overflow-y-scroll" style={{height:scrollHeight}}>
          {profiles.map(profile =>(<div className="text-white border-b border-gray-500 bg-gray-600 h-16 flex justify-between">
            <div className="flex">
              <div className="p-1 flex justify-center items-center ">
                <Image
                  src={sampleProfile}
                  width={40}
                  height={20}
                  alt="profile"
                />
              </div>
              <div className="flex flex-col gap-1 py-1.5 px-1">
                <p className="text-gray-200 tracking-wide font-medium overflow-hidden">
                  {profile.name}
                </p>
                <p className="text-gray-300 text-[14px]">Class {profile.class}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-8 mr-3 gap-2">
              <p className={`rounded-full w-5 h-5 text-center flex justify-center items-center bg-green-500 text-[10px]`}>
                <span>{profile.unseenMessages}</span>
              </p>
              <p className="text-gray-400 text-[10px] ">{profile.lastMessage}</p>
            </div>
          </div>))}
        </div>
      </div>
      <div className="lg:ml-[400px] md:ml-[261px]">
        {!profileClicked && <ChatBody profile={profile} />}
      </div>
    </div>
  );
};

export default ChatListBody;
