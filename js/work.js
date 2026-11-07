/**
 * SAGAR DIGITAL MARKETING - Our Work / Portfolio Logic
 * Category Filtering and Interactive Case Study Modal
 */

document.addEventListener("DOMContentLoaded", () => {
  initWorkFilters();
  initCaseStudyModal();
});

// Filter Portfolio Items by Category
function initWorkFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove("bg-[#141414]", "text-[#E87348]", "border-[#E87348]/40");
        b.classList.add("bg-[#0A0A0A]", "text-[#8A8A8A]", "border-white/[0.07]");
      });
      btn.classList.add("bg-[#141414]", "text-[#E87348]", "border-[#E87348]/40");
      btn.classList.remove("bg-[#0A0A0A]", "text-[#8A8A8A]", "border-white/[0.07]");

      // Filter cards
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === "all" || category === filter || category.includes(filter)) {
          card.classList.remove("hidden");
          card.classList.add("flex");
        } else {
          card.classList.add("hidden");
          card.classList.remove("flex");
        }
      });
    });
  });
}

// Case Study Data (Clean, Editorial, Zero Fabricated Reviews)
const CASE_STUDIES = {
  "artisan-roast": {
    title: "Artisan Roast & Co.",
    sector: "Specialty Coffee & Bakery",
    badge: "Conceptual Blueprint",
    category: "Branding & Viral Social",
    challenge: "A neighborhood artisan baker struggled to stand apart from commoditized high-street cafe chains and relied solely on organic walk-by foot traffic.",
    solution: "We conceptualized a grounded, artisan visual identity with earthy forest tones and warm kraft packaging. Developed a viral Reels series focusing on the 5:00 AM sourdough kneading process and precision latte art.",
    deliverables: ["Visual Identity & Logo Suite", "Menu & Takeaway Packaging", "12 High-Retention Instagram Reels", "Hyper-Local Radius Meta Ads"],
    outcome: "Engineered to drive weekend morning surges, establish a 10km regional destination reputation, and build a pre-order waitlist for weekly specialty pastry drops."
  },
  "kura-apparel": {
    title: "Kura Studio Apparel",
    sector: "Sustainable Contemporary Fashion",
    badge: "Conceptual Blueprint",
    category: "Lookbook & Digital Ads",
    challenge: "An independent fashion label had exceptional garment craft but struggled with online conversion due to generic phone photos and unfocused ad spend.",
    solution: "Designed an editorial aesthetic with minimalist typography and high-fashion lighting guidelines. Structured a 3-tier Meta Ad funnel: Top-of-funnel brand film, middle-of-funnel fit reviews, and bottom-of-funnel limited drop retargeting.",
    deliverables: ["Editorial Lookbook Layout", "Meta Ads Creative Pack (16 assets)", "E-Commerce Landing Page Directives", "Email Welcome Sequence"],
    outcome: "Engineered to increase average order value (AOV) by 35% through premium perception and reduce customer acquisition costs."
  },
  "apex-dental": {
    title: "Apex Dental Clinic",
    sector: "Boutique Healthcare",
    badge: "Conceptual Blueprint",
    category: "Local Authority & Ads",
    challenge: "Clinic suffered from low high-value cosmetic consultation bookings, with prospects perceiving dental treatments as intimidating and sterile.",
    solution: "Shifted positioning from clinical dentistry to 'Confidence & Smile Design'. Produced approachable 'Myth-Busting' short videos featuring the head doctor and designed clean, reassuring patient intake collateral.",
    deliverables: ["Authority Video Series Scripts", "Google Local Search Ad Architecture", "WhatsApp Booking Automated Funnel", "Print Waiting Room Lookbooks"],
    outcome: "Built to dominate high-intent local search queries like 'Smile Makeover near me' and convert inquiries directly into confirmed consultations."
  },
  "nomad-street": {
    title: "Nomad Street Kitchen",
    sector: "Gourmet Street Food",
    badge: "Conceptual Blueprint",
    category: "Content & Footfall",
    challenge: "Off-the-beaten-path culinary spot needed consistent weekday lunch traffic and weekend late-night orders.",
    solution: "High-contrast street branding combined with hyper-stimulating sizzle and flame-grill food reels targeting university students and young professionals within a 5km radius.",
    deliverables: ["Logo & Neon Signboard Concept", "Viral Short Video Templates", "Interactive QR Code Digital Menu", "Food Creator Collaboration Blueprint"],
    outcome: "Structured to drive an immediate 40% jump in off-peak weekday lunch traffic through targeted flash-deal reels."
  },
  "luxe-cleanse": {
    title: "Luxe Cleanse Botanical",
    sector: "Organic Skincare Startup",
    badge: "Conceptual Blueprint",
    category: "Brand Identity",
    challenge: "Eco-friendly skincare startup required high-end retail presence to compete against established legacy brands on luxury shelves.",
    solution: "Developed an elevated apothecary visual identity with custom embossed bottle labels, unboxing packaging architecture, and clean ingredient spotlight carousels.",
    deliverables: ["Cosmetic Packaging Design", "Ingredient Storytelling Carousels", "Brand Guidelines Book (42 Pages)", "Wholesale Pitch Deck Design"],
    outcome: "Created to enable founder to secure prime shelf placement in boutique wellness shops and department stores."
  },
  "zenith-legal": {
    title: "Zenith Advisory",
    sector: "Corporate Law & Tax",
    badge: "Conceptual Blueprint",
    category: "Authority & Social",
    challenge: "Traditional consulting firm lacked digital visibility, losing high-value business clients to younger, modern advisory groups.",
    solution: "Rebuilt digital authority with a sleek dark-green brand presentation, executive LinkedIn thought-leadership ghostwriting, and monthly corporate tax regulatory briefing carousel posts.",
    deliverables: ["Executive Rebrand Suite", "LinkedIn Content Architecture", "Whitepaper Layouts", "Inbound Consultation Funnel"],
    outcome: "Engineered to position partners as foremost industry experts and generate consistent inbound corporate inquiries."
  }
};

function initCaseStudyModal() {
  const modal = document.querySelector("#case-study-modal");
  const modalBackdrop = document.querySelector("#modal-backdrop");
  const modalClose = document.querySelector("#modal-close");
  const viewTriggers = document.querySelectorAll(".view-case-study");

  if (!modal) return;

  const openModal = (id) => {
    const data = CASE_STUDIES[id];
    if (!data) return;

    document.querySelector("#modal-title").textContent = data.title;
    document.querySelector("#modal-sector").textContent = data.sector;
    document.querySelector("#modal-badge").textContent = data.badge;
    document.querySelector("#modal-challenge").textContent = data.challenge;
    document.querySelector("#modal-solution").textContent = data.solution;
    document.querySelector("#modal-outcome").textContent = data.outcome;

    const deliverablesContainer = document.querySelector("#modal-deliverables");
    deliverablesContainer.innerHTML = "";
    data.deliverables.forEach(item => {
      const li = document.createElement("li");
      li.className = "flex items-center gap-2 text-xs text-charcoal/90 font-light";
      li.innerHTML = `<span class="text-[#E87348] font-mono">—</span> <span>${item}</span>`;
      deliverablesContainer.appendChild(li);
    });

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  };

  viewTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.project;
      openModal(id);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
}
