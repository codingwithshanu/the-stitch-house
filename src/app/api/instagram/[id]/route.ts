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
    const { title, imageUrl, postUrl, caption, sortOrder, isActive } = await req.json();

    const post = await prisma.instagramPost.update({
      where: { id },
      data: {
        title: title !== undefined ? title?.trim() || null : undefined,
        imageUrl: imageUrl !== undefined ? imageUrl.trim() : undefined,
        postUrl: postUrl !== undefined ? postUrl.trim() : undefined,
        caption: caption !== undefined ? caption?.trim() || null : undefined,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error updating Instagram post:', error);
    return NextResponse.json(
      { error: 'Failed to update Instagram post' },
      { status: 500 }
    );
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

    await prisma.instagramPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Instagram post deleted successfully' });
  } catch (error) {
    console.error('Error deleting Instagram post:', error);
    return NextResponse.json(
      { error: 'Failed to delete Instagram post' },
      { status: 500 }
    );
  }
}
