import Link from "next/link";
import Image from "next/image";

import getSiteSettings from "@/lib/getSiteSettings";

export default async function MaintenancePage() {

  const settings = await getSiteSettings();

  return (

    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-700 px-6">

      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}

        <div className="border-b bg-green-900 px-10 py-10 text-center text-white">

          {settings.logo ? (

            <Image
              src={settings.logo}
              alt={settings.siteName}
              width={90}
              height={90}
              className="mx-auto mb-5 rounded-full border-4 border-white object-cover shadow-lg"
              priority
            />

          ) : (

            <Image
              src="/logo.png"
              alt="Himalayan Roots"
              width={90}
              height={90}
              className="mx-auto mb-5 rounded-full border-4 border-white object-cover shadow-lg"
              priority
            />

          )}

          <h1 className="text-4xl font-bold">

            {settings.siteName}

          </h1>

          <p className="mt-3 text-lg text-green-100">

            {settings.tagline}

          </p>

        </div>

        {/* ================================= */}
        {/* Body */}
        {/* ================================= */}

        <div className="px-10 py-12 text-center">

          <div className="mb-8 text-7xl animate-bounce">

            🚧

          </div>

          <h2 className="mb-5 text-4xl font-bold text-gray-800">

            Website Under Maintenance

          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">

            {settings.maintenanceMessage ||
              "We are currently improving our website to serve you better. Please visit again shortly."}

          </p>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">

              <div className="mb-3 text-4xl">
                📞
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Call Us
              </h3>

              <p className="text-gray-600">
                {settings.phone || "+91 XXXXX XXXXX"}
              </p>

            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">

              <div className="mb-3 text-4xl">
                ✉️
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Email
              </h3>

              <p className="break-all text-gray-600">
                {settings.email || "support@himalayanroots.com"}
              </p>

            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">

              <div className="mb-3 text-4xl">
                📍
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Address
              </h3>

              <p className="text-gray-600">
                {settings.address || "Uttarakhand, India"}
              </p>

            </div>

          </div>

          <div className="mt-12">

            <Link
              href="/"
              className="inline-flex rounded-xl bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Refresh Website
            </Link>

          </div>

        </div>
                {/* ================================= */}
        {/* Footer */}
        {/* ================================= */}

        <div className="border-t bg-gray-50 px-8 py-6 text-center">

          <p className="text-sm text-gray-600">

            Thank you for your patience. We'll be back online soon.

          </p>

          <p className="mt-3 text-sm font-medium text-green-700">

            © {new Date().getFullYear()}{" "}
            {settings.siteName}. All Rights Reserved.

          </p>

        </div>

      </div>

    </main>

  );

}