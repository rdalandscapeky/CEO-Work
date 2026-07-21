import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        Louisville, KY &amp; surrounding counties
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        RDA Landscape
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        Landscaping · Lawn Maintenance · Snow Removal — site under
        construction. Check back soon.
      </p>
      <Button size="lg" asChild>
        <a href="tel:5028812021">Call (502) 881-2021</a>
      </Button>
    </div>
  );
}
