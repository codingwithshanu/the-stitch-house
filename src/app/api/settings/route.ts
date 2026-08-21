import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

// GET site settings (Public)
export async function GET() {
  try {
    let settings = await prisma.siteSetting.findUnique({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: {
          id: 'default',
          businessName: 'The Stitch House',
          tagline: 'Made with Precision, Worn with Confidence.',
          phone: '+91 90743 71984',
          whatsappNumber: '919074371984',
          instagramHandle: 'stitch_by_neelima',
          instagramUrl: 'https://instagram.com/stitch_by_neelima',
          address: 'Rau, Indore, Madhya Pradesh',
          openingHours: 'Mon - Sat: 10:00 AM - 8:00 PM',
        },
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT update site settings (Admin Protected)
export async function PUT(req: NextRequest) {
  try {
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      businessName,
      tagline,
      phone,
      whatsappNumber,
      instagramHandle,
      instagramUrl,
      address,
      openingHours,
      aboutStory,
      glamBusinessName,
      glamTagline,
      glamPhone,
      glamWhatsappNumber,
      glamInstagramHandle,
      glamInstagramUrl,
      glamBio,
      glamPricingNote,
    } = body;

    const settings = await prisma.siteSetting.upsert({
      where: { id: 'default' },
      update: {
        businessName: businessName?.trim(),
        tagline: tagline?.trim(),
        phone: phone?.trim(),
        whatsappNumber: whatsappNumber?.trim(),
        instagramHandle: instagramHandle?.trim(),
        instagramUrl: instagramUrl?.trim(),
        address: address?.trim(),
        openingHours: openingHours?.trim(),
        aboutStory: aboutStory?.trim(),
        glamBusinessName: glamBusinessName?.trim(),
        glamTagline: glamTagline?.trim(),
        glamPhone: glamPhone?.trim(),
        glamWhatsappNumber: glamWhatsappNumber?.trim(),
        glamInstagramHandle: glamInstagramHandle?.trim(),
        glamInstagramUrl: glamInstagramUrl?.trim(),
        glamBio: glamBio?.trim(),
        glamPricingNote: glamPricingNote?.trim(),
      },
      create: {
        id: 'default',
        businessName: businessName?.trim() || 'The Stitch House',
        tagline: tagline?.trim() || 'Made with Precision, Worn with Confidence.',
        phone: phone?.trim() || '+91 90743 71984',
        whatsappNumber: whatsappNumber?.trim() || '919074371984',
        instagramHandle: instagramHandle?.trim() || 'stitch_by_neelima',
        instagramUrl: instagramUrl?.trim() || 'https://instagram.com/stitch_by_neelima',
        address: address?.trim() || 'Indore, Madhya Pradesh',
        openingHours: openingHours?.trim() || 'Mon - Sat: 10:00 AM - 8:00 PM',
        aboutStory: aboutStory?.trim(),
        glamBusinessName: glamBusinessName?.trim() || 'Neelima Makeup Art',
        glamTagline: glamTagline?.trim() || 'Enhancing Your Natural Beauty • Professional Makeup & Hair',
        glamPhone: glamPhone?.trim() || '+91 90743 71984',
        glamWhatsappNumber: glamWhatsappNumber?.trim() || '919074371984',
        glamInstagramHandle: glamInstagramHandle?.trim() || 'glam_by_neelima',
        glamInstagramUrl: glamInstagramUrl?.trim() || 'https://instagram.com/glam_by_neelima',
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
