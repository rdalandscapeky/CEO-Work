import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: `We serve ${siteConfig.serviceArea}. If you're just outside that area, reach out — we may still be able to help.`,
  },
  {
    question: "How do I get a quote?",
    answer:
      "Use the instant quote tool above to upload a few photos and get an estimate range in minutes, or call/text us directly. Final pricing is always confirmed on-site before work starts.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. RDA Landscape is a licensed LLC and we carry liability insurance, so you're covered on every job we do.",
  },
  {
    question: "Do you require a contract for lawn maintenance or snow removal?",
    answer:
      "No — we don't require a contract for anything. Book what you need, when you need it.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "[NEEDED FROM RYLAND] List accepted payment methods (cash, check, card, etc.).",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes — photo-based estimates through the instant quote tool are free, with no obligation. We'll confirm final pricing on-site.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
