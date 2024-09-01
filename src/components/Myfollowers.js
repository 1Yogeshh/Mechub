// src/components/MyFollowersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MyFollowersList = () => {
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/followers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowers(res.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching followers');
      }
    };

    fetchFollowers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!followers.length) {
    return <p>No followers found.</p>;
  }

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>
      <h2>My Followers</h2>
      {followers.map((follower) => (
        <div key={follower._id}>
          <p>{follower.username}</p>
          <p>{follower.name}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MyFollowersList;
