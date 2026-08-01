"use client";

import CMSHeader from "@/app/components/cms/CMSHeader";
import CMSCard from "@/app/components/cms/CMSCard";

import {
  Palette,
  Home,
  Phone,
  Globe,
  Megaphone,
  LayoutTemplate,
  Search,
  CircleHelp,
  Settings,
  BookOpen,
} from "lucide-react";

export default function CMSDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <CMSHeader
        title="Content Management System"
        description="Manage your entire Himalayan Roots website from one place. Update branding, homepage, SEO, contact details, announcements and much more without touching any code."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <CMSCard
          title="Blog Manager"
          description="Create, edit, delete blog articles and upload feature images for mountain stories and recipes."
          href="/admin/cms/blog"
          color="hover:border-emerald-600"
          icon={<BookOpen className="h-8 w-8 text-emerald-700" strokeWidth={2} />}
        />

        <CMSCard
          title="Appearance"
          description="Manage logo, favicon, theme colors, fonts, border radius and complete website branding."
          href="/admin/cms/appearance"
          color="hover:border-green-500"
          icon={<Palette className="h-8 w-8 text-green-700" strokeWidth={2} />}
        />

        <CMSCard
          title="Homepage"
          description="Customize hero banner, featured products, categories, testimonials and homepage sections."
          href="/admin/cms/homepage"
          color="hover:border-blue-500"
          icon={<Home className="h-8 w-8 text-blue-700" strokeWidth={2} />}
        />

        <CMSCard
          title="Contact"
          description="Update contact number, email address, office location and customer support details."
          href="/admin/cms/contact"
          color="hover:border-purple-500"
          icon={<Phone className="h-8 w-8 text-purple-700" strokeWidth={2} />}
        />

        <CMSCard
          title="Social Media"
          description="Manage Facebook, Instagram, YouTube, X (Twitter), WhatsApp and other social media links."
          href="/admin/cms/social"
          color="hover:border-pink-500"
          icon={<Globe className="h-8 w-8 text-pink-700" strokeWidth={2} />}
        />

        <CMSCard
          title="Announcement Bar"
          description="Create announcement messages, promotional offers and top notification bars for visitors."
          href="/admin/cms/announcement"
          color="hover:border-orange-500"
          icon={<Megaphone className="h-8 w-8 text-orange-700" strokeWidth={2} />}
        />

        <CMSCard
          title="Footer"
          description="Manage footer content, company information, copyright text and footer navigation links."
          href="/admin/cms/footer"
          color="hover:border-cyan-500"
          icon={<LayoutTemplate className="h-8 w-8 text-cyan-700" strokeWidth={2} />}
        />

        <CMSCard
          title="SEO"
          description="Manage meta title, meta description, keywords, Open Graph image and other SEO settings."
          href="/admin/cms/seo"
          color="hover:border-emerald-500"
          icon={<Search className="h-8 w-8 text-emerald-700" strokeWidth={2} />}
        />

        <CMSCard
          title="FAQ"
          description="Create and manage frequently asked questions that appear across your website."
          href="/admin/cms/faq"
          color="hover:border-yellow-500"
          icon={<CircleHelp className="h-8 w-8 text-yellow-700" strokeWidth={2} />}
        />

        <CMSCard
          title="General Settings"
          description="Configure site name, tagline, business information and global website settings."
          href="/admin/cms/general"
          color="hover:border-gray-500"
          icon={<Settings className="h-8 w-8 text-gray-700" strokeWidth={2} />}
        />
      </div>
    </div>
  );
}