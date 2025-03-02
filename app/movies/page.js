'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const MoviesPage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/movies');
      if (res.ok) {
        const data = await res.json();
        setMovies(data);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className={`min-h-screen p-10 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <motion.h1 
        className="text-5xl font-extrabold text-center mb-10" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Movies
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <motion.div 
            key={movie._id} 
            className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold text-purple-400">{movie.title}</h2>
            <p className="mt-2">{movie.description}</p>
            <p className="mt-2 text-sm text-gray-400">Genre: {movie.genre} | Year: {movie.releaseYear}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
