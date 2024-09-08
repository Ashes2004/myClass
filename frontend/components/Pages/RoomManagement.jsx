import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomNumber: '', capacity: '' });
  const [editingRoom, setEditingRoom] = useState(null);

  // Fetch all rooms
  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  // Create a new room
  const createRoom = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/rooms', newRoom)
      .then(response => {
        setRooms([...rooms, response.data]);
        setNewRoom({ roomNumber: '', capacity: '' });
      })
      .catch(error => console.error('Error creating room:', error));
  };

  // Update a room
  const updateRoom = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/rooms/${editingRoom._id}`, editingRoom)
      .then(response => {
        const updatedRooms = rooms.map(room => room._id === editingRoom._id ? response.data : room);
        setRooms(updatedRooms);
        setEditingRoom(null);
      })
      .catch(error => console.error('Error updating room:', error));
  };

  // Delete a room
  const deleteRoom = (roomId) => {
    axios.delete(`http://localhost:5000/api/rooms/${roomId}`)
      .then(() => setRooms(rooms.filter(room => room._id !== roomId)))
      .catch(error => console.error('Error deleting room:', error));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Room Management</h1>
        
        {/* Form for adding or editing room */}
        <form onSubmit={editingRoom ? updateRoom : createRoom} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Room Number</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={editingRoom ? editingRoom.roomNumber : newRoom.roomNumber}
              onChange={e => editingRoom ? setEditingRoom({ ...editingRoom, roomNumber: e.target.value }) : setNewRoom({ ...newRoom, roomNumber: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Capacity</label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={editingRoom ? editingRoom.capacity : newRoom.capacity}
              onChange={e => editingRoom ? setEditingRoom({ ...editingRoom, capacity: e.target.value }) : setNewRoom({ ...newRoom, capacity: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-${editingRoom ? 'blue' : 'green'}-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-${editingRoom ? 'blue' : 'green'}-700`}
          >
            {editingRoom ? 'Update Room' : 'Add Room'}
          </button>
        </form>

        {/* Room List */}
        <div className="bg-gray-50 shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Room Number</th>
                <th className="py-3 px-6 text-left">Capacity</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {rooms.map(room => (
                <tr key={room._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{room.roomNumber}</td>
                  <td className="py-3 px-6 text-left">{room.capacity}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-blue-500 text-white font-bold py-1 px-3 rounded mr-2 hover:bg-blue-700"
                      onClick={() => setEditingRoom(room)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => deleteRoom(room._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;
