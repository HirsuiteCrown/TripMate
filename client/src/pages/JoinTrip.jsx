import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

export const JoinTrip = () => {
  const [tripCode, setTripCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BACKEND_URL}/api/trips/join`,
        { code: tripCode },
        { headers: { token: `${token}` } }
      );
      navigate(`/trips/${res.data._id}`);
    } catch (error) {
      console.error('Error joining trip:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Join a Trip</h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Trip Code</label>
          <input
            type="text"
            value={tripCode}
            onChange={(e) => setTripCode(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter trip code"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 w-full"
        >
          Join Trip
        </button>
      </form>
    </div>
  );
};

export default JoinTrip;