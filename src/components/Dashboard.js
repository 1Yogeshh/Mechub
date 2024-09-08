import React from 'react';
import CreatePost from './CreatePost';
import Posts from './Posts';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Rightbar from './RightBar';
import Leftbar from './Leftbar';
import Sidenavbar from './Sidenavbar';

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
      <div className=' bg-zinc-100   text-2xl w-[1230px]'>
         <Posts/>
      </div>
    </div>
    </div>
  </>;
};

export default Dashboard;
