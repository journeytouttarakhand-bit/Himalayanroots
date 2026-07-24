import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import SiteSettings from "@/database/SiteSettings";

// ===============================
// GET SETTINGS
// ===============================

export async function GET() {
  try {
    await connectDB();

    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    return NextResponse.json({
      success: true,
      settings,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch settings",
      },
      {
        status: 500,
      }
    );

  }
}

// ===============================
// UPDATE SETTINGS
// ===============================

export async function PUT(request: Request) {

  try {

    await connectDB();

    const body = await request.json();

    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    settings.siteName = body.siteName;
    settings.tagline = body.tagline;

    settings.logo = body.logo;
    settings.favicon = body.favicon;

    // Hero

    settings.heroTitle = body.heroTitle;
    settings.heroSubtitle = body.heroSubtitle;
    settings.heroButtonText = body.heroButtonText;
    settings.heroButtonLink = body.heroButtonLink;
    settings.heroImage = body.heroImage;

    // Announcement Bar

    settings.announcementEnabled =
      body.announcementEnabled;

    settings.announcementText =
      body.announcementText;

    settings.announcementBackground =
      body.announcementBackground;

    settings.announcementTextColor =
      body.announcementTextColor;

    settings.announcementButtonText =
      body.announcementButtonText;

    settings.announcementLink =
      body.announcementLink;

    // Theme

    settings.primaryColor =
      body.primaryColor;

    settings.secondaryColor =
      body.secondaryColor;

    settings.fontFamily =
      body.fontFamily;

    // Contact

    settings.phone = body.phone;
    settings.email = body.email;
    settings.address = body.address;

    // Social

    settings.facebook = body.facebook;
    settings.instagram = body.instagram;
    settings.youtube = body.youtube;
    settings.whatsapp = body.whatsapp;

    // Footer

    settings.footerDescription =
      body.footerDescription;

    settings.copyrightText =
      body.copyrightText;

    // SEO

    settings.metaTitle =
      body.metaTitle;

    settings.metaDescription =
      body.metaDescription;

    settings.metaKeywords =
      body.metaKeywords;

    // Maintenance

    settings.maintenanceMode =
      body.maintenanceMode;

    settings.maintenanceMessage =
      body.maintenanceMessage;

    await settings.save();

    return NextResponse.json({
      success: true,
      message: "Settings Updated Successfully",
      settings,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update settings",
      },
      {
        status: 500,
      }
    );

  }

}