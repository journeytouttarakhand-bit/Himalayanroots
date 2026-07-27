import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  tag: string;
  image: string;
  content: string;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tag: { type: String, default: "General" },
    image: { type: String, default: "" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
export default Blog;