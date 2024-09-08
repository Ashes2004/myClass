"use client";

import Link from "next/link";
import Navbar from "@/components/structComponents/Navbar";
import { genarateToken, messaging } from "./Firebase";
import { onMessage } from "firebase/messaging";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("Home");
    const notify = async () => {
      const token = await genarateToken();
      console.log("token", token);

      const response = await fetch(
        "http://localhost:5000/api/alert/save-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        }
      );
      if (!response.ok) {
        console.log("error");
      }

      const data = await response.json();
      console.log("Response data:", data);
      console.log("Token ID:", data.tokenId);
      sessionStorage.setItem("notifyToken", data.tokenId);
    };

    notify();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert("message received!!");
    });
  }, []);

  return (
    <>
      <div className="h-screen bg-cream dark:bg-dark-bg">
        <Navbar />
        <div className="p-6">
          <div className="text-center mb-3 md:mb-6 md:flex md:justify-center gap-8 font-semibold md:text-2xl dark:text-[#EAEAEA]">
            <h2 className="">
              Helpline No.: <span className="font-bold">+91 89XXX XXX32</span>
            </h2>
            <h2 className="">
              Email id: <span className="font-bold">something@gmail.com</span>
            </h2>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/student" className="student">
              <div className="bg-white p-6 rounded-md shadow-md text-center hover:bg-lime-400 dark:hover:bg-green-500 dark:border-[#2F3640] duration-300">
                <h2 className="text-xl font-semibold">Student Login</h2>
              </div>
            </Link>
            <Link href="/teacher" className="teacher">
              <div className="bg-white p-6 rounded-md shadow-md text-center hover:bg-red-400 dark:hover:bg-red-500 dark:border-[#2F3640] duration-300">
                <h2 className="text-xl font-semibold">Teacher Login</h2>
              </div>
            </Link>
            <Link href="/administrator" className="admin">
              <div className="bg-white p-6 rounded-md shadow-md text-center hover:bg-blue-400 dark:hover:bg-blue-500 dark:border-[#2F3640] duration-300">
                <h2 className="text-xl font-semibold">Administrator Login</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
