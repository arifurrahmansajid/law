import React from 'react';
import Banner from '../../component/Banner/Banner';
import Footer from '../../component/Footer/footer';
import StatsSection from '../../component/StatsSection/StatsSection';
import LawyersGrid from '../lawyers/LawyersGrid';

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="mt-4 max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <Banner />
      </div>

      {/* Lawyers Grid Section */}
      <div className="mt-5 mb-5 max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <LawyersGrid />
      </div>

      {/* Stats Section */}
      <div className="mt-5 mb-5 max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <StatsSection />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;