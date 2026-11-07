/**
 * SAGAR DIGITAL MARKETING - Brand Configuration
 * Centralized configuration file to manage brand details, contact information,
 * social media links, and global settings across all pages without altering markup.
 */

const BRAND_CONFIG = {
  name: "SAGAR DIGITAL MARKETING",
  shortName: "SAGAR",
  tagline: "From Small Business to Recognizable Brand.",
  altTagline: "Build Your Presence. Grow Your Brand.",
  description: "We help small businesses build a strong identity, create engaging content and grow their online presence through creative digital marketing.",
  
  // Contact details (Configurable placeholders)
  contact: {
    email: "hello@sagardigitalmarketing.com",
    emailDisplay: "hello@sagardigitalmarketing.com",
    phone: "+91 70326 19866",
    phoneDisplay: "+91 70326 19866",
    whatsappLink: "https://wa.me/917032619866?text=Hello%20Sagar%20Digital%20Marketing%2C%20I%20would%20like%20to%20discuss%20growing%20my%20business.",
    address: "Creative Hub & Studio, Metro City, India",
    addressDisplay: "Creative Hub & Studio, India (Consultations Worldwide)"
  },

  // Social Channels
  social: {
    instagram: "https://instagram.com/sagardigitalmarketing",
    instagramHandle: "@sagardigitalmarketing",
    whatsapp: "https://wa.me/917032619866",
    whatsappDisplay: "+91 70326 19866",
    linkedin: "https://linkedin.com/company/sagardigitalmarketing",
    youtube: "https://youtube.com/@sagardigitalmarketing",
    twitter: "https://twitter.com/sagarmarketing"
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "index.html" },
    { label: "Services", href: "services.html" },
    { label: "Our Work", href: "work.html" },
    { label: "About Us", href: "about.html" },
    { label: "Contact", href: "contact.html" }
  ],

  // Primary Services
  services: [
    {
      id: "social-media",
      number: "01",
      title: "Social Media Management",
      shortDescription: "Strategic content, aesthetic feeds, and active community engagement engineered to turn passive scrollers into devoted customers.",
      benefits: [
        "Consistent brand voice & high-engagement content calendars",
        "Reels & short-form video concepting & production guidance",
        "Proactive community management & organic reach expansion",
        "Monthly performance dashboards with transparent insights"
      ],
      slug: "services.html#social-media"
    },
    {
      id: "digital-advertising",
      number: "02",
      title: "Digital Advertising",
      shortDescription: "Laser-targeted Meta & Google Ad campaigns engineered for maximum return on ad spend (ROAS) and qualified customer acquisition.",
      benefits: [
        "High-converting ad creatives & persuasive ad copywriting",
        "Granular demographic, interest & retargeting audience funnels",
        "Conversion tracking setup & pixel health optimization",
        "Strict budget protection: zero wasted clicks, continuous testing"
      ],
      slug: "services.html#digital-advertising"
    },
    {
      id: "content-creation",
      number: "03",
      title: "Content Creation",
      shortDescription: "Compelling visual storytelling, high-retention video production, and impactful brand photography that commands attention.",
      benefits: [
        "Short-form viral video scripts & creative direction",
        "Editorial product & lifestyle graphic design",
        "Brand storytelling that builds emotional connection",
        "Multi-platform format delivery optimized for mobile devices"
      ],
      slug: "services.html#content-creation"
    },
    {
      id: "brand-identity",
      number: "04",
      title: "Brand Identity & Development",
      shortDescription: "Complete brand transformations—from logos and color palettes to brand guidelines and packaging—giving small businesses an iconic presence.",
      benefits: [
        "Memorable logo marks & bespoke typographic identity",
        "Comprehensive brand style guides & color psychology",
        "Digital & physical collateral (menus, signage, cards, banners)",
        "Distinctive market positioning to outshine competitors"
      ],
      slug: "services.html#brand-identity"
    }
  ],

  // Process Steps
  process: [
    {
      step: "01",
      title: "Understand",
      subtitle: "Immersion & Audit",
      description: "We dive deep into your business DNA, target audience, local competitors, and current bottlenecks to uncover your true growth lever."
    },
    {
      step: "02",
      title: "Plan",
      subtitle: "Tailored Growth Blueprint",
      description: "No cookie-cutter packages. We build a personalized roadmap detailing creative angles, content themes, and targeted acquisition channels."
    },
    {
      step: "03",
      title: "Create",
      subtitle: "Design & Content Production",
      description: "Our creative team produces eye-catching visual assets, persuasive copy, and thumb-stopping video content crafted to stand out."
    },
    {
      step: "04",
      title: "Promote",
      subtitle: "Precision Launch & Distribution",
      description: "We deploy organic campaigns and targeted digital advertising to reach high-intent customers right in your geographical and demographic market."
    },
    {
      step: "05",
      title: "Improve",
      subtitle: "Refine, Iterate & Scale",
      description: "We obsess over real business numbers—leads, footfall, and revenue. We double down on winners and continually optimize your performance."
    }
  ],

  // Target Sectors
  sectors: [
    { name: "Retail & Local Stores", desc: "Drive footfall, build localized neighborhood buzz, and turn in-store shoppers into repeat digital fans.", icon: "shopping-bag" },
    { name: "Restaurants & Cafes", desc: "Sensory food content, viral reels, weekend reservation surges, and menu spotlight campaigns.", icon: "coffee" },
    { name: "Startups & Innovators", desc: "Establish immediate market credibility, launch minimum viable branding, and acquire your first 1,000 customers.", icon: "rocket" },
    { name: "Fashion & Lifestyle", desc: "Aesthetic editorial visual identity, lookbook campaigns, and social proof that positions you as a premium label.", icon: "sparkles" },
    { name: "Professional Services", desc: "High-trust lead generation, authority-building content, and professional positioning for clinics, consultants, and firms.", icon: "briefcase" }
  ]
};

// Global helper to populate brand elements if marked with data-brand attributes
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-brand='name']").forEach(el => el.textContent = BRAND_CONFIG.name);
  document.querySelectorAll("[data-brand='tagline']").forEach(el => el.textContent = BRAND_CONFIG.tagline);
  document.querySelectorAll("[data-brand='altTagline']").forEach(el => el.textContent = BRAND_CONFIG.altTagline);
  document.querySelectorAll("[data-brand='email']").forEach(el => {
    el.textContent = BRAND_CONFIG.contact.emailDisplay;
    if (el.tagName === "A") el.setAttribute("href", `mailto:${BRAND_CONFIG.contact.email}`);
  });
  document.querySelectorAll("[data-brand='phone']").forEach(el => {
    el.textContent = BRAND_CONFIG.contact.phoneDisplay;
    if (el.tagName === "A") el.setAttribute("href", `tel:${BRAND_CONFIG.contact.phone}`);
  });
  document.querySelectorAll("[data-brand='whatsapp']").forEach(el => {
    if (el.tagName === "A") el.setAttribute("href", BRAND_CONFIG.contact.whatsappLink);
  });
});

