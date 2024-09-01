import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import { ChartNoAxesColumn, CircleUserRound, Ellipsis, Star, ThumbsUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../redux/postSlice';

import pic from "./yogesh pic.jpg"
const Home = () => {
    const [posts, setPosts] = useState([]);
    const dispatch=useDispatch();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/files', {
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
        <div className='ml-[200px] w-[800px]'>
            <p className='text-left font-medium mb-4 mt-2 flex gap-2'><ChartNoAxesColumn className='mt-1 text-blue-700'/> All Projects</p>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id} className='shadow-lg rounded text-left p-5 mt-4 bg-white '>
                        <div className='flex justify-between'>
                           <div className='flex'>
                           <img className='h-10 w-10 rounded-full mr-2' src={pic}/>
                           <p className=' font-medium text-[17px]'>{post.user.name}</p>
                           <p className='text-sm text-gray-500 mt-2 ml-1'>made this project 🚀</p>
                           </div>
                           <Ellipsis className='mt-2'/>
                        </div>
                        <div className='shadow-lg bg-zinc-100 pb-4 pl-5 rounded mt-2'>
                            <Link className='hover:text-blue-500 hover:underline font-medium text-[16px] gap-1 flex' to={`/post/${post._id}` }><CircleUserRound className='mt-2 text-blue-600'/> {post.user.username}/<p>{post.title}</p></Link>
                            <p  className='text-sm h-auto ml-8'>{post.description}</p>
                            <p className='flex gap-1 text-lg mt-4 font-normal ml-8'><Star className='mt-1' size={20}/> 0</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className='flex justify-center mt-10'>
                <p className='font-medium'>No posts available.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
