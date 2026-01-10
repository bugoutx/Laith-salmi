import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const items = await prisma.contentItem.findMany({
      where: { isActive: true },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching content items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const id = data.id || Date.now().toString();
    
    const newItem = await prisma.contentItem.create({
      data: {
        id,
        type: data.type,
        mediaUrl: (data.media_url || data.mediaUrl)?.trim() || null,
        title: data.title || null,
        subtitle: data.subtitle || null,
        description: data.description || null,
        eyebrow: data.eyebrow || null,
        displayOrder: data.display_order || data.displayOrder || 0,
        isActive: data.is_active !== false
      }
    });
    
    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    console.error('Error creating content item:', error);
    return NextResponse.json(
      { error: 'Failed to create content item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedItem = await request.json();
    
    const existing = await prisma.contentItem.findUnique({
      where: { id: updatedItem.id }
    });
    
    if (!existing) {
      return NextResponse.json({ error: 'Content item not found' }, { status: 404 });
    }
    
    const item = await prisma.contentItem.update({
      where: { id: updatedItem.id },
      data: {
        type: updatedItem.type,
        mediaUrl: (updatedItem.media_url || updatedItem.mediaUrl)?.trim() || null,
        title: updatedItem.title || null,
        subtitle: updatedItem.subtitle || null,
        description: updatedItem.description || null,
        eyebrow: updatedItem.eyebrow || null,
        displayOrder: updatedItem.display_order || updatedItem.displayOrder || 0,
        isActive: updatedItem.is_active !== false
      }
    });
    
    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error('Error updating content item:', error);
    return NextResponse.json(
      { error: 'Failed to update content item' },
      { status: 500 }
    );
  }
}

