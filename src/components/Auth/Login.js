import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/userSlice';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeScreen = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  useEffect(() => {
    changeScreen();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://mechub-server.vercel.app/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
      toast.success(res.data.message);
      dispatch(getUser(res.data.user));
    } catch (err) {
      toast.error('Incorrect email or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="font-bold text-3xl mb-6 text-center">
          Sign in to <span className="text-[#5b23d7]">Mechub</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="font-medium mb-1 block">Email address</label>
            <div className="flex items-center bg-white border-2 border-gray-300 rounded">
              <Mail color="red" className="m-2" />
              <input
                className="flex-1 p-2 outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium mb-1 block">Password</label>
            <div className="flex items-center bg-white border-2 border-gray-300 rounded">
              <Lock color="blue" className="m-2" />
              <input
                className="flex-1 p-2 outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#5b23d7] text-white font-medium rounded  transition"
          >
            Login
          </button>

          <p className="text-center mt-4">
            New to Mechub?{' '}
            <a href="/register" className="text-[#5b23d7] font-medium">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
