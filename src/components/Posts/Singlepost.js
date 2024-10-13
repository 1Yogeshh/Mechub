import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { EllipsisVertical, File } from 'lucide-react';
import Sidenavbar from '../Navbar/Sidenavbar';

const SinglePost = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Get the post ID from the URL

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`https://mechub-server.vercel.app/api/auth/files/${id}`);
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
                            <div className="items-center justify-between mb-4 flex">
                                <div className='flex items-center'>
                                    <img src={post.user.img} className='h-[50px] w-[50px] rounded-full' alt="User" />
                                    <div className='ml-2'>
                                        <p className="text-[19px] mt-1">{post.user.name}</p>
                                        <span className='text-[16px] text-gray-600'>{post.user.username}</span>
                                    </div>
                                </div>
                                <div>
                                    <EllipsisVertical size={20} className='hover:cursor-pointer text-gray-600 ' />
                                </div>
                            </div>
                            <div className="border-t border-gray-200 py-2">
                                <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
                                <p className="text-gray-700 leading-relaxed">{post.description}</p>
                            </div>
                            
                            {/* Viewing the PDF */}
                            {post.file && (
                                <div className="mt-4">
                                    <iframe 
                                        src={post.file} 
                                        title="PDF Viewer" 
                                        width="100%" 
                                        height="600px" 
                                        className="border border-gray-200"
                                    />
                                </div>
                            )}
                            
                            {/* Downloading the PDF */}
                            {post.file && (
                                <div className="mt-4 flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-gray-200">
                                    <a
                                        href={post.file}  // Use the Cloudinary URL to view the file
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-[#5b23d7] hover:underline"
                                    >
                                        <File className="mr-2" /> View File
                                    </a>
                                    <a
                                        href={post.file} // Use the same URL for downloading
                                        download
                                        className="bg-[#5b23d7] text-white px-4 py-2 rounded border-[#5b23d7] border hover:bg-white hover:text-[#5b23d7] hover:border hover:border-[#5b23d7]"
                                    >
                                        Download File
                                    </a>
                                </div>
                            )}
                            
                            {post.image && (
                                <img
                                    className="w-full h-auto mt-6 rounded-lg shadow-lg max-h-[500px]"
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
