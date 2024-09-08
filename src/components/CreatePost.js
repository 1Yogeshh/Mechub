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
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageLoad, setImageLoad] = useState(false);

  const imageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'evagczqi'); // Your Cloudinary preset

    try {
      setImageLoad(true);
      let response = await fetch('https://api.cloudinary.com/v1_1/dom60njrq/image/upload', {
        method: 'POST',
        body: data,
      });
      let urlData = await response.json(); // Correctly await the JSON response
      setImageLoad(false);
      return urlData.secure_url; // Get the secure URL for the uploaded image
    } catch (error) {
      console.error(error);
      setImageLoad(false);
      toast("Image upload failed");
      return null;
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();

    // First, upload the image if it exists
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage();
      if (!imageUrl) return; // If image upload failed, exit the function
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) formData.append('file', file);
    if (imageUrl) formData.append('image', imageUrl); // Use the image URL from Cloudinary

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/auth/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      toast("Post created successfully");
      navigate('/dashboard');
    } catch (error) {
      toast("All fields are required");
    }
  };

  return (
    <div className='h-screen'>
      <Navbar />
      <div className='flex w-full'>
        <div className='w-[320px] text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0 h-screen'>
          <Sidenavbar />
        </div>
        <div className='w-[1300px] flex justify-center items-center bg-zinc-100 pb-32'>
          <div className='flex flex-col mt-8 w-[600px] items-center bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-medium text-[#5b23d7] mb-4'>Create Post</h2>
            <form onSubmit={handleCreatePost} className='flex flex-col gap-2'>
              <p className='font-medium'>Title</p>
              <input
                className='text-black rounded h-8 p-2 text-sm w-[500px] font-medium outline-none border-[1px] border-gray-200'
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className='font-medium mt-1'>Description</p>
              <textarea
                placeholder="Description"
                className='text-black text-sm rounded h-20 w-[500px] p-2 font-medium outline-none border-[1px] border-gray-200'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <p className='font-medium mt-1'>File</p>
              <input
                className='bg-white h-10 pt-1 pl-2 rounded font-medium border-[1px] border-gray-200 text-sm'
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <p className='font-medium mt-1'>Image</p>
              <input
                className='border-[1px] border-gray-200 h-10 pt-1 pl-2 rounded font-medium text-sm'
                type="file"
                onChange={imageChange}
              />
              <button className='bg-[#5b23d7] h-10 rounded mt-6 text-white font-medium' type="submit">
                {imageLoad ? 'Uploading...' : 'Create Post'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
