import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Triangle } from 'lucide-react';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // Fetch user data if token exists
      const fetchUser = async () => {
        try {
          const response = await fetch('https://mechub-server.vercel.app/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      };
      fetchUser();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
    toast.success('User logged out successfully');
  };

  return (
    <>
      <div className='flex h-16 items-center w-full justify-between bg-white shadow'>
        <div className='flex ml-12 justify-center items-center'>
        <span class="logo text-transparent bg-clip-text bg-gradient-to-t from-[#5b23d7] via-[#5b23d7] to-white text-xl font-semibold">Mechub</span>
        
        </div>
        <div className='flex items-center mr-10'>
          {token ? (
            <div className='flex items-center gap-6'>
              <p className='text-[17px] font-medium flex gap-2'>Welcome back, <span className=' underline text-[#5b23d7] font-semibold'>{user?.name}</span> <img src={user?.img} className='h-[30px] w-[30px] ml-2 rounded-full'></img></p>
              {/*<button
                onClick={handleLogout}
                className='bg-[#5b23d7] border-[#5b23d7] px-6 py-2 rounded text-sm text-white font-medium border-[2px] hover:text-[#5b23d7] hover:bg-white'
              >
                Logout
              </button>*/}
            </div>
          ) : (
            <div>
              <button className='bg-[#5b23d7] border-[#5b23d7] px-8 py-3 rounded text-sm text-white font-medium border-[2px] hover:text-[#5b23d7] hover:bg-white'>
                Sign In
              </button>
              <button className='border-[#5b23d7] px-7 py-3 rounded text-sm font-medium border-[2px] text-[#5b23d7] ml-6 hover:bg-[#5b23d7] hover:text-white'>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='w-full h-[1px] bg-[#cbcfd4b3]' />
    </>
  );
}

export default Navbar;
