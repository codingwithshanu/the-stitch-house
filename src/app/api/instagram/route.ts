import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const posts = await prisma.instagramPost.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, imageUrl, postUrl, caption, sortOrder, isActive } = await req.json();

    if (!imageUrl || !postUrl) {
      return NextResponse.json(
        { error: 'Image URL and Instagram Post URL are required' },
        { status: 400 }
      );
    }

    const post = await prisma.instagramPost.create({
      data: {
        title: title?.trim() || null,
        imageUrl: imageUrl.trim(),
        postUrl: postUrl.trim(),
        caption: caption?.trim() || null,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error('Error creating Instagram post:', error);
    return NextResponse.json(
      { error: 'Failed to create Instagram post' },
      { status: 500 }
    );
  }
}
