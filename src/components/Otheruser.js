import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import pic from "./yogesh dp.jpg";
import { MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Sidenavbar from './Sidenavbar';

function Otheruser() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch user data
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/auth/profile/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setUser(response.data);
      setIsFollowing(response.data.isFollowing); // Set isFollowing based on the response
      setLoading(false);
    } catch (err) {
      setError('User not found');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  // Handle follow/unfollow action
  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      const url = `http://localhost:5000/api/auth/${endpoint}`;
      
      await axios.post(url, { followId: user._id }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refetch user data to update the follow status and counts
      await fetchUser();
      toast.success(`Successfully ${isFollowing ? 'unfollowed' : 'followed'} ${user.username}`);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
      toast.error('An error occurred while updating follow status.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className='flex'>
        <div className='w-1/5 text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0 h-screen'>
          <Sidenavbar/>
        </div>
        <div>
        <div>
      <div>
        <h2 className=' ml-[200px] mt-8 text-3xl font-medium'>{user.username} Profile</h2>
        <div className='w-[300px] flex flex-col ml-[200px]'>
          <img src={pic} className='h-48 w-48 rounded-full mt-16' alt="Profile" />
          <p className=' font-medium text-xl mt-2'>{user.name}</p>
          <p className='text-gray-400 font-light mt-1'>{user.username}</p>
          {user.about ? (
            <p className=' font-medium w-56 h-auto'>{user.about}</p>
          ) : (
            <p className=' font-medium'>About me</p>
          )}
          <button
            onClick={handleFollow}
            className={`p-2 mt-4 text-sm w-56 justify-center items-center border-[2px] border-[#5b23d7] text-center rounded font-medium ${isFollowing ? 'bg-white text-[#5b23d7]' : ' text-white bg-[#5b23d7]'}`}
            aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
            disabled={loading}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>

          <div className='flex gap-4 mt-4'>
            <Link to={`/user/${user._id}/followers/${user.username}`} className=' font-medium'>
              {user.followers ? `${user.followers.length} Followers` : '0 Followers'}
            </Link>
            <Link to={`/user/${user._id}/following/${user.username}`} className=' font-medium'>
              {user.following ? `${user.following.length} Following` : '0 Following'}
            </Link>
          </div>

          {user.location && (
            <div className='mt-4 w-56'>
              <p className='flex text-center  font-medium items-center gap-1'>
                <MapPin color='white' size={20} /> {user.location}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}

export default Otheruser;
