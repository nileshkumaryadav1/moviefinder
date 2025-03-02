'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LoginPage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', form);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <motion.div 
        className={`w-full max-w-md p-8 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <button type="submit" className="w-full py-2 px-4 mt-4 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-500 transition">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Do not have an account? 
          <Link href="/register" className="text-purple-500 font-semibold ml-1 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
