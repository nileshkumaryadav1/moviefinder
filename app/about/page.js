'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const AboutPage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <motion.h1 
        className={`text-5xl font-extrabold mb-6 tracking-wide ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎬 MovieFinder App
      </motion.h1>
      
      <motion.p 
        className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        MovieFinder is a modern web app that helps users discover movies and songs effortlessly.
        Built with Next.js and styled beautifully, it offers a smooth and engaging experience.
      </motion.p>
      
      <motion.div 
        className={`shadow-xl rounded-3xl p-6 flex flex-col items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src="/developer.jpg"
          alt="Nilesh Kumar"
          width={150}
          height={150}
          className="rounded-full border-4 shadow-lg border-purple-500"
        />
        <h2 className={`text-2xl font-bold mt-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Nilesh Kumar</h2>
        <p className={`mt-2 text-gray-400`}>Full-Stack Developer | Creator of MovieFinder</p>
        <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Passionate about building amazing web experiences with Next.js, React, and MongoDB.</p>
        
        <div className="flex gap-4 mt-4">
          <a href="https://github.com/nilesh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition text-2xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/nilesh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/nilesh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition text-2xl">
            <FaTwitter />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
