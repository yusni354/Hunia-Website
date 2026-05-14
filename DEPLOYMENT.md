# HUNiA Website - Setup & Deployment Guide

## Quick Start Guide

### Langkah 1: Persiapan Lokal

```bash
# Clone repository
git clone https://github.com/yusni354/Hunia-Website.git
cd Hunia-Website

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local
```

### Langkah 2: Setup Database PostgreSQL

Ada 3 pilihan:

#### Option A: PostgreSQL Local (Development)
```bash
# Install PostgreSQL jika belum
# Windows: Download dari postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Start PostgreSQL service
# Windows: psql -U postgres
# Mac/Linux: psql postgres

# Create database
CREATE DATABASE hunia_db;

# Update .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/hunia_db"
```

#### Option B: PostgreSQL Cloud (Neon, Supabase)

**Neon.tech (Recommended)**
1. Go to https://neon.tech
2. Sign up dengan GitHub
3. Create project "hunia"
4. Copy connection string
5. Paste ke `.env.local`:
```
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.neon.tech/hunia_db"
```

**Supabase**
1. Go to https://supabase.com
2. Create project
3. Di settings, copy database URL
4. Paste ke `.env.local`

#### Option C: PostgreSQL di VPS/Server
```bash
# Remote server
DATABASE_URL="postgresql://user:password@your-server.com:5432/hunia_db"
```

### Langkah 3: Setup Services

#### A. Cloudinary (Image Upload)
```
1. Go to https://cloudinary.com
2. Sign up free
3. Dashboard > Settings > API Keys
4. Copy ke .env.local:
   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
```

#### B. Google Maps API
```
1. Go to Google Cloud Console
2. Create project "HUNiA"
3. Enable Maps JavaScript API
4. Create API key
5. Copy ke .env.local:
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-key"
```

#### C. SendGrid (Email)
```
1. Go to https://sendgrid.com
2. Sign up (free tier available)
3. Settings > API Keys > Create
4. Copy API key ke .env.local:
   SENDGRID_API_KEY="SG.xxx"
   SENDGRID_FROM_EMAIL="noreply@hunia.id"
```

### Langkah 4: Inisialisasi Database

```bash
# Push schema ke database
npm run db:push

# Generate Prisma client
npm run db:generate

# (Optional) Lihat database di Prisma Studio
npm run db:studio
```

### Langkah 5: Run Development

```bash
npm run dev
```

Buka http://localhost:3000

---

## Deployment ke Production

### Option 1: Vercel (Easiest) ⭐

```bash
# Push ke GitHub dulu
git add .
git commit -m "Initial commit"
git push origin main
```

1. Go to https://vercel.com
2. Click "New Project"
3. Import repository GitHub
4. Environment variables:
   - DATABASE_URL (Neon/Supabase)
   - JWT_SECRET (generate: `openssl rand -base64 32`)
   - NEXTAUTH_SECRET
   - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - SENDGRID_API_KEY
   - SENDGRID_FROM_EMAIL
5. Click Deploy!

**Cost**: Free untuk unlimited projects
**Domain**: Get free .vercel.app atau connect custom domain

### Option 2: Netlify

1. Go to https://netlify.com
2. Connect GitHub repository
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

**Cost**: Free tier available

### Option 3: Railway.app

1. Go to https://railway.app
2. New Project > GitHub Repo
3. Select repository
4. Add environment variables
5. Deploy!

**Cost**: $5/month minimum

### Option 4: DigitalOcean / AWS / VPS

#### Docker Setup
```bash
# Build Docker image
docker build -t hunia:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e JWT_SECRET=... \
  hunia:latest
```

#### Manual VPS (Ubuntu)
```bash
# SSH ke server
ssh root@your-server-ip

# Install dependencies
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql

# Clone & setup
git clone https://github.com/yusni354/Hunia-Website.git
cd Hunia-Website
npm install
npm run build

# Setup PM2 (process manager)
sudo npm install -g pm2
pm2 start npm --name "hunia" -- start
pm2 startup
pm2 save

# Setup Nginx as reverse proxy
sudo apt-get install nginx
# Edit /etc/nginx/sites-available/default
# Proxy to localhost:3000

# Setup SSL (Let's Encrypt)
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

**Cost**: $5-20/month untuk VPS

---

## Environment Variables Checklist

```
✓ DATABASE_URL
✓ JWT_SECRET
✓ NEXTAUTH_SECRET
✓ NEXT_PUBLIC_APP_URL
✓ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
✓ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
✓ CLOUDINARY_API_KEY
✓ CLOUDINARY_API_SECRET
✓ SENDGRID_API_KEY
✓ SENDGRID_FROM_EMAIL
✓ NODE_ENV (production)
```

## Post-Deployment Checklist

- [ ] Database migrations run successfully
- [ ] Images upload working di Cloudinary
- [ ] Google Maps displaying correctly
- [ ] Email sending working
- [ ] Authentication login/register working
- [ ] HTTPS enabled
- [ ] Domain configured
- [ ] Error monitoring setup (Sentry)
- [ ] Analytics setup (Google Analytics)
- [ ] Backup strategy configured

## Database Backup

```bash
# Backup PostgreSQL
pg_dump DATABASE_URL > backup.sql

# Restore
psql DATABASE_URL < backup.sql

# Auto backup (add to cron)
0 2 * * * pg_dump DATABASE_URL | gzip > /backups/hunia-$(date +\%Y-\%m-\%d).sql.gz
```

## Monitoring & Logging

```bash
# PM2 Monitoring
pm2 monit
pm2 logs

# Check server
df -h                    # Disk usage
top                      # CPU & Memory
netstat -tlnp            # Open ports
```

## Troubleshooting Deployment

### Build Error
```bash
# Clear cache & rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Error
```bash
# Test connection
psql DATABASE_URL

# Check schema
npm run db:push
```

### Image Upload Not Working
- Verify Cloudinary credentials
- Check API key validity
- Test upload in Cloudinary dashboard

## Support

- Docs: README.md
- Issues: GitHub Issues
- Email: info@hunia.id

---

**Selamat! Aplikasi Anda siap di-deploy! 🚀**