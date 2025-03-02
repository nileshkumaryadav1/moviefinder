'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import AboutPage from './about/page';

const HomePage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <motion.h1 
        className="text-5xl font-extrabold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎬 Welcome to MovieFinder
      </motion.h1>
      
      <motion.p 
        className="text-lg text-center mb-8 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Discover the best movies and music with MovieFinder. Browse through our vast collection of top-rated films and trending songs, all in one place.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-xl shadow-lg transition duration-300 bg-gradient-to-r from-purple-500 to-indigo-500 hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white">🎥 Explore Movies</h2>
          <p className="text-white mt-2">Find top-rated movies and new releases.</p>
          <Link href="/movies" className="mt-3 inline-block text-white font-semibold border-b-2 border-white">Go to Movies →</Link>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-xl shadow-lg transition duration-300 bg-gradient-to-r from-blue-500 to-green-500 hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white">🎵 Discover Music</h2>
          <p className="text-white mt-2">Listen to the latest and trending songs.</p>
          <Link href="/music" className="mt-3 inline-block text-white font-semibold border-b-2 border-white">Go to Music →</Link>
        </motion.div>
      </div>
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="mt-8 p-6 rounded-xl shadow-lg transition duration-300 bg-gray-800 hover:bg-gray-700 text-white max-w-lg text-center"
      >
        <h2 className="text-2xl font-bold">📢 About & Contact</h2>
        <p className="mt-2">Learn more about MovieFinder and get in touch with the developer.</p>
        <Link href="/about" className="mt-3 inline-block font-semibold border-b-2 border-white">Go to About Page →</Link>
      </motion.div>

      <AboutPage />
    </div>
  );
};

export default HomePage;