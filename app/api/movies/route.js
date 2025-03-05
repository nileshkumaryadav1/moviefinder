import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Movie from '@/models/Movie';

// GET all movies
export async function GET() {
  await dbConnect();
  const movies = await Movie.find({}).sort({ Timestamp: -1 });
  return NextResponse.json(movies);
}

// POST a new movie
export async function POST(req) {
  await dbConnect();
  const { title, description, genre, releaseYear, posterUrl, trailerUrl } = await req.json();
  const newMovie = new Movie({ title, description, genre, releaseYear, posterUrl, trailerUrl });
  await newMovie.save();
  return NextResponse.json(newMovie, { status: 201 });
}

// DELETE a movie
export async function DELETE(req) {
  await dbConnect();

  try {
    const { id } = await req.json(); // Extract id from request body

    if (!id) {
      return NextResponse.json({ message: "Movie ID is required" }, { status: 400 });
    }

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Movie deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting movie" }, { status: 500 });
  }
}

// edit a movie
export async function PUT(req) {
  await dbConnect();
  const { id, title, description, genre, releaseYear, posterUrl, trailerUrl } = await req.json();
  const res = await fetch(`/api/movies`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, genre, releaseYear, posterUrl, trailerUrl })
  });
  if (res.ok) { 
    return NextResponse.json({ message: 'Movie updated successfully' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
  }
} 
