import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pool = getPool();
    
    const [result] = await pool.execute<any>('DELETE FROM blogs WHERE id = ?', [id]);
    
    const affectedRows = (result as any).affectedRows || 0;
    if (affectedRows === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

