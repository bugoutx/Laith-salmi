import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM blogs ORDER BY date DESC, created_at DESC'
    );
    return NextResponse.json(rows);
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
    const pool = getPool();
    
    const id = blog.id || Date.now().toString();
    const slug = blog.slug || blog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\u0621-\u064A\w-]/g, '');
    
    await pool.execute(
      `INSERT INTO blogs (id, slug, title, excerpt, content, author, date, category, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        slug,
        blog.title,
        blog.excerpt,
        blog.content,
        blog.author || 'ليث السالمي',
        blog.date,
        blog.category || 'تحليل فني',
        blog.image || '/placeholder-blog.jpg'
      ]
    );
    
    const [rows] = await pool.execute<any[]>('SELECT * FROM blogs WHERE id = ?', [id]);
    return NextResponse.json({ success: true, blog: rows[0] });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    if (error.code === 'ER_DUP_ENTRY') {
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
    const pool = getPool();
    
    const [existing] = await pool.execute('SELECT * FROM blogs WHERE id = ?', [updatedBlog.id]);
    
    if (!Array.isArray(existing) || existing.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    await pool.execute(
      `UPDATE blogs 
       SET slug = ?, title = ?, excerpt = ?, content = ?, author = ?, date = ?, category = ?, image = ?
       WHERE id = ?`,
      [
        updatedBlog.slug,
        updatedBlog.title,
        updatedBlog.excerpt,
        updatedBlog.content,
        updatedBlog.author || 'ليث السالمي',
        updatedBlog.date,
        updatedBlog.category || 'تحليل فني',
        updatedBlog.image || '/placeholder-blog.jpg',
        updatedBlog.id
      ]
    );
    
    const [rows] = await pool.execute<any[]>('SELECT * FROM blogs WHERE id = ?', [updatedBlog.id]);
    return NextResponse.json({ success: true, blog: rows[0] });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    if (error.code === 'ER_DUP_ENTRY') {
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

