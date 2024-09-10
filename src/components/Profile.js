import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import pic from "./yogesh dp.jpg"
import { CircleUserRound, MapPin, PencilLine, Pi } from 'lucide-react';
import Ownpost from "./Ownpost"
import Sidenavbar from './Sidenavbar';
import { ColorRing } from 'react-loader-spinner';

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

    if (loading) return <div className='flex justify-center items-center h-screen text-xl font-medium gap-1'><ColorRing
    visible={true}
    height="60"
    width="60"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['blue', 'blue', 'blue', 'blue', 'blue']}
    />Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div>
                <Navbar/>

            </div>
            <div className='flex w-full'>
            <div className='w-[320px] text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0  h-screen '>
                <Sidenavbar/>
            </div>
            <div className='flex w-4/5 pb-10 bg-zinc-100'>
              <div className='w-[300px] flex flex-col ml-[50px] '>
               {
                user.img?
                  <div className='border-[3px] border-[#5b23d7] h-[204px] w-[204px] mt-20 rounded-full'>
                     <img src={user.img} className='h-[200px] w-[200px] rounded-full'></img>
                  </div>:
                  <div className=' h-[204px] w-[204px] mt-20 rounded-full'>
                     <CircleUserRound className='h-[200px] w-[200px] rounded-full text-white bg-[#5b23d7]'/>
                   </div>  
               }
               <p className=' font-medium text-xl mt-2'>{user.name}</p>
               <p className='text-gray-600 font-medium'>{user.username}</p>
               {
                user.about?<div className='mt-2'>
                <p className='font-medium'>About</p>
                <p className=' font-medium text-gray-500 w-56 h-auto text-sm'>{user.about}</p>
               </div>:<div></div>
               }
               <div className='mt-4 w-56'>
                 {
                    user.location?<p className='flex text-center font-medium items-center gap-1'><MapPin className='text-[#5b23d7]' size={18}/> {user.location}</p>:<></>
                 } 
               </div>
               <a className='text-white flex gap-2 bg-[#5b23d7] p-2 mt-4 text-sm w-56 justify-center border-[2px] border-[#5b23d7] items-center text-center rounded font-medium hover:bg-white hover:text-[#5b23d7]' href="/update"><PencilLine size={20} className='mt-1'/>Update Profile</a>

               <div className='flex gap-4 mt-4'>
               <a href='/followers' className=' font-medium'>{user.followers.length} Followers</a>
               <a href='/following' className=' font-medium'>{user.following.length} Following</a>
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
