import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChartNoAxesColumn, Ellipsis, Rocket, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { getRefresh } from '../redux/postSlice';

import pic from "./yogesh dp.jpg"; // Sample user picture

const Post = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/files', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                
                // Sort posts by creation date (newest first)
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
                dispatch(getRefresh());
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPosts([]);
            }
        };
        getPosts();
    }, [dispatch]);

    return (
        <div className='ml-[200px] w-[800px] mb-20'>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id} className='shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg text-left p-6 mt-6 bg-white border-t-4 border-[#5b23d7]'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-start'>
                                <img className='h-12 w-12 rounded-full mr-4' src={post.user.img} alt="User" />
                                <div className='flex flex-col'>
                                    <div className='flex'>
                                        <p className='font-bold text-[18px] text-[#5b23d7]'>{post.user.name}</p>
                                        <p className='text-sm text-gray-500 mt-[6px] ml-1 flex gap-1'>
                                            made this project <Rocket size={18}/>
                                        </p>
                                    </div>
                                    <p className='text-xs text-gray-400 mt-1'>
                                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                            <Ellipsis className='text-gray-400 hover:text-[#5b23d7] cursor-pointer' />
                        </div>
                        <div className='shadow-inner bg-gray-50 hover:bg-gray-100 pb-6 pl-6 pr-6 rounded-lg mt-4 pt-4'>
                            <Link className='hover:text-[#5b23d7] hover:underline font-medium text-[16px] flex items-center gap-2' to={`/post/${post._id}`}>
                                <img src={post.user.img} className='h-[30px] w-[30px] rounded-full' alt="User avatar" />
                                {post.user.username}/<span>{post.title}</span>
                            </Link>
                            <p className='text-sm text-gray-600 h-auto ml-10 mt-3'>{post.description}</p>
                            <p className='flex gap-2 text-lg mt-6 font-normal ml-10 text-[#5b23d7]'>
                                <Star className='' size={22} /> 0
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className='flex justify-center mt-10'>
                    <p className='font-semibold text-[#5b23d7]'>No posts available.</p>
                </div>
            )}
        </div>
    );
};

export default Post;
