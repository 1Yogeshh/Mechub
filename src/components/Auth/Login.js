import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();

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
  },[])

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const res = await axios.post('https://mechub-server.vercel.app/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
      toast.success(res.data.message)
      dispatch(getUser(res.data.user))
    } catch (err) {
      toast("incorrect email or password  ")
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[500px] flex flex-col justify-center h-[500px] items-center text-center shadow-lg rounded-lg'>

<h2 className=' font-[700] text-[40px] mb-4'>Sign in to <span className='text-[#5b23d7]'>Mechub</span></h2>

<form onSubmit={handleSubmit} className='flex flex-col text-left'>

  <label className='font-medium  mb-1'>Email address</label>

  <div className='flex  bg-white border-[2px] border-black rounded'>
  <Mail color='red' className='m-2'/>
  <input 
    className='font-medium outline-none p-2 w-96 rounded text-sm' 
    type="email"
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    placeholder="example@gmail.com" 
    required />
  </div>  

  <label className='font-medium  mb-1 mt-2'>Password</label>

  <div className='flex  bg-white border-[2px] border-black rounded'>
  <Lock color='blue' className='m-2'/>
  <input 
    className='font-medium outline-none p-2 w-96 rounded text-sm' 
    type="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    placeholder="Password" 
    required />
  </div>  
  <button type="submit" className='w-[430px] p-2 mt-6 bg-[#5b23d7] border-none rounded font-medium text-white'>Login</button>

  <p className='flex justify-center mt-4 font-medium gap-2 '>New to Mechub?<a href='/register' className='text-[#5b23d7] cursor-pointer'>Create a account</a></p>

</form>
</div>
    </div>
  );
};

export default Login;
