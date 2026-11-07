/**
 * SAGAR DIGITAL MARKETING - Global Core Interactions
 * Handles Navigation, Mobile Drawer, Sticky Header Glass,
 * Scroll Reveal Animations, and UI Polish.
 */

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initActiveNav();
  initSectorLoop();
  initSpotlightCards();
  initBendingMarquee();
  initElasticLettering();
  initProcessStack();
  initCounters();
  initAccordions();
  initCurrentYear();
});

// Sticky Header & Glass Morphism
function initHeader() {
  const header = document.querySelector("#site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("shadow-lg", "bg-opacity-95");
      header.classList.remove("bg-opacity-80");
    } else {
      header.classList.remove("shadow-lg", "bg-opacity-95");
      header.classList.add("bg-opacity-80");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// Mobile Menu Drawer
function initMobileMenu() {
  const menuBtn = document.querySelector("#mobile-menu-toggle");
  const closeBtn = document.querySelector("#mobile-menu-close");
  const drawer = document.querySelector("#mobile-menu-drawer");
  const backdrop = document.querySelector("#mobile-menu-backdrop");

  if (!menuBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove("translate-x-full");
    if (backdrop) {
      backdrop.classList.remove("opacity-0", "pointer-events-none");
      backdrop.classList.add("opacity-100", "pointer-events-auto");
    }
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.add("translate-x-full");
    if (backdrop) {
      backdrop.classList.remove("opacity-100", "pointer-events-auto");
      backdrop.classList.add("opacity-0", "pointer-events-none");
    }
    document.body.style.overflow = "";
  };

  menuBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  // Close when clicking internal navigation links
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

// Scroll-Triggered Reveal Animations using IntersectionObserver
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-init");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

// Mark Active Navigation link based on current page
function initActiveNav() {
  const rawPath = window.location.pathname.replace(/\/$/, "");
  const currentSegment = (rawPath.split("/").pop() || "index").replace(/\.html$/, "");
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const rawHref = link.getAttribute("href") || "";
    const cleanHref = rawHref.replace(/^\//, "").replace(/\/$/, "").replace(/\.html$/, "");

    let isMatch = false;
    if ((currentSegment === "" || currentSegment === "index" || currentSegment === "home") && 
        (cleanHref === "" || cleanHref === "home" || cleanHref === "index")) {
      isMatch = true;
    } else if (cleanHref === currentSegment) {
      isMatch = true;
    } else if ((currentSegment === "work" || currentSegment === "our-work") && (cleanHref === "work" || cleanHref === "our-work")) {
      isMatch = true;
    } else if ((currentSegment === "about" || currentSegment === "about-us") && (cleanHref === "about" || cleanHref === "about-us")) {
      isMatch = true;
    }

    if (isMatch) {
      link.classList.add("text-[#E87348]", "font-medium");
      link.classList.remove("text-white/70", "text-white/75", "text-white/80");
    }
  });
}

// Single-Card Cinematic Loop Showcase ("screen medhaki ochi back elipovali")
function initSectorLoop() {
  const slides = document.querySelectorAll(".sector-slide");

  const prevBtn = document.querySelector("#sector-prev");
  const nextBtn = document.querySelector("#sector-next");
  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;
  let isPaused = false;

  function showSlide(index, direction = 1) {
    const prevSlideEl = slides[currentIndex];
    
    // Animate current out
    if (prevSlideEl && prevSlideEl !== slides[index]) {
      prevSlideEl.classList.remove("active");
      if (direction > 0) {
        prevSlideEl.classList.add("exit-left");
      } else {
        prevSlideEl.classList.remove("exit-left");
      }
    }

    currentIndex = (index + slides.length) % slides.length;
    const nextSlideEl = slides[currentIndex];

    // Reset and animate next in
    slides.forEach((s, idx) => {
      if (idx !== currentIndex && idx !== (index - direction)) {
        s.classList.remove("active", "exit-left");
      }
    });

    nextSlideEl.classList.remove("exit-left");
    // Trigger reflow for smooth animation
    void nextSlideEl.offsetWidth;
    nextSlideEl.classList.add("active");


  }

  function nextSlide() {
    showSlide(currentIndex + 1, 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1, -1);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetTimer(); });



  const stage = document.querySelector("#sector-showcase-stage");
  if (stage) {
    stage.addEventListener("mouseenter", () => { isPaused = true; });
    stage.addEventListener("mouseleave", () => { isPaused = false; });
    stage.addEventListener("touchstart", () => { isPaused = true; }, { passive: true });
    stage.addEventListener("touchend", () => { isPaused = false; }, { passive: true });
  }

  function startTimer() {
    timer = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 4200);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  showSlide(0);
  startTimer();
}

// Interactive FAQ Accordion
function initAccordions() {
  const accordions = document.querySelectorAll(".accordion-item");
  accordions.forEach(item => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");
    const indicator = item.querySelector(".accordion-icon") || trigger?.querySelector("span:last-child");

    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isOpen = !content.classList.contains("hidden");

      // Close all siblings in the same accordion group
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll(".accordion-content").forEach(c => c.classList.add("hidden"));
        parent.querySelectorAll(".accordion-item").forEach(otherItem => {
          const ind = otherItem.querySelector(".accordion-icon") || otherItem.querySelector(".accordion-trigger span:last-child");
          if (ind) {
            ind.classList.remove("rotate-180");
            if (ind.textContent === "−") ind.textContent = "+";
          }
        });
      }

      if (!isOpen) {
        content.classList.remove("hidden");
        if (indicator) {
          indicator.classList.add("rotate-180");
          if (indicator.textContent === "+") indicator.textContent = "−";
        }
      }
    });
  });
}

