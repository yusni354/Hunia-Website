import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: decoded.userId,
          propertyId: id,
        },
      },
    });

    if (existingFavorite) {
      // Remove favorite
      await prisma.favorite.delete({
        where: {
          userId_propertyId: {
            userId: decoded.userId,
            propertyId: id,
          },
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Removed from favorites',
          isFavorited: false,
        },
        { status: 200 }
      );
    } else {
      // Add favorite
      await prisma.favorite.create({
        data: {
          userId: decoded.userId,
          propertyId: id,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Added to favorites',
          isFavorited: true,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}