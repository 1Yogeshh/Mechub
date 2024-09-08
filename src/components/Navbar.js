import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import logo from "./MEC UB_20240831_150344_0000.png"
import { Github } from 'lucide-react';

function Navbar() {
  const navigate=useNavigate();

  const token= localStorage.getItem('token')


  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
    toast("user logout successfully")
  };


  return (
    <>
        <div className='flex h-16 items-center w-full justify-between  '>
            <div className='flex gap-4 ml-10'>
            <img src={logo} className='h-[110px] mt-8'></img>
            </div>
            <a href='https://github.com/1Yogeshh/Mechub' className='border border-[#5b23d7] h-[30px] w-[30px] justify-center items-center flex rounded-full text-white bg-[#5b23d7] hover:cursor-pointer ml-[1180px]'>
              <Github size={20}/>
            </a>
            <div className='flex mr-10'>
            {token ? (
            <div className=''>
              <button
                onClick={handleLogout}
                className='border-[1px]  pt-2 pb-2 pr-6 pl-6 rounded bg-[#5b23d7] text-sm text-white font-medium'
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
                <button className='bg-[#5b23d7] border-[#5b23d7] pt-3 pb-3 text-sm pl-8 pr-8 rounded text-white font-medium border-[2px] hover:text-[#5b23d7] hover:bg-white'>Signin</button>
                <button className='pt-3 pb-3 pl-7 text-sm pr-7 rounded font-medium border-[2px] border-[#5b23d7] text-[#5b23d7] ml-6 mr-6 hover:bg-[#5b23d7] hover:text-white'>Signup</button>
            </div>
          )}
            </div>
            
        </div>
        <div className='w-full h-[1px] bg-[#cbcfd4b3]'></div>
    </>
  )
}

export default Navbar
