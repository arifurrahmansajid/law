// LawyerDetails.jsx - Updated with connection to separate Booking component
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LawyerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLawyerDetails = async () => {
      try {
        setLoading(true);
        // Assuming you have a JSON file or API endpoint for individual lawyer details
        const response = await fetch('/lawyers.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Find the lawyer with the matching ID - convert id to string for comparison
        const foundLawyer = data.find(lawyer => lawyer.id.toString() === id.toString());
        
        if (!foundLawyer) {
          console.error(`Lawyer with ID ${id} not found. Available IDs:`, data.map(l => l.id));
          throw new Error('Lawyer not found');
        }
        
        console.log("Found lawyer:", foundLawyer);
        setLawyer(foundLawyer);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching lawyer:", e);
        setError(e.message);
        setLoading(false);
      }
    };
    
    fetchLawyerDetails();
  }, [id]);
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const availableDays = lawyer?.availableDays || ['Sunday', 'Monday', 'Thursday'];
  
  const handleBookAppointment = () => {
    console.log(`Booking appointment with ${lawyer?.name}`);
    
    if (lawyer) {
      // Store lawyer data in session storage
      const bookingData = {
        lawyerId: lawyer.id,
        lawyerName: lawyer.name,
        specialty: lawyer.specialty,
        fee: lawyer.fee || 275,
        licenseNo: lawyer.licenseNo
      };
      
      // Store in session storage
      sessionStorage.setItem('bookingLawyer', JSON.stringify(bookingData));
      
      // Show toast notification if react-toastify is set up
      if (typeof toast === 'function') {
        toast.success(`Initiating booking with ${lawyer.name}`);
      }
      
      // Navigate to the booking page
      // IMPORTANT: Make sure this path matches exactly what's in your router configuration
      navigate('/booking');
    } else {
      console.error("Cannot book: lawyer data is not available");
      if (typeof toast === 'function') {
        toast.error('Unable to book appointment. Lawyer information not available.');
      }
    }
  };
  
  if (loading) {
    return <div className="p-10 text-center">Loading lawyer details...</div>;
  }
  
  if (error) {
    return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  }
  
  if (!lawyer) {
    return <div className="p-10 text-center">Lawyer not found</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4 my-8">
      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
        {/* Profile Details Section */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-center mb-2">Lawyer's Profile Details</h2>
          <p className="text-sm text-gray-500 text-center">
            {lawyer.bio || "Lorem ipsum dolor sit amet consectetur. Sit enim blandit eget tortor amet ut blandit vitae elit fermentum magna. Quis vitae tempus facilisis felis. Imperdiet mattis efelis dign nibrm viverra."}
          </p>
        </div>
        
        {/* Lawyer Info Section */}
        <div className="bg-white p-6 flex flex-col md:flex-row gap-4 border-t border-b border-gray-200">
          <div className="w-full md:w-48 h-48 bg-gray-200 rounded-md flex-shrink-0">
            {lawyer.imageUrl && (
              <img 
                src={lawyer.imageUrl} 
                alt={lawyer.name} 
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>
          
          <div className="flex-1">
            <div className="mb-3">
              <span className="inline-block text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-medium">
                {lawyer.experience || "Experience"}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold">{lawyer.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span>{lawyer.specialty}</span>
              <span className="mx-3 text-gray-300">•</span>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                License No: {lawyer.licenseNo}
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">Availability</h4>
              <div className="flex gap-2 flex-wrap">
                {daysOfWeek.map((day, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      availableDays.includes(day)
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex items-center">
              <span className="text-sm text-gray-600">Consultation Fee:</span>
              <span className="ml-2 bg-green-50 text-green-600 px-3 py-1 text-xs font-medium rounded-full">
                Taka: {lawyer.fee || "275"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Book Appointment Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-center mb-6">Book an Appointment</h3>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Availability</span>
            <span className="inline-block text-xs bg-green-50 text-green-500 px-2 py-0.5 rounded-full font-medium">
              Lawyer Available Today
            </span>
          </div>
          
          <div className="p-3 bg-amber-50 text-amber-600 rounded-md mb-6 flex items-start">
            <span className="mr-2 text-amber-500 mt-0.5">⚠️</span>
            <p className="text-xs">
              Due to high patient volume, we are currently accepting appointments for today only. We appreciate your understanding and cooperation.
            </p>
          </div>
          
          <button 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition-colors"
            onClick={handleBookAppointment}
          >
            Book Appointment Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerDetails;