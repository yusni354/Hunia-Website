# HUNiA Website

Full-featured property marketplace platform for Indonesia.

## Quick Links

- [Local Setup](./DEPLOYMENT.md#quick-start-guide)
- [Deploy to Vercel](./DEPLOYMENT.md#option-1-vercel-easiest)
- [Deploy to Production](./DEPLOYMENT.md#deployment-ke-production)
- [Full Documentation](./README.md)

## Features

✨ Complete feature-rich property marketplace
- Homepage with listings
- Advanced search filters
- Interactive map integration
- User authentication
- Property upload & management
- Favorites/Wishlist
- Reviews & ratings
- Premium listings
- WhatsApp integration
- Mobile responsive
- SEO optimized

## Tech Stack

- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Cloudinary (images)
- Google Maps API
- SendGrid (email)
- Vercel (hosting)

## Getting Started

```bash
# 1. Clone
git clone https://github.com/yusni354/Hunia-Website.git
cd Hunia-Website

# 2. Install
npm install

# 3. Setup env
cp .env.local.example .env.local
# Edit .env.local with your values

# 4. Setup database
npm run db:push

# 5. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions:
- Vercel (recommended, free)
- Netlify
- Railway
- Docker/VPS

## Project Structure

```
src/
├── app/
│   ├── api/         # Backend endpoints
│   └── (pages)/     # Frontend pages
├── components/      # React components
├── lib/            # Utilities & helpers
├── hooks/          # Custom hooks
└── types/          # TypeScript types

prisma/
└── schema.prisma   # Database schema
```

## Database Schema

- Users (authentication)
- Properties (listings)
- Images (photos)
- Favorites (wishlist)
- Reviews (ratings)
- Messages (chat)
- Locations (provinces, cities, districts)
- Subscriptions (premium plans)
- Premium listings (boost)
- Advertisements (banners)

## API Documentation

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login  
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get profile

### Properties
- `GET /api/properties` - List (with filters)
- `POST /api/properties` - Create
- `GET /api/properties/[id]` - Detail
- `PUT /api/properties/[id]` - Update
- `DELETE /api/properties/[id]` - Delete
- `POST /api/properties/[id]/favorite` - Toggle favorite

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - Token secret
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Maps API
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Image service
- `CLOUDINARY_API_KEY` - Image API key
- `CLOUDINARY_API_SECRET` - Image API secret
- `SENDGRID_API_KEY` - Email service

Optional:
- `NEXTAUTH_SECRET` - NextAuth (if using)
- `STRIPE_PUBLIC_KEY` - Payments (if using)
- `STRIPE_SECRET_KEY` - Payments (if using)

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# View database
npm run db:studio

# Push schema changes
npm run db:push

# Generate migrations
npm run db:migrate

# Seed sample data
npm run db:seed
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Image optimization
- Code splitting
- Lazy loading
- CDN delivery (Cloudinary)
- Database indexing
- Caching strategies

## Security

- HTTPS only
- Secure cookies
- JWT tokens
- Password hashing (bcrypt)
- Input validation
- CSRF protection
- SQL injection prevention (Prisma ORM)

## Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI property recommendations  
- [ ] Video tours
- [ ] Virtual tours (3D)
- [ ] Cryptocurrency payments
- [ ] Multi-language support
- [ ] Admin dashboard

## Support

- **Email**: info@hunia.id
- **WhatsApp**: +62 812 0000 0000
- **GitHub Issues**: Report bugs

## License

MIT - See LICENSE file

## Contributors

Built with ❤️ for Indonesian property market

---

**Ready to deploy?** See [DEPLOYMENT.md](./DEPLOYMENT.md) 🚀