import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
const ClassForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    classId: '',
    roomNumber: '',
    allocatedTeachers: [],
    classTeacher: '',
  });

  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    // Fetch teachers when the component mounts
    axios.get('http://localhost/api/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });

    // Fetch room numbers when the component mounts
    axios.get('http://localhost/api/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTeacherChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      classTeacher: e.target.value,
    }));
  };

  const handleAddAllocatedTeacher = () => {
    if (selectedTeacher && !formData.allocatedTeachers.includes(selectedTeacher)) {
      setFormData(prevState => ({
        ...prevState,
        allocatedTeachers: [...prevState.allocatedTeachers, selectedTeacher],
      }));
      setSelectedTeacher('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost/api/classes', formData)
      .then(response => {
        console.log('Class created successfully:', response.data);
        // Reset form after successful submission
        setFormData({
          name: '',
          classId: '',
          roomNumber: '',
          allocatedTeachers: [],
          classTeacher: '',
        });

        Swal.fire({
            title: "Good job!",
            text: "Attendence Submitted Successfully",
            icon: "success"
          });
      })
      .catch(error => {
        

        if (error.response && error.response.data && error.response.data.message) {
            // Show the error message from the response
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
        console.error('Error creating class:', error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Add New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Class Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block border-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="classId" className="block text-sm font-medium text-gray-700">Class ID</label>
          <input
            type="text"
            id="classId"
            name="classId"
            placeholder='example:- C10A [ C10 means class10 , A means section A]'
            value={formData.classId}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
          <select
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="mt-1 block px-1 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a room</option>
            {rooms.map(room => (
              <option key={room._id} value={room.roomNumber}>
                {room.roomNumber}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="allocatedTeachers" className="block text-sm font-medium text-gray-700">Allocated Teachers</label>
          <div className="flex space-x-2 items-center">
            <select
              id="allocatedTeachers"
              name="allocatedTeachers"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="mt-1 block w-full border-gray-300 px-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a teacher</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}      [{teacher.subjects.join(', ')}]
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddAllocatedTeacher}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {formData.allocatedTeachers.map(id => {
              const teacher = teachers.find(t => t._id === id);
              return teacher ? <span key={id} className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">{teacher.name}</span> : null;
            })}
          </div>
        </div>
        <div>
          <label htmlFor="classTeacher" className="block text-sm font-medium text-gray-700">Class Teacher</label>
          <select
            id="classTeacher"
            name="classTeacher"
            value={formData.classTeacher}
            onChange={handleTeacherChange}
            className="mt-1 block w-full border-gray-300 px-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a teacher</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
