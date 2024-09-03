import { useState } from "react";
import AdminLayout from "../Administrator/administratorLayout";
// import axios from "axios"; // Uncomment if using Axios
import Swal from 'sweetalert2';

const TeacherEnrollmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    qualification: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false); // To handle the loading state
  const [error, setError] = useState(null); // To handle errors
 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const finalFormData = { ...formData, subjects };

    try {
      // Using fetch API
      const response = await fetch("http://localhost/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      // Uncomment the following lines to use Axios
      // const response = await axios.post("http://localhost/api/teachers", finalFormData);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      Swal.fire({
        title: "Good job!",
        text: "Teacher Registered successfully",
        icon: "success",
      }); 
      const result = await response.json();
      console.log("Successfully submitted:", result);
      // Reset form and subjects
      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        qualification: "",
        address: "",
        gender: "",
        dob: "",
      });
      setSubjects([]);
    } catch (err) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
      console.error("Submission failed:", err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="h-full flex justify-center items-center">
        <div className="bg-white max-w-6xl mx-auto p-8 shadow-xl rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Teacher Enrollment Form
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            
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
              {/* <div>
                <label
                  htmlFor="password"
                  className="block font-bold text-lg md:text-xl"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div> */}
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
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
                  <div
                    key={index}
                    className="flex justify-between items-center mt-2 bg-gray-100 p-2 rounded-md"
                  >
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
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeacherEnrollmentForm;
