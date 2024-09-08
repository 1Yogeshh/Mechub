import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [location, setLocation]=useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [img, setImg] = useState(null);
    const [imgLoad, setImgLoad] = useState(false);

    const imgChange = (e) => {
      const file = e.target.files[0];
      setImg(file);
    }

    //dom60njrq

    const uploadImg = async () => {
      const data = new FormData();
      data.append('file',img);
      data.append('upload_preset', 'evagczqi');
      try {
        setImgLoad(true);
        let response = await fetch('https://api.cloudinary.com/v1_1/dom60njrq/image/upload', {
          method:'POST',
          body: data,
        })
        let urlData = response.json();
        setImgLoad(false);      
        return urlData;
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsername(response.data.username);
                setEmail(response.data.email);
                setName(response.data.name);
                setAbout(response.data.about);
                setLocation(response.data.location)
            } catch (err) {
                setError('Error fetching profile');
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = await uploadImg(img);
            await axios.put(
                'http://localhost:5000/api/auth/updateprofile',
                { username, email, name, about, location, img:url.url },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            toast.success("Profile updated successfully");
            navigate('/profile',{replace:true});
        } catch (err) {
            setError('Error updating profile');
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-zinc-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg justify-center flex flex-col items-center w-[700px]'>
            <h1 className='font-medium text-4xl text-[#5b23d7]'>Update Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border border-gray-400 outline-none rounded w-[500px] pl-2 pr-2 pt-1 pb-1'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='border border-gray-400 outline-none rounded w-[500px] pl-2 pr-2 pt-1 pb-1'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-400 outline-none rounded w-[500px] pl-2 pr-2 pt-1 pb-1'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>About</label>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className='border border-gray-400 outline-none rounded w-[500px] pl-2 pr-2 pt-1 pb-1 h-[100px]'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='border border-gray-400 outline-none rounded w-[500px] pl-2 pr-2 pt-1 pb-1'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>Profile pic</label>
                    <input
                        type="file"
                        onChange={imgChange}
                        className='border border-gray-400 outline-none rounded w-[500px] pl-2 pr-2 pt-1 pb-1'
                        required
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <button type="submit" className="bg-[#5b23d7] w-[500px] text-white py-2 px-4 rounded">
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
};

export default UpdateProfile;
