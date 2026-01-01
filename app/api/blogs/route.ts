import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: [
        { date: 'desc' },
        { createdAt: 'desc' }
      ]
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const blog = await request.json();
    
    const id = blog.id || Date.now().toString();
    const slug = blog.slug || blog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\u0621-\u064A\w-]/g, '');
    
    const newBlog = await prisma.blog.create({
      data: {
        id,
        slug,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author || 'ليث السالمي',
        date: new Date(blog.date),
        category: blog.category || 'تحليل فني',
        image: blog.image || '/placeholder-blog.jpg'
      }
    });
    
    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Blog with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedBlog = await request.json();
    
    const existing = await prisma.blog.findUnique({
      where: { id: updatedBlog.id }
    });
    
    if (!existing) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    const blog = await prisma.blog.update({
      where: { id: updatedBlog.id },
      data: {
        slug: updatedBlog.slug,
        title: updatedBlog.title,
        excerpt: updatedBlog.excerpt,
        content: updatedBlog.content,
        author: updatedBlog.author || 'ليث السالمي',
        date: new Date(updatedBlog.date),
        category: updatedBlog.category || 'تحليل فني',
        image: updatedBlog.image || '/placeholder-blog.jpg'
      }
    });
    
    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Blog with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

