import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const services = await prisma.makeupService.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error('Error fetching makeup services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, category, description, price, priceText, duration, includes, image, sortOrder, isFeatured } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const service = await prisma.makeupService.create({
      data: {
        title: title.trim(),
        category: category || 'Bridal',
        description: description.trim(),
        price: price ? parseFloat(price) : null,
        priceText: priceText?.trim() || null,
        duration: duration?.trim() || null,
        includes: includes?.trim() || null,
        image: image?.trim() || null,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
      },
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    console.error('Error creating makeup service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
