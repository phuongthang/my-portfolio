(() => {
  const doc = document.documentElement;
  doc.classList.add("js");
  document.body.classList.add("is-loading");

  const hasGSAP = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Safety net: if CDN libs fail, show the page anyway.
  if (!hasGSAP) {
    document.querySelector(".loader")?.remove();
    document.body.classList.remove("is-loading");
    document.querySelectorAll(".reveal-up").forEach((el) => (el.style.cssText = "opacity:1;transform:none"));
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (typeof Lenis !== "undefined" && !reduceMotion) {
    lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  /* ---------- Text splitting ---------- */
  document.querySelectorAll(".split-words").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word"><span>${w}</span></span>`).join(" ");
  });
  document.querySelectorAll(".split-lines").forEach((el) => {
    // wrap each word so we can reveal with a mask; keep <em>/<br> structure
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(" ");
            const w = document.createElement("span");
            w.className = "word";
            w.innerHTML = `<span>${part}</span>`;
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
      });
    };
    walk(el);
  });


  /* ---------- Tech logos in skill chips ---------- */
  const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
  const logos = {
    "React": "react/react-original", "Next.js": "nextjs/nextjs-original", "Nuxt.js": "nuxtjs/nuxtjs-original",
    "TypeScript": "typescript/typescript-original", "Angular": "angular/angular-original", "GraphQL": "graphql/graphql-plain",
    "Java": "java/java-original", "Spring Boot": "spring/spring-original", "Spring Security": "spring/spring-original",
    "Laravel": "laravel/laravel-original", "Elasticsearch": "elasticsearch/elasticsearch-original",
    "Kafka": "apachekafka/apachekafka-original", "RabbitMQ": "rabbitmq/rabbitmq-original", "MySQL": "mysql/mysql-original",
    "PostgreSQL": "postgresql/postgresql-original", "MongoDB": "mongodb/mongodb-original", "Redis": "redis/redis-original",
    "Docker": "docker/docker-original",
  };
  const glyphs = { "Keycloak": "🔑", "WebSocket/STOMP": "⚡", "RAG": "✦", "Agentic Framework": "✦", "OCR/Vision": "◉", "MinIO": "▣" };
  document.querySelectorAll(".skills .chips li").forEach((li) => {
    const name = li.textContent.trim();
    if (logos[name]) {
      const img = new Image();
      img.src = DEV + logos[name] + ".svg"; img.alt = ""; img.loading = "lazy";
      if (name === "Next.js" || name === "Kafka") img.className = "inv";
      img.onerror = () => img.remove();
      li.prepend(img);
    } else if (glyphs[name]) {
      const g = document.createElement("span");
      g.className = "ico"; g.textContent = glyphs[name]; li.prepend(g);
    }
  });

  /* ---------- Intro timeline ---------- */
  const num = document.getElementById("loaderNum");
  const counter = { v: 0 };
  const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
  let navigating = false;
  let switching = false, savedY = 0;
  try { switching = sessionStorage.getItem("sw") === "1"; savedY = +sessionStorage.getItem("swY") || 0; sessionStorage.removeItem("sw"); } catch (e) {}

  if (!switching) intro
    .to(counter, {
      v: 100, duration: 1.8, ease: "power2.inOut",
      onUpdate: () => (num.textContent = Math.round(counter.v)),
    })
    .to(".loader__bar i", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0)
    .to(".loader__count, .loader__text, .loader__bar", { y: -40, opacity: 0, duration: 0.6, stagger: 0.05 })
    .to(".loader", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.2")
    .add(() => {
      document.body.classList.remove("is-loading");
      lenis?.start();
    }, "-=0.5")
    .from(".hero__title .line__in", { yPercent: 115, rotate: 4, duration: 1.3, stagger: 0.12, ease: "expo.out" }, "-=0.6")
    .to(".reveal-up", { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, "-=0.9")
    .from(".nav", { yPercent: -100, opacity: 0, duration: 1, clearProps: "all" }, "-=1")
    .add(() => document.querySelector(".loader").remove());
  else {
    // Đổi ngôn ngữ: bỏ loader, màn chuyển cảnh mở ra tại vị trí cuộn cũ
    document.querySelector(".loader").remove();
    document.body.classList.remove("is-loading");
    gsap.set(".curtain", { y: "0%", borderRadius: "50% 50% 0 0 / 14% 14%" });
    if (lenis) { lenis.start(); lenis.scrollTo(savedY, { immediate: true, force: true }); } else window.scrollTo(0, savedY);
    intro
      .to(".curtain", { y: "-100%", duration: 0.9, ease: "expo.out", borderRadius: "0 0 50% 50% / 0 0 14% 14%", delay: 0.1 })
      .from(".hero__title .line__in", { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.1, ease: "expo.out" }, "-=0.6")
      .to(".reveal-up", { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.8");
  }

  /* ---------- Language switch ---------- */
  document.querySelectorAll(".lang [data-l]").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.l === window.__lang || navigating) return;
      navigating = true;
      try { localStorage.setItem("lang", b.dataset.l); sessionStorage.setItem("sw", "1"); sessionStorage.setItem("swY", String(window.scrollY)); } catch (e) {}
      gsap.timeline({ onComplete: () => location.reload() })
        .set(".curtain", { borderRadius: "50% 50% 0 0 / 14% 14%" })
        .fromTo(".curtain", { y: "100%" }, { y: "0%", duration: 0.7, ease: "expo.in" });
    })
  );

  /* ---------- Scroll progress + nav behaviour ---------- */
  gsap.to(".progress i", {
    scaleX: 1, ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
  });

  const nav = document.querySelector(".nav");
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      nav.classList.toggle("is-scrolled", self.scroll() > 60);
      const hide = self.direction === 1 && self.scroll() > 400 && !document.getElementById("navLinks").classList.contains("is-open");
      nav.classList.toggle("is-hidden", hide);
    },
  });

  // Active link
  const links = [...document.querySelectorAll(".nav__links a")];
  links.forEach((a) => {
    const sec = document.querySelector(a.getAttribute("href"));
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec, start: "top 50%", end: "bottom 50%",
      onToggle: (s) => s.isActive && links.forEach((l) => l.classList.toggle("is-active", l === a)),
    });
  });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  const toggleMenu = (open) => {
    burger.classList.toggle("is-open", open);
    navLinks.classList.toggle("is-open", open);
    doc.classList.toggle("menu-open", open);
    if (open) lenis?.stop();
    else if (!document.body.classList.contains("is-loading")) lenis?.start();
  };
  // Menu mở rồi phóng to cửa sổ lên PC (nút burger ẩn) → trang bị khoá cuộn: tự đóng menu.
  addEventListener("resize", () => { if (innerWidth > 820 && navLinks.classList.contains("is-open")) toggleMenu(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && navLinks.classList.contains("is-open")) toggleMenu(false); });
  // Failsafe: nếu intro bị treo (tab chạy nền…) vẫn mở khoá cuộn.
  setTimeout(() => {
    if (document.body.classList.contains("is-loading")) { intro.progress(1); document.body.classList.remove("is-loading"); lenis?.start(); }
  }, 7000);
  burger.addEventListener("click", () => toggleMenu(!navLinks.classList.contains("is-open")));

  /* ---------- Page transition on anchor navigation ---------- */
  const curtain = document.querySelector(".curtain");
  const goTo = (hash) => {
    const target = document.querySelector(hash);
    if (!target || navigating) return;
    navigating = true;
    toggleMenu(false);
    gsap.timeline({ onComplete: () => (navigating = false) })
      .set(curtain, { yPercent: 0, borderRadius: "50% 50% 0 0 / 14% 14% 0 0" })
      .fromTo(curtain, { y: "100%" }, { y: "0%", duration: 0.7, ease: "expo.in" })
      .add(() => {
        if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
        else target.scrollIntoView();
        ScrollTrigger.update();
      })
      .to(curtain, { y: "-100%", duration: 0.8, ease: "expo.out", borderRadius: "0 0 50% 50% / 0 0 14% 14%" }, "+=0.05");
  };
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const h = a.getAttribute("href");
    if (h.length < 2) return;
    a.addEventListener("click", (e) => { e.preventDefault(); goTo(h); });
  });
  document.getElementById("toTop").addEventListener("click", () => {
    lenis ? lenis.scrollTo(0, { duration: 1.8 }) : window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Section reveals ---------- */
  // Heading words rise from mask
  document.querySelectorAll(".split-lines").forEach((el) => {
    gsap.from(el.querySelectorAll(".word > span"), {
      yPercent: 110, rotate: 3, duration: 1.1, stagger: 0.06, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
  gsap.utils.toArray(".eyebrow").forEach((el) =>
    gsap.from(el, { y: 16, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } })
  );

  // About: words light up as you scroll
  gsap.to(".about__text .word > span", {
    opacity: 1, stagger: 0.08, ease: "none",
    scrollTrigger: { trigger: ".about__text", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
  });

  gsap.from(".avatar", { y: 60, opacity: 0, scale: 0.92, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".avatar", start: "top 85%" } });

  // Counters
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = +el.dataset.count, o = { v: 0 };
    gsap.to(o, {
      v: end, duration: 2, ease: "power2.out",
      onUpdate: () => (el.textContent = Math.round(o.v)),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
  gsap.from(".stat", {
    y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out",
    scrollTrigger: { trigger: ".stats", start: "top 85%" },
  });

  // Marquee: continuous + reacts to scroll velocity/direction
  const track = document.querySelector(".marquee__track");
  const half = () => track.scrollWidth / 2;
  let mx = 0, dir = -1, boost = 0;
  gsap.ticker.add(() => {
    mx += dir * (0.8 + boost);
    boost *= 0.92;
    if (mx <= -half()) mx += half();
    if (mx > 0) mx -= half();
    gsap.set(track, { x: mx });
  });
  ScrollTrigger.create({
    onUpdate: (self) => { dir = self.direction === 1 ? -1 : 1; boost = Math.min(Math.abs(self.getVelocity()) / 350, 12); },
  });

  // Skill cards: stagger in + meters fill
  gsap.from(".skills .card", {
    y: 90, opacity: 0, rotateX: -12, duration: 1.2, stagger: 0.13, ease: "expo.out",
    scrollTrigger: { trigger: ".skills__grid", start: "top 82%" },
  });
  gsap.to(".meter i", {
    scaleX: 1, duration: 1.6, stagger: 0.13, ease: "expo.out", delay: 0.3,
    scrollTrigger: { trigger: ".skills__grid", start: "top 80%" },
  });

  // Projects
  const setupProject = (p) => {
    gsap.from(p, { y: 70, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 90%" } });
    const thumb = p.querySelector(".project__thumb");
    gsap.fromTo(thumb, { yPercent: 12 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: p, scrub: true } });
  };
  gsap.utils.toArray(".project:not(.is-extra)").forEach(setupProject);

  // Xem thêm / Thu gọn
  const moreBtn = document.getElementById("moreProjects");
  const projSec = document.querySelector(".projects");
  const extras = gsap.utils.toArray(".project.is-extra");
  let extrasReady = false, busy = false;
  moreBtn.addEventListener("click", () => {
    if (busy) return;
    busy = true;
    const open = moreBtn.getAttribute("aria-expanded") === "true";
    if (!open) {
      moreBtn.setAttribute("aria-expanded", "true");
      projSec.classList.add("is-open");
      gsap.timeline({
        onComplete: () => {
          busy = false;
          if (!extrasReady) {
            extras.forEach((p) => gsap.fromTo(p.querySelector(".project__thumb"), { yPercent: 12 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: p, scrub: true } }));
            extrasReady = true;
          }
          ScrollTrigger.refresh();
        },
      }).fromTo(extras, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "expo.out", clearProps: "transform" });
    } else {
      gsap.timeline({
        onComplete: () => {
          projSec.classList.remove("is-open");
          moreBtn.setAttribute("aria-expanded", "false");
          gsap.set(extras, { clearProps: "all" });
          ScrollTrigger.refresh();
          if (lenis) lenis.scrollTo(document.querySelector(".projects__list"), { offset: -100, duration: 1 });
          busy = false;
        },
      }).to(extras, { opacity: 0, y: 30, duration: 0.4, stagger: { each: 0.05, from: "end" }, ease: "power2.in" });
    }
  });

  // Timeline
  gsap.to(".timeline__line i", {
    scaleY: 1, ease: "none",
    scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: 0.5 },
  });
  gsap.utils.toArray(".tl-item").forEach((it) =>
    gsap.from(it, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: it, start: "top 85%" } })
  );

  // Contact
  gsap.from([".contact__mail", ".socials a"], {
    y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out",
    scrollTrigger: { trigger: ".contact__mail", start: "top 90%" },
  });

  // Hero parallax on scroll
  gsap.to(".hero__title", { yPercent: -12, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__code", { yPercent: -40, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  /* ---------- Pointer effects (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    document.body.classList.add("has-cursor");
    const cur = document.querySelector(".cursor");
    const dotEl = document.querySelector(".cursor-dot");
    const label = document.querySelector(".cursor__label");
    const cx = gsap.quickTo(cur, "x", { duration: 0.5, ease: "power3" });
    const cy = gsap.quickTo(cur, "y", { duration: 0.5, ease: "power3" });
    const dx = gsap.quickTo(dotEl, "x", { duration: 0.1 });
    const dy = gsap.quickTo(dotEl, "y", { duration: 0.1 });
    window.addEventListener("mousemove", (e) => { cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY); });

    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => { label.textContent = el.dataset.cursor; cur.classList.add("is-active"); });
      el.addEventListener("mouseleave", () => cur.classList.remove("is-active"));
    });

    // Magnetic elements
    document.querySelectorAll(".magnetic").forEach((el) => {
      const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - (r.left + r.width / 2)) * 0.35);
        my((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      el.addEventListener("mouseleave", () => { mx(0); my(0); });
    });

    // 3D tilt + spotlight cards
    document.querySelectorAll(".tilt").forEach((card) => {
      const rx = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power3" });
      const ry = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power3" });
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * 14); rx((0.5 - py) * 14);
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
      });
      card.addEventListener("mouseleave", () => { rx(0); ry(0); });
    });
  }

  /* ---------- Animated background (particle network) ---------- */
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");
  let W, H, pts = [];
  const mouse = { x: -999, y: -999 };
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.width = innerWidth * dpr; H = canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W /= dpr; H /= dpr;
    const n = Math.min(90, Math.floor((W * H) / 18000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5,
    }));
  };
  resize();
  addEventListener("resize", resize);
  addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    // soft aurora blobs
    const t = performance.now() / 4000;
    const blob = (x, y, r, c) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, c); g.addColorStop(1, "transparent");
      ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };
    blob(W * (0.2 + 0.1 * Math.sin(t)), H * (0.25 + 0.08 * Math.cos(t * 1.3)), Math.max(W, H) * 0.45, "rgba(124,92,255,.16)");
    blob(W * (0.85 + 0.08 * Math.cos(t * 0.9)), H * (0.7 + 0.1 * Math.sin(t)), Math.max(W, H) * 0.4, "rgba(0,212,255,.1)");

    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.hypot(mdx, mdy);
      if (md < 140) { p.x += (mdx / md) * 1.2; p.y += (mdy / md) * 1.2; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 120) {
          ctx.strokeStyle = `rgba(140,150,255,${0.14 * (1 - d / 120)})`;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  };
  draw();

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
