import Link from "next/link";
import getSiteSettings from "@/lib/getSiteSettings";

export default async function About() {
  const settings = await getSiteSettings();

  const title = settings.aboutTitle || "From the Heart of the Himalayas to Your Family";
  const description =
    settings.aboutDescription ||
    "Himalayan Roots brings authentic and natural products directly from Uttarakhand to your home.";
  const image = settings.aboutImage || "/images/about.jpg";

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* Left: Dynamic Image (Fixed Ratio & No Face Cropping) */}
        <div className="md:col-span-5 w-full md:sticky md:top-28">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white max-h-[550px] sm:max-h-[600px]">
            <img
              src={image}
              alt={title}
              className="w-full h-full max-h-[550px] sm:max-h-[600px] object-cover object-top hover:scale-102 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right: Dynamic Text Content */}
        <div className="md:col-span-7 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 leading-tight">
            {title}
          </h2>

          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg space-y-4">
            {description}
          </div>

          <div className="pt-4">
            <Link href="/about">
              <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md transition active:scale-95 cursor-pointer">
                Read More
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}