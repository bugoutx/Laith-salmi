import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM services WHERE is_active = TRUE ORDER BY display_order ASC, created_at ASC'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const service = await request.json();
    const pool = getPool();
    
    const id = service.id || Date.now().toString();
    
    await pool.execute(
      `INSERT INTO services (id, title, subtitle, description, value_proposition, icon, color, accent_color, display_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        service.title,
        service.subtitle || '',
        service.description,
        service.value_proposition || '',
        service.icon || '🎯',
        service.color || 'from-green-500/20 to-emerald-500/20',
        service.accent_color || 'green-500',
        service.display_order || 0,
        service.is_active !== false
      ]
    );
    
    const [rows] = await pool.execute<any[]>('SELECT * FROM services WHERE id = ?', [id]);
    return NextResponse.json({ success: true, service: rows[0] });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedService = await request.json();
    const pool = getPool();
    
    const [existing] = await pool.execute<any[]>('SELECT * FROM services WHERE id = ?', [updatedService.id]);
    
    if (!Array.isArray(existing) || existing.length === 0) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    await pool.execute(
      `UPDATE services 
       SET title = ?, subtitle = ?, description = ?, value_proposition = ?, icon = ?, color = ?, accent_color = ?, display_order = ?, is_active = ?
       WHERE id = ?`,
      [
        updatedService.title,
        updatedService.subtitle || '',
        updatedService.description,
        updatedService.value_proposition || '',
        updatedService.icon || '🎯',
        updatedService.color || 'from-green-500/20 to-emerald-500/20',
        updatedService.accent_color || 'green-500',
        updatedService.display_order || 0,
        updatedService.is_active !== false,
        updatedService.id
      ]
    );
    
    const [rows] = await pool.execute<any[]>('SELECT * FROM services WHERE id = ?', [updatedService.id]);
    return NextResponse.json({ success: true, service: rows[0] });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}
