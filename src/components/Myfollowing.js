// src/components/MyFollowingList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MyFollowingList = () => {
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/following', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowing(res.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching following');
      }
    };

    fetchFollowing();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!following.length) {
    return <p>No following found.</p>;
  }

  return (
    <div>
      <Navbar/>
        <div>
      <h2>My Following</h2>
      {following.map((followedUser) => (
        <div key={followedUser._id}>
          <p>{followedUser.username}</p>
          <p>{followedUser.name}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MyFollowingList;
