import { unstable_noStore as noStore } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import SiteSettings from "@/database/SiteSettings"; // 

export default async function getSiteSettings() {
  // Disable Next.js data caching so every request fetches fresh DB values
  noStore();

  try {
    await connectToDatabase();

    let settings = await SiteSettings.findOne().lean();

    if (!settings) {
      const newSettings = await SiteSettings.create({});
      settings = newSettings.toObject();
    }

    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("Get Site Settings Error:", error);

    // Default Fallbacks aligned with Database Schema
    return {
      // General & Appearance
      siteName: "Himalayan Roots",
      tagline: "Pure Taste of Uttarakhand",
      siteDescription: "Buy authentic Himalayan products directly sourced from Uttarakhand farmers.",
      logo: "/logo.png",
      favicon: "/favicon.ico",
      primaryColor: "#166534",
      secondaryColor: "#65A30D",
      textColor: "#1f2937",

      // Hero
      heroTitle: "Authentic Himalayan Products",
      heroSubtitle: "Directly sourced from the farmers of Uttarakhand.",
      heroButtonText: "Shop Now",
      heroButtonLink: "/products",
      heroImage: "/images/hero-bg.jpg",

      // 🌟 About Us Section Fallbacks
      aboutTitle: "About Himalayan Roots",
      aboutSubtitle: "Pure & Natural Products Directly from Uttarakhand",
      aboutDescription: "Himalayan Roots brings authentic and natural products directly from the farmers of Uttarakhand to homes across India.",
      aboutImage: "",

      // Announcement Bar
      announcementEnabled: true,
      announcementText: "🚚 Free Shipping on Orders Above ₹999",
      announcementBackground: "#166534",
      announcementTextColor: "#ffffff",
      announcementLink: "",
      announcementButtonText: "",

      // Contact
      contactPhone: "+91 XXXXX XXXXX",
      contactEmail: "support@himalayanroots.com",
      address: "Uttarakhand, India",
      workingHours: "Mon - Sat: 9:00 AM - 6:00 PM",

      // Social Links
      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      youtubeUrl: "",
      whatsappNumber: "",

      // Footer
      footerBackground: "#0f0e47",
      footerTextColor: "#ffffff",
      footerAboutText: "Bringing authentic Himalayan products directly from Uttarakhand farmers to every home in India.",
      copyrightText: "© Himalayan Roots. All Rights Reserved.",

      // SEO
      metaTitle: "Himalayan Roots",
      metaDescription: "Buy authentic Himalayan products directly sourced from Uttarakhand farmers.",
      keywords: "Himalayan Roots, Uttarakhand Products, Organic Ghee, Pure Honey",

      // Maintenance
      maintenanceMode: false,
      maintenanceMessage: "Website is under maintenance.",
    };
  }
}