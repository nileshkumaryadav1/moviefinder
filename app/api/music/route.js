import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Music from '@/models/Music';

// GET all songs
export async function GET() {
  await dbConnect();
  const songs = await Music.find({}).sort({ Timestamp: -1 });
  return NextResponse.json(songs);
}

// POST a new song
export async function POST(req) {
  await dbConnect();
  const { title, artist, album, genre, releaseYear, coverUrl, youtubeUrl } = await req.json();
  const newSong = new Music({ title, artist, album, genre, releaseYear, coverUrl, youtubeUrl });
  await newSong.save();
  return NextResponse.json(newSong, { status: 201 });
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const { id } = await req.json(); // Extract id from request body

    if (!id) {
      return NextResponse.json({ message: "Music ID is required" }, { status: 400 });
    }

    const deletedMusic = await Music.findByIdAndDelete(id);

    if (!deletedMusic) {
      return NextResponse.json({ message: "Music not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Music deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting music" }, { status: 500 });
  }
}

// edit a song
// export async function PUT(req) {
//   await dbConnect();
//   const { id, title, artist, album, genre, releaseYear, coverUrl, youtubeUrl } = await req.json();
//   const newSong = new Music({ title, artist, album, genre, releaseYear, coverUrl, youtubeUrl });
