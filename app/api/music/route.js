import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Music from '@/models/Music';

// GET all songs
export async function GET() {
  await dbConnect();
  const songs = await Music.find({});
  return NextResponse.json(songs);
}

// POST a new song
export async function POST(req) {
  await dbConnect();
  const { title, artist, album, genre, releaseYear, coverUrl } = await req.json();
  const newSong = new Music({ title, artist, album, genre, releaseYear, coverUrl });
  await newSong.save();
  return NextResponse.json(newSong, { status: 201 });
}
