"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Link from "next/link";

const AdminPanel = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [movies, setMovies] = useState([]);
  const [music, setMusic] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    genre: "",
    releaseYear: "",
    posterUrl: "",
    trailerUrl: "",
  });
  const [newMusic, setNewMusic] = useState({
    title: "",
    album: "",
    genre: "",
    releaseYear: "",
    coverUrl: "",
    youtubeUrl: "",
    artist: "",
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      if (res.ok) {
        const data = await res.json();
        setMovies(data);
      }
    };

    const fetchMusic = async () => {
      const res = await fetch("/api/music");
      if (res.ok) {
        const data = await res.json();
        setMusic(data);
      }
    };

    fetchMovies();
    fetchMusic();
  }, []);

  const handleAddMovie = async () => {
    const res = await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
    if (res.ok) {
      const addedMovie = await res.json();
      setMovies([...movies, addedMovie]);
      setNewMovie({
        title: "",
        description: "",
        genre: "",
        releaseYear: "",
        posterUrl: "",
        trailerUrl: "",
      });
    }
  };

  // handle delete movie
  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await fetch(`/api/movies`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Send id in body
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete movie");
      }

      // Only parse JSON if there is content
      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // handle add music
  const handleAddMusic = async () => {
    const res = await fetch("/api/music", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMusic),
    });
    if (res.ok) {
      const addedMusic = await res.json();
      setMusic([...music, addedMusic]);
      setNewMusic({
        title: "",
        album: "",
        genre: "",
        releaseYear: "",
        coverUrl: "",
        youtubeUrl: "",
        artist: "",
      });
    }
  };

  // handle delete music
  const handleDeleteMusic = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;

    try {
      const res = await fetch(`/api/music`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Send id in body
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete music");
      }

      setMusic((prevMusic) => prevMusic.filter((song) => song._id !== id));
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };

  return (
    <div
      className={`min-h-screen p-10 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <motion.h1
        className="text-5xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Panel
      </motion.h1>

      <h2 className="text-3xl font-bold mb-6">Add Movie</h2>
      <div className="flex gap-4 mb-8 flex flex-col">
        <input
          type="text"
          placeholder="Movie Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) =>
            setNewMovie({ ...newMovie, description: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="string"
          placeholder="Release Year"
          value={newMovie.releaseYear}
          onChange={(e) =>
            setNewMovie({ ...newMovie, releaseYear: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={newMovie.posterUrl}
          onChange={(e) =>
            setNewMovie({ ...newMovie, posterUrl: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Trailer URL"
          value={newMovie.trailerUrl}
          onChange={(e) =>
            setNewMovie({ ...newMovie, trailerUrl: e.target.value })
          }
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddMovie}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6">Manage Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="text-xl font-bold text-purple-400">{movie.title}</h3>
            <a
              href={movie.trailerUrl}
              className="text-sm text-gray-400"
              target="_blank"
            >
              ▶️Watch Trailer
            </a>
            <p className="text-gray-400">{movie.description}</p>
            <p className="text-gray-400">Release Year: {movie.releaseYear}</p>
            <p className="text-gray-400">Genre: {movie.genre}</p>
            <button
              onClick={() => handleDeleteMovie(movie._id)}
              className="bg-red-600 text-white px-2 py-1 rounded mt-2 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6">Add Music</h2>
      <div className="flex gap-4 mb-8 flex flex-col">
        <input
          type="text"
          placeholder="Music Title"
          value={newMusic.title}
          onChange={(e) => setNewMusic({ ...newMusic, title: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Album"
          value={newMusic.album}
          onChange={(e) => setNewMusic({ ...newMusic, album: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={newMusic.genre}
          onChange={(e) => setNewMusic({ ...newMusic, genre: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Release Year"
          value={newMusic.releaseYear}
          onChange={(e) =>
            setNewMusic({ ...newMusic, releaseYear: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Cover URL"
          value={newMusic.coverUrl}
          onChange={(e) =>
            setNewMusic({ ...newMusic, coverUrl: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={newMusic.youtubeUrl}
          onChange={(e) =>
            setNewMusic({ ...newMusic, youtubeUrl: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Artist"
          value={newMusic.artist}
          onChange={(e) => setNewMusic({ ...newMusic, artist: e.target.value })}
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddMusic}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6">Manage Music</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {music.map((song) => (
          <div key={song._id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="text-xl font-bold text-blue-400">{song.title}</h3>
            <p className="text-sm text-gray-400">Artist: {song.artist}</p>
            <p className="text-sm text-gray-400">Album: {song.album}</p>
            <p className="text-sm text-gray-400">Genre: {song.genre}</p>
            <a href={song.youtubeUrl} className="text-sm text-gray-400">
              YouTube URL: Click here {song.youtubeUrl}
            </a>
            <p className="text-sm text-gray-400">
              Release Year: {song.releaseYear}
            </p>
            <button
              onClick={() => handleDeleteMusic(song._id)}
              className="bg-red-600 text-white px-2 py-1 rounded mt-2 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
