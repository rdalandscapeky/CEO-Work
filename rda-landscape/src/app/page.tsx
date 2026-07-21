import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Gallery } from "@/components/sections/gallery";
import { About } from "@/components/sections/about";
import { Reviews } from "@/components/sections/reviews";
import { FAQ } from "@/components/sections/faq";
import { QuoteTool } from "@/components/sections/quote-tool";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Reviews />
      <FAQ />
      <QuoteTool />
    </>
  );
}
