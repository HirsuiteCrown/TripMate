import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { BACKEND_URL } from "../config";
import { FaPlus, FaUsers, FaSpinner } from 'react-icons/fa';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${BACKEND_URL}/api/trips`, {
          headers: { token: `${token}` }
        });
        setTrips(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleTripClick = (id) => {
    navigate(`/trips/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Trips</h2>
          <div className="space-x-4 flex">
            <button 
              onClick={() => navigate('/create-trip')} 
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <FaPlus className="mr-2" /> Create Trip
            </button>
            <button 
              onClick={() => navigate('/join-trip')} 
              className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-200 flex items-center"
            >
              <FaUsers className="mr-2" /> Join Trip
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map(trip => (
              <div 
                key={trip._id} 
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                onClick={() => handleTripClick(trip._id)}
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">{trip.name}</h3>
                <p className="text-gray-700 mb-4">{trip.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Created: {new Date(trip.createdAt).toLocaleDateString()}</span>
                  <span>{trip.members?.length || 1} member(s)</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">You don't have any trips yet.</p>
            <button 
              onClick={() => navigate('/create-trip')} 
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              Create Your First Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}