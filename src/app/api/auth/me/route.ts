import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const adminPayload = getAdminFromRequest(req);

  if (!adminPayload) {
    return NextResponse.json({ authenticated: false, admin: null }, { status: 401 });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { id: adminPayload.id },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  if (!admin) {
    return NextResponse.json({ authenticated: false, admin: null }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, admin });
}
