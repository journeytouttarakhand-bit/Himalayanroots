import mongoose, { Schema, Document } from "mongoose";

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ISiteSettings extends Document {
  // General & Appearance
  siteName?: string;
  tagline?: string;
  siteDescription?: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;

  // Homepage Hero
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroImage?: string;

  // About Us Section
  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutDescription?: string;
  aboutImage?: string;

  // Contact
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  workingHours?: string;

  // Social Links
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  whatsappNumber?: string;

  // Announcement Bar
  announcementEnabled?: boolean;
  announcementText?: string;
  announcementButtonText?: string;
  announcementLink?: string;
  announcementBackground?: string;
  announcementTextColor?: string;

  // Footer
  footerAboutText?: string;
  copyrightText?: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;

  // FAQs
  faqs?: IFAQ[];
}

const SiteSettingsSchema = new Schema(
  {
    siteName: { type: String, default: "Himalayan Roots" },
    tagline: { type: String, default: "Pure & Organic Products" },
    siteDescription: { type: String, default: "" },
    logo: { type: String, default: "/logo.png" },
    favicon: { type: String, default: "/favicon.ico" },
    primaryColor: { type: String, default: "#166534" },
    secondaryColor: { type: String, default: "#65A30D" },

    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroButtonText: { type: String, default: "" },
    heroButtonLink: { type: String, default: "" },
    heroImage: { type: String, default: "" },

    // About Us Section
    aboutTitle: { type: String, default: "" },
    aboutSubtitle: { type: String, default: "" },
    aboutDescription: { type: String, default: "" },
    aboutImage: { type: String, default: "" },

    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    address: { type: String, default: "" },
    workingHours: { type: String, default: "" },

    facebookUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    youtubeUrl: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },

    announcementEnabled: { type: Boolean, default: true },
    announcementText: { type: String, default: "🚚 Free Shipping on Orders Above ₹999" },
    announcementButtonText: { type: String, default: "" },
    announcementLink: { type: String, default: "" },
    announcementBackground: { type: String, default: "#166534" },
    announcementTextColor: { type: String, default: "#ffffff" },

    footerAboutText: { type: String, default: "" },
    copyrightText: { type: String, default: "© 2026 Himalayan Roots. All rights reserved." },

    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: String, default: "" },

    faqs: [
      {
        question: { type: String, default: "" },
        answer: { type: String, default: "" },
      },
    ],
  },
  { 
    timestamps: true,
    strict: false
  }
);

const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;