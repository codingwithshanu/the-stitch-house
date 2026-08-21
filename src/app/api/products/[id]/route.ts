import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET single product by ID or Slug
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Increment view count asynchronously
    prisma.product
      .update({
        where: { id: product.id },
        data: { viewsCount: { increment: 1 } },
      })
      .catch(() => {});

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT update product (Admin Protected)
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

    const existing = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const {
      name,
      description,
      categoryId,
      price,
      priceOnRequest,
      sizes,
      colors,
      fabric,
      customization,
      status,
      isFeatured,
      isPublished,
      tags,
      instagramUrl,
      images,
    } = body;

    // If name changed, optionally update slug if unique
    let slug = existing.slug;
    if (name && name.trim() !== existing.name) {
      const baseSlug = slugify(name);
      let newSlug = baseSlug;
      let counter = 1;
      while (
        await prisma.product.findFirst({
          where: { slug: newSlug, NOT: { id } },
        })
      ) {
        newSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      slug = newSlug;
    }

    // Handle images: delete old and recreate if new images array provided
    if (Array.isArray(images)) {
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name ? name.trim() : existing.name,
        slug,
        description: description !== undefined ? description.trim() : existing.description,
        categoryId: categoryId || existing.categoryId,
        price: priceOnRequest ? null : price !== undefined ? (price ? parseFloat(price) : null) : existing.price,
        priceOnRequest: priceOnRequest !== undefined ? Boolean(priceOnRequest) : existing.priceOnRequest,
        sizes: sizes !== undefined ? sizes?.trim() || null : existing.sizes,
        colors: colors !== undefined ? colors?.trim() || null : existing.colors,
        fabric: fabric !== undefined ? fabric?.trim() || null : existing.fabric,
        customization: customization !== undefined ? customization?.trim() || null : existing.customization,
        status: status || existing.status,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existing.isFeatured,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : existing.isPublished,
        tags: tags !== undefined ? tags?.trim() || null : existing.tags,
        instagramUrl: instagramUrl !== undefined ? instagramUrl?.trim() || null : existing.instagramUrl,
        ...(Array.isArray(images)
          ? {
              images: {
                create: images.map((img: any, idx: number) => ({
                  url: img.url,
                  altText: img.altText || name || existing.name,
                  isPrimary: img.isPrimary || idx === 0,
                  sortOrder: img.sortOrder ?? idx,
                })),
              },
            }
          : {}),
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE product (Admin Protected)
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

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