// Update Year
function initCurrentYear() {
  const yearElements = document.querySelectorAll(".current-year");
  const year = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = year);
}

// Lenis Smooth Momentum Scrolling (Framer Physics)
function initSmoothScroll() {
  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });
    window.lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync in-page anchor clicks with smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -80 });
          }
        }
      });
    });
  }
}

// Framer-Grade Cursor Spotlight Glow
function initSpotlightCards() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--mouse-x", `-500px`);
      card.style.setProperty("--mouse-y", `-500px`);
    });
  });
}



// Animated Metric Counters
function initCounters() {
  const counters = document.querySelectorAll("[data-counter-target]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-counter-target") || 0);
        const suffix = el.getAttribute("data-counter-suffix") || "";
        const duration = 1400;
        const startTime = performance.now();

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(target * ease);
          el.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target + suffix;
          }
        };

        requestAnimationFrame(animate);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

// Bending Marquee Dynamic Scroll & Velocity Tilt (React Bits Pro)
function initBendingMarquee() {
  const sections = document.querySelectorAll(".bending-marquee-section");
  if (!sections.length) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateBending = () => {
    const currentScrollY = window.scrollY;
    const velocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Velocity-based bend exaggeration
    const clampedVelocity = Math.max(-25, Math.min(25, velocity));
    const velocityMod = clampedVelocity * 0.18;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Check if visible
      if (rect.top < vh && rect.bottom > 0) {
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        const scrollMod = centerOffset * 4;

        const archX = (9 + scrollMod + velocityMod).toFixed(2);
        const archY = (-2.5 - scrollMod * 0.4).toFixed(2);
        const valleyX = (-8 - scrollMod - velocityMod).toFixed(2);
        const valleyY = (2.5 + scrollMod * 0.4).toFixed(2);

        section.style.setProperty("--bm-arch-x", `${archX}deg`);
        section.style.setProperty("--bm-arch-y", `${archY}deg`);
        section.style.setProperty("--bm-valley-x", `${valleyX}deg`);
        section.style.setProperty("--bm-valley-y", `${valleyY}deg`);
      }
    });

    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateBending);
      ticking = true;
    }
  }, { passive: true });

  // Optional mouse-driven depth tilt across marquee
  sections.forEach(section => {
    section.addEventListener("mousemove", (e) => {
      const rect = section.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      section.style.setProperty("--bm-arch-y", `${(-2.5 + relX * 6).toFixed(2)}deg`);
      section.style.setProperty("--bm-valley-y", `${(2.5 - relX * 6).toFixed(2)}deg`);
    });
  });
}

