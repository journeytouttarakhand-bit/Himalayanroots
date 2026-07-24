"use client";

import { useEffect, useState } from "react";

import SettingsImageUploader from "@/app/components/admin/SettingsImageUploader";

export default function SettingsPage() {

  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({

    //----------------------------------
    // General
    //----------------------------------

    siteName: "",

    tagline: "",

    logo: "",

    favicon: "",

    //----------------------------------
    // Hero
    //----------------------------------

    heroTitle: "",

    heroSubtitle: "",

    heroButtonText: "",

    heroButtonLink: "",

    heroImage: "",

    //----------------------------------
    // Announcement Bar
    //----------------------------------

    announcementEnabled: true,

    announcementText: "",

    announcementBackground: "#14532d",

    announcementTextColor: "#ffffff",

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
    // Social
    //----------------------------------

    facebook: "",

    instagram: "",

    youtube: "",

    whatsapp: "",

    //----------------------------------
    // Footer
    //----------------------------------

    footerDescription: "",

    copyrightText: "",

    //----------------------------------
    // SEO
    //----------------------------------

    metaTitle: "",

    metaDescription: "",

    metaKeywords: "",

    //----------------------------------
    // Maintenance
    //----------------------------------

    maintenanceMode: false,

    maintenanceMessage: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {

    try {

      const res = await fetch("/api/settings");

      const data = await res.json();

      if (data.success) {
        setSettings(data.settings);
      }

    } catch (error) {

      console.error(error);

    }

  }

  async function saveSettings() {

    setLoading(true);

    try {

      const res = await fetch("/api/settings", {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(settings),

      });

      const data = await res.json();

      if (data.success) {
        alert("Settings Saved Successfully");
      } else {
        alert("Failed to Save Settings");
      }

    } catch (error) {

      console.error(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">

      <div>

        <h1 className="text-4xl font-bold">
          Website Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your website from one place.
        </p>

      </div>

      {/* ================================== */}
      {/* General Settings */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          General Settings
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Website Name
            </label>

            <input
              type="text"
              value={settings.siteName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  siteName: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Tagline
            </label>

            <input
              type="text"
              value={settings.tagline}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  tagline: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

        </div>

      </div>
      {/* ================================== */}
      {/* Hero Settings */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Hero Section
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium">
              Hero Title
            </label>

            <input
              type="text"
              value={settings.heroTitle}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroTitle: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Hero Subtitle
            </label>

            <textarea
              rows={4}
              value={settings.heroSubtitle}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroSubtitle: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Button Text
              </label>

              <input
                type="text"
                value={settings.heroButtonText}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    heroButtonText: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Button Link
              </label>

              <input
                type="text"
                value={settings.heroButtonLink}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    heroButtonLink: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />

            </div>

          </div>

          <SettingsImageUploader
            label="Hero Image"
            value={settings.heroImage}
            onChange={(url) =>
              setSettings({
                ...settings,
                heroImage: url,
              })
            }
          />

        </div>

      </div>

      {/* ================================== */}
      {/* Announcement Bar */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Announcement Bar
        </h2>

        <div className="space-y-6">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={settings.announcementEnabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementEnabled: e.target.checked,
                })
              }
            />

            <span className="font-medium">
              Enable Announcement Bar
            </span>

          </label>

          <div>

            <label className="mb-2 block font-medium">
              Announcement Text
            </label>

            <input
              type="text"
              value={settings.announcementText}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementText: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Background Color
              </label>

              <input
                type="color"
                value={settings.announcementBackground}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBackground: e.target.value,
                  })
                }
                className="h-12 w-full rounded-lg border"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Text Color
              </label>

              <input
                type="color"
                value={settings.announcementTextColor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementTextColor: e.target.value,
                  })
                }
                className="h-12 w-full rounded-lg border"
              />

            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>

              <label className="mb-2 block font-medium">
                Button Text
              </label>

              <input
                type="text"
                value={settings.announcementButtonText}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementButtonText: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
                placeholder="Shop Now"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Button Link
              </label>

              <input
                type="text"
                value={settings.announcementLink}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementLink: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
                placeholder="/products"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ================================== */}
      {/* Theme Settings */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Theme Settings
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <label className="mb-2 block font-medium">
              Primary Color
            </label>

            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  primaryColor: e.target.value,
                })
              }
              className="h-12 w-full rounded-lg border"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Secondary Color
            </label>

            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  secondaryColor: e.target.value,
                })
              }
              className="h-12 w-full rounded-lg border"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Font Family
            </label>

            <input
              type="text"
              value={settings.fontFamily}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  fontFamily: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

        </div>

      </div>

      {/* ================================== */}
      {/* Contact Settings */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Contact Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Phone Number
            </label>

            <input
              type="text"
              value={settings.phone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  email: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

        </div>

        <div className="mt-6">
          <label className="mb-2 block font-medium">
            Address
          </label>

          <textarea
            rows={3}
            value={settings.address}
            onChange={(e) =>
              setSettings({
                ...settings,
                address: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

      </div>

      {/* ================================== */}
      {/* Social Links */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Social Media
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Facebook URL
            </label>

            <input
              type="text"
              value={settings.facebook}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  facebook: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Instagram URL
            </label>

            <input
              type="text"
              value={settings.instagram}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  instagram: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              YouTube URL
            </label>

            <input
              type="text"
              value={settings.youtube}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  youtube: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              WhatsApp URL
            </label>

            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  whatsapp: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

        </div>

      </div>

      {/* ================================== */}
      {/* Footer Settings */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Footer Settings
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium">
              Footer Description
            </label>

            <textarea
              rows={4}
              value={settings.footerDescription}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  footerDescription: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>
          <div>

            <label className="mb-2 block font-medium">
              Copyright Text
            </label>

            <input
              type="text"
              value={settings.copyrightText}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  copyrightText: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />

          </div>

        </div>

      </div>

      {/* ================================== */}
      {/* SEO */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          SEO Settings
        </h2>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Meta Title"
            value={settings.metaTitle}
            onChange={(e) =>
              setSettings({
                ...settings,
                metaTitle: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

          <textarea
            rows={4}
            placeholder="Meta Description"
            value={settings.metaDescription}
            onChange={(e) =>
              setSettings({
                ...settings,
                metaDescription: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Meta Keywords"
            value={settings.metaKeywords}
            onChange={(e) =>
              setSettings({
                ...settings,
                metaKeywords: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

      </div>

      {/* ================================== */}
      {/* Maintenance */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Maintenance Mode
        </h2>

        <div className="space-y-6">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maintenanceMode: e.target.checked,
                })
              }
            />

            <span className="font-medium">
              Enable Maintenance Mode
            </span>

          </label>

          <textarea
            rows={4}
            value={settings.maintenanceMessage}
            onChange={(e) =>
              setSettings({
                ...settings,
                maintenanceMessage: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Maintenance Message"
          />

        </div>

      </div>
      {/* ================================== */}
      {/* Logo & Images */}
      {/* ================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Website Images
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">

          <SettingsImageUploader
            label="Website Logo"
            value={settings.logo}
            onChange={(url) =>
              setSettings({
                ...settings,
                logo: url,
              })
            }
          />

          <SettingsImageUploader
            label="Website Favicon"
            value={settings.favicon}
            onChange={(url) =>
              setSettings({
                ...settings,
                favicon: url,
              })
            }
          />

        </div>

      </div>

      {/* ================================== */}
      {/* Save Button */}
      {/* ================================== */}

      <div className="flex justify-end">

        <button
          type="button"
          onClick={saveSettings}
          disabled={loading}
          className="rounded-xl bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>

      </div>

    </div>
  );
}