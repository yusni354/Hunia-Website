# HUNiA - Platform Marketplace Properti Indonesia

> Platform lengkap untuk jual beli dan sewa properti di Indonesia

## 🌟 Fitur Utama

- ✅ **Homepage Marketplace** - Tampilan properti terbaru dan populer
- ✅ **Pencarian Detail** - Filter berdasarkan provinsi, kota, harga, tipe properti
- ✅ **Peta Interaktif** - Integrasi Google Maps untuk pencarian location-based
- ✅ **Authentication** - Login & Register dengan JWT token
- ✅ **Dashboard Admin** - Kelola properti, users, dan analytics
- ✅ **Upload Properti** - Form upload lengkap dengan multiple images
- ✅ **Detail Properti** - Halaman detail dengan foto, info, dan kontak
- ✅ **WhatsApp Integration** - Tombol kontak langsung ke pemilik
- ✅ **Favorite/Wishlist** - Simpan properti favorit
- ✅ **Mobile Responsive** - Desain responsif untuk semua perangkat
- ✅ **SEO Ready** - Meta tags dan structured data
- ✅ **Sistem Rating** - Review dan rating properti
- ✅ **Premium Listing** - Boost properti dengan fitur premium

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework dengan SSR & SSG
- **TypeScript** - Type safety untuk JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form state management
- **Zustand** - Lightweight state management
- **SWR** - Data fetching library
- **React Hot Toast** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database utama
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Services
- **Cloudinary** - Image upload & CDN
- **Google Maps API** - Integrasi peta
- **SendGrid/Nodemailer** - Email service
- **Stripe** - Payment gateway
- **Vercel** - Deployment & hosting

## 📋 Prasyarat

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL database
- Akun Cloudinary (untuk image upload)
- Google Maps API key
- SendGrid API key (untuk email)

## 🚀 Instalasi & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yusni354/Hunia-Website.git
cd Hunia-Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` dengan konfigurasi Anda:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hunia_db"

# Authentication
JWT_SECRET="your-secret-key-here"
NEXTAUT_SECRET="your-nextauth-secret"

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-key"
SMTP_FROM_EMAIL="noreply@hunia.id"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 4. Setup Database
```bash
# Push schema ke database
npm run db:push

# Generate Prisma client
npm run db:generate

# (Optional) Seed data
npm run db:seed
```

### 5. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Struktur Folder

```
hunia-website/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── properties/      # Property endpoints
│   │   │   └── ...
│   │   ├── (pages)/             # Page routes
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/              # React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PropertyCard.tsx
│   │   └── ...
│   ├── lib/                     # Utility functions
│   │   ├── db.ts               # Prisma client
│   │   ├── auth.ts             # Auth utilities
│   │   ├── email.ts            # Email sender
│   │   ├── cloudinary.ts       # Image upload
│   │   └── utils.ts            # Helper functions
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useProperties.ts
│   │   └── ...
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   └── styles/                  # Global styles
│       └── globals.css
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                      # Static files
├── .env.local.example          # Environment variables example
├── package.json
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md
```

## 🔐 API Documentation

### Authentication
```
POST   /api/auth/register    # Register user
POST   /api/auth/login       # Login user
POST   /api/auth/logout      # Logout user
GET    /api/auth/me          # Get current user
```

### Properties
```
GET    /api/properties              # List properties (with filters)
POST   /api/properties              # Create property
GET    /api/properties/[id]         # Get property detail
PUT    /api/properties/[id]         # Update property
DELETE /api/properties/[id]         # Delete property
POST   /api/properties/[id]/favorite # Toggle favorite
```

### Search
```
GET    /api/properties?page=1&pageSize=12&propertyType=RUMAH&listingType=JUAL&city=Jakarta&minPrice=100000000&maxPrice=5000000000
```

## 🎨 Customization

### Mengubah Warna Brand
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      emerald: {
        600: '#your-color' // Ganti dengan warna Anda
      }
    }
  }
}
```

### Mengubah Metadata
Edit `src/app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Nama Platform Anda',
  description: 'Deskripsi Anda',
  // ...
};
```

## 📦 Deployment

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Import project ke [Vercel](https://vercel.com)
3. Set environment variables di Vercel dashboard
4. Deploy!

```bash
# Build untuk production
npm run build

# Test production build
npm run start
```

### Deploy ke Platform Lain

#### Netlify
```bash
npm run build
# Push folder .next ke Netlify
```

#### Docker (VPS)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next .next
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t hunia:latest .
docker run -p 3000:3000 hunia:latest
```

## 🔒 Security Best Practices

- ✅ Use HTTPS in production
- ✅ Set secure cookies (httpOnly, secure flag)
- ✅ Implement CSRF protection
- ✅ Validate input di server-side
- ✅ Use parameterized queries (Prisma ORM)
- ✅ Hash passwords dengan bcrypt
- ✅ Use environment variables untuk secrets
- ✅ Regular security audits

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check DATABASE_URL in .env.local
# Make sure PostgreSQL is running
# Verify connection string format
npm run db:push
```

### Image Upload Not Working
```bash
# Check Cloudinary credentials
# Verify API key and secret
# Test upload preset exists
```

### Google Maps Not Showing
```bash
# Verify API key is valid
# Check billing is enabled
# Ensure Maps API is enabled
# Check domain restrictions
```

## 📊 Database Schema

Database menggunakan PostgreSQL dengan Prisma ORM. Schema mencakup:

- **User** - Data pengguna (login, profile)
- **Property** - Daftar properti (jual/sewa)
- **PropertyImage** - Foto properti
- **Favorite** - Properti favorit user
- **Review** - Rating dan review properti
- **Message** - Chat antar user
- **Province, City, District, Village** - Lokasi
- **Subscription** - Paket user
- **PremiumListing** - Listing premium
- **Advertisement** - Iklan banner

Lihat detail di `prisma/schema.prisma`

## 🚀 Performance Optimization

- Image optimization dengan Next.js Image
- Lazy loading untuk images dan components
- Code splitting otomatis dengan Next.js
- Caching strategy dengan SWR
- Database indexing pada field pencarian
- CDN untuk static assets (Cloudinary)

## 📱 Mobile App (Future)

API sudah ready untuk mobile app:
- React Native / Flutter compatible
- RESTful API endpoints
- JSON responses
- Proper error handling

## 💰 Monetization

Sistem monetisasi tersedia:
- Premium listing (boost properti)
- Featured homepage ads
- Agent subscription (professional)
- Banner ads
- Commission on transactions

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - lihat file `LICENSE` untuk details

## 📞 Support

- Email: info@hunia.id
- WhatsApp: +62 812 0000 0000
- Instagram: @hunia.id

## 🙏 Terima Kasih

Developed with ❤️ for Indonesian property market.

---

**HUNiA** - Platform Marketplace Properti Terpercaya Indonesia