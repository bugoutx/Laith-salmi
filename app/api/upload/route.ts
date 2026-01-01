import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const isImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
    const isVideo = ['video/mp4', 'video/webm', 'video/ogg'].includes(file.type);
    
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images (JPEG, PNG, WebP) and videos (MP4, WebM, OGG) are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB for images, 50MB for videos)
    const maxImageSize = 5 * 1024 * 1024; // 5MB
    const maxVideoSize = 50 * 1024 * 1024; // 50MB
    const maxSize = isImage ? maxImageSize : maxVideoSize;
    
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds ${isImage ? '5MB' : '50MB'} limit` },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = isImage 
      ? join(process.cwd(), 'public', 'images', 'content')
      : join(process.cwd(), 'public', 'videos', 'content');
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const extension = originalName.split('.').pop() || 'jpg';
    const filename = `${timestamp}-${randomString}.${extension}`;
    const filepath = join(uploadsDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return the public URL path
    const mediaUrl = isImage 
      ? `/images/content/${filename}`
      : `/videos/content/${filename}`;
    return NextResponse.json({ success: true, url: mediaUrl, type: isImage ? 'image' : 'video' });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

