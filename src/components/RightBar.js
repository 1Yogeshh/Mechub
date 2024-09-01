import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pic from "./yogesh pic.jpg"

function Rightbar() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/auth/otheruser', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                setUsers(res.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching users');
            }
        };

        fetchUsers();
    }, []);


    const handleProfile=(userId)=>{
        navigate(`/user/${userId}`)
    }

  return (
    <div>
    <h1 className=' text-xl font-medium mt-4'>Other Users</h1>
    {error && <p>{error}</p>}
    {users.length > 0 ? (
        <ul>
            {users.map(user => (
                <li key={user._id}>
                    <div className=' border-[1px] border-[#30363db3] mt-4 rounded w-[300px] h-auto p-2 flex justify-between'>
                    <div className='flex gap-2'>
                        <img className='h-10 w-10 rounded-full' src={pic}></img>
                        <div>
                    <h2 className='font-medium'>{user.name}</h2>
                    <p className='font-medium text-sm text-gray-600'>{user.username}</p>
                    </div>
                    </div>
                    <button className='border-[1px] bg-blue-500 rounded h-8 pl-5 pr-5 text-white font-medium' onClick={()=>handleProfile(user._id)}>Profile</button>
                    </div>
                    {/* Add more user details if needed */}
                </li>
            ))}
        </ul>
    ) : (
        <div className='flex justify-center mt-10'>
        <p className='font-medium'>No users found</p>
        </div>
    )}
</div>
  )
}

export default Rightbar
