"use client";

import * as React from "react";
import { useState } from "react";

export default function AlertSystem() {
  const [alert, setAlert] = useState(null);

  const triggerAlert = (type) => {
    setAlert({
      type: type,
      message:
        type === "fire"
          ? "🚨 Fire Alert! Please evacuate immediately!"
          : "⚠️ Emergency Alert! Please follow the safety protocols!",
    });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <div className="relative p-4">
      {/* Alert Banner */}
      {alert && (
        <div className={`fixed top-0 left-0 w-full bg-red-500 text-white p-4 z-50`}>
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
          className="bg-yellow-300 hover:bg-yellow-600 duration-200 text-black px-4 py-2 rounded-md"
        >
          Trigger Emergency Alert
        </button>
      </div>
    </div>
  );
}
