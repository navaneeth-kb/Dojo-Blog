import React from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="flex justify-between items-center h-screen bg-teal-600 px-8">
      <div>
        <h1 className="text-7xl font-bold text-white mb-4">Dojo Blog</h1>
        <p className="text-xl text-gray-100">Your journey to mastering the art of blogging starts here...</p>
      </div>
      <div className="flex flex-col space-y-4">
        <button
          className="px-6 py-2 text-teal-600 bg-gray-100 rounded-full font-semibold text-lg shadow-md"
          onClick={() => navigate('/signup')} // Navigate to the sign-in page
        >
          SIGN IN
        </button>
        <button
          className="px-6 py-2 text-teal-600 bg-gray-100 rounded-full font-semibold text-lg shadow-md"
          onClick={() => navigate('/login')} // Navigate to the login page
        >
          LOG IN
        </button>
      </div>
    </div>
  );
};

export default Splash;
