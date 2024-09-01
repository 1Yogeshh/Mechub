import React from 'react'
import logo from "./MEC UB_20240831_150344_0000.png"
import { Box, Cable, PackageOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Startnav() {
  const navigate=useNavigate()
    const token= localStorage.getItem('token')
    const handleLogout = () => {
      localStorage.removeItem('token'); // Remove the token from local storage
      navigate('/login'); // Redirect to the login page
      toast("user logout successfully")
    };
  return (
    <div className='bg-white h-[70px] items-center flex w-screen rounded justify-between'>
      <div className='ml-16 flex justify-center items-center text-center'>
         <img className='h-[110px] mt-8' src={logo}></img>
      </div>
      <div className='flex gap-16 font-bmedium mr-[500px] text-[15px]'>
        <p className='hover:cursor-pointer hover:text-[#5b23d7] flex gap-2'><Box className='hover:text-[#5b23d7]'/> Product</p>
        <p className='hover:cursor-pointer flex gap-2 hover:text-[#5b23d7]'><Cable  className='hover:text-[#5b23d7]'/> Solutions</p>
        <p className='hover:cursor-pointer flex gap-2 hover:text-[#5b23d7]'><PackageOpen className='hover:text-[#5b23d7]'/> Open Source</p>
      </div>
      <div className='mr-8'>
        {
            token?(
                <div>
                <button onClick={handleLogout} className='mr-6 ml-20 bg-[#5b23d7] hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-700 hover:text-white pt-2 pb-2 pl-7 pr-7 rounded text-white font-medium border-[1px]'>Logout</button>
                </div>                
            ):(
                <div>
                <button className='bg-[#5b23d7] border-[#5b23d7] pt-3 pb-3 text-sm pl-8 pr-8 rounded text-white font-medium border-[2px] hover:text-[#5b23d7] hover:bg-white'>Signin</button>
                <button className='pt-3 pb-3 pl-7 text-sm pr-7 rounded font-medium border-[2px] border-[#5b23d7] text-[#5b23d7] ml-6 mr-6 hover:bg-[#5b23d7] hover:text-white'>Signup</button>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default Startnav
