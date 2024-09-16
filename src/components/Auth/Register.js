import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://mechub-server.vercel.app/api/auth/signup', {
        name,
        username,
        email,
        password,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error('Registration failed! Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="font-bold text-3xl mb-6 text-center">
          Sign up for <span className="text-[#5b23d7]">Mechub</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="font-medium mb-1 block">Name</label>
            <div className="flex items-center bg-white border-2 border-gray-300 rounded">
              <User size={20} className="m-2 text-purple-600" />
              <input
                className="flex-1 p-2 outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium mb-1 block">Username</label>
            <div className="flex items-center bg-white border-2 border-gray-300 rounded">
              <User size={20} className="m-2 text-green-600" />
              <input
                className="flex-1 p-2 outline-none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Username"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium mb-1 block">Email address</label>
            <div className="flex items-center bg-white border-2 border-gray-300 rounded">
              <Mail size={20} className="m-2 text-red-600" />
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
              <Lock size={20} className="m-2 text-blue-600" />
              <input
                className="flex-1 p-2 outline-none"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="px-2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-[#5b23d7] text-white font-medium rounded transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-[#5b23d7] font-medium">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
