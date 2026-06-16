// Single source of truth for site-wide metadata, used by layout metadata,
// sitemap, robots, JSON-LD structured data and the lead API.

// Set NEXT_PUBLIC_SITE_URL in your environment (e.g. https://aarohanainfratech.com)
// for production. Falls back to localhost in development.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const BUSINESS = {
  name: "Aarohana Infratech",
  legalName: "Aarohana Infratech",
  tagline: "The Future of Smart Living",
  description:
    "Aarohana Infratech designs intelligent touch panels and a connected home ecosystem. Control lights, fans, curtains and climate with a single, beautiful interface.",
  phone: "+91 97008 12526",
  phoneHref: "+919700812526",
  contactPerson: "Pradeep CMR",
  city: "Vijayawada",
  region: "Andhra Pradesh",
  country: "IN",
  // A representative image used for social-share previews.
  ogImage:
    "https://whitelion-assets.blr1.cdn.digitaloceanspaces.com/website/home/products/AirGlassBlack.png",
} as const;
