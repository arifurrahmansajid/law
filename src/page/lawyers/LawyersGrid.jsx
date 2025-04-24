// LawyersGrid.jsx
import React, { useState, useEffect } from 'react';
import LawyerCard from './LawyerCard';

const LawyersGrid = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch('/lawyers.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLawyers(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const handleShowAll = () => {
    setVisibleCount(lawyers.length);
  };

  const visibleLawyers = lawyers.slice(0, visibleCount);
  const hasMoreToShow = visibleCount < lawyers.length;

  if (loading) {
    return <div>Loading lawyers...</div>;
  }

  if (error) {
    return <div>Error loading lawyers: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-screen-lg px-6 py-10 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Our Best Lawyers</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Our platform connects you with verified, experienced Lawyers across various specialties — all at your convenience. Whether it's a routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.
        </p>
      </div>

      <div className="border-t border-b border-dashed border-blue-200 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
          {visibleLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </div>

      {hasMoreToShow && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowAll}
            className="bg-green-500 text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-green-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
          >
            Show All Lawyers
          </button>
        </div>
      )}
    </div>
  );
};

export default LawyersGrid;