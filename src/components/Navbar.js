import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import logo from "./MEC UB_20240831_150344_0000.png"

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
            <div className=''>
              <a className='mt-1 mr-4 ml-28 bg-blue-500  font-medium pl-3 pr-3 pt-1 pb-1 rounded' href='/register'>Sign Up</a>
              <a className='mt-1 text-blue-500 font-medium pl-3 pr-3 pt-1 pb-1 rounded' href='/login'>Sign In</a>
            </div>
          )}
            </div>
            
        </div>
        <div className='w-full h-[1px] bg-[#cbcfd4b3]'></div>
    </>
  )
}

export default Navbar
