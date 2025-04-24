import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

const PageLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start loading whenever location changes
    setIsLoading(true);

    // Simulate a delay (or use your actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return <Outlet />;
};

export default PageLoader;