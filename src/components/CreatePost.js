import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidenavbar from './Sidenavbar';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const navigate=useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) formData.append('file', file);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/auth/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, 
        },
      });
      toast("post created successfully")
      navigate('/dashboard')
      // Redirect to home page
    } catch (error) {
      toast("all field are required")
    }
  };

  return (
    <div className='h-screen'>
      <Navbar/>
      <div className='flex w-full'>
        <div className='w-1/5 text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0 '>
        <Sidenavbar/>
        </div>
        <div className='w-[1300px] flex justify-center items-center'>
        <div className='flex flex-col mt-8 w-[600px] items-center'>
      <h2 className='text-2xl font-medium text-[#5b23d7] mb-4'>Create Post</h2>
      <form onSubmit={handleCreatePost} className='flex flex-col gap-2'>
        <p className=' font-medium'>Title</p>
        <input className='text-black rounded h-8 p-2 w-[500px] font-medium outline-none border-[1px] border-gray-200' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <p className=' font-medium mt-1'>Discription</p>
        <textarea placeholder="Description" className='text-black rounded h-20 w-[500px] p-2 font-medium outline-none border-[1px] border-gray-200' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <p className=' font-medium mt-1'>File</p>
        <input className='bg-white h-10 pt-1 pl-2 rounded font-medium border-[1px] border-gray-200' type="file" onChange={(e) => setFile(e.target.files[0])} />
        <p className=' font-medium mt-1'>Image</p>
        <input className='border-[1px] border-gray-200 h-10 pt-1 pl-2 rounded font-medium' type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className='bg-[#5b23d7] h-10 rounded mt-6 text-white font-medium' type="submit">Create Post</button>
      </form>
    </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
