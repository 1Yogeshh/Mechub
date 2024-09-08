import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner';
import { ChevronRight } from 'lucide-react';
import Navbar from "./Navbar"
import Startnav from './Startnav';
const Start=()=> {
    const navigate=useNavigate();
    const token= localStorage.getItem('token')
    /*
    const changeScreen=()=>{
    const token=localStorage.getItem('token')
    if(token){
        setTimeout(()=>{
            navigate('/dashboard')
        },2000);
    }else{
        setTimeout(()=>{
            navigate('/login')
        },2000)
    }
    }

    useEffect(()=>{
        changeScreen();
    },[])*/
  return (
    <div className='hero'>
    {/*
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['blue', 'blue', 'blue', 'blue', 'blue']}
  />*/}
  <div className='bg-gradient-to-b from-slate-200 to-white h-screen flex flex-col justify-center w-screen text-center items-center'>
  <Startnav/>
  <div className='flex flex-col h-screen  justify-center items-center text-center'>
  
    <div>
      <h1 className='font-bold text-7xl'>The Home for<br></br> <span className='text-[#5b23d7]'>Developer</span> Communities</h1>
    </div>
    <div className='mt-4'>
      <p className='text-gray-500 font-medium text-[19px]'>Collaborate effortlessly with peers and streamline your Mechanical engineering projects, designs, <br></br>share ideas and enhance productivity</p>
    </div>
    <div className='mt-4 flex gap-4'>
      {token ? (
            <div className=''>
            <button onClick={()=>navigate("/dashboard")} className='bg-[#5b23d7] border-[2px] border-[#5b23d7] hover:text-[#5b23d7] hover:bg-white text-sm  text-white font-medium h-[50px] w-[150px] rounded-lg flex justify-center items-center gap-2'>Dashboard</button>
            </div>
          ) : (
            <div className=''>
            <button onClick={()=>navigate("/login")} className='bg-[#5b23d7] border-[2px] border-[#5b23d7] hover:text-[#5b23d7] hover:bg-white text-sm  text-white font-medium h-[50px] w-[150px] rounded-lg flex justify-center items-center gap-2'>Dashboard</button>
            </div>
          )}
       <div>
        <button className='bg-white border-[2px] border-[#5b23d7] hover:text-white hover:bg-[#5b23d7] text-sm  text-[#5b23d7] font-medium h-[50px] w-[150px] rounded-lg flex justify-center items-center gap-2'>See how it works</button>
       </div>   
    </div>
  </div>
  </div>


  
  </div>
  )
}

export default Start
