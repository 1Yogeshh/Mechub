import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CircleUserRound, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import Sidenavbar from '../Navbar/Sidenavbar';
import { Star } from 'lucide-react';

function Otheruser() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch user data and posts
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch user profile
      const userResponse = await axios.get(`https://mechub-server.vercel.app/api/auth/profile/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setUser(userResponse.data);
      setIsFollowing(userResponse.data.isFollowing);

      // Fetch user posts
      const postsResponse = await axios.get(`https://mechub-server.vercel.app/api/auth/posts/${userResponse.data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setPosts(postsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('User not found');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      const url = `https://mechub-server.vercel.app/api/auth/${endpoint}`;
      
      // Perform follow/unfollow action
      await axios.post(url, { followId: user._id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Toggle the follow state locally
      setIsFollowing(!isFollowing);
  
      // Update the followers count locally
      if (isFollowing) {
        setUser(prevUser => ({
          ...prevUser,
          followers: prevUser.followers.filter(follower => follower !== token), // Remove current user from followers
        }));
      } else {
        setUser(prevUser => ({
          ...prevUser,
          followers: [...prevUser.followers, token], // Add current user to followers
        }));
      }
  
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
    <div className='bg-zinc-100'>
      <div className='bg-white'><Navbar /></div>
      <div className='flex'>
        <div className='w-[300px] text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0  h-screen bg-white'>
          <Sidenavbar />
        </div>
        <div className='ml-[100px] flex'>
          <div className='mt-8'>
            <h2 className='text-3xl font-medium'>{user.username} Profile</h2>
            <div className='w-[300px] flex flex-col mt-8'>
              <img src={user.img || <CircleUserRound/>} className='h-48 w-48 rounded-full' alt="Profile" />
              <p className='font-medium text-xl mt-2'>{user.name}</p>
              <p className='text-gray-400 font-light mt-1'>{user.username}</p>
              {user.about ? (
                <p className='font-medium w-56'>{user.about}</p>
              ) : (
                <p className='font-medium'>About me</p>
              )}
              <button
                onClick={handleFollow}
                className={`p-2 mt-4 text-sm w-56 justify-center items-center border-[2px] border-[#5b23d7] text-center rounded font-medium ${isFollowing ? 'bg-white text-[#5b23d7]' : 'text-white bg-[#5b23d7]'}`}
                aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
                disabled={loading}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
              <div className='flex gap-4 mt-4'>
                <Link to={`/user/${user._id}/followers/${user.username}`} className='font-medium'>
                  {user.followers ? `${user.followers.length} Followers` : '0 Followers'}
                </Link>
                <Link to={`/user/${user._id}/following/${user.username}`} className='font-medium'>
                  {user.following ? `${user.following.length} Following` : '0 Following'}
                </Link>
              </div>
              {user.location && (
                <div className='mt-4'>
                  <p className='flex text-center font-medium items-center gap-1'>
                    <MapPin color='black' size={20} /> {user.location}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='mt-8'>
            <h2 className='text-2xl font-medium'>Posts</h2>
            <div className='mt-4'>
              {posts.length === 0 ? (
                <p>No posts available</p>
              ) : (
                posts.map(post => (
                  <div key={post._id} className='bg-white shadow-lg rounded-lg text-left p-6 mt-6 w-[650px] '>
                          <div className='flex items-start gap-4'>
                            <img src={post.user.img} className='h-12 w-12 rounded-full' alt="User" />
                            <div className='flex flex-col flex-grow'>
                                <Link className='text-[#5b23d7] hover:underline font-medium text-[17px] mt-3' to={`/post/${post._id}`}>
                                    {post.user.username}/<span>{post.title}</span>
                                </Link>
                                <p className='text-gray-700 text-sm mt-2'>{post.description}</p>
                                <div className='flex items-center mt-4'>
                                    <Star size={20} className='text-[#5b23d7]' />
                                </div>
                            </div>
                        </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otheruser;
