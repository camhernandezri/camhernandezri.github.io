/* ==========================================================================
   Portafolio · lógica de la interfaz
   1. Utilidades e idioma   2. Tema   3. Navegación
   4. Proyectos y filtros   5. Caso de estudio   6. Visor de capturas
   7. Formulario            8. Animaciones
   ========================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE, PROJECTS = window.PROJECTS, I18N = window.I18N, SKILLS = window.SKILLS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- 1. Idioma ---------- */
  var lang = (function () {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "es" || q === "en") return q;
    var s = store("ch-lang"); if (s === "es" || s === "en") return s;
    return (navigator.language || "es").toLowerCase().indexOf("es") === 0 ? "es" : "en";
  })();
  function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key; }
  function L(obj) { return obj ? (obj[lang] || obj.es || "") : ""; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function titleHtml(p) { var t2 = L(p.title).split(" · "); return esc(t2[0]) + (t2[1] ? '<span class="t-sub">' + esc(t2[1]) + "</span>" : ""); }
  function strip(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent; }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", t("meta.desc"));
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-alt]").forEach(function (el) { el.alt = t(el.getAttribute("data-i18n-alt")); });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    var lt = $("#langToggle");
    lt.textContent = lang === "es" ? "EN" : "ES";
    lt.setAttribute("lang", lang === "es" ? "en" : "es");
    lt.setAttribute("aria-label", t("lang.switch"));
    $("#menuBtn").setAttribute("aria-label", $("#menuBtn").getAttribute("aria-expanded") === "true" ? t("nav.menuClose") : t("nav.menu"));
    $("#copyEmail").setAttribute("aria-label", t("contact.copy"));
    $("#casePrev").setAttribute("aria-label", t("case.prev"));
    $("#caseNext").setAttribute("aria-label", t("case.next"));
    $("#lbClose").setAttribute("aria-label", t("lb.close"));
    $("#lbPrev").setAttribute("aria-label", t("lb.prev"));
    $("#lbNext").setAttribute("aria-label", t("lb.next"));
    updateThemeButton();
    renderFilters(); renderProjects(); renderSkills();
    if (current) renderCase(current);
  }
  $("#langToggle").addEventListener("click", function () {
    lang = lang === "es" ? "en" : "es"; store("ch-lang", lang); applyI18n();
  });

  /* ---------- 2. Tema claro / oscuro ---------- */
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function isDark() {
    var a = document.documentElement.getAttribute("data-theme");
    return a ? a === "dark" : mq.matches;
  }
  function updateThemeButton() {
    var b = $("#themeToggle"), d = isDark();
    b.setAttribute("aria-label", d ? t("theme.toLight") : t("theme.toDark"));
    b.querySelector("use").setAttribute("href", d ? "#i-sun" : "#i-moon");
  }
  $("#themeToggle").addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next); store("ch-theme", next); updateThemeButton();
  });
  if (mq.addEventListener) mq.addEventListener("change", updateThemeButton);

  /* ---------- 3. Navegación ---------- */
  var menuBtn = $("#menuBtn"), mobileNav = $("#mobileNav");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open)); mobileNav.hidden = !open;
    menuBtn.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
    menuBtn.setAttribute("aria-label", open ? t("nav.menuClose") : t("nav.menu"));
  }
  menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
  $$("a", mobileNav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !mobileNav.hidden) { setMenu(false); menuBtn.focus(); } });

  // Enlace activo según la sección visible + barra de progreso
  var navLinks = $$(".nav-links a");
  var sections = navLinks.map(function (a) { return $(a.getAttribute("href")); });
  var progress = $("#progress"), ticking = false;
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
    var y = window.scrollY + window.innerHeight * 0.35, active = -1;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) active = i; });
    navLinks.forEach(function (a, i) { if (i === active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- 4. Proyectos y filtros ---------- */
  var filter = "all";
  var CATS = ["all", "fullstack", "desarrollo", "diseno"];

  function img(base, alt, sizes, cls, eager) {
    return '<img src="' + base + '-sm.webp" srcset="' + base + '-sm.webp 800w, ' + base + '-lg.webp 1600w" sizes="' + sizes + '"' +
      ' alt="' + esc(alt) + '"' + (eager ? "" : ' loading="lazy" decoding="async"') + (cls ? ' class="' + cls + '"' : "") + ' width="800" height="500">';
  }
  function phoneImg(base, alt) {
    return '<img src="' + base + '-sm.webp" srcset="' + base + '-sm.webp 400w, ' + base + '-lg.webp 800w" sizes="200px" alt="' + esc(alt) + '" loading="lazy" decoding="async" width="400" height="866">';
  }
  function browser(url, inner) {
    return '<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span class="browser-url">' + esc(url || "") + '</span></div><div class="browser-view">' + inner + "</div></div>";
  }
  function phone(inner) { return '<div class="phone"><div class="phone-view">' + inner + "</div></div>"; }

  function chatCover() {
    return '<div class="chat-phone" aria-hidden="true"><div class="chat-head"><span class="chat-av">TA</span><span>Trans Andes<small>en línea</small></span></div><div class="chat-cover">' +
      '<div class="bubble in">' + esc(t("chat.b1")) + "</div>" +
      '<div class="bubble out">' + esc(t("chat.b2")) + "</div>" +
      '<div class="bubble in pin"><svg><use href="#i-pin"/></svg>' + esc(t("chat.b3")) + "</div>" +
      '<div class="bubble out">' + esc(t("chat.b4")) + "</div>" +
      "</div></div>";
  }

  function renderFilters() {
    var box = $("#filters");
    box.innerHTML = CATS.map(function (c) {
      var n = c === "all" ? PROJECTS.length : PROJECTS.filter(function (p) { return p.categories.indexOf(c) > -1; }).length;
      return '<button type="button" class="filter" data-filter="' + c + '" aria-pressed="' + (filter === c) + '">' + esc(t("filter." + c)) + '<span class="count">' + n + "</span></button>";
    }).join("");
  }
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]"); if (!b) return;
    filter = b.getAttribute("data-filter");
    $$("[data-filter]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    var shown = 0;
    $$(".card").forEach(function (card) {
      var ok = filter === "all" || card.getAttribute("data-cats").split(" ").indexOf(filter) > -1;
      card.hidden = !ok; if (ok) shown++;
    });
    $("#filterStatus").textContent = shown + " " + t("nav.projects").toLowerCase();
  });

  function renderProjects() {
    $("#projectGrid").innerHTML = PROJECTS.map(function (p) {
      var visible = filter === "all" || p.categories.indexOf(filter) > -1;
      var media = p.noImages ? chatCover() :
        browser(p.url, img(p.cover.src, strip(L(p.title)), "(min-width:768px) 45vw, 90vw")) +
        (p.cover.phone ? phone(phoneImg(p.cover.phone, "")) : "");
      var cats = p.categories.map(function (c) { return t("filter." + c); }).join(" · ");
      return '<article class="card" data-cats="' + p.categories.join(" ") + '"' + (visible ? "" : " hidden") + ">" +
        '<div class="card-media tone-' + p.tone + '"><span class="media-chip">' + esc(L(p.badge)) + "</span>" + media + "</div>" +
        '<p class="card-meta">' + esc(p.client) + ", " + p.year + "</p>" +
        '<h3><a href="#' + p.slug + '">' + titleHtml(p) + "</a></h3>" +
        '<p class="card-value">' + esc(L(p.value)) + "</p>" +
        '<ul class="tags" aria-label="Stack">' + p.stack.slice(0, 5).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        '<span class="card-cta" aria-hidden="true">' + esc(t("card.cta")) + '<svg><use href="#i-arrow"/></svg></span>' +
        "</article>";
    }).join("");
  }

  function renderSkills() {
    var i = lang === "es" ? 0 : 1;
    $("#skills").innerHTML = SKILLS.map(function (g, n) {
      return '<div class="skill-group"><h3>' + esc(t(g.key)) + "</h3>" +
        "<p>" + esc(t(g.key + ".p")) + '</p><ul class="chips">' +
        g.items.map(function (s) { var parts = s.split("|"); return "<li>" + esc(parts[i] || parts[0]) + "</li>"; }).join("") + "</ul></div>";
    }).join("");
  }

  /* ---------- 5. Caso de estudio ---------- */
  var caseView = $("#caseView"), current = null, lastFocus = null, shotMode = "light";

  function diagram(kind) {
    if (kind === "thirds") {
      var f = function (cells, title, sub) {
        return '<div class="fieldcase"><div class="pitch" aria-hidden="true">' + cells.map(function (c, i) {
          return '<span class="' + c + '">T' + (i + 1) + "</span>"; }).join("") + "</div><p><b>" + esc(title) + "</b><span>" + esc(sub) + "</span></p></div>";
      };
      return '<figure class="diagram"><figcaption class="diagram-title">' + esc(t("dg.thirds.title")) + '</figcaption><div class="fields">' +
        f(["", "on", ""], t("dg.thirds.a"), t("dg.thirds.a2")) +
        f(["on", "on", "on"], t("dg.thirds.b"), t("dg.thirds.b2")) +
        f(["wait", "clash", "wait"], t("dg.thirds.c"), t("dg.thirds.c2")) + "</div></figure>";
    }
    if (kind === "kit") {
      var rows = function (missing) {
        return [["dg.kit.m1", "12 m", 1], ["dg.kit.m2", "4 und", 1], ["dg.kit.m3", "3 kg", missing ? 0 : 1], ["dg.kit.m4", "6 und", 1]].map(function (r) {
          return "<li><span>" + esc(t(r[0])) + "</span><span>" + r[1] + '</span><span class="' + (r[2] ? "ok" : "no") + '">' + (r[2] ? "✓" : "✗") + "</span></li>";
        }).join("");
      };
      var kit = function (missing) {
        return '<div class="kit ' + (missing ? "fail" : "pass") + '"><header>' + esc(t("dg.kit.name")) + "<span>→ " + esc(t("dg.kit.bus")) + "</span></header><ul>" + rows(missing) +
          '</ul><p class="verdict">' + esc(t(missing ? "dg.kit.fail" : "dg.kit.pass")) + "</p></div>";
      };
      return '<figure class="diagram"><figcaption class="diagram-title">' + esc(t("dg.kit.title")) + '</figcaption><div class="kitflow">' + kit(true) + kit(false) +
        '</div><p class="chat-note" style="text-align:left">' + esc(t("dg.kit.note")) + "</p></figure>";
    }
    if (kind === "tokens") {
      return '<figure class="diagram"><figcaption class="diagram-title">' + esc(t("dg.tokens.title")) + '</figcaption><div class="tokens">' +
        '<div class="token"><div class="sw" style="background:#173162"></div>' + esc(t("dg.tokens.navy")) + "</div>" +
        '<div class="token"><div class="sw" style="background:#E4B750"></div>' + esc(t("dg.tokens.gold")) + "</div>" +
        '<div class="token"><div class="sw" style="background:linear-gradient(135deg,#1d3566,#0f1d3a);position:relative;overflow:hidden"><div style="position:absolute;inset:12px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);backdrop-filter:blur(4px)"></div></div>' + esc(t("dg.tokens.glass")) + "</div>" +
        '<div class="token"><div class="sw" style="background-image:linear-gradient(var(--line-strong) 1px,transparent 1px),linear-gradient(90deg,var(--line-strong) 1px,transparent 1px);background-size:8px 8px"></div>' + esc(t("dg.tokens.grid")) + " <span>8 px · 1 px · píldora</span></div>" +
        '<div class="token"><div class="sw" style="display:grid;place-items:center;font:700 26px/1 Arial,sans-serif;letter-spacing:-.02em;background:var(--surface-2)">Aa</div>' + esc(t("dg.tokens.type")) + " <span>Inter Tight · Inter</span></div>" +
        "</div></figure>";
    }
    if (kind === "arch") {
      var n = function (a, b) { return '<div class="node"><b>' + esc(t(a)) + "</b><span>" + esc(t(b)) + "</span></div>"; };
      var ar = '<span class="arrow" aria-hidden="true">→</span>';
      return '<figure class="diagram"><figcaption class="diagram-title">' + esc(t("dg.arch.title")) + '</figcaption><div class="arch">' +
        n("dg.arch.n1", "dg.arch.n1s") + ar + n("dg.arch.n2", "dg.arch.n2s") + ar + n("dg.arch.n3", "dg.arch.n3s") + ar + n("dg.arch.n4", "dg.arch.n4s") + "</div></figure>";
    }
    return "";
  }

  var lbItems = [];
  function shotSrc(item) { return shotMode === "dark" && item.dark ? item.dark : item.src; }

  function renderCase(p) {
    var idx = PROJECTS.indexOf(p), next = PROJECTS[(idx + 1) % PROJECTS.length];
    var secs = ["context", "problem", "role", "process", "solution", "results", "stack", "learnings"];
    var sec = function (id, n, body) {
      return '<section class="case-section" id="c-' + id + '" aria-labelledby="h-' + id + '"><h2 id="h-' + id + '"><span class="n">' + String(n).padStart(2, "0") + "</span>" + esc(t("case.s." + id)) + "</h2>" + body + "</section>";
    };
    lbItems = [];
    var galleryHtml = "";
    if (p.gallery.length || p.phones.length) {
      var tools = p.themeToggle ? '<div class="gallery-tools"><span class="sub-h">' + esc(t("case.desktop")) + '</span><div class="seg" role="group" aria-label="' + esc(t("case.mode")) + '">' +
        '<button type="button" data-mode="light" aria-pressed="' + (shotMode === "light") + '">' + esc(t("case.light")) + "</button>" +
        '<button type="button" data-mode="dark" aria-pressed="' + (shotMode === "dark") + '">' + esc(t("case.dark")) + "</button></div></div>" :
        '<p class="sub-h">' + esc(t("case.desktop")) + "</p>";
      galleryHtml += tools + '<div class="gallery">' + p.gallery.map(function (g) {
        var i = lbItems.push({ item: g, phone: false }) - 1, cap = L(g.cap);
        return '<figure class="shot"><button type="button" data-lb="' + i + '" aria-label="' + esc(t("case.zoom") + ": " + strip(cap)) + '">' +
          browser(p.url, img(shotSrc(g), strip(cap), "(min-width:1024px) 480px, 90vw", "", false)) + "</button><figcaption>" + cap + "</figcaption></figure>";
      }).join("") + "</div>";
      if (p.phones.length) {
        galleryHtml += '<p class="sub-h">' + esc(t("case.mobile")) + '</p><div class="gallery phones">' + p.phones.map(function (g) {
          var i = lbItems.push({ item: g, phone: true }) - 1, cap = L(g.cap);
          return '<figure class="shot"><button type="button" data-lb="' + i + '" aria-label="' + esc(t("case.zoom") + ": " + cap) + '">' +
            phone(phoneImg(shotSrc(g), cap)) + "</button><figcaption>" + esc(cap) + "</figcaption></figure>";
        }).join("") + "</div>";
      }
    }
    var cover = p.noImages
      ? '<div class="stage tone-' + p.tone + ' card-media" style="aspect-ratio:auto">' + chatCover() + "</div>"
      : '<div class="stage card-media tone-' + p.tone + '" style="aspect-ratio:auto">' + browser(p.url, img(p.cover.src, strip(L(p.title)), "(min-width:1200px) 1000px, 92vw", "", true)) + (p.cover.phone ? phone(phoneImg(p.cover.phone, "")) : "") + "</div>";

    var html =
      '<header class="container case-hero">' +
        '<p class="case-kicker">' + esc(L(p.type)) + ", " + p.year + "</p>" +
        '<h1 id="case-title" tabindex="-1">' + titleHtml(p) + "</h1>" +
        '<p class="value">' + esc(L(p.value)) + "</p>" +
        '<dl class="case-facts"><div><dt>' + esc(t("case.client")) + "</dt><dd>" + esc(p.client) + "</dd></div>" +
        "<div><dt>" + esc(t("case.role")) + "</dt><dd>" + esc(L(p.role)) + "</dd></div>" +
        "<div><dt>" + esc(t("case.year")) + "</dt><dd>" + p.year + "</dd></div>" +
        "<div><dt>" + esc(t("case.status")) + "</dt><dd>" + esc(L(p.status)) + "</dd></div></dl>" +
        (p.links && p.links.length ? '<div class="case-links">' + p.links.map(function (l) { return '<a class="btn btn-ghost btn-sm" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(L(l.label)) + '<svg aria-hidden="true"><use href="#i-arrow-up-right"/></svg></a>'; }).join("") + "</div>" : "") +
      "</header>" +
      '<div class="container case-cover">' + cover + "</div>" +
      '<div class="container case-body">' +
        '<nav class="case-toc" aria-label="' + esc(t("case.toc")) + '"><ol>' + secs.map(function (s) { return '<li><a href="#c-' + s + '" data-toc="' + s + '">' + esc(t("case.s." + s)) + "</a></li>"; }).join("") + "</ol></nav>" +
        '<div class="case-content">' +
          sec("context", 1, '<div class="prose">' + L(p.context) + "</div>") +
          sec("problem", 2, '<div class="prose">' + L(p.problem) + "</div>") +
          sec("role", 3, '<div class="prose">' + L(p.roleText) + "</div>") +
          sec("process", 4, '<div class="steps-grid">' + p.process.map(function (s) {
            return '<div class="step-card"><span class="k">' + esc(L(s.k)) + "</span><h3>" + esc(L(s.t)) + "</h3><p>" + L(s.d) + "</p></div>"; }).join("") + "</div>" + diagram(p.diagram)) +
          sec("solution", 5, (p.galleryNote ? '<p class="case-note">' + esc(L(p.galleryNote)) + "</p>" : "") + galleryHtml) +
          sec("results", 6, '<div class="metrics">' + p.metrics.map(function (m) { return '<div class="metric"><b>' + esc(m.v) + "</b><span>" + esc(L(m.l)) + "</span></div>"; }).join("") +
            '</div><ul class="points">' + p.results.map(function (r) { return "<li>" + L(r) + "</li>"; }).join("") + "</ul>") +
          sec("stack", 7, '<ul class="tags">' + p.stack.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>") +
          sec("learnings", 8, '<ul class="points">' + p.learnings.map(function (r) { return "<li>" + L(r) + "</li>"; }).join("") + "</ul>") +
          '<div class="case-next"><span class="eyebrow">' + esc(t("case.nextLabel")) + '</span><a href="#' + next.slug + '">' + esc(L(next.title)) + '<svg aria-hidden="true"><use href="#i-arrow"/></svg></a></div>' +
        "</div>" +
      "</div>";
    $("#caseContent").innerHTML = html;
    $("#caseCrumb").textContent = t("nav.projects") + " / " + L(p.title);
    setupToc();
  }

  // Índice lateral con la sección activa
  var tocObserver = null;
  function setupToc() {
    if (tocObserver) tocObserver.disconnect();
    if (!("IntersectionObserver" in window)) return;
    tocObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.id.replace("c-", "");
          $$("[data-toc]", caseView).forEach(function (a) { if (a.getAttribute("data-toc") === id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
        }
      });
    }, { root: caseView, rootMargin: "-30% 0px -60% 0px" });
    $$(".case-section", caseView).forEach(function (s) { tocObserver.observe(s); });
  }

  caseView.addEventListener("click", function (e) {
    var toc = e.target.closest("[data-toc]");
    if (toc) { e.preventDefault(); var target = $("#c-" + toc.getAttribute("data-toc"), caseView); target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); return; }
    var m = e.target.closest("[data-mode]");
    if (m) {
      shotMode = m.getAttribute("data-mode");
      $$("[data-mode]", caseView).forEach(function (b) { b.setAttribute("aria-pressed", String(b === m)); });
      $$("[data-lb]", caseView).forEach(function (btn) {
        var it = lbItems[+btn.getAttribute("data-lb")], im = btn.querySelector("img"), base = shotSrc(it.item);
        im.src = base + "-sm.webp";
        im.srcset = it.phone ? base + "-sm.webp 400w, " + base + "-lg.webp 800w" : base + "-sm.webp 800w, " + base + "-lg.webp 1600w";
      });
      return;
    }
    var lb = e.target.closest("[data-lb]");
    if (lb) openLightbox(+lb.getAttribute("data-lb"));
  });

  function openCase(slug) {
    var p = PROJECTS.filter(function (x) { return x.slug === slug; })[0];
    if (!p) return false;
    if (!caseView.open) lastFocus = document.activeElement;
    current = p; renderCase(p);
    if (!caseView.open) { caseView.showModal(); document.documentElement.style.overflow = "hidden"; }
    caseView.scrollTop = 0;
    var h = $("#case-title"); if (h) h.focus({ preventScroll: true });
    return true;
  }
  function closeCase(fromHash) {
    if (!caseView.open) return;
    var slug = current && current.slug;
    caseView.close(); current = null; document.documentElement.style.overflow = "";
    if (!fromHash) setHash("proyectos");
    var link = slug && $('.card a[href="#' + slug + '"]');
    (link || lastFocus || document.body).focus({ preventScroll: false });
  }
  function setHash(h) { if (location.hash !== "#" + h) history.pushState(null, "", "#" + h); }

  caseView.addEventListener("cancel", function (e) { e.preventDefault(); if (!$("#lightbox").open) closeCase(false); });
  $("#caseBack").addEventListener("click", function () { closeCase(false); });
  function step(d) { var i = PROJECTS.indexOf(current); var n = PROJECTS[(i + d + PROJECTS.length) % PROJECTS.length]; setHash(n.slug); openCase(n.slug); }
  $("#casePrev").addEventListener("click", function () { step(-1); });
  $("#caseNext").addEventListener("click", function () { step(1); });

  // Rutas: #<slug> abre el caso; cualquier otro hash lo cierra
  function route() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (PROJECTS.some(function (p) { return p.slug === h; })) openCase(h);
    else if (caseView.open) closeCase(true);
  }
  window.addEventListener("hashchange", route);
  window.addEventListener("popstate", route);
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var slug = a.getAttribute("href").slice(1);
    if (PROJECTS.some(function (p) { return p.slug === slug; })) { e.preventDefault(); setHash(slug); openCase(slug); }
  });

  /* ---------- 6. Visor de capturas ---------- */
  var lb = $("#lightbox"), lbIndex = 0;
  function showLb(i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    var it = lbItems[lbIndex], base = shotSrc(it.item), cap = L(it.item.cap);
    var im = $("#lbImg"); im.src = base + "-lg.webp"; im.alt = strip(cap);
    $("#lbStage").classList.toggle("is-phone", it.phone); $("#lbStage").scrollTop = 0;
    $("#lbCap").innerHTML = it.phone ? esc(cap) : cap;
    $("#lbCount").textContent = (lbIndex + 1) + " / " + lbItems.length + " · " + (current ? L(current.title) : "");
  }
  function openLightbox(i) { showLb(i); lb.showModal(); $("#lbClose").focus(); }
  $("#lbClose").addEventListener("click", function () { lb.close(); });
  $("#lbPrev").addEventListener("click", function () { showLb(lbIndex - 1); });
  $("#lbNext").addEventListener("click", function () { showLb(lbIndex + 1); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") showLb(lbIndex + 1);
    if (e.key === "ArrowLeft") showLb(lbIndex - 1);
  });
  lb.addEventListener("close", function () { var b = $('[data-lb="' + lbIndex + '"]', caseView); if (b) b.focus(); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.id === "lbStage") lb.close(); });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1)); tx = null; });

  /* ---------- 7. Contacto ---------- */
  function copyText(text, onDone) {
    var ok = function () { onDone(true); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, function () { onDone(false); });
    else onDone(false);
  }
  $("#copyEmail").addEventListener("click", function () {
    copyText(SITE.email, function (ok) {
      $("#copyStatus").textContent = ok ? t("contact.copied") : SITE.email;
      if (!ok) { var r = document.createRange(); r.selectNodeContents($(".email-link")); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      var b = $("#copyEmail"); b.querySelector("use").setAttribute("href", ok ? "#i-arrow" : "#i-copy");
      setTimeout(function () { b.querySelector("use").setAttribute("href", "#i-copy"); }, 1600);
    });
  });

  var form = $("#contactForm");
  var rules = {
    "f-name": function (v) { return v.trim().length >= 2 ? "" : t("form.err.name"); },
    "f-email": function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : t("form.err.email"); },
    "f-msg": function (v) { return v.trim().length >= 20 ? "" : t("form.err.msg"); }
  };
  function validate(id) {
    var el = $("#" + id), msg = rules[id](el.value);
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    $("#e-" + id.slice(2)).textContent = msg;
    return !msg;
  }
  Object.keys(rules).forEach(function (id) {
    $("#" + id).addEventListener("blur", function () { if (this.value) validate(id); });
    $("#" + id).addEventListener("input", function () { if (this.getAttribute("aria-invalid") === "true") validate(id); });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = Object.keys(rules).filter(function (id) { return !validate(id); });
    if (bad.length) { $("#" + bad[0]).focus(); return; }
    if ($("#f-hp").value) return; // trampa anti-spam
    var data = { name: $("#f-name").value.trim(), email: $("#f-email").value.trim(), type: $("#f-type").value, message: $("#f-msg").value.trim() };
    var status = $("#formStatus"), btn = $("#sendBtn");

    if (SITE.formEndpoint) {
      btn.disabled = true; btn.querySelector("span").textContent = t("form.sending");
      fetch(SITE.formEndpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); status.innerHTML = "<p>" + esc(t("form.ok")) + "</p>"; form.reset(); })
        .catch(function () { status.innerHTML = "<p>" + esc(t("form.fail")) + "</p>"; })
        .then(function () { status.hidden = false; btn.disabled = false; btn.querySelector("span").textContent = t("form.send"); });
      return;
    }
    // Sin servicio configurado: se prepara el mensaje para el correo del visitante
    var subject = (lang === "es" ? "Contacto desde el portafolio" : "Contact from portfolio") + (data.type ? " · " + data.type : "");
    var body = data.message + "\n\n— " + data.name + " (" + data.email + ")";
    var mailto = "mailto:" + SITE.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    status.innerHTML = "<p>" + esc(t("form.draft")) + '</p><div class="actions"><a class="btn btn-primary btn-sm" href="' + mailto + '">' + esc(t("form.openMail")) +
      '</a><button type="button" class="btn btn-ghost btn-sm" id="copyMsg">' + esc(t("form.copyMsg")) + "</button></div>";
    status.hidden = false;
    $("#copyMsg").addEventListener("click", function () {
      var b = this; copyText("Para: " + SITE.email + "\nAsunto: " + subject + "\n\n" + body, function (ok) { if (ok) b.textContent = t("form.copiedMsg"); });
    });
  });

  /* ---------- 8. Aparición al hacer scroll ---------- */
  function setupReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".section-head, .card, .skill-group, .process li, .tl-item, .side-card, .about-grid > *, .contact-grid > *").forEach(function (el) {
      // Solo se anima lo que está fuera de la primera pantalla: la vista inicial siempre está completa.
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("will-reveal"); io.observe(el); }
    });
  }

  /* ---------- Inicio ---------- */
  applyI18n();
  onScroll();
  setupReveal();
  route();
})();
