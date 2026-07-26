import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import SiteSettings from "@/database/SiteSettings";

// GET Settings
export async function GET() {
  try {
    await connectToDatabase();
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings", error: error.message },
      { status: 500 }
    );
  }
}

// PUT / Update Settings
export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings({});
    }

    // Dynamic update for provided keys
    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) {
        (settings as any)[key] = body[key];
      }
    });

    await settings.save();

    // Instant Cache Invalidation: Isse CMS ke colors aur text changes turant live reflect honge
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error: any) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update settings", error: error.message },
      { status: 500 }
    );
  }
}