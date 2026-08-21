import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for The Stitch House...');

  // 1. Clean existing records
  await prisma.inquiry.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.instagramPost.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Create Admin User
  const hashedPassword = await bcrypt.hash('adminpassword123', 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@stitchhouse.com',
      name: 'Neelima',
      password: hashedPassword,
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // 3. Create Site Settings
  await prisma.siteSetting.create({
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
      aboutStory: `Founded by designer and master couturier Neelima, The Stitch House is Indore's premier boutique for bespoke women's tailoring, couture lehengas, and designer ethnic wear. Every stitch is crafted with meticulous attention to detail, personalized fitting, and luxurious fabrics. Whether you need a bridal lehenga, custom-tailored designer blouse, or precision alterations, we bring your fashion dream into reality.`,
      
      // Glam by Neelima
      glamBusinessName: 'Neelima Makeup Art',
      glamTagline: 'Enhancing Your Natural Beauty • Professional Makeup & Hair',
      glamPhone: '+91 90743 71984',
      glamWhatsappNumber: '919074371984',
      glamInstagramHandle: 'glam_by_neelima',
      glamInstagramUrl: 'https://instagram.com/glam_by_neelima',
      glamBio: 'Certified Professional Bridal & Party Makeup Artist and Hairstylist based in Indore. Specializing in flawless HD Bridal Makeup, Dewy Glam, Contemporary Hairstyling, and Saree Draping. Available for destination weddings and studio sessions across MP.',
      glamPricingNote: 'Custom packages available for Bridal + Sider Combos. On-venue travel available across Indore & Madhya Pradesh.',
    },
  });
  console.log('✅ Site settings configured.');

  // 3.1 Create Glam by Neelima Services
  const makeupServicesData = [
    {
      title: 'HD Bridal Makeup & Royal Styling',
      category: 'Bridal',
      description: 'Full luxury bridal transformation with long-lasting HD waterproof makeup, custom false lashes, international bridal hairstyle, jewelry setting, and precision dupatta/lehenga draping.',
      price: 12500,
      priceText: '₹12,500 / Session',
      duration: '3 - 3.5 Hours',
      includes: 'HD Base, 3D Lashes, Contour & Highlight, Designer Hairstyle, Dupatta Setting, Saree Draping, Mini Touch-up Kit',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
      sortOrder: 1,
      isFeatured: true,
    },
    {
      title: 'Engagement / Reception Glam',
      category: 'Engagement',
      description: 'Subtle, radiant, dewy glam tailored for cocktail nights, ring ceremonies, and reception events. Focuses on luminous skin and romantic soft waves or textured updo.',
      price: 6500,
      priceText: '₹6,500 / Session',
      duration: '2 - 2.5 Hours',
      includes: 'HD Base, Eye Glam, False Lashes, Hairstyle of choice, Gown / Saree Draping',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      sortOrder: 2,
      isFeatured: true,
    },
    {
      title: 'Party & Festive Wear Makeup',
      category: 'Party',
      description: 'Elegant makeup for wedding guests, bridesmaids, family members, sangeet, and festive celebrations. Lightweight, comfortable, and camera-ready.',
      price: 3200,
      priceText: '₹3,200 / Person',
      duration: '1.5 Hours',
      includes: 'Flawless Base, Defined Eyes, Lip Art, Quick Hair Styling, Dupatta Pinning',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      sortOrder: 3,
      isFeatured: true,
    },
    {
      title: 'Professional Hairstyling & Saree Draping',
      category: 'Hair & Draping',
      description: 'Stand-alone luxury hairstyling (Messy Braids, Hollywood Curls, Floral Buns) and precision saree/dupatta pleating and pinning.',
      price: 1500,
      priceText: 'From ₹1,500',
      duration: '1 Hour',
      includes: 'Thermal styling, Hair accessories fixing, Ironing & Iron-Free Pleat Setting',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
      sortOrder: 4,
      isFeatured: true,
    },
  ];

  for (const s of makeupServicesData) {
    await prisma.makeupService.create({ data: s });
  }
  console.log(`✅ Created ${makeupServicesData.length} Makeup services.`);

  // 3.2 Create Glam by Neelima Portfolio Photos
  const makeupPortfolioData = [
    {
      title: 'Traditional Royal Indian Bride',
      category: 'Bridal',
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      instagramUrl: 'https://instagram.com/glam_by_neelima',
      description: 'Classic red bridal lehenga styling with smokey brown eyes, bold lips, and floral bun.',
      sortOrder: 1,
    },
    {
      title: 'Pastel Dewy Engagement Look',
      category: 'Engagement',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      instagramUrl: 'https://instagram.com/glam_by_neelima',
      description: 'Glass skin finish with soft peach monochrome tones and open romantic curls.',
      sortOrder: 2,
    },
    {
      title: 'Cocktail Sangeet Glam with Winged Liner',
      category: 'Party',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      instagramUrl: 'https://instagram.com/glam_by_neelima',
      description: 'Statement eyes and sculpted cheekbones for evening reception.',
      sortOrder: 3,
    },
    {
      title: 'Intricate Floral Bridal Bun & Mathapatti Setting',
      category: 'Hairstyles',
      imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
      instagramUrl: 'https://instagram.com/glam_by_neelima',
      description: 'Fresh baby breath flowers with traditional rose motifs and secure jewelry placement.',
      sortOrder: 4,
    },
  ];

  for (const p of makeupPortfolioData) {
    await prisma.makeupPortfolio.create({ data: p });
  }
  console.log(`✅ Created ${makeupPortfolioData.length} Makeup portfolio items.`);

  // 4. Create Categories
  const categoriesData = [
    {
      name: 'Lehengas',
      slug: 'lehengas',
      description: 'Bridal, festive, and contemporary designer lehengas tailored to perfection.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      sortOrder: 1,
    },
    {
      name: 'Designer Blouses',
      slug: 'designer-blouses',
      description: 'Handcrafted bridal blouses, boat necks, backless cuts, and intricate embroidery.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      sortOrder: 2,
    },
    {
      name: 'Salwar Suits & Anarkalis',
      slug: 'salwar-suits',
      description: 'Classic straight suits, flared anarkalis, and organza dupatta sets.',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      sortOrder: 3,
    },
    {
      name: 'Indo-Western & Dresses',
      slug: 'dresses',
      description: 'Fusion gowns, drape dresses, jacket sets, and modern festive silhouettes.',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      sortOrder: 4,
    },
    {
      name: "Girls' Ethnic Wear",
      slug: 'girls-wear',
      description: 'Charming ethnic frocks, mini lehengas, and festive sets for little princesses.',
      image: 'https://images.unsplash.com/photo-1621786030684-4c64829cff04?auto=format&fit=crop&w=800&q=80',
      sortOrder: 5,
    },
    {
      name: 'Custom Stitching & Alterations',
      slug: 'custom-stitching',
      description: 'Bespoke tailoring, neck/sleeve restyling, resizing, and precision fitting services in Indore.',
      image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      sortOrder: 6,
    },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.slug] = created.id;
  }
  console.log(`✅ Created ${Object.keys(categoryMap).length} categories.`);

  // 5. Create Rich Boutique Products
  const productsData = [
    {
      name: 'Emerald Green Zardozi Silk Lehenga',
      slug: 'emerald-green-zardozi-silk-lehenga',
      description: 'A breathtaking emerald green pure raw silk lehenga featuring antique gold zardozi hand embroidery, paired with a sweetheart neck blouse and scalloped organza dupatta. Tailored with double cancan for royal flare.',
      categoryId: categoryMap['lehengas'],
      price: 14500,
      priceOnRequest: false,
      sizes: 'Custom Made to Measurements, S, M, L, XL',
      colors: 'Emerald Green, Wine Red, Royal Navy',
      fabric: 'Pure Raw Silk with Organza Dupatta',
      customization: 'Can be customized in sleeve length, neckline depth, and dupatta border styling.',
      status: 'AVAILABLE',
      isFeatured: true,
      isPublished: true,
      tags: 'Lehenga, Bridal, Wedding, Zardozi, Silk, Festive',
      instagramUrl: 'https://instagram.com/p/sample1',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
          altText: 'Emerald Green Zardozi Silk Lehenga front view',
          isPrimary: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
          altText: 'Hand embroidery close up',
          isPrimary: false,
          sortOrder: 1,
        },
      ],
    },
    {
      name: 'Gulabi Rani Pink Hand-Embroidered Blouse',
      slug: 'gulabi-rani-pink-hand-embroidered-blouse',
      description: 'Exquisite bridal blouse in rich rani pink raw silk. Accented with intricate pearl moti, cutdana, and golden tilla work with a statement deep-V back cut and handmade latkans.',
      categoryId: categoryMap['designer-blouses'],
      price: 4200,
      priceOnRequest: false,
      sizes: 'Custom Stitching to your exact measurements',
      colors: 'Rani Pink, Crimson Red, Mustard Yellow',
      fabric: 'Pure Raw Silk with cotton lining & premium padding',
      customization: 'Padded / non-padded options, customizable back hook or side zipper.',
      status: 'AVAILABLE',
      isFeatured: true,
      isPublished: true,
      tags: 'Blouse, Designer Blouse, Bridal Blouse, Handwork, Custom Fit',
      instagramUrl: 'https://instagram.com/p/sample2',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
          altText: 'Gulabi Rani Pink Hand-Embroidered Blouse',
          isPrimary: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
          altText: 'Back design and latkans',
          isPrimary: false,
          sortOrder: 1,
        },
      ],
    },
    {
      name: 'Pastel Lavender Chanderi Anarkali Set',
      slug: 'pastel-lavender-chanderi-anarkali-set',
      description: 'Flowy floor-length anarkali suit crafted from authentic Chanderi silk with subtle gota patti neckline and cuff detailing. Paired with straight churidar pants and a hand-painted floral organza dupatta.',
      categoryId: categoryMap['salwar-suits'],
      price: 6800,
      priceOnRequest: false,
      sizes: 'XS, S, M, L, XL, XXL, Custom Sizing',
      colors: 'Pastel Lavender, Powder Blue, Mint Green, Peach',
      fabric: 'Authentic Chanderi Silk & Pure Organza',
      customization: 'Sleeve style, flair circumference, and neckline can be tailored.',
      status: 'AVAILABLE',
      isFeatured: true,
      isPublished: true,
      tags: 'Anarkali, Chanderi, Pastel, Wedding Guest, Festive Suit',
      instagramUrl: 'https://instagram.com/p/sample3',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
          altText: 'Pastel Lavender Chanderi Anarkali Set',
          isPrimary: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85',
          altText: 'Dupatta draping and silhouette',
          isPrimary: false,
          sortOrder: 1,
        },
      ],
    },
    {
      name: 'Royal Champagne Mirror Work Couture Lehenga',
      slug: 'royal-champagne-mirror-work-couture-lehenga',
      description: 'High-couture champagne gold lehenga with thousands of micro mirror-work motifs, paired with an illusion plunge neckline blouse and double dupattas. Custom dyed and handcrafted upon order.',
      categoryId: categoryMap['lehengas'],
      price: null,
      priceOnRequest: true,
      sizes: 'Bespoke / Made to Order Only',
      colors: 'Champagne Gold, Ivory Silver, Rose Gold',
      fabric: 'Tulle Net & Raw Silk Base',
      customization: 'Completely tailored to bride specifications including customized latkans with initials.',
      status: 'CUSTOM_ONLY',
      isFeatured: true,
      isPublished: true,
      tags: 'Bridal Lehenga, Mirror Work, Champagne, Luxury Couture, Bespoke',
      instagramUrl: 'https://instagram.com/p/sample4',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85',
          altText: 'Royal Champagne Mirror Work Lehenga',
          isPrimary: true,
          sortOrder: 0,
        },
      ],
    },
    {
      name: 'Modern Draped Indo-Western Saree Gown',
      slug: 'modern-draped-indo-western-saree-gown',
      description: 'Pre-stitched pleated draped saree gown with a structured sequin corset bodice and attached ruffled pallu. Designed for effortless glamour at cocktail nights and sangeet celebrations.',
      categoryId: categoryMap['dresses'],
      price: 8200,
      priceOnRequest: false,
      sizes: 'S, M, L, Custom Measurements',
      colors: 'Midnight Blue, Wine, Metallic Emerald',
      fabric: 'Imported Satin Georgette & Sequin Fabric',
      customization: 'Slit height, pallu drape length, and corset boning customized to fit.',
      status: 'AVAILABLE',
      isFeatured: false,
      isPublished: true,
      tags: 'Indo Western, Saree Gown, Cocktail Dress, Sangeet, Modern Ethnic',
      instagramUrl: 'https://instagram.com/p/sample5',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
          altText: 'Modern Draped Indo-Western Saree Gown',
          isPrimary: true,
          sortOrder: 0,
        },
      ],
    },
    {
      name: "Lilac Princess Floral Ethnic Frock for Girls",
      slug: 'lilac-princess-floral-ethnic-frock',
      description: 'Super soft, itch-free baby pink & lilac tiered ethnic frock for young girls with delicate sequin lace, comfortable cotton lining, and matching hair accessory.',
      categoryId: categoryMap['girls-wear'],
      price: 2600,
      priceOnRequest: false,
      sizes: '2-3 Yrs, 4-5 Yrs, 6-7 Yrs, 8-10 Yrs, Custom Child Sizing',
      colors: 'Lilac Pink, Buttercup Yellow, Sky Blue',
      fabric: 'Soft Net with 100% Breathable Cotton Inner Lining',
      customization: 'Can be custom-stitched to matching mom-and-daughter combos.',
      status: 'AVAILABLE',
      isFeatured: false,
      isPublished: true,
      tags: "Girls Wear, Kids Lehenga, Mom Daughter Combo, Birthday Outfit",
      instagramUrl: 'https://instagram.com/p/sample6',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1621786030684-4c64829cff04?auto=format&fit=crop&w=1000&q=85',
          altText: 'Lilac Princess Floral Ethnic Frock for Girls',
          isPrimary: true,
          sortOrder: 0,
        },
      ],
    },
    {
      name: 'Custom Tailored Blouse Stitching & Styling Service',
      slug: 'custom-tailored-blouse-stitching-service',
      description: 'Bring your fabric or choose from our boutique selection. Includes consultation with Neelima, neck design pattern drafting, custom piping/dori, cup padding, and precision trial fitting in Indore.',
      categoryId: categoryMap['custom-stitching'],
      price: 750,
      priceOnRequest: false,
      sizes: 'All custom sizes & body shapes',
      colors: 'As per client fabric / selection',
      fabric: 'Silk, Cotton, Georgette, Brocade, Velvet, Organza',
      customization: 'Any custom back cut, princess cut, katori cut, boat neck, halter, or bridal sweetheart.',
      status: 'AVAILABLE',
      isFeatured: true,
      isPublished: true,
      tags: 'Boutique Stitching, Custom Tailor Indore, Blouse Stitching, Alterations',
      instagramUrl: 'https://instagram.com/p/sample7',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85',
          altText: 'Custom Tailored Blouse Stitching & Styling Service',
          isPrimary: true,
          sortOrder: 0,
        },
      ],
    },
  ];

  for (const prod of productsData) {
    const { images, ...productFields } = prod;
    await prisma.product.create({
      data: {
        ...productFields,
        images: {
          create: images,
        },
      },
    });
  }
  console.log(`✅ Created ${productsData.length} boutique products.`);

  // 6. Create Instagram Showcase Posts
  const instagramData = [
    {
      title: 'Bridal Blouse Finishing in Progress ✨',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      postUrl: 'https://instagram.com/stitch_by_neelima',
      caption: 'Handcrafted zardozi detail for our lovely bride from Indore. DM to book your bridal consultation! #StitchByNeelima',
      sortOrder: 1,
      isActive: true,
    },
    {
      title: 'Pure Chanderi Festive Flare 🌸',
      imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
      postUrl: 'https://instagram.com/stitch_by_neelima',
      caption: 'Flowy anarkalis stitched with love and precision. Check our bio link for more designs!',
      sortOrder: 2,
      isActive: true,
    },
    {
      title: 'Emerald Raw Silk Lehenga Fitting 👑',
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      postUrl: 'https://instagram.com/stitch_by_neelima',
      caption: 'When custom tailoring meets royal aesthetics. Worn with confidence! #TheStitchHouseIndore',
      sortOrder: 3,
      isActive: true,
    },
    {
      title: 'Designer Blouse Back Patterns ✂️',
      imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      postUrl: 'https://instagram.com/stitch_by_neelima',
      caption: 'Deep cuts, perfect princess cuts and flawless finishes. DM us for custom tailoring in Indore.',
      sortOrder: 4,
      isActive: true,
    },
  ];

  for (const insta of instagramData) {
    await prisma.instagramPost.create({ data: insta });
  }
  console.log(`✅ Created ${instagramData.length} Instagram showcase posts.`);

  // 7. Create Sample Customer Inquiries
  await prisma.inquiry.create({
    data: {
      name: 'Pooja Sharma',
      phone: '+91 98260 12345',
      email: 'pooja.sharma@example.com',
      message: 'Hi Neelima, I have my sister’s wedding next month and need a customized bridal blouse and lehenga alteration. Can I visit your Indore studio this Saturday?',
      serviceType: 'Custom Stitching',
      status: 'NEW',
    },
  });

  await prisma.inquiry.create({
    data: {
      name: 'Ananya Verma',
      phone: '+91 94250 67890',
      email: 'ananya@example.com',
      message: 'Interested in the Emerald Green Zardozi Silk Lehenga. Is home measurement available in Indore?',
      serviceType: 'Product Inquiry',
      status: 'CONTACTED',
    },
  });

  console.log('✅ Created sample customer inquiries.');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
