#!/usr/bin/env node

/**
 * Database seed script
 * Run: npm run db:seed
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  try {
    // Clear existing data
    await prisma.favorite.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.propertyImage.deleteMany({});
    await prisma.property.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.province.deleteMany({});

    // Seed provinces
    const provinces = await Promise.all([
      prisma.province.create({ data: { name: 'DKI Jakarta' } }),
      prisma.province.create({ data: { name: 'Jawa Barat' } }),
      prisma.province.create({ data: { name: 'Jawa Tengah' } }),
      prisma.province.create({ data: { name: 'Jawa Timur' } }),
      prisma.province.create({ data: { name: 'Banten' } }),
    ]);

    console.log(`✅ Created ${provinces.length} provinces`);

    // Seed users
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: 'user1@example.com',
          username: 'user1',
          fullName: 'User Satu',
          password: '$2a$10$YQv8hKGxJF6l6J6l6J6l6JK6l6l6l6l6l6l6l6', // bcrypt hash
          role: 'AGENT',
          isVerified: true,
          isActive: true,
        },
      }),
      prisma.user.create({
        data: {
          email: 'user2@example.com',
          username: 'user2',
          fullName: 'User Dua',
          password: '$2a$10$YQv8hKGxJF6l6J6l6J6l6JK6l6l6l6l6l6l6l6',
          role: 'USER',
          isVerified: true,
          isActive: true,
        },
      }),
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Seed properties
    const properties = await Promise.all([
      prisma.property.create({
        data: {
          title: 'Rumah Modern Minimalis di Jakarta Selatan',
          slug: 'rumah-modern-minimalis-jakarta-selatan',
          description: 'Rumah mewah dengan desain minimalis modern, lokasi strategis dekat pusat kota, akses mudah ke transportasi umum.',
          propertyType: 'RUMAH',
          listingType: 'JUAL',
          price: 850000000,
          bedrooms: 3,
          bathrooms: 2,
          landArea: 100,
          buildArea: 120,
          province: 'DKI Jakarta',
          city: 'Jakarta Selatan',
          district: 'Klojen',
          address: 'Jl. Gatot Subroto No. 123',
          latitude: -6.2297,
          longitude: 106.7979,
          whatsappNumber: '08123456789',
          ownerId: users[0].id,
          status: 'PUBLISHED',
          isPremium: true,
          metaTitle: 'Rumah Modern di Jakarta Selatan',
          metaDescription: 'Rumah mewah minimalis dengan lokasi strategis',
        },
      }),
      prisma.property.create({
        data: {
          title: 'Kontrakan Nyaman Dekat Kampus',
          slug: 'kontrakan-nyaman-dekat-kampus',
          description: 'Kontrakan 2 kamar, dapur, kamar mandi, air bersih 24 jam, lokasi dekat kampus dan pusat belanja.',
          propertyType: 'KONTRAKAN',
          listingType: 'SEWA',
          price: 1500000,
          bedrooms: 2,
          bathrooms: 1,
          province: 'Jawa Timur',
          city: 'Malang',
          district: 'Lowokwaru',
          address: 'Jl. Soekarno Hatta No. 456',
          latitude: -7.9816,
          longitude: 112.6304,
          whatsappNumber: '08234567890',
          ownerId: users[1].id,
          status: 'PUBLISHED',
          isPremium: false,
        },
      }),
    ]);

    console.log(`✅ Created ${properties.length} properties`);

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
