import React from 'react';
import Navbar from '../../component/Header/Navbar';
//import Footer from '../../component/Footer/Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  return (
    <div className="mx-auto max-w-[1170px]">
      <Navbar/>
      <Outlet/>
     

     {/* Add the ToastContainer component */}
     <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Root;
