"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LogoUploader from "@/app/components/cms/LogoUploader";
import FaviconUploader from "@/app/components/cms/FaviconUploader";
import ColorPicker from "@/app/components/cms/ColorPicker";
import AppearancePreview from "@/app/components/cms/AppearancePreview";
import SaveSettingsButton from "@/app/components/cms/SaveSettingsButton";
import CMSHeader from "@/app/components/cms/CMSHeader";

const THEME_PRESETS = [
  {
    name: "Himalayan Forest (Default)",
    primary: "#166534",
    secondary: "#65A30D",
    footerBg: "#0f3e21",
    footerText: "#ffffff",
  },
  {
    name: "Royal Navy & Lime",
    primary: "#0f0e47",
    secondary: "#80ef80",
    footerBg: "#09082f",
    footerText: "#ffffff",
  },
  {
    name: "Sunset Organic",
    primary: "#c2410c",
    secondary: "#f59e0b",
    footerBg: "#7c2d12",
    footerText: "#ffffff",
  },
  {
    name: "Dark Minimal",
    primary: "#18181b",
    secondary: "#10b981",
    footerBg: "#09090b",
    footerText: "#f4f4f5",
  },
];

export default function AppearancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);

  // Form State
  const [logo, setLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#166534");
  const [secondaryColor, setSecondaryColor] = useState("#65A30D");
  const [textColor, setTextColor] = useState("#1f2937");
  const [footerBackground, setFooterBackground] = useState("#0f0e47");
  const [footerTextColor, setFooterTextColor] = useState("#ffffff");
  const [footerAboutText, setFooterAboutText] = useState("");
  const [copyrightText, setCopyrightText] = useState("");

  // ➕ NEW: Font Family State
  const [fontFamily, setFontFamily] = useState("Inter");

  // Hero Section Settings States
  const [heroImage, setHeroImage] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  // 🌟 About Section Settings States
  const [aboutImage, setAboutImage] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");

  // ➕ Contact Information States
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [address, setAddress] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  // ➕ Social Media Links States
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      const data = await res.json();

      if (data.success && data.settings) {
        setLogo(data.settings.logo || "");
        setFavicon(data.settings.favicon || "");
        setPrimaryColor(data.settings.primaryColor || "#166534");
        setSecondaryColor(data.settings.secondaryColor || "#65A30D");
        setTextColor(data.settings.textColor || "#1f2937");
        setFooterBackground(data.settings.footerBackground || "#0f0e47");
        setFooterTextColor(data.settings.footerTextColor || "#ffffff");
        setFooterAboutText(data.settings.footerAboutText || "");
        setCopyrightText(data.settings.copyrightText || "");

        // ➕ Load Font
        setFontFamily(data.settings.fontFamily || "Inter");

        // Load Hero Settings
        setHeroImage(data.settings.heroImage || "");
        setHeroTitle(data.settings.heroTitle || "");
        setHeroSubtitle(data.settings.heroSubtitle || "");

        // 🌟 Load About Settings
        setAboutImage(data.settings.aboutImage || "");
        setAboutTitle(data.settings.aboutTitle || "");
        setAboutDescription(data.settings.aboutDescription || "");

        // ➕ Load Contact Information
        setContactPhone(data.settings.contactPhone || "");
        setContactEmail(data.settings.contactEmail || "");
        setAddress(data.settings.address || "");
        setWorkingHours(data.settings.workingHours || "");

        // ➕ Load Social Links
        setFacebookUrl(data.settings.facebookUrl || "");
        setInstagramUrl(data.settings.instagramUrl || "");
        setTwitterUrl(data.settings.twitterUrl || "");
        setYoutubeUrl(data.settings.youtubeUrl || "");
        setWhatsappNumber(data.settings.whatsappNumber || "");
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }

  // Cloudinary Hero Image Handler
  const handleCloudinaryHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHero(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url || data.secure_url) {
        setHeroImage(data.url || data.secure_url);
        alert("Hero Image uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      alert("Error uploading image.");
    } finally {
      setUploadingHero(false);
    }
  };

  // 🌟 Cloudinary About Image Handler
  const handleCloudinaryAboutUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAbout(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url || data.secure_url) {
        setAboutImage(data.url || data.secure_url);
        alert("About Section Image uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      alert("Error uploading image.");
    } finally {
      setUploadingAbout(false);
    }
  };

  const applyThemePreset = (preset: (typeof THEME_PRESETS)[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setFooterBackground(preset.footerBg);
    setFooterTextColor(preset.footerText);
  };

  async function saveSettings() {
    try {
      setLoading(true);

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logo,
          favicon,
          primaryColor,
          secondaryColor,
          textColor,
          footerBackground,
          footerTextColor,
          footerAboutText,
          copyrightText,
          fontFamily, // ➕ Save Font
          heroImage,
          heroTitle,
          heroSubtitle,
          // 🌟 Save About Settings
          aboutImage,
          aboutTitle,
          aboutDescription,
          // ➕ Save Contact Settings
          contactPhone,
          contactEmail,
          address,
          workingHours,
          // ➕ Save Social Settings
          facebookUrl,
          instagramUrl,
          twitterUrl,
          youtubeUrl,
          whatsappNumber,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Appearance settings saved successfully.");
        router.refresh();
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 cursor-pointer"
        >
          ← Back
        </button>

        <SaveSettingsButton loading={loading} onClick={saveSettings} />
      </div>

      <CMSHeader
        title="Appearance & Theme Settings"
        description="Customize logos, hero banner, fonts, about section, themes, contact info, social links, and footer."
      />

      {/* Quick Theme Presets */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">🎨 Quick Theme Presets</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {THEME_PRESETS.map((preset, index) => (
            <button
              key={index}
              type="button"
              onClick={() => applyThemePreset(preset)}
              className="group flex flex-col justify-between rounded-xl border p-4 text-left transition hover:border-green-600 hover:shadow-md cursor-pointer"
            >
              <span className="font-semibold text-sm text-gray-800">{preset.name}</span>
              <div className="mt-3 flex gap-2">
                <span className="h-6 w-6 rounded-full border shadow-inner" style={{ backgroundColor: preset.primary }} />
                <span className="h-6 w-6 rounded-full border shadow-inner" style={{ backgroundColor: preset.secondary }} />
                <span className="h-6 w-6 rounded-full border shadow-inner" style={{ backgroundColor: preset.footerBg }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Branding Section (Logo & Favicon) */}
      <div className="grid gap-8 lg:grid-cols-2">
        <LogoUploader value={logo} onChange={setLogo} />
        <FaviconUploader value={favicon} onChange={setFavicon} />
      </div>

      {/* HERO BANNER SECTION */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-gray-900">🖼️ Hero Banner Image Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Hero Image
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm shadow-md hover:bg-emerald-900 transition">
                <span>{uploadingHero ? "Uploading..." : "📁 Choose Hero Image"}</span>
                <input type="file" accept="image/*" onChange={handleCloudinaryHeroUpload} disabled={uploadingHero} className="hidden" />
              </label>
            </div>
            <input
              type="text"
              className="mt-3 w-full rounded-xl border p-3 text-sm text-gray-900"
              placeholder="Cloudinary URL"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
            />
          </div>

          {heroImage && (
            <div className="relative h-40 w-full max-w-md overflow-hidden rounded-2xl border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt="Hero Preview" className="h-full w-full object-cover" />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 pt-2 border-t">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Hero Heading</label>
              <input type="text" className="mt-1 w-full rounded-xl border p-3 text-sm" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Hero Subtitle</label>
              <input type="text" className="mt-1 w-full rounded-xl border p-3 text-sm" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 ABOUT SECTION IMAGE & CONTENT SETTINGS */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-gray-900">📖 About Us Section Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload About Us Image via Cloudinary
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm shadow-md hover:bg-emerald-900 transition">
                <span>{uploadingAbout ? "Uploading..." : "📁 Choose About Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCloudinaryAboutUpload}
                  disabled={uploadingAbout}
                  className="hidden"
                />
              </label>
            </div>

            <input
              type="text"
              className="mt-3 w-full rounded-xl border p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="https://res.cloudinary.com/.../about.jpg"
              value={aboutImage}
              onChange={(e) => setAboutImage(e.target.value)}
            />
          </div>

          {/* About Image Live Preview */}
          {aboutImage && (
            <div className="relative h-48 w-full max-w-md overflow-hidden rounded-2xl border shadow-inner bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aboutImage}
                alt="About Preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4 pt-2 border-t">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                About Title / Heading
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Our Himalayan Journey"
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                About Description Story
              </label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-xl border p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="We are committed to bringing fresh mountain harvests..."
                value={aboutDescription}
                onChange={(e) => setAboutDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ➕ CONTACT INFORMATION SECTION */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-gray-900">📞 Contact & Support Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="+91 9876543210"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Support Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="support@himalayanroots.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Working Hours</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Office / Store Address</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="Dehradun, Uttarakhand, India"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ➕ SOCIAL MEDIA LINKS SECTION */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-gray-900">🌐 Social Media Accounts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Facebook URL</label>
            <input
              type="url"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="https://facebook.com/yourpage"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Instagram URL</label>
            <input
              type="url"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="https://instagram.com/yourprofile"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Twitter (X) URL</label>
            <input
              type="url"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="https://twitter.com/yourhandle"
              value={twitterUrl}
              onChange={(e) => setTwitterUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">YouTube URL</label>
            <input
              type="url"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="https://youtube.com/@yourchannel"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700">WhatsApp Number (with Country Code)</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border p-3 text-sm"
              placeholder="+919876543210"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Colors & Typography Section (UPDATED WITH FONT DROPDOWN) */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-gray-900">🎨 Primary, Text Colors & Typography</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <ColorPicker label="Primary Brand Color" value={primaryColor} onChange={setPrimaryColor} />
          <ColorPicker label="Secondary Accent Color" value={secondaryColor} onChange={setSecondaryColor} />
          <ColorPicker label="Body Text Color" value={textColor} onChange={setTextColor} />
        </div>

        {/* ➕ FONT FAMILY DROPDOWN */}
        <div className="pt-4 border-t">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🔤 Website Font Family
          </label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full max-w-md rounded-xl border border-gray-300 p-3 text-sm font-medium text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <option value="Inter">Inter (Clean & Modern)</option>
            <option value="Poppins">Poppins (Friendly & Rounded)</option>
            <option value="Roboto">Roboto (Classic Sans)</option>
            <option value="Playfair Display">Playfair Display (Premium Serif)</option>
            <option value="Outfit">Outfit (Sleek & Bold)</option>
            <option value="Montserrat">Montserrat (Geometric)</option>
          </select>
          <p className="mt-1.5 text-xs text-gray-500">
            Select the primary font family for titles and body text across your website.
          </p>
        </div>
      </div>

      {/* Footer Settings Section */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-gray-900">🦶 Footer Settings</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ColorPicker label="Footer Background" value={footerBackground} onChange={setFooterBackground} />
          <ColorPicker label="Footer Text" value={footerTextColor} onChange={setFooterTextColor} />
        </div>
        <div className="space-y-4 pt-2 border-t">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Footer About Text</label>
            <textarea rows={3} className="mt-1 w-full rounded-xl border p-3 text-sm" value={footerAboutText} onChange={(e) => setFooterAboutText(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Copyright Text</label>
            <input type="text" className="mt-1 w-full rounded-xl border p-3 text-sm" value={copyrightText} onChange={(e) => setCopyrightText(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Live Preview Component */}
      <AppearancePreview logo={logo} favicon={favicon} primaryColor={primaryColor} secondaryColor={secondaryColor} />

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <SaveSettingsButton loading={loading} onClick={saveSettings} />
      </div>
    </div>
  );
}