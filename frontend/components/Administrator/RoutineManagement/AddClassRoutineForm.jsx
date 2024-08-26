import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddWeeklyRoutineForm = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [weeklyRoutine, setWeeklyRoutine] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = [{
        subject: '',
        teacherId: '',
        roomNumber: '',
        startPeriod: '',
        endPeriod: '',
      }];
      return acc;
    }, {})
  );

  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');

  useEffect(() => {
    // Fetch all classes on component mount
    axios.get('http://localhost/api/classes')
      .then(response => setClasses(response.data))
      .catch(error => console.error('Error fetching classes:', error));

    // Fetch all rooms on component mount
    axios.get('http://localhost/api/rooms')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClassId(classId);

    // Fetch teachers for the selected class
    axios.get(`http://localhost/api/classes/${classId}`)
      .then(response => setTeachers(response.data.allocatedTeachers))
      .catch(error => console.error('Error fetching teachers:', error));
  };

  const handlePeriodChange = (day, index, e) => {
    const { name, value } = e.target;
    const updatedPeriods = [...weeklyRoutine[day]];
    updatedPeriods[index][name] = value;
    setWeeklyRoutine({ ...weeklyRoutine, [day]: updatedPeriods });
  };

  const addPeriod = (day) => {
    setWeeklyRoutine({
      ...weeklyRoutine,
      [day]: [
        ...weeklyRoutine[day],
        {
          subject: '',
          teacherId: '',
          roomNumber: '',
          startPeriod: '',
          endPeriod: '',
        },
      ],
    });
  };

  const removePeriod = (day, index) => {
    const updatedPeriods = [...weeklyRoutine[day]];
    updatedPeriods.splice(index, 1);
    setWeeklyRoutine({ ...weeklyRoutine, [day]: updatedPeriods });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routineData = daysOfWeek.map(day => ({
      day,
      periods: weeklyRoutine[day],
    }));

    try {
      const response = await axios.post('http://localhost/api/class-routine', {
        classId: selectedClassId,
        routine: routineData,
      });
      console.log('Routine added:', response.data);
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Weekly Class Routine</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="classId">
          Class
        </label>
        <select
          id="classId"
          name="classId"
          value={selectedClassId}
          onChange={handleClassChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a class</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>{cls.name}</option>
          ))}
        </select>
      </div>

      {daysOfWeek.map(day => (
        <div key={day} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{day}</h3>
          {weeklyRoutine[day].map((period, index) => (
            <div key={index} className="mb-4 bg-gray-100 p-4 rounded">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`subject-${day}-${index}`}>
                Subject
              </label>
              <input
                type="text"
                id={`subject-${day}-${index}`}
                name="subject"
                value={period.subject}
                onChange={(e) => handlePeriodChange(day, index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`teacherId-${day}-${index}`}>
                Teacher
              </label>
              <select
                id={`teacherId-${day}-${index}`}
                name="teacherId"
                value={period.teacherId}
                onChange={(e) => handlePeriodChange(day, index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                ))}
              </select>

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`roomNumber-${day}-${index}`}>
                Room Number
              </label>
              <select
                id={`roomNumber-${day}-${index}`}
                name="roomNumber"
                value={period.roomNumber}
                onChange={(e) => handlePeriodChange(day, index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a room</option>
                {rooms.map(room => (
                  <option key={room._id} value={room.roomNumber}>{room.roomNumber}</option>
                ))}
              </select>

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`startPeriod-${day}-${index}`}>
                Start Period
              </label>
              <input
                type="time"
                id={`startPeriod-${day}-${index}`}
                name="startPeriod"
                value={period.startPeriod}
                onChange={(e) => handlePeriodChange(day, index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`endPeriod-${day}-${index}`}>
                End Period
              </label>
              <input
                type="time"
                id={`endPeriod-${day}-${index}`}
                name="endPeriod"
                value={period.endPeriod}
                onChange={(e) => handlePeriodChange(day, index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <button
                type="button"
                onClick={() => removePeriod(day, index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Remove Period
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addPeriod(day)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add Period
          </button>
        </div>
      ))}

      <div className="flex items-center justify-between mt-8">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Routine
        </button>
      </div>
    </form>
  );
};

export default AddWeeklyRoutineForm;
