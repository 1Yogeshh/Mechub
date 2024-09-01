import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import pic from "./yogesh pic.jpg"
import { MapPin, PencilLine, Pi } from 'lucide-react';
import Ownpost from "./Ownpost"
import Sidenavbar from './Sidenavbar';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div>
                <Navbar/>

            </div>
            <div className='flex w-full'>
            <div className='w-1/5 text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0 '>
                <Sidenavbar/>
            </div>
            <div className='flex w-4/5 pb-10 bg-zinc-100'>
              <div className='w-[300px] flex flex-col ml-[50px] '>
               <img src={pic} className='h-48 w-48 rounded-full mt-20'></img>
               <p className=' font-medium text-xl mt-2'>{user.name}</p>
               <p className='text-gray-600 font-medium mt-1'>{user.username}</p>
               {
                user.about?<div className='mt-2'>
                <p className='font-medium'>About</p>
                <p className=' font-medium text-gray-500 w-56 h-auto'>{user.about}</p>
               </div>:<div></div>
               }
               <a className='text-white flex gap-2 bg-[#5b23d7] p-2 mt-4 text-sm w-56 justify-center items-center text-center rounded font-medium' href="/update"><PencilLine size={20} className='mt-1'/>Update Profile</a>

               <div className='flex gap-4 mt-4'>
               <a href='/followers' className=' font-medium'>{user.followers.length} Followers</a>
               <a href='/following' className=' font-medium'>{user.following.length} Following</a>
               </div>

               <div className='mt-4 w-56'>
                 {
                    user.location?<p className='flex text-center text-white font-medium items-center gap-1'><MapPin color='white' size={20}/> {user.location}</p>:<></>
                 } 
               </div>

              </div>
              <div>
                <Ownpost/>
              </div>
            </div>
            </div>
        </>
    );
};

export default Profile;
