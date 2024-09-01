import React, { createContext, useContext, useState } from "react";
import LeaderBoardLayout from "./leaderBoardLayout";
import Image from "next/image";
import { sampleProfile } from "@/public/Images";

const LeaderBoardBody = () => {
  const [leaders, setLeaders] = useState([
    [
      {
        _id: 1,
        points: 100,
        profilePicture: "",
        name: "Ashes",
      },
      {
        _id: 2,
        points: 90,
        profilePicture: "",
        name: "Manmohan",
      },
      {
        _id: 3,
        points: 80,
        profilePicture: "",
        name: "Nilanjan",
      },
    ],
    [
      {
        _id: 15,
        points: 75,
        profilePicture: "",
        name: "Tanish Mitra",
      },
      {
        _id: 16,
        points: 74,
        profilePicture: "",
        name: "Meholi Jha",
      },
      {
        _id: 17,
        points: 72,
        profilePicture: "",
        name: "Ayan Santra",
      }
    ],
  ]);
  const [rank, setRank] = useState(4);
  const [ind, setInd] = useState(0);
  const [rankers, setRankers] = useState([
    [
      {
        _id: 4,
        points: 75,
        profilePicture: "",
        name: "Tanish Mitra",
      },
      {
        _id: 5,
        points: 74,
        profilePicture: "",
        name: "Meholi Jha",
      },
      {
        _id: 6,
        points: 70,
        profilePicture: "",
        name: "Ayan Santra",
      },
      {
        _id: 7,
        points: 69,
        profilePicture: "",
        name: "Subhodip Saha",
      },
      {
        _id: 8,
        points: 68,
        profilePicture: "",
        name: "Souryadeep Deb",
      },
      {
        _id: 9,
        points: 64,
        profilePicture: "",
        name: "Supratim Das",
      },
      {
        _id: 10,
        points: 63,
        profilePicture: "",
        name: "Shreemoy Dhemna",
      },
      
    ],
    [
      {
        _id: 11,
        points: 69,
        profilePicture: "",
        name: "Subhodip Saha",
      },
      {
        _id: 12,
        points: 68,
        profilePicture: "",
        name: "Souryadeep Deb",
      },
      {
        _id: 13,
        points: 64,
        profilePicture: "",
        name: "Supratim Das",
      },
      {
        _id: 14,
        points: 63,
        profilePicture: "",
        name: "Shreemoy Dhemna",
      },
    ],
  ]);
  const [isOpen, setIsOpen] = useState(true);
  const showAssignmentBoard = () => {
    if (isOpen) setIsOpen(false);
    if (ind !== 1) setInd(1);
  };
  const showQuizBoard = () => {
    if (!isOpen) setIsOpen(true);
    if (ind !== 0) setInd(0);
  };
  return (
    <leaderboardContext.Provider
      value={{ isOpen, showAssignmentBoard, showQuizBoard }}
    >
      <LeaderBoardLayout>
        <>
          <div className="text-white h-72 md:h-80 md:mx-32 md:px-32 grid grid-cols-3 px-6 z-0 my-5">
            <div>
              <div className="h-3/5 md:flex hidden justify-center items-center flex-col gap-1">
                <Image src={sampleProfile} width={70} height={70} alt="image" />
                <p>{leaders[ind][1].name}</p>
                <p>{leaders[ind][1].points} Points</p>
              </div>
              <div className="h-3/5 flex md:hidden justify-center items-center flex-col gap-1 tracking-wide text-center text-sm">
                <Image src={sampleProfile} width={50} height={50} alt="image" />
                <p>{leaders[ind][1].name}</p>
                <p>{leaders[ind][1].points} Points</p>
              </div>
              <div className="font-extrabold text-violet-500 text-6xl md:text-8xl h-2/5 flex justify-center items-center bg-gradient-to-t from-fuchsia-300 to-purple-200 shadow-2xl">
                <p>2</p>
              </div>
            </div>
            <div>
              <div className="h-1/2 md:flex hidden justify-center items-center flex-col gap-1">
                <Image src={sampleProfile} width={70} height={70} alt="image"/>
                <p>{leaders[ind][0].name}</p>
                <p>{leaders[ind][0].points} Points</p>
              </div>
              <div className="h-1/2 flex md:hidden justify-center items-center flex-col gap-1 tracking-wide text-sm text-center">
                <Image src={sampleProfile} width={50} height={50} alt="image"/>
                <p>{leaders[ind][0].name}</p>
                <p>{leaders[ind][0].points} Points</p>
              </div>
              <div className="font-extrabold text-violet-500 text-6xl md:text-8xl h-1/2 flex justify-center items-center bg-gradient-to-t from-fuchsia-300 to-purple-200 shadow-2xl">
                <p>1</p>
              </div>
            </div>
            <div>
              <div className="h-2/3 md:flex hidden justify-center items-center flex-col gap-1">
                <Image src={sampleProfile} width={70} height={70} alt="image"/>
                <p>{leaders[ind][2].name}</p>
                <p>{leaders[ind][2].points} Points</p>
              </div>
              <div className="h-2/3 flex md:hidden justify-center items-center flex-col gap-1 tracking-wide text-sm text-center">
                <Image src={sampleProfile} width={50} height={50} alt="image"/>
                <p>{leaders[ind][2].name}</p>
                <p>{leaders[ind][2].points} Points</p>
              </div>
              <div className="font-extrabold text-violet-500 text-6xl md:text-8xl h-1/3 flex justify-center items-center bg-gradient-to-t from-fuchsia-300 to-purple-200 shadow-2xl">
                <p>3</p>
              </div>
            </div>
          </div>
          <div className="px-6 md:mx-56 md:-my-6 -my-6 z-100 sticky p-4 md:px-32 mx-5 rounded-tl-2xl rounded-tr-2xl md:rounded-tl-full md:rounded-tr-full bg-gray-300 flex justify-center items-center">
            <div className="bg-gradient-to-t from-gray-300 border-transparent to-gray-50 p-2 -mt-14 rounded-tl-3xl rounded-tr-3xl">
              <div className="bg-fuchsia-300 p-1 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-300 px-1.5 md:px-3 md:mx-56 mx-5 mt-1 md:mt-3.5 sticky rounded-lg md:rounded-lg">
            <div className="bg-white md:py-5 md:px-7 py-2 px-3.5 rounded-tl-2xl rounded-tr-2xl">
              {rankers[ind].map((ranker, ind) => (
                <div
                  key={ranker._id}
                  className="grid text-sm md:tracking-wider md:grid-cols-10 grid-cols-5 items-center border-b-2 border-blue-100 py-2"
                >
                  <p className="rounded-full p-1 w-7 text-center bg-yellow-300 col-span-1 text-white">
                    {rank + ind}
                  </p>
                  <p className="md:col-span-8 col-span-3">{ranker.name}</p>
                  <p className="col-span-1">{ranker.points}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      </LeaderBoardLayout>
    </leaderboardContext.Provider>
  );
};

export default LeaderBoardBody;

export const leaderboardContext = createContext();

export const useLeaderboard = () => {
  return useContext(leaderboardContext);
};
