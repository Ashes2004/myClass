import React, { useState, useEffect } from "react";
import Image from "next/image";
import StudentLayout from "../Student/studentLayout"; // You might want to rename or reuse this layout
import { sampleProfile } from "@/public/Images";
import { useRouter } from "next/navigation";
import { storage } from "@/app/Firebase"; // import storage from your firebase configuration
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import TeacherLayout from "../Teacher/teacherLayout";

const TeacherProfilePage = () => {
  const router = useRouter();
  const [teacherData, setTeacherData] = useState(null);
  const [profilePic, setProfilePic] = useState(sampleProfile);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to handle popup visibility

  useEffect(() => {
    const token = sessionStorage.getItem("teacherToken");
    if (!token) {
      router.push("/teacher/teacherLogin");
    } else {
      const fetchTeacherData = async () => {
        try {
          console.log("token: ", token);
          const response = await fetch("http://localhost:5000/api/teachers/get/teacher", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            router.push("/teacher/teacherLogin");
            throw new Error("Failed to fetch teacher data");
          }

          const data = await response.json();
          setTeacherData(data);
          setProfilePic(data.profilePhoto || sampleProfile); // Set existing profile photo
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      };

      fetchTeacherData();
    }
  }, [router]);

  if (!teacherData) {
    return <p className="text-center mt-8 text-white">Loading...</p>;
  }

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `teacher_profile_pics/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
      console.log("Uploaded photo URL:", photoURL);
      setProfilePic(photoURL);

      const token = sessionStorage.getItem("teacherToken");
      const response = await fetch(`http://localhost:5000/api/teachers/${teacherData._id}`, {
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
   <TeacherLayout>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl text-black overflow-hidden">
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
              {teacherData?.name || "Jane Smith"}
            </h1>
            <p className="text-lg font-semibold text-gray-600">
              Subjects: {teacherData?.subjects?.join(", ") || "English, History"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Teacher ID", value: teacherData?.teacherId || "20240801" },
              { label: "Phone Number", value: teacherData?.phoneNumber || "555-5678" },
              { label: "Email", value: teacherData?.email || "jane.smith@example.com" },
              { label: "Address", value: teacherData?.address || "456 Oak Avenue, Springfield" }
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
              <div className="bg-white rounded-full p-2">
                <Image
                  src={profilePic}
                  alt="Full Size Profile Picture"
                  width={200}
                  height={200}
                  className="object-cover rounded-full"
                />
                <button
                  className="absolute top-0 right-0 mt-4 mr-4 text-white bg-red-500 rounded-full p-2 focus:outline-none"
                  onClick={togglePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </TeacherLayout>
  );
};

export default TeacherProfilePage;
