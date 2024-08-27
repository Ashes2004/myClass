import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClassForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    classId: '',
    roomNumber: '',
    allocatedTeachers: [],
    classTeacher: '',
    subjects: [],
  });
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [newSubject, setNewSubject] = useState({ subjectName: '', subjectCode: '' });
  const [selectedClassId, setSelectedClassId] = useState('');
  const [mode, setMode] = useState('create'); // 'create' or 'update'

  useEffect(() => {
    // Fetch teachers, rooms, and classes
    axios.get('http://localhost/api/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });

    axios.get('http://localhost/api/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });

    axios.get('http://localhost/api/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  useEffect(() => {
    if (mode === 'update' && selectedClassId) {
      // Fetch class data for update
      axios.get(`http://localhost/api/classes/${selectedClassId}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching class data:', error);
        });
    }
  }, [mode, selectedClassId]);

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

  const handleRemoveAllocatedTeacher = (id) => {
    setFormData(prevState => ({
      ...prevState,
      allocatedTeachers: prevState.allocatedTeachers.filter(t => t !== id),
    }));
  };

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [name]: value,
    };
    setFormData(prevState => ({
      ...prevState,
      subjects: updatedSubjects,
    }));
  };

  const handleAddSubject = () => {
    setFormData(prevState => ({
      ...prevState,
      subjects: [...prevState.subjects, newSubject],
    }));
    setNewSubject({ subjectName: '', subjectCode: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = mode === 'create' ? 'http://localhost/api/classes' : `http://localhost/api/classes/${selectedClassId}`;
    const method = mode === 'create' ? 'post' : 'patch';
    axios({
      method,
      url,
      data: formData,
    })
      .then(response => {
        console.log(`${mode === 'create' ? 'Class created' : 'Class updated'} successfully:`, response.data);
        setFormData({
          name: '',
          classId: '',
          roomNumber: '',
          allocatedTeachers: [],
          classTeacher: '',
          subjects: [],
        });
        setSelectedClassId('');
        Swal.fire({
          title: "Good job!",
          text: `${mode === 'create' ? 'Class created' : 'Class updated'} successfully`,
          icon: "success",
        });
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        }
        console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} class:`, error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Class Form</h2>
      <div className="flex justify-between mb-6">
        <button
          type="button"
          onClick={() => setMode('create')}
          className={`px-4 py-2 font-medium text-white rounded-md ${mode === 'create' ? 'bg-indigo-600' : 'bg-gray-400'}`}
        >
          Create Class
        </button>
        <button
          type="button"
          onClick={() => setMode('update')}
          className={`px-4 py-2 font-medium text-white rounded-md ${mode === 'update' ? 'bg-indigo-600' : 'bg-gray-400'}`}
        >
          Update Class
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'create' && (
          <>
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
                      {teacher.name} [{teacher.subjects.join(', ')}]
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
                  return teacher ? (
                    <span key={id} className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                      {teacher.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveAllocatedTeacher(id)}
                        className="ml-2 text-red-600"
                      >
                        Remove
                      </button>
                    </span>
                  ) : null;
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
            <div>
              <label htmlFor="subjects" className="block text-sm font-medium text-gray-700">Subjects</label>
              {formData.subjects.map((subject, index) => (
                <div key={index} className="flex space-x-2 items-center mt-2">
                  <input
                    type="text"
                    name="subjectName"
                    placeholder="Subject Name"
                    value={subject.subjectName}
                    onChange={(e) => handleSubjectChange(index, e)}
                    className="mt-1 block w-1/2 border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    name="subjectCode"
                    placeholder="Subject Code"
                    value={subject.subjectCode}
                    onChange={(e) => handleSubjectChange(index, e)}
                    className="mt-1 block w-1/2 border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(index)}
                    className="ml-2 text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex space-x-2 items-center mt-2">
                <input
                  type="text"
                  name="subjectName"
                  placeholder="New Subject Name"
                  value={newSubject.subjectName}
                  onChange={(e) => setNewSubject(prev => ({ ...prev, subjectName: e.target.value }))}
                  className="mt-1 block w-1/2 border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="text"
                  name="subjectCode"
                  placeholder="New Subject Code"
                  value={newSubject.subjectCode}
                  onChange={(e) => setNewSubject(prev => ({ ...prev, subjectCode: e.target.value }))}
                  className="mt-1 block w-1/2 border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add Subject
                </button>
              </div>
            </div>
          </>
        )}
        {mode === 'update' && (
          <>
            <div>
              <label htmlFor="selectClass" className="block text-sm font-medium text-gray-700">Select Class to Update</label>
              <select
                id="selectClass"
                name="selectClass"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="mt-1 block w-full border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a class</option>
                {classes.map(cls => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} ({cls._id})
                  </option>
                ))}
              </select>
            </div>
            {selectedClassId && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-4">Update Class Details</h3>
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
                          {teacher.name} [{teacher.subjects.join(', ')}]
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
                      return teacher ? (
                        <span key={id} className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                          {teacher.name}
                          <button
                            type="button"
                            onClick={() => handleRemoveAllocatedTeacher(id)}
                            className="ml-2 text-red-600"
                          >
                            Remove
                          </button>
                        </span>
                      ) : null;
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
                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium text-gray-700">Subjects</label>
                  {formData.subjects.map((subject, index) => (
                    <div key={index} className="flex space-x-2 items-center mt-2">
                      <input
                        type="text"
                        name="subjectName"
                        placeholder="Subject Name"
                        value={subject.subjectName}
                        onChange={(e) => handleSubjectChange(index, e)}
                        className="mt-1 block w-1/2 border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        name="subjectCode"
                        placeholder="Subject Code"
                        value={subject.subjectCode}
                        onChange={(e) => handleSubjectChange(index, e)}
                        className="mt-1 block w-1/2 border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(index)}
                        className="ml-2 text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex space-x-2 items-center mt-2">
                    <input
                      type="text"
                      name="subjectName"
                      placeholder="New Subject Name"
                      value={newSubject.subjectName}
                      onChange={(e) => setNewSubject(prev => ({ ...prev, subjectName: e.target.value }))}
                      className="mt-1 block w-1/2 border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      name="subjectCode"
                      placeholder="New Subject Code"
                      value={newSubject.subjectCode}
                      onChange={(e) => setNewSubject(prev => ({ ...prev, subjectCode: e.target.value }))}
                      className="mt-1 block w-1/2 border-gray-300 px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Add Subject
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      axios.patch(`http://localhost/api/classes/${selectedClassId}`, {
                        allocatedTeachers: [],
                      })
                        .then(response => {
                          Swal.fire({
                            title: "Success!",
                            text: "Teachers removed successfully",
                            icon: "success",
                          });
                        })
                        .catch(error => {
                          console.error('Error removing teachers:', error);
                        });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove All Allocated Teachers
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {mode === 'create' ? 'Create Class' : 'Update Class'}
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
