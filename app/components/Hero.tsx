import HeroContent from "./HeroContent";
import getSiteSettings from "@/lib/getSiteSettings";

export default async function Hero() {
  const settings = await getSiteSettings();

  return (
    <HeroContent
      heroImage={
        settings.heroImage ||
        "/images/hero/hero-bg.jpg"
      }
      heroTitle={
        settings.heroTitle ||
        "Taste the Real Himalayas at Your Home"
      }
      heroSubtitle={
        settings.heroSubtitle ||
        "Authentic products directly sourced from the farmers of Uttarakhand. No Chemicals. No Preservatives. Only Pure Himalayan Goodness."
      }
      heroButtonText={
        settings.heroButtonText ||
        "Shop Now"
      }
      heroButtonLink={
        settings.heroButtonLink ||
        "/products"
      }
      whatsappLink={
        settings.whatsapp ||
        "https://wa.me/917895943324"
      }
    />
  );
}