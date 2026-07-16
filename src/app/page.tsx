import { FAQ } from "@/components/section/FAQ";
import { FeaturedListings } from "@/components/section/FeaturedListing";
import { Hero } from "@/components/section/Hero";

import { HowItWorks } from "@/components/section/HowItWorks.";
import { Newsletter } from "@/components/section/Newsletter";
import { Stats } from "@/components/section/Stats";
import { Testimonials } from "@/components/section/Testimonials";
import { Categories } from "@/components/sections/Categories";
import { Listing, ListingsResponse } from "@/types/listing";

async function getPreviewListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/listings?sort=rating&limit=2`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    const data: ListingsResponse = await res.json();
    return data.items;
  } catch {
    return [];
  }
}

export default async function Home() {
  const previewListings = await getPreviewListings();
  return (
    <>
      <Hero previewListings={previewListings}></Hero>
      <Categories></Categories>
      <FeaturedListings></FeaturedListings>
      <HowItWorks></HowItWorks>
      <Stats></Stats>
      <Testimonials></Testimonials>
      <Newsletter></Newsletter>
      <FAQ></FAQ>
    </>
  );
}
