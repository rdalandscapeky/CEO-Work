import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-brand-ink px-6 py-32 text-center text-white">
        <p className="text-sm font-medium tracking-widest text-brand-gold-light uppercase">
          Louisville, KY &amp; surrounding counties
        </p>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          RDA Landscape
        </h1>
        <p className="max-w-xl text-lg text-white/70">
          Landscaping · Lawn Maintenance · Snow Removal — site under
          construction. Check back soon.
        </p>
        <Button
          size="lg"
          asChild
          className="bg-brand-gold text-brand-ink hover:bg-brand-gold-light"
        >
          <a href="tel:5028812021">Call (502) 881-2021</a>
        </Button>
      </section>
    </div>
  );
}
