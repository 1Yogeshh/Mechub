import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidenavbar from './Sidenavbar';

const SearchUsers = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/auth/search?query=${query}`,{
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
        <div>
            <div>
                <Navbar/>
            </div>
            <div className='flex
            '>
            <div className='w-1/5 text-left justify-start items-start border-[#cbcfd4b3] border-r-[1px] sticky top-0 h-screen'>
                <Sidenavbar/>
            </div>
            <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users"
                />
                <button type="submit">Search</button>
            </form>
            <ul>
            {results.map((user) => (
                    <li key={user._id}>
                        <Link to={`/user/${user.username}`}>
                            {user.name} ({user.username})
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
