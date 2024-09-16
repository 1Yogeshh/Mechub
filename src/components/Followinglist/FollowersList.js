import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const FollowersList = () => {
  const { id, username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://mechub-server.vercel.app/api/auth/followers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response:', res.data); // Log the response data to check its structure
        setFollowers(res.data.followers || []); // Ensure it's an array
      } catch (err) {
        console.error('Error fetching followers:', err);
        setError('Error fetching followers');
      }
    };

    fetchFollowers();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className='w-full ml-20 mt-10'>
        <h2 className='font-medium text-2xl'>{username}'s Followers</h2>

        {/* Display message if no followers */}
        {followers.length === 0 ? (
          <p className='text-gray-400 mt-4'>No followers yet.</p>
        ) : (
          Array.isArray(followers) && followers.map((follower) => (
            <div
              key={follower._id}
              className='border-2 flex border-[#30363db3] w-[300px] mt-4 rounded bg-[#303336] text-white font-medium p-2'
            >
              {/* Profile Image */}
              <div className='w-12 h-12 rounded-full bg-black mt-2 mr-2 overflow-hidden'>
                {follower.img ? (
                  <img
                    src={follower.img}
                    alt={`${follower.username}'s profile`}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-500'></div>
                )}
              </div>
              <div>
                <p className='text-lg font-semibold'>{follower.username}</p>
                <p>{follower.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowersList;
