import connectDB from "@/lib/mongodb";

import SiteSettings from "@/database/SiteSettings";

export default async function getSiteSettings() {
  try {
    await connectDB();

    let settings = await SiteSettings.findOne().lean();

    if (!settings) {
      settings = await SiteSettings.create({});
      settings = await SiteSettings.findOne().lean();
    }

    return JSON.parse(
      JSON.stringify(settings)
    );

  } catch (error) {

    console.error(
      "Get Site Settings Error:",
      error
    );

    return {

      //----------------------------------
      // General
      //----------------------------------

      siteName: "Himalayan Roots",

      tagline: "Pure Taste of Uttarakhand",

      logo: "",

      favicon: "",

      //----------------------------------
      // Hero
      //----------------------------------

      heroTitle:
        "Authentic Himalayan Products",

      heroSubtitle:
        "Directly sourced from the farmers of Uttarakhand.",

      heroButtonText: "Shop Now",

      heroButtonLink: "/products",

      heroImage: "",

      //----------------------------------
      // Announcement Bar
      //----------------------------------

      announcementEnabled: true,

      announcementText:
        "🚚 Free Shipping on Orders Above ₹999",

      announcementBackground:
        "#14532d",

      announcementTextColor:
        "#ffffff",

      announcementLink: "",

      announcementButtonText: "",

      //----------------------------------
      // Theme
      //----------------------------------

      primaryColor: "#166534",

      secondaryColor: "#15803d",

      fontFamily: "Inter",

      //----------------------------------
      // Contact
      //----------------------------------

      phone: "",

      email: "",

      address: "",
            //----------------------------------
      // Social Links
      //----------------------------------

      facebook: "",

      instagram: "",

      youtube: "",

      whatsapp: "",

      //----------------------------------
      // Footer
      //----------------------------------

      footerDescription:
        "Bringing authentic Himalayan products directly from Uttarakhand farmers to every home in India.",

      copyrightText:
        "© Himalayan Roots. All Rights Reserved.",

      //----------------------------------
      // SEO
      //----------------------------------

      metaTitle: "Himalayan Roots",

      metaDescription:
        "Buy authentic Himalayan products directly sourced from Uttarakhand farmers.",

      metaKeywords:
        "Himalayan Roots, Uttarakhand Products",

      //----------------------------------
      // Maintenance
      //----------------------------------

      maintenanceMode: false,

      maintenanceMessage:
        "Website is under maintenance.",
    };
  }
}