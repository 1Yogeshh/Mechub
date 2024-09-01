// src/components/FollowersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const FollowersList = () => {
  const { id , username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/auth/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowers(res.data.followers);
      } catch (err) {
        console.error(err);
        setError('Error fetching followers');
      }
    };

    fetchFollowers();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!followers.length) {
    return <p>No followers found.</p>;
  }

  return (
    <div>
      <Navbar/>
      <div className='w-full ml-20 mt-10'>
      <h2 className='text-white font-medium text-2xl'>{username}'s Followers</h2>
      {followers.map((follower) => (
        <div key={follower._id} className='border-2 flex border-[#30363db3] w-[300px] mt-4 rounded bg-[#303336] text-white font-medium p-2'>
          <div className='w-8 h-8 rounded-full bg-black mt-2 mr-2'></div>
          <div>
          <p>{follower.username}</p>
          <p >{follower.name}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FollowersList;
