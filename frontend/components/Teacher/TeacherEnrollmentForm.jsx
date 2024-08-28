import { useState } from "react";
import AdminLayout from "../Administrator/administratorLayout";

const TeacherEnrollmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    qualification: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSubject = () => {
    if (subjectInput.trim()) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const handleDeleteSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = { ...formData, subjects };
    // Handle form submission logic here
    console.log(finalFormData);
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
              {/* Other input fields for name, phoneNumber, email, etc. */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-bold text-lg md:text-xl"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block font-bold text-lg md:text-xl"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block font-bold text-lg md:text-xl"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label
                htmlFor="subject"
                className="block font-bold text-lg md:text-xl"
              >
                Subject
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="subject"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="ml-2 px-4 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-700 duration-200"
                >
                  Add Subject
                </button>
              </div>
              <div className="mt-2">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex justify-between items-center mt-2 bg-gray-100 p-2 rounded-md">
                    <span>{subject}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSubject(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
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
