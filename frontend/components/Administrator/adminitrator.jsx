import Link from "next/link";
import AdminLayout from "./administratorLayout";
import SearchBar from "../structComponents/SearchBar";
import {
  adminTasks,
  adminProgressTracking,
  adminSchedule,
  adminSubjectManagement,
  adminDataReview,
} from "@/app/constants";
import Image from "next/image";
import { attendance, chatbot, rightArrow } from "@/public/Icons";
import { sampleProfile } from "@/public/Images";
import AlertSystem from "../structComponents/AlarmSystem";
import { CalendarDemo } from "../structComponents/CalendarDemo";

const AdminBody = () => {
  return (
    <AdminLayout>
      <div className="bg-lightGray text-black flex flex-col p-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center rounded-md">
          <h1 className="text-xl md:text-3xl font-bold">
            Welcome back, Admin 👋
          </h1>
          <div className="flex sm:flex-row justify-start gap-3 md:justify-center items-center mt-3 mb-3 md:mb-0">
            <SearchBar />
            <div className="bg-white rounded-full">
              <Image
                src={sampleProfile}
                alt="profile"
                width={42}
                height={42}
                className="object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Section - Tasks & Progress Tracking */}
          <div className="col-span-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg md:text-xl">Data Reports</h3>
              <Link
                href="#"
                className="hover:underline decoration-solid underline-offset-4 cursor-pointer hover:text-blue-600 duration-200"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {adminDataReview.map(
                (item, index) =>
                  index < 3 && (
                    <Link
                      href={`${item.link}`}
                      key={item.id}
                      className="bg-white p-4 rounded-lg shadow-xl hover:scale-105 duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-full flex justify-center items-center ${item.bg} w-8 h-8`}
                        >
                          <Image
                            src={item.icon}
                            alt={item.data}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        <div className="font-bold">{item.data}</div>
                      </div>
                    </Link>
                  )
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Today's Schedule Section */}
              <div className="bg-white shadow-xl rounded-lg p-4">
                <h2 className="font-bold text-lg md:text-xl mb-4">
                  Today's Schedule
                </h2>
                {adminSchedule.map(
                  (item, index) =>
                    index < 3 && (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 rounded-lg"
                      >
                        <div className="flex gap-2 items-center">
                          <div className={`rounded-full ${item.bg} p-3`}>
                            <Image
                              src={item.icon}
                              alt={item.subject}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="font-bold">{item.subject}</h2>
                            <h2 className="font-semibold text-xs">
                              {item.organizer}
                            </h2>
                            <h2 className="font-semibold">
                              {item.duration} mins
                            </h2>
                          </div>
                        </div>

                        <div className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3">
                          <Image
                            src={rightArrow}
                            alt="arrow"
                            width={24}
                            height={24}
                            className="object-cover cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>

              {/* Progress Tracking Section */}
              <div className="bg-white flex justify-center flex-col shadow-xl rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <h2 className="font-bold text-lg md:text-xl">
                      Progress Tracking
                    </h2>
                    <p className="font-semibold text-base">
                      Recent administrative updates
                    </p>
                  </div>
                  <div className="bg-yellow-300 rounded-full p-3">
                    <Image
                      src={attendance}
                      alt="tracking"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {adminProgressTracking.map(
                    (item, index) =>
                      index < 3 && (
                        <div
                          key={item.id}
                          className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h2 className="font-bold">{item.progress}</h2>
                            <p className="text-sm">Tracking: {item.type}</p>
                          </div>
                          <div className={`p-2 px-3 rounded-full ${item.bg}`}>
                            <h2 className="text-xs text-white">Progress</h2>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center my-3">
              <h3 className="font-bold text-lg md:text-xl">
                Management Options
              </h3>
              <Link
                href="#"
                className="hover:underline hover:text-blue-600 duration-200 decoration-solid underline-offset-4 cursor-pointer"
              >
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {adminSubjectManagement.map(
                (item, index) =>
                  index < 3 && (
                    <div
                      key={item.id}
                      className="bg-white shadow-xl flex justify-between items-center p-3 rounded-lg"
                    >
                      <div className="flex gap-2 items-center">
                        <div className={`${item.bg} rounded-full p-3`}>
                          <Image
                            src={item.icon}
                            alt={item.sub}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h2 className="font-bold">{item.sub}</h2>
                          <h2 className="font-semibold">{item.type}</h2>
                        </div>
                      </div>
                      <Link href={`${item.link}`} className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3">
                        <Image
                          src={rightArrow}
                          alt="arrow"
                          width={24}
                          height={24}
                          className="object-cover cursor-pointer"
                        />
                      </Link>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 pt-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-center bg-white p-2 rounded-lg shadow-xl">
                <h2 className="font-bold text-center md:text-xl lg:text-2xl">
                  This is an Alarm System. Raise this alarm ONLY in case of FIRE
                  or any other EMERGENCY!!!
                </h2>
                <AlertSystem />
              </div>
              <div className="flex justify-center items-center mt-4 drop-shadow-xl">
                <CalendarDemo />
              </div>
              <div className="flex justify-between items-center mt-3 mb-1">
                <h3 className="font-bold text-lg md:text-xl">Admin Tasks</h3>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 duration-200 decoration-solid underline-offset-4 cursor-pointer"
                >
                  See All
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {adminTasks.map(
                  (item, index) =>
                    index < 3 && (
                      <div
                        key={item.id}
                        className="bg-white shadow-xl flex justify-between items-center p-3 rounded-lg"
                      >
                        <div className="flex gap-2 items-center">
                          <div className={`${item.bg} rounded-full p-3`}>
                            <Image
                              src={item.icon}
                              alt={item.task}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="font-bold">{item.task}</h2>
                            <h2 className="font-semibold text-xs">{item.statusDesc}</h2>
                          </div>
                        </div>
                        <div className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3">
                          <Image
                            src={rightArrow}
                            alt="arrow"
                            width={24}
                            height={24}
                            className="object-cover cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBody;
