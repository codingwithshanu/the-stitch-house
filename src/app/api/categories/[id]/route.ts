import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';
import { slugify } from '@/lib/utils';

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
    const { name, description, image, sortOrder } = await req.json();

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    let slug = existing.slug;
    if (name && name.trim() !== existing.name) {
      const baseSlug = slugify(name);
      let newSlug = baseSlug;
      let counter = 1;
      while (
        await prisma.category.findFirst({
          where: { slug: newSlug, NOT: { id } },
        })
      ) {
        newSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      slug = newSlug;
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: name ? name.trim() : existing.name,
        slug,
        description: description !== undefined ? description?.trim() || null : existing.description,
        image: image !== undefined ? image?.trim() || null : existing.image,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : existing.sortOrder,
      },
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
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

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
