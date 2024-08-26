import { useState } from "react";
import AdminLayout from "../Administrator/administratorLayout";

const TeacherEnrollmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    experience: "",
    qualification: "",
    gender: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <AdminLayout>
      <div className="h-full flex justify-center items-center">
        <div className="bg-white max-w-6xl mx-auto p-8 shadow-xl rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Teacher Enrollment Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-bold text-lg md:text-xl"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  autoComplete="given-name"
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
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  autoComplete="family-name"
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
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-bold text-lg md:text-xl"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  autoComplete="tel"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block font-bold text-lg md:text-xl"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="English">English</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer">Computer</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Physical Education">Physical Education</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="block font-bold text-lg md:text-xl"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="qualification"
                  className="block font-bold text-lg md:text-xl"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  autoComplete="off"
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
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  autoComplete="off"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-bold text-lg md:text-xl"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                autoComplete="bday"
                required
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-700 duration-200"
              >
                Enroll Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeacherEnrollmentForm;
