/* Đa ngôn ngữ VI / EN — nội dung gốc trong HTML là tiếng Việt.
   Khi chọn EN, mọi text node khớp khoá bên dưới được thay bằng bản tiếng Anh. */
(() => {
  const EN = {
    "Đang khởi tạo trải nghiệm…": "Initializing experience…",

    // Nav
    "Giới thiệu": "About",
    "Kỹ năng": "Skills",
    "Dự án": "Projects",
    "Kinh nghiệm": "Experience",
    "Liên hệ": "Contact",

    // Hero
    "Sẵn sàng nhận dự án mới — 2026": "Available for new projects — 2026",
    "Code sạch,": "Clean code,",
    "hệ thống": "robust",
    "mạnh,": "systems,",
    "AI": "smart",
    "thông minh.": "AI.",
    "Xin chào, mình là": "Hi, I'm",
    "— Fullstack Team Lead & AI Engineer với 6 năm kinh nghiệm. Chuyên Java Spring Boot, React và Agentic AI, xây dựng hệ thống tải cao và dẫn dắt đội ngũ giải bài toán kiến trúc phức tạp.":
      "— a Fullstack Team Lead & AI Engineer with 6 years of experience. I specialize in Java Spring Boot, React and Agentic AI, building high-load systems and leading teams through complex architectural challenges.",
    "Xem dự án": "View projects",
    "Tải CV": "Download CV",
    "Cuộn xuống": "Scroll down",

    // About
    "01 — Giới thiệu": "01 — About",
    "Thủ khoa Đại học Điện lực, hai lần đạt Nhân viên của năm. Mình dẫn dắt đội 8–20 người, xây dựng hệ thống nhắn tin realtime, kiến trúc Agentic RAG với Hybrid Search và tận dụng AI để rút ngắn 40% thời gian phát triển — từ thiết kế API, tối ưu truy vấn đến giao diện mượt mà từng chi tiết.":
      "Valedictorian of Electric Power University and two-time Employee of the Year. I lead teams of 8–20 people, build real-time messaging systems, architect Agentic RAG with Hybrid Search, and leverage AI to cut development time by 40% — from API design and query optimization to interfaces polished down to the last detail.",
    "Năm kinh nghiệm": "Years of experience",
    "Thành viên trong team lớn nhất từng dẫn dắt": "Members in the largest team I've led",
    "Người dùng đồng thời trên hệ thống chat": "Concurrent users on the chat system",
    "Tăng tốc phát triển nhờ AI": "Faster development thanks to AI",

    // Skills
    "02 — Kỹ năng": "02 — Skills",
    "không giới hạn.": "no limits.",
    "Giao diện responsive, hiệu năng cao, tối ưu SEO và animation mượt.": "Responsive, high-performance, SEO-optimized interfaces with smooth animation.",
    "API bảo mật, kiến trúc sạch, hệ thống realtime tải cao.": "Secure APIs, clean architecture and high-load real-time systems.",
    "Agentic RAG, tìm kiếm lai và tự động hóa bằng AI.": "Agentic RAG, hybrid search and AI-powered automation.",
    "Thiết kế schema, tối ưu truy vấn, container hóa và triển khai.": "Schema design, query optimization, containerization and deployment.",

    // Projects
    "03 — Dự án nổi bật": "03 — Featured projects",
    "Những sản phẩm": "Products I'm",
    "tự hào.": "proud of.",
    "Hệ thống quản lý học tập doanh nghiệp triển khai cho Viettel: SSO/IAM, tìm kiếm nhanh, họp video và bản đồ.":
      "Enterprise learning management system deployed for Viettel: SSO/IAM, fast search, video meetings and maps.",
    "Nền tảng AI với Agentic RAG & Hybrid Search, OCR/Vision và chăm sóc khách hàng đa kênh 24/7 qua Zalo.":
      "AI platform with Agentic RAG & Hybrid Search, OCR/Vision and 24/7 omni-channel customer support via Zalo.",
    "Hệ thống giao tiếp realtime, caching SHA-256 tùy biến, hỗ trợ 200+ phiên chat đồng thời.":
      "Real-time communication system with custom SHA-256 caching, supporting 200+ concurrent chat sessions.",
    "Website bảo hiểm Nhật Bản: thiết kế dữ liệu với MicroCMS, tối ưu SEO và triển khai Docker production.":
      "Japanese insurance website: data modeling with MicroCMS, SEO optimization and Docker production deployment.",
    "Vận hành môi trường WordPress quy mô lớn, quản lý team 10 người, giao đúng hạn và đúng ngân sách.":
      "Operated a large-scale WordPress environment, managed a 10-member team, delivered on time and within budget.",

    "Phát triển và bảo trì giao diện cho hệ sinh thái Mercari, tối ưu việc lấy dữ liệu bằng GraphQL.":
      "Built and maintained interfaces for the Mercari ecosystem, optimizing data fetching with GraphQL.",
    "Dự án lớn với đội frontend 8–20 người: định nghĩa kiến trúc nền tảng và duy trì chuẩn code review chặt chẽ.":
      "Large-scale project with an 8–20 person frontend team: defined the base architecture and enforced rigorous code review standards.",

    "Xem thêm": "Show more",
    "Thu gọn": "Show less",

    // Experience
    "04 — Kinh nghiệm": "04 — Experience",
    "Hành trình": "My career",
    "nghề nghiệp.": "journey.",
    "08/2026 — Nay": "08/2026 — Present",
    "Hệ thống LMS doanh nghiệp quy mô lớn triển khai cho Viettel. Thiết kế REST API bảo mật với Spring Security & Keycloak, tối ưu truy vấn và index Elasticsearch, code review cho team 10 người.":
      "Large-scale enterprise LMS deployed for Viettel. Designed secure REST APIs with Spring Security & Keycloak, optimized queries and Elasticsearch indexing, and ran code reviews for a 10-person team.",
    "Dẫn dắt 12 thành viên, xây kiến trúc Agentic RAG với Hybrid Search, hạ tầng nhắn tin đa nền tảng 1.000+ người dùng đồng thời, nền tảng OCR/Vision và chăm sóc khách hàng 24/7 qua Zalo. Tăng tốc phát triển 40% nhờ AI.":
      "Led 12 members, architected Agentic RAG with Hybrid Search, built a multi-platform messaging infrastructure for 1,000+ concurrent users, an OCR/Vision platform and 24/7 customer support via Zalo. Sped up development by 40% with AI.",
    "Quản lý Kansai Airport (10 người), BeeChat realtime với Spring Boot & WebSocket/STOMP (12 người), Lifenet-seimei với MicroCMS & Next.js (6 người).":
      "Managed Kansai Airport (10 people), real-time BeeChat with Spring Boot & WebSocket/STOMP (12 people), and Lifenet-seimei with MicroCMS & Next.js (6 people).",
    "Dẫn dắt team frontend 8–20 người cho Jacic, NTT, Kondate; tích hợp API Spring Boot, React, Laravel; phát triển giao diện hệ sinh thái Mercari với Next.js, Nuxt.js và GraphQL.":
      "Led 8–20 person frontend teams for Jacic, NTT and Kondate; integrated Spring Boot, React and Laravel APIs; built interfaces for the Mercari ecosystem with Next.js, Nuxt.js and GraphQL.",
    "Cử nhân Công nghệ thông tin": "B.Sc. in Information Technology",
    "@ Đại học Điện lực": "@ Electric Power University",
    "Thủ khoa toàn trường, GPA 3.85/4.0 (Xuất sắc). Nhân viên của năm 2024 & 2025, Nhân viên trẻ xuất sắc 2022, chứng chỉ Facebook Developer Circles 2020.":
      "University valedictorian, GPA 3.85/4.0 (Highest Distinction). Employee of the Year 2024 & 2025, Excellent Young Employee 2022, Facebook Developer Circles certificate 2020.",

    // Contact / footer
    "05 — Liên hệ": "05 — Contact",
    "Cùng tạo ra": "Let's create",
    "điều tuyệt vời?": "something great?",
    "© 2026 Phương Công Thắng. Thiết kế & lập trình bằng ♥": "© 2026 Phương Công Thắng. Designed & built with ♥",
    "Về đầu trang ↑": "Back to top ↑",
  };

  const CURSOR = { "Xem": "View", "Lên": "Top" };
  const META = {
    title: "Phương Công Thắng — Fullstack Developer",
    desc: "Portfolio of Phương Công Thắng, a Fullstack Developer building fast, beautiful and scalable web products.",
    aria: "Clean code, robust systems, smart AI",
  };

  let lang = "vi";
  try {
    lang = localStorage.getItem("lang") || (/^vi/i.test(navigator.language) ? "vi" : "en");
  } catch (e) {
    lang = /^vi/i.test(navigator.language) ? "vi" : "en";
  }
  window.__lang = lang;
  document.documentElement.lang = lang;

  const norm = (s) => s.replace(/\s+/g, " ").trim();

  if (lang === "en") {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      if (n.parentElement.closest("script, style, pre")) return;
      const key = norm(n.nodeValue);
      if (!key || !(key in EN)) return;
      n.nodeValue = n.nodeValue.replace(n.nodeValue.trim() ? /\S[\s\S]*\S|\S/ : /^$/, EN[key]);
    });
    // "@ Org" in <small> is kept as-is except the university
    document.querySelectorAll(".nav__links a").forEach((a) => (a.dataset.text = a.textContent));
    document.querySelectorAll("[data-cursor]").forEach((el) => {
      const v = el.dataset.cursor;
      if (CURSOR[v]) el.dataset.cursor = CURSOR[v];
    });
    document.title = META.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", META.desc);
    document.querySelector(".hero__title")?.setAttribute("aria-label", META.aria);
  }

  // Language switch UI state
  document.querySelectorAll(".lang [data-l]").forEach((b) => b.classList.toggle("is-on", b.dataset.l === lang));
})();
