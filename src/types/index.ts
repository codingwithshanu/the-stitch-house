export type ProductStatus = 'AVAILABLE' | 'CUSTOM_ONLY' | 'SOLD_OUT' | 'COMING_SOON';

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

export interface ProductImageItem {
  id?: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  sortOrder: number;
  _count?: {
    products: number;
  };
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  category?: CategoryItem;
  price?: number | null;
  priceOnRequest: boolean;
  sizes?: string | null;
  colors?: string | null;
  fabric?: string | null;
  customization?: string | null;
  status: ProductStatus;
  isFeatured: boolean;
  isPublished: boolean;
  tags?: string | null;
  instagramUrl?: string | null;
  viewsCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  images: ProductImageItem[];
}

export interface InquiryItem {
  id: string;
  productId?: string | null;
  product?: {
    id: string;
    name: string;
    slug: string;
    images: { url: string }[];
  } | null;
  name: string;
  phone: string;
  email?: string | null;
  message: string;
  serviceType?: string | null;
  status: InquiryStatus;
  createdAt: string | Date;
}

export interface InstagramPostItem {
  id: string;
  title?: string | null;
  imageUrl: string;
  postUrl: string;
  caption?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string | Date;
}

export interface MakeupServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  price?: number | null;
  priceText?: string | null;
  duration?: string | null;
  includes?: string | null;
  image?: string | null;
  sortOrder: number;
  isFeatured: boolean;
  createdAt?: string | Date;
}

export interface MakeupPortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  instagramUrl?: string | null;
  description?: string | null;
  sortOrder: number;
  createdAt?: string | Date;
}

export interface SiteSettingsItem {
  id: string;
  businessName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  address: string;
  openingHours: string;
  aboutStory?: string | null;

  // Glam by Neelima settings
  glamBusinessName?: string;
  glamTagline?: string;
  glamPhone?: string;
  glamWhatsappNumber?: string;
  glamInstagramHandle?: string;
  glamInstagramUrl?: string;
  glamBio?: string;
  glamPricingNote?: string;
}
