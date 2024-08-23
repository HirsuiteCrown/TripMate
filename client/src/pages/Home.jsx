import React from 'react';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar />
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 text-center">
                    One Stop Solution for Trip Management
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 text-center max-w-2xl">
                    Plan, organize, and enjoy your trips with ease. Connect with friends and make your travel dreams a reality.
                </p>
                <button 
                    onClick={() => navigate('/register')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                    Get Started
                </button>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    <FeatureCard 
                        title="Create & Join Trips" 
                        description="Easily create new trips or join existing ones with your friends."
                    />
                    <FeatureCard 
                        title="Collaborative Checklists" 
                        description="Manage group checklists visible to all members for better coordination."
                    />
                    <FeatureCard 
                        title="Personal Checklists" 
                        description="Keep track of your personal items with private checklists."
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);