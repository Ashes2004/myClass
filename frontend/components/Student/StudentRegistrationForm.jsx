import React, { useState } from "react";

import Swal from 'sweetalert2';
const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    guardianName: "",
    gender: "",
    guardianPhoneNumber: "",
    address: "",
    bloodGroup: "",
    studentDOB: "",
    studentEmailID: "",
    password: "",
   
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const response = await fetch("http://localhost/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        

        Swal.fire({
          title: "Good job!",
          text: "Student created successfully",
          icon: "success",
        });
        setFormData({
          studentName: "",
          guardianName: "",
          gender: "",
          guardianPhoneNumber: "",
          address: "",
          bloodGroup: "",
          studentDOB: "",
          studentEmailID: "",
          password: "",
         
        });
      } else {
        alert("Error enrolling student.");
      }
    } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
      console.error("Error:", error);
      alert("An error occurred while enrolling the student.");
    }
  };

  return (
    
      <div className="h-full flex justify-center items-center">
        <div className="bg-white max-w-6xl p-10 rounded-xl shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Student Enrollment Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <div>
                <label
                  htmlFor="studentName"
                  className="block font-bold text-lg md:text-xl"
                >
                  Student Name
                </label>
                <input
                  id="studentName"
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="guardianName"
                  className="block font-bold text-lg md:text-xl"
                >
                  Guardian Name
                </label>
                <input
                  id="guardianName"
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block font-bold text-lg md:text-xl"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="guardianPhoneNumber"
                  className="block font-bold text-lg md:text-xl"
                >
                  Guardian Phone Number (+91)
                </label>
                <input
                  id="guardianPhoneNumber"
                  type="tel"
                  name="guardianPhoneNumber"
                  value={formData.guardianPhoneNumber}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="bloodGroup"
                  className="block font-bold text-lg md:text-xl"
                >
                  Blood Group
                </label>
                <input
                  id="bloodGroup"
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="studentDOB"
                  className="block font-bold text-lg md:text-xl"
                >
                  Date of Birth
                </label>
                <input
                  id="studentDOB"
                  type="date"
                  name="studentDOB"
                  value={formData.studentDOB}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="studentEmailID"
                  className="block font-bold text-lg md:text-xl"
                >
                  Email
                </label>
                <input
                  id="studentEmailID"
                  type="email"
                  name="studentEmailID"
                  value={formData.studentEmailID}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block font-bold text-lg md:text-xl"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
                <div className="flex items-center mt-2">
                  <input
                    id="showPassword"
                    type="checkbox"
                    checked={showPassword}
                    onChange={handlePasswordToggle}
                    className="mr-2"
                  />
                  <label
                    htmlFor="showPassword"
                    className="text-sm text-gray-600"
                  >
                    Show Password
                  </label>
                </div>
              </div>
             
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block font-bold text-lg md:text-xl"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Enroll Student
              </button>
            </div>
          </form>
        </div>
      </div>
  
  );
};

export default EnrollmentForm;
