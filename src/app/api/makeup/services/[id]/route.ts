import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { title, category, description, price, priceText, duration, includes, image, sortOrder, isFeatured } = body;

    const service = await prisma.makeupService.update({
      where: { id },
      data: {
        title: title ? title.trim() : undefined,
        category: category !== undefined ? category : undefined,
        description: description !== undefined ? description.trim() : undefined,
        price: price !== undefined ? (price ? parseFloat(price) : null) : undefined,
        priceText: priceText !== undefined ? priceText?.trim() || null : undefined,
        duration: duration !== undefined ? duration?.trim() || null : undefined,
        includes: includes !== undefined ? includes?.trim() || null : undefined,
        image: image !== undefined ? image?.trim() || null : undefined,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : undefined,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Error updating makeup service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await prisma.makeupService.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error('Error deleting makeup service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
