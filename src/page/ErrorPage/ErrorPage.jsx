import React from 'react';
import Navbar from '../../component/Header/Navbar';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg px-16 py-14 text-center">
          <div className="flex justify-center items-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-yellow-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V8.25m-3-6H15M5.25 5.25h13.5" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-4">Lost Connection</h1>
          <p className="mt-2 text-gray-600 mb-8">The page you were trying to reach seems to be disconnected.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
          >
            Take Me Home
          </button>
        </div>
      </div>
      {/* Footer will not appear as it's not included here */}
    </div>
  );
};

export default ErrorPage;