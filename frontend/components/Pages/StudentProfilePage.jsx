import React, { useState, useEffect } from "react";
import Image from "next/image";
import StudentLayout from "../Student/studentLayout";
import { sampleProfile } from "@/public/Images";
import { useRouter } from "next/navigation";
import { storage } from "@/app/Firebase"; // import storage from your firebase configuration
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import Link from "next/link";

const StudentProfilePage = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [profilePic, setProfilePic] = useState(sampleProfile);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to handle popup visibility

  useEffect(() => {
    const token = sessionStorage.getItem("studentToken");
    if (!token) {
      router.push("/student/studentLogin");
    } else {

    
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
          setProfilePic(data.profilePhoto || sampleProfile); // Set existing profile photo
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      fetchStudentData();
    }
  }, [router]);

  if (!studentData) {
    return <p className="text-center mt-8 text-white">Loading...</p>;
  }

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `student_profile_pics/${file.name}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
      console.log("Uploaded photo URL:", photoURL);
      setProfilePic(photoURL);

      const token = sessionStorage.getItem("studentToken");
      const response = await fetch(`http://localhost/api/students/${studentData._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profilePhoto: photoURL }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile photo in the backend");
      }

      console.log("Profile photo updated successfully");
    } catch (error) {
      console.error("Error uploading file or updating profile photo:", error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl text-black overflow-hidden">
          <div>
           <a href = '/student/studentEnrollRequest'> <button className="bg-green-500 p-2 rounded text-white text-lg">Enrollment request</button></a>
          </div>
          <div className="flex flex-col items-center mb-8">

            <div 
              className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer"
              onClick={togglePopup} // Toggle popup on click
            >
              <Image
                src={profilePic}
                alt="Profile Picture"
                layout="fill"
                className="object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="mt-3 text-sm text-gray-500"
              onChange={handleProfilePicChange}
            />
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

          {/* Popup Modal */}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white object-cover rounded p-2">
                <Image
                  src={profilePic}
                  alt="Full Size Profile Picture"
                  width={200}
                  height={200}
                  className="object-cover rounded"
                 
                />
                 </div>
                <button
                  className="absolute top-0 right-0 mt-4 mr-4 text-white bg-red-500 rounded-full p-2 focus:outline-none"
                  onClick={togglePopup}
                >
                  Close
                </button>
             
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProfilePage;
