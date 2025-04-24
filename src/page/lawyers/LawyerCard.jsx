// LawyerCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LawyerCard = ({ lawyer }) => {
  if (!lawyer) {
    return <div className="p-4 bg-gray-100 rounded">No lawyer data available.</div>;
  }
  
  return (
    <div className="w-full">
      <div className="flex bg-white rounded-md shadow-sm border border-gray-100 p-4 md:p-6 w-full">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-md flex-shrink-0">
          {lawyer.imageUrl && (
            <img 
              src={lawyer.imageUrl} 
              alt={lawyer.name} 
              className="w-full h-full object-cover rounded-md"
            />
          )}
        </div>
        <div className="ml-3 md:ml-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="inline-block text-xs bg-green-50 text-green-500 px-2 py-0.5 rounded-full font-medium">
                {lawyer.availability === false ? "Unavailable" : "Available"}
              </span>
              <span className="text-xs text-blue-500 font-medium">{lawyer.experience}</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-700">{lawyer.name}</h3>
            <p className="text-gray-500 text-sm">{lawyer.specialty}</p>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            License No: <span className="font-medium">{lawyer.licenseNo}</span>
          </div>
          <div className="flex justify-end mt-1">
            <Link
              to={`/LawyerDetails/${lawyer.id}`}
              className="text-blue-500 text-sm hover:underline font-medium border border-blue-500 px-2 py-1 rounded"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;