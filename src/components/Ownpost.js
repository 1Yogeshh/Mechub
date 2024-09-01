import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import { Ellipsis, Star, ThumbsUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../redux/postSlice';
import { ChartNoAxesColumn } from 'lucide-react';

const Home = () => {
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
        <div>
            <p className='text-left font-medium mb-4 mt-8 flex gap-2 '> <ChartNoAxesColumn className=' text-blue-700'/>Projects</p>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id} className='bg-white shadow-lg rounded text-left p-5 mt-4  w-[700px]'>
                        <div className=' pb-4 pl-5 rounded mt-2 pt-2'>
                            <Link className='hover:text-blue-800 hover:underline  font-medium text-[16px] gap-1 flex' to={`/post/${post._id}` }>{post.user.username}/<p>{post.title}</p></Link>
                            <p  className='text-sm h-auto font-normal  '>{post.description}</p>
                            <p className='flex gap-1 text-lg mt-4'><Star size={20} className='mt-1'/>0</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default Home;