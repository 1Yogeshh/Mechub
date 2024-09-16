import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidenavbar from '../Navbar/Sidenavbar';
import { EllipsisVertical, Search } from 'lucide-react';
import pic from "../Assests/yogesh dp.jpg"

const SearchUsers = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://mechub-server.vercel.app/api/auth/search?query=${query}`,{
                headers: {
                        'Authorization': `Bearer ${token}`
                    },
            });
            setResults(response.data);
        } catch (err) {
            console.error('Error fetching search results', err);
        }
    };

    return (
        <div className='bg-zinc-100 w-full'>
            <div className='bg-white'>
                <Navbar/>
            </div>
            <div className='flex'>
            <div className='w-[320px] text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0  h-screen bg-white'>
                <Sidenavbar/>
            </div>
            <div className='flex flex-col items-center ml-[300px]'>
            <form onSubmit={handleSearch} className='flex mt-4 justify-between w-[560px] h-[40px] mr-8 rounded-lg bg-white shadow'>
                <div className='flex'>
                <button type="submit" className='ml-2 text-gray-400'><Search/></button>
                <input
                    type="search"
                    className='w-[520px] outline-none pl-2 rounded-lg pr-2 font-medium'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users"
                />
                </div>
            </form>
            <ul className=''>
            {results.map((user) => (
                    <li key={user._id} className='bg-white mt-4 w-[560px] mr-8 rounded-lg shadow h-[80px]'>
                        <Link to={`/user/${user.username}`} className='flex items-center'>
                            <img src={user?.img} className='h-[60px] w-[60px] rounded-full mt-3 ml-6'></img>
                            <div className='ml-2 mt-2'><p className='font-medium text-[17px]'>{user.name}</p><p className='text-gray-500 text-[15px]'>{user.username}</p></div>
                            <EllipsisVertical className='ml-[330px]' size={20}/>
                        </Link>

                    </li>
                ))}
            </ul>
        </div>
            </div>
        </div>
    );
};

export default SearchUsers;
