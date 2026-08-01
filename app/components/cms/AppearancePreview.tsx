"use client";

import Image from "next/image";

interface AppearancePreviewProps {
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function AppearancePreview({
  logo,
  favicon,
  primaryColor,
  secondaryColor,
}: AppearancePreviewProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-green-800">
        Live Preview
      </h2>

      <div className="overflow-hidden rounded-2xl border">

        {/* Header Preview */}

        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            backgroundColor: primaryColor,
          }}
        >

          <div className="flex items-center gap-4">

            {logo ? (
              <Image
                src={logo}
                alt="Logo"
                width={55}
                height={55}
                className="rounded-lg bg-white p-1 object-contain"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-xs text-gray-500">
                Logo
              </div>
            )}

            <div>

              <h3 className="text-lg font-bold text-white">
                Himalayan Roots
              </h3>

              <p className="text-sm text-green-100">
                Pure Taste of Uttarakhand
              </p>

            </div>

          </div>

          {favicon ? (
            <Image
              src={favicon}
              alt="Favicon"
              width={30}
              height={30}
              className="rounded bg-white p-1 object-contain"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-[10px] text-gray-500">
              Icon
            </div>
          )}

        </div>

        {/* Hero */}

        <div className="space-y-5 p-8">

          <h2
            className="text-3xl font-bold"
            style={{
              color: primaryColor,
            }}
          >
            Welcome to Himalayan Roots
          </h2>

          <p className="text-gray-600">
            Authentic Himalayan Products directly from
            Uttarakhand farmers.
          </p>

          <div className="flex flex-wrap gap-4">

            <button
              className="rounded-xl px-6 py-3 font-semibold text-white"
              style={{
                backgroundColor: primaryColor,
              }}
            >
              Shop Now
            </button>

            <button
              className="rounded-xl px-6 py-3 font-semibold text-white"
              style={{
                backgroundColor: secondaryColor,
              }}
            >
              Learn More
            </button>

          </div>

        </div>

        {/* Sample Card */}

        <div className="border-t bg-gray-50 p-6">

          <div className="rounded-xl border bg-white p-5 shadow-sm">

            <div
              className="mb-4 h-3 w-28 rounded-full"
              style={{
                backgroundColor: primaryColor,
              }}
            />

            <div className="space-y-2">

              <div className="h-3 w-full rounded bg-gray-200" />

              <div className="h-3 w-4/5 rounded bg-gray-200" />

              <div className="h-3 w-2/3 rounded bg-gray-200" />

            </div>

            <button
              className="mt-5 rounded-lg px-5 py-2 text-white"
              style={{
                backgroundColor: secondaryColor,
              }}
            >
              Sample Button
            </button>

          </div>

        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="rounded-xl border p-4">

          <p className="mb-2 text-sm font-semibold text-gray-500">
            Primary Color
          </p>

          <div className="flex items-center gap-3">

            <div
              className="h-10 w-10 rounded-lg border"
              style={{
                backgroundColor: primaryColor,
              }}
            />

            <span className="font-medium">
              {primaryColor}
            </span>

          </div>

        </div>

        <div className="rounded-xl border p-4">

          <p className="mb-2 text-sm font-semibold text-gray-500">
            Secondary Color
          </p>

          <div className="flex items-center gap-3">

            <div
              className="h-10 w-10 rounded-lg border"
              style={{
                backgroundColor: secondaryColor,
              }}
            />

            <span className="font-medium">
              {secondaryColor}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}