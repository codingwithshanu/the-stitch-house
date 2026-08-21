import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

// GET inquiries (Admin Protected)
export async function GET(req: NextRequest) {
  try {
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            images: {
              take: 1,
              select: { url: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, count: inquiries.length, inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST submit new inquiry (Public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, serviceType, productId } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone number, and message are required' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        message: message.trim(),
        serviceType: serviceType || 'General Inquiry',
        productId: productId || null,
        status: 'NEW',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your inquiry has been received. Neelima from The Stitch House will contact you shortly.',
        inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again or reach out on WhatsApp directly.' },
      { status: 500 }
    );
  }
}
