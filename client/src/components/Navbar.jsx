import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="bg-white shadow sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>TripMate</h1>
                <ul className="flex space-x-6">
                    <li>
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-gray-600 hover:text-blue-500 transition px-4 py-2 rounded-full duration-300"
                        >
                            Login
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => navigate('/register')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
                        >
                            Sign Up
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};