import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET all products with filtering, search & sorting
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'newest';
    const all = searchParams.get('all'); // for admin to get unpublished

    const isAdmin = getAdminFromRequest(req);

    const where: any = {};

    // Only admins can see unpublished products
    if (!isAdmin && all !== 'true') {
      where.isPublished = true;
    }

    if (category && category !== 'all') {
      where.category = {
        slug: category,
      };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
        { fabric: { contains: search } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-desc') {
      orderBy = { price: 'desc' };
    } else if (sort === 'popular') {
      orderBy = { viewsCount: 'desc' };
    } else if (sort === 'oldest') {
      orderBy = { createdAt: 'asc' };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy,
    });

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create new product (Admin Protected)
export async function POST(req: NextRequest) {
  try {
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
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
      images, // array of { url, altText, isPrimary, sortOrder }
    } = body;

    if (!name || !description || !categoryId) {
      return NextResponse.json(
        { error: 'Product name, description, and category are required' },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug,
        description: description.trim(),
        categoryId,
        price: priceOnRequest ? null : price ? parseFloat(price) : null,
        priceOnRequest: Boolean(priceOnRequest),
        sizes: sizes?.trim() || null,
        colors: colors?.trim() || null,
        fabric: fabric?.trim() || null,
        customization: customization?.trim() || null,
        status: status || 'AVAILABLE',
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        tags: tags?.trim() || null,
        instagramUrl: instagramUrl?.trim() || null,
        images: {
          create: (images || []).map((img: any, idx: number) => ({
            url: img.url,
            altText: img.altText || name,
            isPrimary: img.isPrimary || idx === 0,
            sortOrder: img.sortOrder ?? idx,
          })),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
