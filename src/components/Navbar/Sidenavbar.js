import { Aperture, BellRing, CircleUserRound, FolderPlus, Github, House, Linkedin, LogOut, Mail, Search, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Sidenavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  /*const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
    toast("User logged out successfully");
  };*/

  // Function to add active class
  const getActiveClass = ({ isActive }) => isActive ? 'text-[#5b23d7] bg-[#e9eaf0] rounded-md' : 'text-black';

  return (
    <div className='md:ml-12 md:mr-0 mr-4 ml-4 mt-4 sticky top-4'>
      <div className='mt-4 mb-4 w-[45px] md:w-[200px]'>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `flex gap-2 items-center p-3 text-[15px] ${getActiveClass({ isActive })}`}>
          <House size={20} />
          <span className='md:flex hidden'>Home</span>
        </NavLink>
      </div>
      <div className='bg-[#e0e0e0] h-[1px] w-[50px] md:w-[200px]'></div>
      <div className='mt-4 mb-4 w-[45px] md:w-[200px]'>
        <NavLink
          to='/search'
          className={({ isActive }) => `flex gap-2 items-center p-3 text-[15px] ${getActiveClass({ isActive })}`}>
          <Search size={20} />
          <span className='md:flex hidden'>Search</span>
        </NavLink>
      </div>
      <div className='bg-[#e0e0e0] h-[1px] w-[50px] md:w-[200px]'></div>
      <div className='mt-4 mb-4 w-[45px] md:w-[200px]'>
        <NavLink
          to='/create'
          className={({ isActive }) => `flex gap-2 items-center p-3 text-[15px] ${getActiveClass({ isActive })}`}>
          <FolderPlus size={20} />
          <span className='md:flex hidden'>Create</span>
        </NavLink>
      </div>
      <div className='bg-[#e0e0e0] h-[1px] w-[50px] md:w-[200px]'></div>
      <div className='mt-4 mb-4 w-[45px] md:w-[200px]'>
        <NavLink
          to='/notification'
          className={({ isActive }) => `flex gap-2 items-center p-3 text-[15px] ${getActiveClass({ isActive })}`}>
          <BellRing size={20}/>
          <span className='md:flex hidden'>Notification</span>
        </NavLink>
      </div>
      <div className='bg-[#e0e0e0] h-[1px] w-[50px] md:w-[200px]'></div>
      <div className='mt-4 mb-4 w-[45px] md:w-[200px]'>
        <NavLink
          to='/profile'
          className={({ isActive }) => `flex gap-2 items-center p-3 text-[15px] ${getActiveClass({ isActive })}`}>
          <CircleUserRound size={20}/>
          <span className='md:flex hidden'>My Profile</span>
        </NavLink>
      </div>
      <div className='bg-[#e0e0e0] h-[1px] w-[50px] md:w-[200px]'></div>
      
    </div>
  );
}

export default Sidenavbar;
