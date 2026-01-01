import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    try {
      await prisma.blog.delete({
        where: { id }
      });
      return NextResponse.json({ success: true });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

