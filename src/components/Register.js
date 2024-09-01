import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Lock, Mail, User } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res= await axios.post('http://localhost:5000/api/auth/signup', { name, username, email, password });
      if(res.data.success){
        navigate('/login');
        toast.success(res.data.message)
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=' flex flex-col h-[600px] w-[500px] justify-center items-center text-center shadow-lg rounded-lg'>

<h2 className=' font-[700] text-[40px]  mb-4'>Sign in to <span className='text-[#5b23d7]'>Mechub</span></h2>

<form onSubmit={handleSubmit} className='flex flex-col text-left'>

  <label className='font-medium  mb-1'>Name</label>
  <div className='flex bg-white border-[2px] border-black rounded'>
  <User color='purple' className='m-2'/>
  <input className='font-medium outline-none p-2 w-96 rounded' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" required />
  </div>

  <label className='font-medium mb-1 mt-2'>Username</label>
  <div className='flex bg-white border-[2px] border-black rounded'>
  <User color='green' className='m-2'/>
  <input className='font-medium outline-none p-2 w-96 rounded ' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" required />
  </div>

  <label className='font-medium  mb-1 mt-2'>Email address</label>
  <div className='flex bg-white border-[2px] border-black rounded'>
  <Mail color='red' className='m-2'/>
  <input className='font-medium outline-none p-2 w-96 rounded' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" required />
  </div>
  <label className='font-medium  mb-1 mt-2'>Password</label>
  <div className='flex bg-white border-[2px] border-black rounded '>
  <Lock color='blue' className='m-2'/>
  <input className='font-medium outline-none p-2 w-96 rounded' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
  </div>
  <button type="submit" className='w-[420px] p-2 mt-6 bg-[#5b23d7] border-none rounded font-medium text-white'>Register</button>

  <p className='flex justify-center mt-4 font-medium gap-2'>Already have an account?<a href='/login' className='text-[#5b23d7] cursor-pointer'>Signin</a></p>

</form>

</div>
    </div>
  );
};

export default Register;
