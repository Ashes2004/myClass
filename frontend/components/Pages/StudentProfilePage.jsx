import React, { useState, useEffect } from "react";
import Image from "next/image";
import StudentLayout from "../Student/studentLayout";
import { sampleProfile } from "@/public/Images";
import { useRouter } from "next/navigation";

const StudentProfilePage = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [profilePic, setProfilePic] = useState(sampleProfile);

  useEffect(() => {
    const token = sessionStorage.getItem("studentToken");
    if (!token) {
      // Redirect to login if no token is present
      router.push("/student/studentLogin");
    } else {
      // Fetch student data if token is present
      const fetchStudentData = async () => {
        try {
          console.log("token: ", token);
          const response = await fetch("http://localhost/api/students/get/student", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            router.push("/student/studentLogin");
            throw new Error("Failed to fetch student data");
          }

          const data = await response.json();
          setStudentData(data);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      fetchStudentData();
    }
  }, [router]);

  if (!studentData) {
    return <p className="text-center mt-8 text-white">Loading...</p>; // Display a loading state while fetching data
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl text-black overflow-hidden">
          <div className="flex flex-col items-center mb-8">
            
          
            <h1 className="text-3xl font-bold mt-4 text-gray-800">
              {studentData?.studentName || "User"}
            </h1>
            <p className="text-lg font-semibold text-gray-600">
              {studentData?.classId?.name}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Student ID", value: studentData?.studentId || "N/A" },
              { label: "Roll Number", value: studentData?.studentRoll || "N/A" },
              { label: "Guardian Name", value: studentData?.guardianName || "N/A" },
              { label: "Phone Number", value: studentData?.guardianPhoneNumber || "N/A" },
              { label: "Email", value: studentData?.studentEmailID || "N/A" },
              { label: "Address", value: studentData?.address || "N/A" },
              { label: "Blood Group", value: studentData?.bloodGroup || "N/A" },
              { label: "Date of Birth", value: studentData?.studentDOB || "N/A" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-700">{item.label}</h3>
                <p className="mt-2 text-gray-600">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProfilePage;
