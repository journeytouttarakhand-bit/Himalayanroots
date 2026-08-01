import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/database/Blog";

// GET All Blogs
export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, blogs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error fetching blogs", error: error.message },
      { status: 500 }
    );
  }
}

// POST: Add New Blog
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newBlog = await Blog.create({ ...body, slug });

    revalidatePath("/blog");
    revalidatePath("/");

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error creating blog", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Edit Blog
export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, ...updateData } = body;

    if (updateData.title) {
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    revalidatePath("/blog");
    revalidatePath("/");

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error updating blog", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove Blog
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Blog.findByIdAndDelete(id);

    revalidatePath("/blog");
    revalidatePath("/");

    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error deleting blog", error: error.message },
      { status: 500 }
    );
  }
}