// Elastic Lettering Interactive Rubber-Band Physics (React Bits Pro)
function initElasticLettering() {
  const elements = document.querySelectorAll(".elastic-lettering");
  if (!elements.length) return;

  elements.forEach((container) => {
    const rawText = container.getAttribute("data-text") || container.textContent.trim();
    if (!rawText) return;

    container.setAttribute("aria-label", rawText);
    container.innerHTML = "";
    container.classList.add("elastic-lettering-wrap");

    const rawWords = rawText.split(" ");
    const charNodes = [];
    const charStates = [];
    let globalIdx = 0;

    rawWords.forEach((word, wIdx) => {
      const wordWrapper = document.createElement("span");
      wordWrapper.className = "elastic-word inline-block whitespace-nowrap";

      word.split("").forEach((char) => {
        const span = document.createElement("span");
        span.className = "elastic-char";
        span.setAttribute("data-char-idx", globalIdx);
        span.textContent = char;
        wordWrapper.appendChild(span);
        charNodes.push(span);

        charStates.push({
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          targetX: 0,
          targetY: 0,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          influence: 0
        });

        globalIdx++;
      });

      container.appendChild(wordWrapper);

      if (wIdx < rawWords.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.className = "elastic-char is-space inline-block";
        spaceSpan.setAttribute("data-char-idx", globalIdx);
        spaceSpan.innerHTML = "&nbsp;";
        container.appendChild(spaceSpan);
        charNodes.push(spaceSpan);

        charStates.push({
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          targetX: 0,
          targetY: 0,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          influence: 0
        });

        globalIdx++;
      }
    });

    const chars = charStates;

    let isDragging = false;
    let dragIndex = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let currentDragX = 0;
    let currentDragY = 0;

    // Pointer events
    container.addEventListener("pointerdown", (e) => {
      const charEl = e.target.closest(".elastic-char");
      if (!charEl) return;

      e.preventDefault();
      isDragging = true;
      container.classList.add("is-dragging");
      dragIndex = parseInt(charEl.getAttribute("data-char-idx"), 10);
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      currentDragX = 0;
      currentDragY = 0;
      container.setPointerCapture?.(e.pointerId);
    });

    const onPointerMove = (e) => {
      if (!isDragging || dragIndex === null) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;

      // Clamped stretch distance
      const dist = Math.hypot(dx, dy);
      const maxDist = 160;
      const clamped = Math.min(dist, maxDist);
      const angle = Math.atan2(dy, dx);

      currentDragX = Math.cos(angle) * clamped;
      currentDragY = Math.sin(angle) * clamped;
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove("is-dragging");

      // Impart release fling velocity based on stretch distance
      if (dragIndex !== null) {
        const pullDist = Math.hypot(currentDragX, currentDragY);
        charStates.forEach((state, i) => {
          const distFromDrag = Math.abs(i - dragIndex);
          const sigma = Math.max(1.2, chars.length * 0.18);
          const influence = Math.exp(-(distFromDrag * distFromDrag) / (2 * sigma * sigma));
          state.vx = -currentDragX * 0.35 * influence;
          state.vy = -currentDragY * 0.35 * influence;
        });
      }

      dragIndex = null;
      currentDragX = 0;
      currentDragY = 0;
      try {
        container.releasePointerCapture?.(e.pointerId);
      } catch {}
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    // Spring physics update loop
    const stiffness = 0.18;
    const damping = 0.82;

    const tick = () => {
      if (isDragging && dragIndex !== null) {
        const totalChars = chars.length;
        const sigma = Math.max(1.2, totalChars * 0.18);

        charStates.forEach((state, i) => {
          const distFromDrag = Math.abs(i - dragIndex);
          const influence = Math.exp(-(distFromDrag * distFromDrag) / (2 * sigma * sigma));
          state.influence = influence;
          state.targetX = currentDragX * influence;
          state.targetY = currentDragY * influence;

          // Stretch deformation and tilt
          const stretchMag = Math.hypot(currentDragX, currentDragY) / 140;
          state.scaleY = 1 + stretchMag * influence * 0.35;
          state.scaleX = Math.max(0.75, 1 - stretchMag * influence * 0.2);
          state.rotate = (currentDragX * 0.1 - (i - dragIndex) * (currentDragY * 0.06)) * influence;

          // Directly follow drag with slight lag
          state.x += (state.targetX - state.x) * 0.45;
          state.y += (state.targetY - state.y) * 0.45;
        });
      } else {
        charStates.forEach((state) => {
          state.targetX = 0;
          state.targetY = 0;

          // Hooke's Law Spring with Damping
          const ax = -stiffness * (state.x - state.targetX);
          const ay = -stiffness * (state.y - state.targetY);
          state.vx = (state.vx + ax) * damping;
          state.vy = (state.vy + ay) * damping;
          state.x += state.vx;
          state.y += state.vy;

          // Settle rotation and scale back to rest
          state.rotate += (0 - state.rotate) * 0.18;
          state.scaleX += (1 - state.scaleX) * 0.18;
          state.scaleY += (1 - state.scaleY) * 0.18;
          state.influence = Math.min(1, Math.hypot(state.x, state.y) / 25);
        });
      }

      // Render character DOM transforms
      charNodes.forEach((node, i) => {
        const s = charStates[i];
        if (Math.abs(s.x) > 0.05 || Math.abs(s.y) > 0.05 || Math.abs(s.rotate) > 0.1 || isDragging) {
          node.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) rotate(${s.rotate.toFixed(2)}deg) scale(${s.scaleX.toFixed(3)}, ${s.scaleY.toFixed(3)})`;
          if (s.influence > 0.15) {
            node.classList.add("elastic-stretched");
          } else {
            node.classList.remove("elastic-stretched");
          }
        } else {
          node.style.transform = "translate3d(0, 0, 0)";
          node.classList.remove("elastic-stretched");
        }
      });

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    // Autonomous Idle Pluck Loop ("loop la")
    const loopInterval = parseInt(container.getAttribute("data-loop-interval") || "4600", 10);
    const hasLoop = container.getAttribute("data-loop") !== "false";

    if (hasLoop) {
      setInterval(() => {
        if (isDragging) return;
        const total = chars.length;
        const pluckIdx = Math.floor(total * 0.45);
        const pluckY = 26 + Math.random() * 14;
        const pluckX = (Math.random() - 0.5) * 16;

        charStates.forEach((state, i) => {
          const dist = Math.abs(i - pluckIdx);
          const sigma = Math.max(1.2, total * 0.16);
          const inf = Math.exp(-(dist * dist) / (2 * sigma * sigma));
          state.vy += pluckY * inf;
          state.vx += pluckX * inf;
        });
      }, loopInterval);
    }
  });
}



// Progressive Stacking Process Deck (Section 07: The Five-Step Growth System)
// Ensures each card sits in the middle alone; next card is 100% hidden until user scrolls
function initProcessStack() {
  const container = document.querySelector(".process-stack-container");
  if (!container) return;
  const cards = Array.from(container.querySelectorAll(".process-stack-card"));
  if (!cards.length) return;

  const updateStack = () => {
    const vh = window.innerHeight;
    const isMobile = window.innerWidth <= 768;
    const stepOffset = isMobile ? 10 : 16;
    const baseDock = isMobile ? Math.max(75, (vh / 2) - 120) : Math.max(90, (vh / 2) - 140);

    const cardRects = cards.map((c) => c.getBoundingClientRect());

    cards.forEach((card, i) => {
      const currentRect = cardRects[i];
      const stickyDock = baseDock + (i * stepOffset);
      const inner = card.querySelector(".process-stack-card-inner");
      if (!inner) return;

      // 1. Entry animation for this card as it rises from below
      // When card top is >= vh (below screen), it is completely invisible (opacity 0)
      // Only when it scrolls into the viewport does it fade and slide up smoothly
      let entryOpacity = 1;
      let entryTranslateY = 0;
      let entryScale = 1;

      if (currentRect.top > stickyDock) {
        // Approaching sticky dock
        if (currentRect.top >= vh) {
          // Completely off-screen below: hide it completely so it NEVER peeks at bottom
          entryOpacity = 0;
          entryTranslateY = 60;
          entryScale = 0.95;
          card.style.visibility = "hidden";
        } else {
          // Entering the screen: smooth progressive reveal
          card.style.visibility = "visible";
          const travelTotal = vh - stickyDock;
          const progress = Math.max(0, Math.min(1, (vh - currentRect.top) / travelTotal));
          // Ease-in opacity curve
          entryOpacity = Math.min(1, Math.pow(progress, 1.4) * 1.2);
          entryTranslateY = (1 - progress) * 50;
          entryScale = 0.95 + (progress * 0.05);
        }
      } else {
        card.style.visibility = "visible";
      }

      // 2. Depth effect when subsequent cards (i+1, i+2, ...) stack on top of this card
      let stackDepth = 0;
      for (let j = i + 1; j < cards.length; j++) {
        const nextTop = cardRects[j].top;
        const nextDock = baseDock + (j * stepOffset);
        const nextTravel = vh - nextDock;
        if (nextTop < vh && nextTravel > 0) {
          const progress = Math.max(0, Math.min(1, (vh - nextTop) / nextTravel));
          stackDepth += progress;
        }
      }

      // Depth modulation for underlying stacked cards
      const underScale = Math.max(0.88, 1 - stackDepth * 0.035);
      const brightness = Math.max(0.55, 1 - stackDepth * 0.22);
      const depthOpacity = Math.max(0.7, 1 - stackDepth * 0.08);

      const finalScale = (entryScale * underScale).toFixed(3);
      const finalOpacity = (Math.min(entryOpacity, depthOpacity)).toFixed(3);
      const finalTranslate = entryTranslateY.toFixed(1);

      inner.style.transform = `translateY(${finalTranslate}px) scale(${finalScale}) translateZ(0)`;
      inner.style.filter = `brightness(${brightness.toFixed(3)})`;
      inner.style.opacity = finalOpacity;

      // Active card spotlight indicator: the topmost visible docked card
      const isCurrent = (stackDepth < 0.7) && (currentRect.top <= stickyDock + 40) && (entryOpacity > 0.8);
      if (isCurrent) {
        card.classList.add("is-current");
      } else {
        card.classList.remove("is-current");
      }
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateStack();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateStack();
}





