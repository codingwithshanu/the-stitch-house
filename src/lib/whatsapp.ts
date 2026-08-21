export interface WhatsAppProductQuery {
  productName: string;
  price?: number | null;
  priceOnRequest?: boolean;
  productUrl?: string;
  selectedSize?: string;
  selectedColor?: string;
}

export function getWhatsAppNumber(): string {
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919074371984';
  return num.replace(/[^0-9]/g, '');
}

export function generateProductWhatsAppLink(
  query: WhatsAppProductQuery,
  whatsappNumber?: string
): string {
  const number = (whatsappNumber || getWhatsAppNumber()).replace(/[^0-9]/g, '');
  
  let message = `Hi Neelima! 👋\n\nI saw the *${query.productName}* on *The Stitch House* website and I would love to get more details.`;
  
  if (query.priceOnRequest || !query.price) {
    message += `\n🏷️ *Price*: Price on Request / Custom Stitching`;
  } else {
    message += `\n🏷️ *Price*: ₹${query.price.toLocaleString('en-IN')}`;
  }

  if (query.selectedSize) {
    message += `\n📏 *Preferred Size/Custom*: ${query.selectedSize}`;
  }

  if (query.selectedColor) {
    message += `\n🎨 *Color*: ${query.selectedColor}`;
  }

  if (query.productUrl) {
    message += `\n🔗 *Link*: ${query.productUrl}`;
  }

  message += `\n\nPlease let me know about availability, fabric details, and custom stitching options! ✨`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function generateCustomStitchingWhatsAppLink(
  serviceType: string = 'Custom Stitching Consultation',
  whatsappNumber?: string
): string {
  const number = (whatsappNumber || getWhatsAppNumber()).replace(/[^0-9]/g, '');
  const message = `Hi Neelima! 👋\n\nI'm interested in *${serviceType}* from *The Stitch House* (Indore).\n\nI would like to discuss design ideas, fabrics, and measurement options for my upcoming outfit. Please let me know when we can connect! ✨`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function generateMakeupWhatsAppLink(
  serviceName: string = 'Bridal / Party Makeup',
  eventDate?: string,
  venue?: string,
  whatsappNumber?: string
): string {
  const number = (whatsappNumber || getWhatsAppNumber()).replace(/[^0-9]/g, '');
  let message = `Hi Neelima! 💄✨\n\nI'm interested in booking *${serviceName}* from *Neelima Makeup Art* (@glam_by_neelima, Indore).`;
  if (eventDate) {
    message += `\n📅 *Event Date*: ${eventDate}`;
  }
  if (venue) {
    message += `\n📍 *Venue/Location*: ${venue}`;
  }
  message += `\n\nPlease let me know your slot availability, package pricing, and advance booking procedure! 🌸`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function generateGeneralWhatsAppLink(
  customMessage?: string,
  whatsappNumber?: string
): string {
  const number = (whatsappNumber || getWhatsAppNumber()).replace(/[^0-9]/g, '');
  const message = customMessage || `Hi Neelima! 👋 I'm visiting *The Stitch House* website and have an inquiry about boutique stitching and designs in Indore.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
