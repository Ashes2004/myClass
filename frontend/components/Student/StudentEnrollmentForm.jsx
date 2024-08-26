import React, { useState } from "react";
import AdminLayout from "../Administrator/administratorLayout";

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    grade: "",
    parentName: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log(formData);
  };

  return (
    <AdminLayout>
      <div className="h-full flex justify-center items-center">
        <div className="bg-white max-w-6xl p-10 rounded-xl shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Student Enrollment Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-bold text-lg md:text-xl"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block font-bold text-lg md:text-xl"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
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
                  autoComplete="sex"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block font-bold text-lg md:text-xl"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  autoComplete="bday"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="grade"
                  className="block font-bold text-lg md:text-xl"
                >
                  Grade
                </label>
                <select
                  id="grade"
                  name="grade"
                  autoComplete="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                  <option value="3">Grade 3</option>
                  <option value="4">Grade 4</option>
                  <option value="5">Grade 5</option>
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  {/* Add more grades as needed */}
                </select>
              </div>
              <div>
                <label
                  htmlFor="parentName"
                  className="block font-bold text-lg md:text-xl"
                >
                  Parent/Guardian Name
                </label>
                <input
                  id="parentName"
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block font-bold text-lg md:text-xl"
                >
                  Contact Number (+91)
                </label>
                <input
                  id="contactNumber"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-lg md:text-xl"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
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
    </AdminLayout>
  );
};

export default EnrollmentForm;
