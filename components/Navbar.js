'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-all duration-300 
        ${scrolling ? 'bg-white/70 shadow-lg' : 'bg-white/30'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">MovieFinder</h1>
        
        <div className="hidden md:flex space-x-8 text-gray-700 font-semibold text-lg">
          <Link href="/" className="hover:text-blue-600 transition duration-300">Home</Link>
          <Link href="/movies" className="hover:text-blue-600 transition duration-300">Movies</Link>
          <Link href="/music" className="hover:text-blue-600 transition duration-300">Music</Link>
          <Link href="/about" className="hover:text-blue-600 transition duration-300">About</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white py-4 space-y-4 shadow-lg">
          <Link href="/" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/movies" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Movies</Link>
          <Link href="/music" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Music</Link>
          <Link href="/about" className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>About</Link>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
