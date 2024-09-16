import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyFollowingList = ({ userId }) => {
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is not provided');
        }
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://mechub-server.vercel.app/api/auth/following`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowing(res.data.following);
      } catch (err) {
        console.error('Error fetching following:', err);
        setError('Error fetching following');
      }
    };

    fetchFollowing();
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!following.length) {
    return <p>No following found.</p>;
  }

  return (
    <div>
      <h2>Following</h2>
      {following.map((user) => (
        <div key={user._id}>
          <p>{user.username}</p>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MyFollowingList;
