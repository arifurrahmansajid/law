import React, { useState, useEffect, useRef } from 'react';
// Import your icon images
import lawyerIcon from '../../assets/success-doctor.png';
import reviewsIcon from '../../assets/success-review.png';
import casesIcon from '../../assets/success-patients.png';
import staffIcon from '../../assets/success-staffs.png';

const CounterAnimation = ({ end, duration = 2000, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return (
    <h3 ref={countRef} className="text-3xl font-bold">
      {count}{suffix}
    </h3>
  );
};

const StatsSection = () => {
  const stats = [
    { icon: lawyerIcon, value: 199, label: "Total Lawyers" },
    { icon: reviewsIcon, value: 467, label: "Total Reviews" },
    { icon: casesIcon, value: 1900, label: "Cases Initiated" },
    { icon: staffIcon, value: 300, label: "Total Staff" }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">We Provide Best Law Services</h2>
        <p className="text-center text-gray-600 mb-10">Our platform connects you with skilled, experienced lawyers across various specialties — all at your convenience.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-100 rounded p-6 flex flex-col items-center justify-center">
              <div className="mb-4">
                <img 
                  src={stat.icon} 
                  alt={`${stat.label} Icon`} 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <CounterAnimation end={stat.value} />
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsSection;