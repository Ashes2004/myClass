import Link from "next/link";
import AdminLayout from "./administratorLayout";
import SearchBar from "../structComponents/SearchBar";
import {
  adminTasks,
  adminSchedule,
  adminSubjectManagement,
  adminDataReview,
} from "@/app/constants";
import Image from "next/image";
import { inventory, rightArrow } from "@/public/Icons";
import { sampleProfile } from "@/public/Images";
import AlertSystem from "../structComponents/AlarmSystem";
import { CalendarDemo } from "../structComponents/CalendarDemo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminBody = () => {
  const [adminData, setAdminData] = useState();
  const [requests, setRequests] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/adminAuth");
    }

    const fetchAdmin = async () => {
      const response = await fetch("http://localhost:5000/api/admin/find", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        router.push("/admin/adminAuth");
      } else {
        const data = await response.json();
        setAdminData(data);
      }
    };
    fetchAdmin();
  }, [router]);

  const handleApprove = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = "Approved";

    setRequests(updatedRequests);
    //socket.emit('orderUpdate', updatedRequests[index]);
  };

  const handleReject = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = "Rejected";

    setRequests(updatedRequests);
    //socket.emit('orderUpdate', updatedRequests[index]);
  };

  if (!adminData) {
    return <p>Loading...</p>; // Display a loading state while fetching data
  }
  return (
    <AdminLayout>
      <div className="bg-lightGray text-black dark:text-light-gray flex flex-col p-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center rounded-md">
          <h1 className="text-xl md:text-3xl font-bold">
            Welcome back, {adminData?.InstituteName || "Admin"}👋
          </h1>
          <div className="flex sm:flex-row justify-start gap-3 md:justify-center items-center mt-3 mb-3 md:mb-0">
            <SearchBar />
            <Link href="/adminProfile" className="bg-white rounded-full">
              <Image
                src={sampleProfile}
                alt="profile"
                width={42}
                height={42}
                className="object-cover cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Section - Tasks & Progress Tracking */}
          <div className="col-span-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg md:text-xl">Data Reports</h3>
              <Link
                href="/dataReports"
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
                      className="bg-white dark:bg-dark-gray p-4 rounded-lg shadow-xl hover:scale-105 duration-300"
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
              <div className="bg-white dark:bg-dark-gray shadow-xl rounded-lg p-4">
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
                            <h2 className="font-semibold text-xs dark:text-dim-gray">
                              {item.organizer}
                            </h2>
                            <h2 className="font-semibold dark:text-dim-gray">
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

              {/* Inventory Management Section */}
              <div className="bg-white dark:bg-dark-gray flex flex-col shadow-xl rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <h2 className="font-bold text-lg md:text-xl">
                      Inventory Management
                    </h2>
                    <p className="font-semibold text-base dark:text-dim-gray">
                      Manage school inventory
                    </p>
                  </div>
                  <div className="bg-yellow-300 dark:bg-yellow-500 rounded-full p-3">
                    <Image
                      src={inventory}
                      alt="inventory"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-light-gray text-lg">
                    Manage school inventory including textbooks, supplies, and
                    equipment efficiently.
                  </p>
                  <div className="pt-6">
                    <Link href="/inventory">
                      <div className="inline-block bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-xl duration-200">
                        Go to Inventory
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3">
                <div className="flex justify-between items-center my-3 lg:pt-3">
                  <h3 className="font-bold text-lg md:text-xl">
                    Management Options
                  </h3>
                  <Link
                    href="/managementOptions"
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
                          className="bg-white dark:bg-dark-gray shadow-xl flex justify-between items-center p-3 rounded-lg"
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
                              <h2 className="font-semibold dark:text-dim-gray">
                                {item.type}
                              </h2>
                            </div>
                          </div>
                          <Link
                            href={`${item.link}`}
                            className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3"
                          >
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
              <div className="col-span-2 my-3 lg:pt-3">
                <div className="bg-white dark:bg-dark-gray shadow-xl rounded-lg p-4">
                  <h2 className="font-bold text-lg md:text-xl mb-4">
                    Inventory Order Requests
                  </h2>
                  <div>
                    {requests.length === 0 ? (
                      <p className="text-gray-500">No new requests.</p>
                    ) : (
                      <ul>
                        {requests.map((request, index) => (
                          <li
                            key={index}
                            className="mb-4 p-4 bg-gray-50 rounded-lg shadow-md"
                          >
                            <p>
                              <strong>Item:</strong> {request.item}
                            </p>
                            <p>
                              <strong>Quantity:</strong> {request.quantity}
                            </p>
                            <p>
                              <strong>Status:</strong> {request.status}
                            </p>
                            {request.status === "Pending" && (
                              <div className="flex space-x-2 mt-2">
                                <button
                                  onClick={() => handleApprove(index)}
                                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(index)}
                                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 pt-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-center bg-white dark:bg-dark-gray p-2 rounded-lg shadow-xl">
                <h2 className="font-bold text-center md:text-xl lg:text-2xl">
                  This is an Alarm System. Raise this alarm ONLY in case of FIRE
                  or any other EMERGENCY!!!
                </h2>
                <AlertSystem name={adminData?.InstituteName} />
              </div>
              <div className="flex justify-center items-center mt-4 drop-shadow-xl">
                <CalendarDemo />
              </div>
              <div className="flex justify-between items-center mt-3 mb-1">
                <h3 className="font-bold text-lg md:text-xl">Admin Tasks</h3>
                <Link
                  href="/tasks"
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
                        className="bg-white dark:bg-dark-gray shadow-xl flex justify-between items-center p-3 rounded-lg"
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
                            {/* <h2 className="font-semibold text-xs">
                              {item.statusDesc}
                            </h2> */}
                          </div>
                        </div>
                        <Link
                          href={`${item.link}`}
                          className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3"
                        >
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBody;
