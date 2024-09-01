import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import { Ellipsis, FilePlus, FilePlus2, ThumbsUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../redux/postSlice';

const Leftbar = () => {
    const [posts, setPosts] = useState([]);
    const dispatch=useDispatch();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/ownpost', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                setPosts(response.data); // Access the data property
                dispatch(getRefresh())
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPosts([]); // Set posts to an empty array in case of error
            }
        };
        getPosts();
    }, []);

    return (
        <div className='text-left h-screen ml-6 mt-10'>
            <div className='flex gap-24'>
               <p className=' font-medium'>Top Projects</p>
               <a href='/create' className='flex bg-blue-500 font-medium justify-center items-center text-center rounded pl-2 pr-2 h-7 text-white gap-1'><FilePlus2 size={20}/> new</a>
            </div>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id} className=''>
                        <div className='flex items-center text-center gap-2 mt-2'>
                            <div className='h-6 w-6 rounded-full bg-black mt-1'></div>
                            <Link className='hover:text-blue-800  hover:underline font-medium text-[14px] mt-1 gap-1 flex' to={`/post/${post._id}` }>{post.user.username}/<p>{post.title}</p></Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className='flex justify-center items-center mt-10'>
                <p className='font-medium'>No posts available.</p>
                </div>
            )}
        </div>
    );
};

export default Leftbar;
