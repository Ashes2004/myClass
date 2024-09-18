"use client";

import * as React from "react";
import { useState } from "react";

export default function AlertSystem({ name }) {
  const [alert, setAlert] = useState(null);
  let says = "is saying";
  if (!name) {
    name = "";
    says = "";
  }

  const triggerAlert = async (type) => {
    setAlert({
      type: type,
      message:
        type === "fire"
          ? `🚨${name} ${says}  Fire Alert! Please evacuate immediately!`
          : `⚠️${name} ${says} Emergency Alert! Please follow the safety protocols!`,
    });
    const notifyToken = sessionStorage.getItem("notifyToken");
    let message;
   
    if (type === "fire") {
      message = `🚨${name} ${says}  Fire Alert! Please evacuate immediately!`;
    
      
    } else {
      message =  `${name} ${says} ⚠️ Emergency Alert! Please follow the safety protocols!`;
     
    }
    const response = await fetch(
      `http://localhost:5000/api/alert/send-notification/${notifyToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Please Alert",
          body: message,
         
        }),
      }
    );
    if (!response.ok) {
      throw console.error("error something");
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <div className="relative p-4">
      {/* Alert Banner */}
      {alert && (
        <div
          className={`fixed top-0 left-0 w-full bg-red-500 text-white p-4 z-50`}
        >
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">{alert.message}</div>
            <button
              onClick={clearAlert}
              className="text-white text-lg font-bold p-2"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="flex gap-4">
        <button
          onClick={() => triggerAlert("fire")}
          className="bg-red-300 hover:bg-red-600 duration-200 text-white px-4 py-2 rounded-md"
        >
          Trigger Fire Alert
        </button>
        <button
          onClick={() => triggerAlert("emergency")}
          className="bg-yellow-300 dark:bg-[#eee169] hover:bg-yellow-600 dark:hover:bg-yellow-400 duration-200 text-black px-4 py-2 rounded-md"
        >
          Trigger Emergency Alert
        </button>
      </div>
    </div>
  );
}
