import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { File } from 'lucide-react';

const SinglePost = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams(); // Get the post ID from the URL

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/files/${id}`);
                setPost(response.data); // Access the data property
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };
        getPost();
    }, [id]);

    return (
        <div>
            <div><Navbar/></div>
            {post ? (
                <div className='flex flex-col justify-center ml-[100px]'>
                    <p className='text-white font-medium'>Posted by: {post.user.username}</p>
                    <p className='text-white font-medium'>{post.user.name}</p>
                    <div className='border-[1px] rounded border-white w-[800px] p-2'>
                    <h1 className=' font-medium'>{post.title}</h1>
                    <p className=' font-medium'>{post.description}</p>
                    {post.file && (
                        <div className=' font-medium flex gap-[500px] border-[1px] border-white rounded w-[750px] p-2'>
                            <a href={`http://localhost:5000/${post.file}`} target="_blank" rel="noopener noreferrer" className='flex m-2 '><File/> File</a>
                            <a href={`http://localhost:5000/${post.file}`} download className='border-[1px] border-white rounded p-1 text-sm flex justify-center items-center'>
                                Download file
                            </a>
                        </div>
                        
                    )}
                    </div>
                    {post.image && (
                        <img className='w-[750px] h-[500px] mt-4 rounded' src={`http://localhost:5000/${post.image}`} alt={post.title} />
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SinglePost;

