import { Aperture, CircleUserRound, FolderPlus, House, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Sidenavbar() {
  const navigate=useNavigate();

  const token= localStorage.getItem('token')


  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
    toast("user logout successfully")
  };

  // Function to add active class
  const getActiveClass = ({ isActive }) => isActive ? 'text-[#5b23d7]' : 'text-black';


  return (
    <div className='ml-[50px] mt-[20px] sticky top-[20px]'>
      <div className='mt-6 mb-6'>
        <NavLink 
          exact 
          to="/dashboard"
          className={({ isActive }) => `font-medium flex gap-2 items-center text-[15px] ${getActiveClass({ isActive })}`}>
          <House size={20}/>
          Home
        </NavLink>
      </div>
      <div className='bg-[#cbcfd4b3] h-[0.5px] w-[200px]'></div>
      <div className='mt-6 mb-6'>
        <NavLink to='/search' className={({ isActive }) => `font-medium flex gap-2 items-center text-[15px] ${getActiveClass({ isActive })}`}><Aperture size={20}/> Explore</NavLink>
      </div>
      <div className='bg-[#cbcfd4b3] h-[0.5px] w-[200px]'></div>
      <div className='mt-6 mb-6'>
        <NavLink to='/create' className={({ isActive }) => `font-medium flex gap-2 items-center text-[15px] ${getActiveClass({ isActive })}`}><FolderPlus size={20}/> Create</NavLink>
      </div>
      <div className='bg-[#cbcfd4b3] h-[0.5px] w-[200px]'></div>
      <div className='mt-6 mb-6'>
        <NavLink className={({ isActive }) => `font-medium flex gap-2 items-center text-[15px] ${getActiveClass({ isActive })}`} to='/profile'><CircleUserRound size={20}/> My Profile</NavLink>
      </div>
      <div className='bg-[#cbcfd4b3] h-[0.5px] w-[200px]'></div>
      <div className='mt-[350px]'>
        <NavLink onClick={handleLogout} className='flex font-medium gap-2 hover:cursor-pointer items-center text-[15px] hover:text-blue-600'><LogOut size={20}/> Logout</NavLink>
      </div>
    </div>
  )
}

export default Sidenavbar
