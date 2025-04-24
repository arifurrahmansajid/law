import React from 'react';
import backgroundImage from '../../assets/banner-img-1.png'; // Ensure this path is correct

const Banner = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 relative">
      {/* Banner Container with Background Image */}
      <div 
        className="w-full h-[500px] rounded-3xl overflow-hidden relative shadow-lg"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >

        
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-20">
          {/* Heading */}
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-6 max-w-3xl">
            It avoids subjective claims or exaggeration that might raise red flags legally
          </h1>
          
          {/* Description */}
          <p className="text-neutral-400 text-base md:text-lg max-w-3xl">
            Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's a routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.
          </p>
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          <div className="h-1 w-6 bg-white rounded-full opacity-50"></div>
          <div className="h-1 w-6 bg-white rounded-full"></div>
          <div className="h-1 w-6 bg-white rounded-full opacity-50"></div>
        </div>
        
        {/* Left/Right Arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 opacity-75 hover:opacity-100">
          <span className="text-2xl">&lt;</span>
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 opacity-75 hover:opacity-100">
          <span className="text-2xl">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;