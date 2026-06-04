(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $  = function (s, sc) { return (sc || document).querySelector(s); };
  var $$ = function (s, sc) { return Array.prototype.slice.call((sc || document).querySelectorAll(s)); };
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---- Wire WhatsApp / Instagram / Maps links from manifest ---- */
  function wireLinks() {
    $$("[data-wa]").forEach(function (a) {
      var msg = a.getAttribute("data-wa");
      a.href = data.wa ? data.wa(msg && msg.length ? msg : undefined) : a.href;
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    $$("[data-ig]").forEach(function (a) { if (data.instagramUrl) a.href = data.instagramUrl; });
    $$("[data-maps]").forEach(function (a) {
      if (data.mapsDir) a.href = data.mapsDir;
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---- Lazy-inject the map iframe (keeps first paint fast) ---- */
  function initMap() {
    var f = $("[data-map-embed]");
    if (!f || !data.mapsEmbed) return;
    var load = function () { if (!f.src) f.src = data.mapsEmbed; };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } });
      }, { rootMargin: "300px" });
      io.observe(f);
    } else { load(); }
  }

  /* ---- Splash ---- */
  function initSplash() {
    var sp = $("#splash");
    if (!sp) return;
    var hide = function () { sp.classList.add("is-hidden"); };
    window.addEventListener("load", function () { setTimeout(hide, 1700); });
    setTimeout(hide, 3200); // safety net beyond CSS animation
  }

  /* ---- Nav: stuck state + mobile drawer ---- */
  function initNav() {
    var nav = $("#nav");
    var toggle = $("#navToggle");
    var drawer = $("#navDrawer");

    var onScroll = function () {
      if (!nav) return;
      nav.classList.toggle("is-stuck", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && drawer) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        if (open) { drawer.hidden = true; }
        else { drawer.hidden = false; }
      });
      $$("a", drawer).forEach(function (a) {
        a.addEventListener("click", function () {
          drawer.hidden = true;
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---- Reveals on scroll (IntersectionObserver, low threshold + safety) ---- */
  function initReveals() {
    var els = $$(".reveal");
    if (!els.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    els.forEach(function (el) {
      var d = parseInt(el.getAttribute("data-delay") || "0", 10);
      if (d) el.style.transitionDelay = (d * 90) + "ms";
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });

    els.forEach(function (el) { io.observe(el); });

    // Safety: reveal anything still hidden after 6s
    setTimeout(function () { els.forEach(function (el) { el.classList.add("is-in"); }); }, 6000);
  }

  /* ---- Scroll-driven parallax background: moves, blurs & brightens ---- */
  function initParallaxBg() {
    if (reduced) return;
    var sections = $$("[data-parallax-section]");
    if (!sections.length) return;

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      sections.forEach(function (sec) {
        var r = sec.getBoundingClientRect();
        // 0 when section just enters from bottom, 1 once fully scrolled past
        var p = (vh - r.top) / (vh + r.height);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        sec.style.setProperty("--p", p.toFixed(3));
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* ---- Sticky mobile CTA appears after the hero ---- */
  function initStickyCta() {
    var cta = $(".sticky-cta");
    var hero = $(".hero");
    if (!cta || !hero || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { cta.classList.toggle("is-show", !e.isIntersecting); });
    }, { threshold: 0, rootMargin: "-60px 0px 0px 0px" });
    io.observe(hero);
  }

  /* ---- Smooth anchor scrolling that accounts for the fixed nav ---- */
  function initAnchors() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (ev) {
        var id = a.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        ev.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
      });
    });
  }

  function boot() {
    safe(wireLinks, "wireLinks");
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initParallaxBg, "initParallaxBg");
    safe(initStickyCta, "initStickyCta");
    safe(initAnchors, "initAnchors");
    safe(initMap, "initMap");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }
})();
