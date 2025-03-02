'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const user = {
  name: 'Nilesh Kumar',
  email: 'nilesh@example.com',
  profilePic: '/profile.jpg',
  likedMovies: [
    { id: 1, title: 'Inception', image: '/inception.jpg' },
    { id: 2, title: 'Interstellar', image: '/interstellar.jpg' },
  ],
  likedSongs: [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', image: '/blinding-lights.jpg' },
    { id: 2, title: 'Shape of You', artist: 'Ed Sheeran', image: '/shape-of-you.jpg' },
  ],
};

const UserDashboard = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  if (isLoggedOut) {
    return <p className="text-center text-2xl font-bold mt-10">You have logged out.</p>;
  }

  return (
    <div className={`max-w-5xl mx-auto px-6 py-12 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className="flex flex-col items-center mb-10">
        <Image src={user.profilePic} alt="Profile" width={120} height={120} className="rounded-full shadow-lg" />
        <h2 className="text-3xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-400">{user.email}</p>
        <button onClick={() => setIsLoggedOut(true)} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition">
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">🎬 Liked Movies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {user.likedMovies.map((movie) => (
            <motion.div key={movie.id} whileHover={{ scale: 1.05 }} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <Image src={movie.image} alt={movie.title} width={200} height={250} className="rounded-md" />
              <h4 className="mt-2 text-lg font-bold text-center">{movie.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">🎵 Liked Songs</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {user.likedSongs.map((song) => (
            <motion.div key={song.id} whileHover={{ scale: 1.05 }} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <Image src={song.image} alt={song.title} width={200} height={200} className="rounded-md" />
              <h4 className="mt-2 text-lg font-bold text-center">{song.title}</h4>
              <p className="text-sm text-center text-gray-400">by {song.artist}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
