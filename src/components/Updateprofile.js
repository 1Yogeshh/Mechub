import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const[name,setName]=useState('');
    const [about, setAbout]=useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();

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
                setAbout(response.data.about)
            } catch (err) {
                setError('Error fetching profile');
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                'http://localhost:5000/api/auth/updateprofile',
                { username, email,name, about },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            navigate('/profile');
            toast("profile update successfully")
        } catch (err) {
            setError('Error updating profile');
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-zinc-100'>
            <h1 className='font-medium text-3xl'>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>Name</label>
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-[2px] border-black rounded w-[500px] pl-2 pr-2 pt-1 pb-1'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='border-[2px] border-black rounded w-[500px] pl-2 pr-2 pt-1 pb-1'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-[2px] border-black rounded w-[500px] pl-2 pr-2 pt-1 pb-1'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium mt-2 mb-1'>About</label>
                    <textarea
                        type="type"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className='border-[2px] border-black rounded w-[500px] pl-2 pr-2 pt-1 pb-1 h-[100px]'
                    />
                </div>
                <button type="submit">Update</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
};

export default UpdateProfile;
