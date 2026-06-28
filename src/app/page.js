import HeroSection from "@/components/homepage/Banner";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import PopularCategories from "@/components/homepage/PopularCategories";
import SuccessStories from "@/components/homepage/SuccessStories";
import SustainabilitySection from "@/components/homepage/SustainabilitySection";
import TrustedSellers from "@/components/homepage/TrustedSellers";

import Image from "next/image";

export default function Home() {
  return (
    <div>

      <HeroSection />
      <FeaturedProducts />
      <PopularCategories />
      <SuccessStories />
      <SustainabilitySection />
      <TrustedSellers />
    </div>
  );
}
