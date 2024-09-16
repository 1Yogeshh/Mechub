import React from 'react';
import Posts from '../Posts/Posts';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Sidenavbar from '../Navbar/Sidenavbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token'); // Or your method of token storage

  const handleLogoClick = () => {
    if (isAuthenticated) {
      // Navigate to the profile page if authenticated
      navigate('/dashboard');
    } else {
      // Navigate to the login page if not authenticated
      navigate('/login');
    }
  };



  return <>
    <div className=''>
    <div className=''>
        <Navbar/>
    </div>
    <div className='flex w-full'>
      <div className='w-[320px] text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0  h-screen'><Sidenavbar/></div>
      <div className=' bg-zinc-100   text-2xl justify-center flex w-[1230px]'>
         <div className='bg-white w-[1000px] flex justify-center mt-4 rounded-md mb-4 shadow-lg'>
         <Posts/>
         </div>
      </div>
    </div>
    </div>
  </>;
};

export default Dashboard;
