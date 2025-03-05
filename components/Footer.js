'use client';

import { useTheme } from 'next-themes';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <footer className={`py-6 text-center ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
      <p className="text-lg font-semibold">MovieFinder © {new Date().getFullYear()}</p>
      <p className="text-sm mt-1">Built with ❤️ by Nilesh Kumar</p>
      
      <div className="flex justify-center gap-6 mt-4">
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
    </footer>
  );
};

export default Footer;