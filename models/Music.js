import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  album: { type: String },
  genre: { type: String },
  releaseYear: { type: Number },
  coverUrl: { type: String },
  youtubeUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Music = mongoose.models.Music || mongoose.model('Music', musicSchema);

export default Music;
