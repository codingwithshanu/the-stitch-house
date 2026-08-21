import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

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
    await prisma.makeupPortfolio.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Portfolio item deleted' });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
