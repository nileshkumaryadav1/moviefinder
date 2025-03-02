import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  releaseYear: { type: Number },
  posterUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

export default Movie;
