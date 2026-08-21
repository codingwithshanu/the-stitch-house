import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const where: any = {};
    if (category && category !== 'all') {
      where.category = category;
    }

    const items = await prisma.makeupPortfolio.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, category, imageUrl, instagramUrl, description, sortOrder } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'Title and Image URL are required' }, { status: 400 });
    }

    const item = await prisma.makeupPortfolio.create({
      data: {
        title: title.trim(),
        category: category || 'Bridal',
        imageUrl: imageUrl.trim(),
        instagramUrl: instagramUrl?.trim() || null,
        description: description?.trim() || null,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
  }
}
