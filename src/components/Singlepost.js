import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { EllipsisVertical, File } from 'lucide-react';
import Sidenavbar from './Sidenavbar';
import pic from "./yogesh pic.jpg"

const SinglePost = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Get the post ID from the URL

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/files/${id}`);
                setPost(response.data); // Access the data property
                
            } catch (error) {
                console.error('Error fetching post details:', error);
                setError('Failed to load the post.');
            }
        };
        getPost();
    }, [id]);

    return (
        <div className="min-h-screen white">
            <Navbar />
            <div className="flex">
                <div className="w-1/5 text-left justify-start items-start border-r border-gray-200 bg-white sticky top-0 h-screen">
                    <Sidenavbar />
                </div>
                <div className="flex-grow p-8 bg-zinc-100">
                    {error ? (
                        <div className="text-red-500 text-center mt-10">{error}</div>
                    ) : post ? (
                        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                            <div className=" items-center justify-between mb-4">
                                <div className='flex items-center'>
                                    <img src={pic} className='h-[50px] w-[50px] rounded-full'></img>
                                    <div className='ml-2'>
                                    <p className=" text-[19px] mt-1">{post.user.name}</p>
                                    <span className='text-[16px] text-gray-600'>{post.user.username}</span>
                                    </div>
                                    <div>
                                    <EllipsisVertical size={20} className='ml-[550px] hover:cursor-pointer'/>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 py-2">
                                <div>
                                <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{post.description}</p>
                            </div>
                            {post.file && (
                                <div className="mt-4 flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <a
                                        href={`http://localhost:5000/${post.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-[#5b23d7] hover:underline"
                                    >
                                        <File className="mr-2" /> View File
                                    </a>
                                    <a
                                        href={`http://localhost:5000/${post.file}`}
                                        download
                                        className="bg-[#5b23d7] text-white px-4 py-2 rounded border-[#5b23d7] border hover:bg-white hover:text-[#5b23d7] hover:border hover:border-[#5b23d7]"
                                    >
                                        Download File
                                    </a>
                                </div>
                            )}
                            {post.image && (
                                <img
                                    className="w-full h-auto mt-6 rounded-lg shadow-lg"
                                    src={post.image}
                                    alt={post.title}
                                />
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SinglePost;

