import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize') || '12');
    const listingType = request.nextUrl.searchParams.get('listingType');
    const propertyType = request.nextUrl.searchParams.get('propertyType');
    const city = request.nextUrl.searchParams.get('city');
    const minPrice = request.nextUrl.searchParams.get('minPrice');
    const maxPrice = request.nextUrl.searchParams.get('maxPrice');
    const search = request.nextUrl.searchParams.get('search');

    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {
      status: 'PUBLISHED',
    };

    if (listingType) where.listingType = listingType;
    if (propertyType) where.propertyType = propertyType;
    if (city) where.city = { contains: city, mode: 'insensitive' };

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fetch properties
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: {
            take: 1,
            orderBy: { order: 'asc' },
          },
          owner: {
            select: {
              id: true,
              username: true,
              fullName: true,
              profileImage: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.property.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json(
      {
        data: properties,
        pagination: {
          page,
          pageSize,
          total,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch properties error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const {
      title,
      description,
      propertyType,
      listingType,
      price,
      bedrooms,
      bathrooms,
      landArea,
      buildArea,
      province,
      city,
      district,
      village,
      address,
      latitude,
      longitude,
      whatsappNumber,
      images,
    } = body;

    // Validation
    if (!title || !description || !propertyType || !listingType || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    // Create property
    const property = await prisma.property.create({
      data: {
        title,
        slug: `${slug}-${Date.now()}`,
        description,
        propertyType,
        listingType,
        price: parseFloat(price),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        landArea: landArea ? parseFloat(landArea) : null,
        buildArea: buildArea ? parseFloat(buildArea) : null,
        province,
        city,
        district,
        village: village || null,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        whatsappNumber,
        ownerId: decoded.userId,
        status: 'DRAFT',
      },
      include: {
        images: true,
        owner: true,
      },
    });

    // Add images if provided
    if (images && images.length > 0) {
      await Promise.all(
        images.map((image: any, index: number) =>
          prisma.propertyImage.create({
            data: {
              propertyId: property.id,
              url: image.url,
              caption: image.caption,
              order: index,
            },
          })
        )
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Property created successfully',
        property,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}