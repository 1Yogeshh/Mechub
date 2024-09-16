// src/components/FollowingList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const FollowingList = () => {
  const { id, username } = useParams();
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://mechub-server.vercel.app/api/auth/following/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowing(res.data.following);
      } catch (err) {
        console.error(err);
        setError('Error fetching following');
      }
    };

    fetchFollowing();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!following.length) {
    return <p className="text-center">No following found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">{username}'s Following</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {following.map((followedUser) => (
            <div key={followedUser._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <img src={followedUser.img} alt={followedUser.username} className="w-24 h-24 object-cover rounded-full mb-2"/>
              <p className="text-lg font-medium">{followedUser.username}</p>
              <p className="text-gray-600">{followedUser.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowingList;
