import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Ellipsis, Star, ThumbsUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../redux/postSlice';
import { ChartNoAxesColumn } from 'lucide-react';
import pic from "./yogesh dp.jpg";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/ownpost', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                setPosts(response.data);
                dispatch(getRefresh());
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPosts([]);
            }
        };
        getPosts();
    }, [dispatch]);

    return (
        <div className='p-6'>
            <p className='text-left font-medium text-2xl mb-6 flex items-center gap-2'>
                <ChartNoAxesColumn size={22} className='text-[#5b23d7]' />
                Projects
            </p>
            {posts.length > 0 ? (
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
            ) : (
                <p className='text-center text-gray-500 mt-8'>No posts available.</p>
            )}
        </div>
    );
};

export default Home;
