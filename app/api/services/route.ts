import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'asc' }
      ]
    });
    return NextResponse.json(services);
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
    
    const id = service.id || Date.now().toString();
    
    const newService = await prisma.service.create({
      data: {
        id,
        title: service.title,
        subtitle: service.subtitle || '',
        description: service.description,
        valueProposition: service.value_proposition || '',
        icon: service.icon || '🎯',
        color: service.color || 'from-green-500/20 to-emerald-500/20',
        accentColor: service.accent_color || 'green-500',
        displayOrder: service.display_order || 0,
        isActive: service.is_active !== false
      }
    });
    
    return NextResponse.json({ success: true, service: newService });
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
    
    const existing = await prisma.service.findUnique({
      where: { id: updatedService.id }
    });
    
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    const service = await prisma.service.update({
      where: { id: updatedService.id },
      data: {
        title: updatedService.title,
        subtitle: updatedService.subtitle || '',
        description: updatedService.description,
        valueProposition: updatedService.value_proposition || '',
        icon: updatedService.icon || '🎯',
        color: updatedService.color || 'from-green-500/20 to-emerald-500/20',
        accentColor: updatedService.accent_color || 'green-500',
        displayOrder: updatedService.display_order || 0,
        isActive: updatedService.is_active !== false
      }
    });
    
    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}
