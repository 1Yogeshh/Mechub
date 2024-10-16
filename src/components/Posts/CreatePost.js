import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidenavbar from '../Navbar/Sidenavbar';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageLoad, setImageLoad] = useState(false);
  const [fileLoad, setFileLoad] = useState(false);

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

  const fileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }

  const uploadFile = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'evagczqi'); // Your Cloudinary preset

    try {
      setFileLoad(true);
      let response = await fetch('https://api.cloudinary.com/v1_1/dom60njrq/image/upload', {
        method: 'POST',
        body: data,
      });
      let urlData = await response.json(); // Correctly await the JSON response
      setFileLoad(false);
      return urlData.secure_url; // Get the secure URL for the uploaded image
    } catch (error) {
      console.error(error);
      setFileLoad(false);
      toast("Image upload failed");
      return null;
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();
  
    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }
  
    // Retrieve the token and validate
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }
  
    // Upload image if it exists
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage();
      if (!imageUrl) return; // If image upload failed, exit the function
    }

    // Upload image if it exists
    let fileUrl = null;
    if (file) {
      fileUrl = await uploadFile();
      if (!fileUrl) return; // If image upload failed, exit the function
    }
  
    /*const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (fileUrl) formData.append('file', fileUrl);
    if (imageUrl) formData.append('image', imageUrl);
    
    // Logging the FormData content
    for (const [key, value] of formData.entries()) {
      console.log(key, value); // Check what's being added to FormData
  }*/
      const postData = {
        title: title,
        description: description,
        image: imageUrl,
        file: fileUrl
      };
  
    try {
      const res = await axios.post(' https://mechub-server.vercel.app/api/auth/create', postData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      
      // Clear form
      setTitle('');
      setDescription('');
      setFile(null);
      setImage(null);
      
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        // Something else caused an error
        toast.error("An unexpected error occurred");
      }
      console.log(error);
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
                onChange={fileChange}
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
