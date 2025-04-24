import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import logo from '../../assets/logo.png';

const Navbar = () => {
  const links = (
    <>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive 
            ? "text-gray-900 font-bold border-b-2 border-green-600" 
            : "text-gray-600 hover:text-gray-900"
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/bookings" 
        className={({ isActive }) => 
          isActive 
            ? "text-gray-900 font-bold border-b-2 border-green-600" 
            : "text-gray-600 hover:text-gray-900"
        }
      >
        Bookings
      </NavLink>
      <NavLink 
        to="/blogs" 
        className={({ isActive }) => 
          isActive 
            ? "text-gray-900 font-bold border-b-2 border-green-600" 
            : "text-gray-600 hover:text-gray-900"
        }
      >
        Blogs
      </NavLink>
      <NavLink 
        to="/contact" 
        className={({ isActive }) => 
          isActive 
            ? "text-gray-900 font-bold border-b-2 border-green-600" 
            : "text-gray-600 hover:text-gray-900"
        }
      >
        Contact Us
      </NavLink>
    </>
  );

  return (
    <nav className="py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <NavLink to="/">
            <img 
              src={logo}
              alt="Law.BD Logo"
              className="h-8 w-8" 
            />
          </NavLink>
          <NavLink to="/" className="text-gray-700 text-2xl font-semibold">
            Law.BD
          </NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {links}
        </div>
        <div>
          <NavLink to="/contact">
            <button className="bg-green-600 text-white font-medium py-2 px-6 rounded-full hover:bg-green-700 transition duration-300">
              Contact Now
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;