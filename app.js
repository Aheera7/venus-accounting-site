// Sticky header
(() => {
  const header = document.querySelector(".header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// Mobile nav toggle
(() => {
  const btn = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  // Close on link click (mobile)
  links.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (window.matchMedia("(max-width: 980px)").matches) {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

// Mega menu (hover + click + outside click)
(() => {
  const mega = document.querySelector(".mega");
  if (!mega) return;

  const btn = mega.querySelector(".mega__btn");
  const panel = mega.querySelector(".mega__panel");
  if (!btn || !panel) return;

  const open = () => { mega.classList.add("open"); btn.setAttribute("aria-expanded", "true"); };
  const close = () => { mega.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };

  // Desktop hover
  mega.addEventListener("mouseenter", () => {
    if (!window.matchMedia("(min-width: 981px)").matches) return;
    open();
  });
  mega.addEventListener("mouseleave", () => {
    if (!window.matchMedia("(min-width: 981px)").matches) return;
    close();
  });

  // Click toggles (mobile + desktop)
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    mega.classList.contains("open") ? close() : open();
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!mega.contains(e.target)) close();
  });

  // Escape to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

// Scroll reveal
(() => {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("is-in");
    }
  }, { threshold: 0.16 });

  els.forEach(el => io.observe(el));
})();

// Subtle hero parallax
(() => {
  const bg = document.querySelector(".hero__bg");
  if (!bg) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || 0;
      const offset = Math.min(18, y * 0.06);
      bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
