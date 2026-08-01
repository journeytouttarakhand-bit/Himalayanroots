"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminBlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("Health & Wellness");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
    } catch (err) {
      console.error(err);
    }
  }

  // Cloudinary Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url || data.secure_url) {
        setImage(data.url || data.secure_url);
        alert("Image uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required.");

    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { id: editingId, title, tag, image, content } : { title, tag, image, content };

    try {
      const res = await fetch("/api/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert(editingId ? "Blog updated!" : "Blog published!");
        resetForm();
        fetchBlogs();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setTag(blog.tag);
    setImage(blog.image);
    setContent(blog.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("Blog deleted!");
        fetchBlogs();
      }
    } catch (err) {
      alert("Error deleting blog.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setTag("Health & Wellness");
    setImage("");
    setContent("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold cursor-pointer"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">📝 Blog Manager CMS</h1>
      </div>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-green-900">
          {editingId ? "✏️ Edit Blog Article" : "➕ Add New Blog Article"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Blog Title</label>
            <input
              type="text"
              className="w-full border rounded-xl p-3 text-sm"
              placeholder="e.g. Benefits of Pure A2 Desi Ghee"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Category / Tag</label>
            <select
              className="w-full border rounded-xl p-3 text-sm bg-white"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Organic Farming">Organic Farming</option>
              <option value="Pahadi Recipes">Pahadi Recipes</option>
              <option value="Product Guide">Product Guide</option>
            </select>
          </div>
        </div>

        {/* Upload Image Section */}
        <div>
          <label className="block text-sm font-semibold mb-2">Feature Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-green-800 text-white font-bold text-xs px-4 py-3 rounded-xl hover:bg-green-900 transition">
              {uploading ? "Uploading..." : "📁 Upload Image"}
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
            </label>
            <input
              type="text"
              className="flex-1 border rounded-xl p-3 text-sm"
              placeholder="Image Cloudinary URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          {image && (
            <img src={image} alt="Preview" className="mt-3 h-32 w-48 object-cover rounded-xl border" />
          )}
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-sm font-semibold mb-1">Blog Content (Story / Article)</label>
          <textarea
            rows={6}
            className="w-full border rounded-xl p-3 text-sm"
            placeholder="Write your article here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-900 transition cursor-pointer"
          >
            {loading ? "Saving..." : editingId ? "Update Article" : "Publish Article"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Blogs List */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">📚 All Published Blogs ({blogs.length})</h2>

        <div className="divide-y">
          {blogs.map((b) => (
            <div key={b._id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {b.image && <img src={b.image} alt={b.title} className="h-16 w-16 rounded-xl object-cover" />}
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{b.title}</h3>
                  <span className="text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded font-semibold">{b.tag}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-lg text-xs hover:bg-blue-100 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="px-3 py-1.5 bg-red-50 text-red-700 font-bold rounded-lg text-xs hover:bg-red-100 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}