# 👗 The Stitch House — Boutique & Custom Stitching Website

A modern, elegant, mobile-first boutique website and intuitive admin CMS built for **The Stitch House** (`@stitch_by_neelima`), based in **Indore, Madhya Pradesh**.

> *"Made with Precision, Worn with Confidence."*

---

## ✨ Features Overview

### 🛍️ Public Customer Experience
- **Luxury Boutique Aesthetic**: Sophisticated color palette (Warm Ivory, Champagne Gold, Royal Rosewood Burgundy, Charcoal) and editorial typography designed specifically for Indian festive wear and bridal couture.
- **Product Catalog & Dynamic Filtering**: Live instant filtering by Category (Lehengas, Blouses, Salwar Suits, Dresses, Girls' Wear, Alterations), search terms, and sorting options.
- **High-Resolution Visual Showcase**: Large responsive product image galleries with zoom lightbox, multiple angles, and hover transitions.
- **Direct 1-Tap WhatsApp Conversion**: Every product generates a pre-formatted WhatsApp message containing the outfit name, selected size/custom fit, color, price/custom tag, and live URL.
- **Sticky Mobile Quick Contact Bar**: Floating 1-tap **WhatsApp Chat**, **Call Boutique**, and **Instagram** direct buttons for mobile shoppers coming from Instagram reels.
- **Custom Stitching Guide**: Dedicated 4-step interactive tailoring process, measurement guide, and Indore home pickup/trial information.
- **💄 Dedicated Glam by Neelima Makeup Page (`/glam-by-neelima`)**:
  - Highlights **Neelima Makeup Art** (`@glam_by_neelima`).
  - Bridal HD Makeup, Engagement Glam, Party Wear Makeup, and Hairstyling & Saree Draping packages.
  - Real brides & hair transformations portfolio with filterable tags.
  - Dedicated Makeup Booking Form & 1-tap WhatsApp slot booking.
  - Integrated with boutique bridal couture for a complete bridal experience under one roof.
- **Dynamic SEO & Local Schema**: Full OpenGraph social share cards, dynamic `sitemap.xml`, `robots.txt`, and Google `LocalBusiness` + `Product` JSON-LD schema with Indore geo-coordinates.

### 🛡️ Non-Technical Admin CMS
- **Secure Authentication**: Protected Admin Portal with bcrypt password hashing and JWT session cookies.
- **💄 Glam by Neelima Management (`/admin/glam`)**:
  - Manage Makeup Services & Packages with pricing, duration, and what's included.
  - Manage Makeup Portfolio photos and Instagram reel links.
  - Independent Contact & WhatsApp numbers for makeup bookings vs boutique orders.
- **Product Management (CRUD)**:
  - Add, edit, and delete clothing designs.
  - Multi-image drag-and-drop file upload with preview, reordering, and "Cover Photo" selector.
  - "Price on Request" / Custom Stitching toggle.
  - Publish / Unpublish instant switch.
  - Homepage Featured product toggle.
  - Tags, fabric details, available sizes, and matching Instagram reel links.
- **Category Manager**: Add, edit, reorder, or delete clothing categories without touching code.
- **Customer Inquiries Inbox**: Backs up every customer contact and custom stitching request with date, phone number, and **1-tap WhatsApp reply button**.
- **Instagram Showcase Feed**: Easily update and curate Instagram posts featured on the homepage.
- **Boutique Settings**: Change phone numbers, WhatsApp redirection number, studio opening hours, and address in seconds.

---

## 🚀 Quickstart (Local Development)

### 1. Requirements
- Node.js 18+ or 20+
- npm 9+

### 2. Installation & Setup
```bash
# Navigate to project directory
cd the-stitch-house

# Install dependencies
npm install

# Push database schema to local SQLite database (dev.db)
npm run prisma:push

# Seed rich starter data (lehengas, blouses, suits, categories, admin user)
npm run prisma:seed

# Start the development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

---

## 🔑 Admin Credentials (Default)

- **Admin Portal URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@stitchhouse.com`
- **Password**: `adminpassword123`

*(You can change the email/password or create new admin users directly in the database or update in `prisma/seed.ts`).*

---

## ☁️ 100% Free Production Deployment Guide

This architecture is specifically designed to run **completely free of cost** forever with zero server maintenance.

### Step 1: Free Managed Database (Supabase or Neon)
1. Sign up for free at [supabase.com](https://supabase.com) or [neon.tech](https://neon.tech).
2. Create a new free project.
3. In your database settings, copy the PostgreSQL Connection String (`DATABASE_URL`), for example:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
   ```
4. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.

### Step 2: Deploy to Vercel (Free Edge Hosting)
1. Push this project to your GitHub repository.
2. Sign in to [vercel.com](https://vercel.com) using your GitHub account.
3. Click **"New Project"** and import your `the-stitch-house` repository.
4. Add the following **Environment Variables** in the Vercel dashboard:
   - `DATABASE_URL`: *(Your Supabase or Neon PostgreSQL connection URL)*
   - `JWT_SECRET`: *(A random secure 32+ character string)*
   - `ADMIN_EMAIL`: `admin@stitchhouse.com`
   - `ADMIN_PASSWORD`: `your-strong-password`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `919074371984`
   - `NEXT_PUBLIC_INSTAGRAM_HANDLE`: `stitch_by_neelima`
   - `NEXT_PUBLIC_INSTAGRAM_URL`: `https://instagram.com/stitch_by_neelima`
   - `NEXT_PUBLIC_PHONE_NUMBER`: `+91 90743 71984`
5. Click **"Deploy"**. Vercel will automatically build and publish the site with a free `.vercel.app` domain and SSL certificate.

### Step 3: Run Database Seed on Production
Run this one-time command from your terminal pointing to your Supabase/Neon URL:
```bash
DATABASE_URL="your-supabase-url" npx prisma db push
DATABASE_URL="your-supabase-url" npx tsx prisma/seed.ts
```

### Step 4: Connect Custom Domain (Optional)
In Vercel Project Settings → Domains:
- Add your custom domain (e.g. `thestitchhouse.in`).
- Point the DNS `A` or `CNAME` record as prompted. Vercel automatically provisions free auto-renewing HTTPS.

---

## 👩‍💼 Admin User Guide for Neelima

1. Open your phone or laptop browser and go to `https://your-website.com/admin/login`.
2. Log in with your email and password.
3. **To Add a New Outfit**:
   - Tap **"Add New Product"**.
   - Tap or drag photos from your phone gallery.
   - Enter the name, select category, enter price (or tick *"Price on Request"*).
   - Enter fabric details and tap **"Create & Publish Product"**.
4. **To Check Customer Inquiries**:
   - Tap **"Inquiries Inbox"** in the sidebar.
   - Tap **"Reply on WhatsApp"** next to any inquiry to instantly open a pre-filled chat with that customer.

---

## 📂 Project Architecture

```
the-stitch-house/
├── prisma/
│   ├── schema.prisma          # Database schema (Products, Categories, Inquiries, Settings)
│   └── seed.ts                # Rich seed dataset
├── public/
│   └── uploads/               # Uploaded product photos
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with SEO metadata & JSON-LD
│   │   ├── page.tsx           # Homepage
│   │   ├── collections/       # Catalog & Category-filtered pages
│   │   ├── products/[slug]/   # Product Detail page with WhatsApp conversion
│   │   ├── custom-stitching/  # Tailoring Guide & Measurements
│   │   ├── about/             # Boutique Story & Neelima profile
│   │   ├── contact/           # Contact details & Inquiry form
│   │   ├── admin/             # Full CMS Portal (Products, Categories, Inquiries, Settings)
│   │   ├── api/               # Serverless backend endpoints
│   │   ├── sitemap.ts         # Dynamic SEO Sitemap
│   │   └── robots.ts          # Robots crawler permissions
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, Mobile Floating Bar
│   │   ├── products/          # ProductCard, ProductGallery, WhatsAppEnquiryButton, Filters
│   │   ├── home/              # Hero, CategoryGrid, Featured, Process, Instagram, Map
│   │   └── admin/             # Sidebar, Header, ImageUploader
│   ├── lib/
│   │   ├── prisma.ts          # Database client
│   │   ├── auth.ts            # Admin JWT & bcrypt
│   │   ├── whatsapp.ts        # WhatsApp message builder
│   │   └── utils.ts           # Formatters & slugifier
│   └── types/                 # TypeScript interfaces
```
