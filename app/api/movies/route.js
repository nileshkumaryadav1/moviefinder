import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Movie from '@/models/Movie';

// GET all movies
export async function GET() {
  await dbConnect();
  const movies = await Movie.find({});
  return NextResponse.json(movies);
}

// POST a new movie
export async function POST(req) {
  await dbConnect();
  const { title, description, genre, releaseYear, posterUrl } = await req.json();
  const newMovie = new Movie({ title, description, genre, releaseYear, posterUrl });
  await newMovie.save();
  return NextResponse.json(newMovie, { status: 201 });
}
