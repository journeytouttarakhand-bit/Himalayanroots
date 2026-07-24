import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    //----------------------------------
    // General
    //----------------------------------

    siteName: {
      type: String,
      default: "Himalayan Roots",
    },

    tagline: {
      type: String,
      default: "Pure Taste of Uttarakhand",
    },

    logo: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    //----------------------------------
    // Hero Section
    //----------------------------------

    heroTitle: {
      type: String,
      default:
        "Authentic Himalayan Products",
    },

    heroSubtitle: {
      type: String,
      default:
        "Directly sourced from the farmers of Uttarakhand.",
    },

    heroButtonText: {
      type: String,
      default: "Shop Now",
    },

    heroButtonLink: {
      type: String,
      default: "/products",
    },

    heroImage: {
      type: String,
      default: "",
    },

    //----------------------------------
    // Announcement Bar
    //----------------------------------

    announcementEnabled: {
      type: Boolean,
      default: true,
    },

    announcementText: {
      type: String,
      default:
        "🚚 Free Shipping on Orders Above ₹999",
    },

    announcementBackground: {
      type: String,
      default: "#14532d",
    },

    announcementTextColor: {
      type: String,
      default: "#ffffff",
    },

    announcementLink: {
      type: String,
      default: "",
    },

    announcementButtonText: {
      type: String,
      default: "",
    },

    //----------------------------------
    // Theme
    //----------------------------------

    primaryColor: {
      type: String,
      default: "#166534",
    },

    secondaryColor: {
      type: String,
      default: "#15803d",
    },

    fontFamily: {
      type: String,
      default: "Inter",
    },

    //----------------------------------
    // Contact
    //----------------------------------

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },
        address: {
      type: String,
      default: "",
    },

    //----------------------------------
    // Social Links
    //----------------------------------

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    //----------------------------------
    // Footer
    //----------------------------------

    footerDescription: {
      type: String,
      default:
        "Bringing authentic Himalayan products directly from Uttarakhand farmers to every home in India.",
    },

    copyrightText: {
      type: String,
      default:
        "© Himalayan Roots. All Rights Reserved.",
    },

    //----------------------------------
    // SEO
    //----------------------------------

    metaTitle: {
      type: String,
      default: "Himalayan Roots",
    },

    metaDescription: {
      type: String,
      default:
        "Buy authentic Himalayan products directly sourced from Uttarakhand farmers.",
    },

    metaKeywords: {
      type: String,
      default:
        "Himalayan Roots, Uttarakhand Products, Organic, Natural, Honey, Millets",
    },

    //----------------------------------
    // Maintenance
    //----------------------------------

    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    maintenanceMessage: {
      type: String,
      default:
        "We are currently updating our website. Please check back soon.",
    },
  },
  {
    timestamps: true,
  }
);

export default
  models.SiteSettings ||
  model(
    "SiteSettings",
    SiteSettingsSchema
  );
    