import { siteConfig } from "@/lib/site-config";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    email: siteConfig.email,
    url: siteConfig.siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.serviceArea,
    },
    sameAs: [siteConfig.instagramUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
