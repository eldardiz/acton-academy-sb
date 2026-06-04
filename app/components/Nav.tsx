"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Osmo Mega Navigation (directional hover) — logic kept faithful to the
   original resource; only initialized via useEffect instead of DOMContentLoaded. */
function initMegaNavDirectionalHover() {
  const DUR = {
    bgMorph: 0.4,
    contentIn: 0.3,
    contentOut: 0.2,
    stagger: 0.25,
    backdropIn: 0.3,
    backdropOut: 0.2,
    openScale: 0.35,
    closeScale: 0.25,
  };

  const HOVER_ENTER = 120;
  const HOVER_LEAVE = 150;

  const menuWrap = document.querySelector("[data-menu-wrap]");
  const navList = document.querySelector("[data-nav-list]");
  const dropWrapper = document.querySelector("[data-dropdown-wrapper]");
  const dropContainer = document.querySelector("[data-dropdown-container]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const toggles = [...document.querySelectorAll("[data-dropdown-toggle]")];
  const panels = [...document.querySelectorAll("[data-nav-content]")];
  const burger = document.querySelector("[data-burger-toggle]");
  const backBtn = document.querySelector("[data-mobile-back]");
  const logo = document.querySelector("[data-menu-logo]");
  if (!menuWrap || !navList || !dropWrapper || !dropContainer || !backdrop || !burger || !backBtn || !logo) return;
  const [lineTop, lineMid, lineBot] = ["top", "mid", "bot"].map(
    (id) => document.querySelector(`[data-burger-line='${id}']`)
  );

  const state = {
    isOpen: false,
    activePanel: null as string | null,
    activePanelIndex: -1,
    isMobile: window.innerWidth <= 991,
    mobileMenuOpen: false,
    mobilePanelActive: null as string | null,
    hoverTimer: null as ReturnType<typeof setTimeout> | null,
    leaveTimer: null as ReturnType<typeof setTimeout> | null,
    tl: null as gsap.core.Timeline | null,
    mobileTl: null as gsap.core.Timeline | null,
    mobilePanelTl: null as gsap.core.Timeline | null,
  };

  const getPanel = (name: string) => document.querySelector(`[data-nav-content="${name}"]`);
  const getToggle = (name: string) => document.querySelector(`[data-dropdown-toggle="${name}"]`);
  const getFade = (el: Element) => el.querySelectorAll("[data-menu-fade]");
  const getNavItems = () => navList.querySelectorAll("[data-nav-list-item]");
  const getIndex = (name: string) => toggles.indexOf(getToggle(name) as Element);
  const stagger = (n: number) => (n <= 1 ? 0 : { amount: DUR.stagger });

  function clearTimers() {
    if (state.hoverTimer) clearTimeout(state.hoverTimer);
    if (state.leaveTimer) clearTimeout(state.leaveTimer);
    state.hoverTimer = state.leaveTimer = null;
  }

  function killTl(key: "tl" | "mobileTl" | "mobilePanelTl") {
    if (state[key]) { state[key]!.kill(); state[key] = null; }
  }

  function killDropdown() {
    killTl("tl");
    gsap.killTweensOf(dropContainer);
    gsap.killTweensOf(backdrop);
    panels.forEach((p) => { gsap.killTweensOf(p); gsap.killTweensOf(getFade(p)); });
  }

  function killMobile() {
    killTl("mobileTl");
    gsap.killTweensOf([navList, lineTop, lineMid, lineBot]);
  }

  function killMobilePanel() {
    killTl("mobilePanelTl");
    gsap.killTweensOf(getNavItems());
    gsap.killTweensOf([backBtn, logo]);
    panels.forEach((p) => { gsap.killTweensOf(p); gsap.killTweensOf(getFade(p)); });
  }

  function resetToggles() {
    toggles.forEach((t) => t.setAttribute("aria-expanded", "false"));
  }

  function resetDesktop() {
    panels.forEach((p) => {
      gsap.set(p, { visibility: "hidden", opacity: 0, pointerEvents: "none", x: 0, y: 0, xPercent: 0 });
      gsap.set(getFade(p), { autoAlpha: 0, x: 0, y: 0, xPercent: 0 });
    });
    gsap.set(dropContainer, { height: 0, clearProps: "transform" });
    gsap.set(backdrop, { autoAlpha: 0 });
    menuWrap!.setAttribute("data-menu-open", "false");
    resetToggles();
  }

  function setupMobile() {
    panels.forEach((p) => {
      gsap.set(p, { autoAlpha: 0, xPercent: 0, visibility: "visible", pointerEvents: "none" });
      gsap.set(getFade(p), { xPercent: 20, autoAlpha: 0 });
    });
    gsap.set(getNavItems(), { xPercent: 0, y: 0, autoAlpha: 1 });
    gsap.set(navList, { autoAlpha: 0, x: 0 });
    gsap.set(backBtn, { autoAlpha: 0 });
    gsap.set(logo, { autoAlpha: 1 });
    gsap.set(dropContainer, { clearProps: "height" });
    gsap.set(backdrop, { autoAlpha: 0 });
  }

  function measurePanel(name: string) {
    const el = getPanel(name) as HTMLElement | null;
    if (!el) return 0;
    const s = el.style;
    const prev = [s.visibility, s.opacity, s.pointerEvents];
    Object.assign(s, { visibility: "visible", opacity: "0", pointerEvents: "none" });
    const h = el.getBoundingClientRect().height;
    [s.visibility, s.opacity, s.pointerEvents] = prev;
    return h;
  }

  function openDropdown(panelName: string) {
    if (state.isOpen && state.activePanel === panelName) return;
    if (state.isOpen) return switchPanel(state.activePanel!, panelName);

    const height = measurePanel(panelName);
    if (!height) return;

    killDropdown();
    resetDesktop();

    const el = getPanel(panelName)!;
    const fade = getFade(el);
    const toggle = getToggle(panelName);

    state.isOpen = true;
    state.activePanel = panelName;
    state.activePanelIndex = getIndex(panelName);
    menuWrap!.setAttribute("data-menu-open", "true");
    if (toggle) toggle.setAttribute("aria-expanded", "true");

    gsap.set(dropContainer, { height: 0 });

    const tl = gsap.timeline();
    state.tl = tl;
    tl.to(backdrop, { autoAlpha: 1, duration: DUR.backdropIn, ease: "power2.out" }, 0);
    tl.to(dropContainer, { height, duration: DUR.openScale, ease: "power3.out" }, 0);
    tl.set(el, { visibility: "visible", opacity: 1, pointerEvents: "auto" }, 0.05);
    if (fade.length) {
      tl.fromTo(fade,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: DUR.contentIn, stagger: stagger(fade.length), ease: "power3.out" },
        0.1
      );
    }
  }

  function closeDropdown() {
    if (!state.isOpen) return;
    const el = getPanel(state.activePanel!);
    const fade = el ? getFade(el) : [];

    killDropdown();

    const tl = gsap.timeline({
      onComplete() {
        state.isOpen = false;
        state.activePanel = null;
        state.activePanelIndex = -1;
        state.tl = null;
        resetDesktop();
      },
    });
    state.tl = tl;
    if (fade.length) tl.to(fade, { autoAlpha: 0, y: -4, duration: DUR.contentOut * 0.7, ease: "power2.in" }, 0);
    tl.to(dropContainer, { height: 0, duration: DUR.closeScale, ease: "power2.in" }, 0.05);
    tl.to(backdrop, { autoAlpha: 0, duration: DUR.backdropOut, ease: "power2.out" }, 0);
    if (el) tl.set(el, { visibility: "hidden", opacity: 0, pointerEvents: "none" });
  }

  function switchPanel(fromName: string, toName: string) {
    const dir = getIndex(toName) > getIndex(fromName) ? 1 : -1;
    const fromEl = getPanel(fromName), toEl = getPanel(toName);
    if (!fromEl || !toEl) return;

    const fromFade = getFade(fromEl), toFade = getFade(toEl);
    const toHeight = measurePanel(toName);
    if (!toHeight) return;

    killDropdown();

    panels.forEach((p) => {
      gsap.set(p, { visibility: "hidden", opacity: 0, pointerEvents: "none", xPercent: 0 });
      gsap.set(getFade(p), { autoAlpha: 0, x: 0, y: 0 });
    });
    gsap.set(fromEl, { visibility: "visible", opacity: 1, pointerEvents: "auto", x: 0 });
    if (fromFade.length) gsap.set(fromFade, { autoAlpha: 1, x: 0, y: 0 });
    gsap.set(backdrop, { autoAlpha: 1 });

    const toToggle = getToggle(toName);
    state.activePanel = toName;
    state.activePanelIndex = getIndex(toName);
    resetToggles();
    if (toToggle) toToggle.setAttribute("aria-expanded", "true");

    const xOut = dir * -30, xIn = dir * 30;
    const tl = gsap.timeline();
    state.tl = tl;

    if (fromFade.length) tl.to(fromFade, { autoAlpha: 0, x: xOut, duration: DUR.contentOut, ease: "power2.in" }, 0);
    tl.set(fromEl, { visibility: "hidden", opacity: 0, pointerEvents: "none", xPercent: 0 }, DUR.contentOut);
    if (fromFade.length) tl.set(fromFade, { x: 0 }, DUR.contentOut);
    tl.to(dropContainer, { height: toHeight, duration: DUR.bgMorph, ease: "power3.out" }, 0.05);
    tl.set(toEl, { visibility: "visible", opacity: 1, pointerEvents: "auto", xPercent: 0 }, DUR.contentOut * 0.5);
    if (toFade.length) {
      tl.fromTo(toFade,
        { autoAlpha: 0, x: xIn },
        { autoAlpha: 1, x: 0, duration: DUR.contentIn, stagger: stagger(toFade.length), ease: "power3.out" },
        DUR.contentOut * 0.6
      );
    }
  }

  function handleToggleEnter(e: Event) {
    if (state.isMobile) return;
    const name = (e.currentTarget as Element).getAttribute("data-dropdown-toggle");
    if (!name) return;
    if (state.leaveTimer) clearTimeout(state.leaveTimer);
    state.leaveTimer = null;
    if (state.hoverTimer) clearTimeout(state.hoverTimer);
    state.hoverTimer = setTimeout(() => openDropdown(name), state.isOpen ? 0 : HOVER_ENTER);
  }

  function handleToggleLeave() {
    if (state.isMobile) return;
    if (state.hoverTimer) clearTimeout(state.hoverTimer);
    state.hoverTimer = null;
    state.leaveTimer = setTimeout(closeDropdown, HOVER_LEAVE);
  }

  function handleWrapperEnter() {
    if (state.isMobile) return;
    if (state.leaveTimer) clearTimeout(state.leaveTimer);
    state.leaveTimer = null;
  }

  function handleWrapperLeave() {
    if (state.isMobile) return;
    state.leaveTimer = setTimeout(closeDropdown, HOVER_LEAVE);
  }

  function handleEscape(e: KeyboardEvent) {
    if (e.key !== "Escape") return;
    if (state.isMobile) {
      if (state.mobilePanelActive) closeMobilePanel();
      else if (state.mobileMenuOpen) closeMobileMenu();
      return;
    }
    if (state.isOpen) {
      const t = getToggle(state.activePanel!);
      closeDropdown();
      if (t) (t as HTMLElement).focus();
    }
  }

  function handleDocClick(e: MouseEvent) {
    if (state.isMobile || !state.isOpen) return;
    if (!(e.target as Element).closest("[data-menu-wrap]")) closeDropdown();
  }

  function focusFirstLink(panelName: string) {
    setTimeout(() => {
      const el = getPanel(panelName);
      if (!el) return;
      const link = el.querySelector("a");
      if (!link) return;
      gsap.set(link, { visibility: "visible" });
      (link as HTMLElement).focus();
    }, 80);
  }

  function handleKeydownOnToggle(e: KeyboardEvent) {
    if (state.isMobile) return;
    const name = (e.currentTarget as Element).getAttribute("data-dropdown-toggle")!;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (state.isOpen && state.activePanel === name) closeDropdown();
      else { openDropdown(name); focusFirstLink(name); }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!state.isOpen || state.activePanel !== name) openDropdown(name);
      focusFirstLink(name);
    }
    if (e.key === "Tab" && !e.shiftKey && state.isOpen && state.activePanel === name) {
      e.preventDefault();
      const link = getPanel(name)?.querySelector("a");
      if (link) (link as HTMLElement).focus();
    }
  }

  function handleKeydownInPanel(e: KeyboardEvent) {
    if (state.isMobile || !state.isOpen) return;
    const el = getPanel(state.activePanel!);
    if (!el) return;

    const links = [...el.querySelectorAll("a")];
    const idx = links.indexOf(document.activeElement as HTMLAnchorElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[(idx + 1) % links.length].focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx <= 0) { const t = getToggle(state.activePanel!); if (t) (t as HTMLElement).focus(); }
      else links[idx - 1].focus();
    }
    if (e.key === "Tab" && !e.shiftKey && idx === links.length - 1) {
      e.preventDefault();
      const curIdx = toggles.indexOf(getToggle(state.activePanel!) as Element);
      const next = curIdx < toggles.length - 1 ? toggles[curIdx + 1] : null;
      closeDropdown();
      if (next) (next as HTMLElement).focus();
    }
    if (e.key === "Tab" && e.shiftKey && idx === 0) {
      e.preventDefault();
      const t = getToggle(state.activePanel!);
      if (t) (t as HTMLElement).focus();
    }
  }

  function animateBurger(toX: boolean) {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    if (toX) {
      tl.to(lineTop, { y: "0.3125em", duration: 0.15 }, 0);
      tl.to(lineBot, { y: "-0.3125em", duration: 0.15 }, 0);
      tl.to(lineMid, { autoAlpha: 0, duration: 0.1 }, 0.1);
      tl.to(lineTop, { rotation: 45, duration: 0.2 }, 0.15);
      tl.to(lineBot, { rotation: -45, duration: 0.2 }, 0.15);
    } else {
      tl.to(lineTop, { rotation: 0, duration: 0.2 }, 0);
      tl.to(lineBot, { rotation: 0, duration: 0.2 }, 0);
      tl.to(lineTop, { y: 0, duration: 0.15 }, 0.15);
      tl.to(lineBot, { y: 0, duration: 0.15 }, 0.15);
      tl.to(lineMid, { autoAlpha: 1, duration: 0.1 }, 0.15);
    }
    return tl;
  }

  function openMobileMenu() {
    killMobile();
    state.mobileMenuOpen = true;
    menuWrap!.setAttribute("data-menu-open", "true");
    burger!.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    const items = getNavItems();
    const tl = gsap.timeline();
    state.mobileTl = tl;
    tl.add(animateBurger(true), 0);
    tl.to(navList, { autoAlpha: 1, duration: 0.3, ease: "power2.out" }, 0);
    if (items.length) {
      tl.fromTo(items,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power3.out" },
        0.15
      );
    }
  }

  function closeMobileMenu() {
    const hadPanel = state.mobilePanelActive;
    const panelEl = hadPanel ? getPanel(hadPanel) : null;

    killMobile();
    killMobilePanel();

    menuWrap!.setAttribute("data-menu-open", "false");
    state.mobileMenuOpen = false;
    state.mobilePanelActive = null;
    burger!.setAttribute("aria-expanded", "false");

    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = "";
        state.mobileTl = null;
        setupMobile();
      },
    });
    state.mobileTl = tl;

    tl.add(animateBurger(false), 0);

    if (hadPanel && panelEl) {
      tl.to(panelEl, { autoAlpha: 0, duration: 0.3, ease: "power2.inOut" }, 0.05);
      tl.to(backBtn, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.05);
    }
    tl.to(navList, { autoAlpha: 0, duration: 0.3, ease: "power2.inOut" }, 0.05);
  }

  function openMobilePanel(panelName: string) {
    const el = getPanel(panelName);
    if (!el) return;
    killMobilePanel();
    state.mobilePanelActive = panelName;

    const navItems = getNavItems();
    const panelFade = getFade(el);

    const tl = gsap.timeline();
    state.mobilePanelTl = tl;

    if (navItems.length) {
      tl.to(navItems, { xPercent: -10, autoAlpha: 0, duration: 0.35, stagger: 0.03, ease: "power2.in" }, 0);
    }
    tl.to(logo, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0);
    tl.to(backBtn, { autoAlpha: 1, duration: 0.25, ease: "power2.inOut" }, 0.15);
    tl.set(el, { autoAlpha: 1, xPercent: 0, pointerEvents: "auto" }, 0.2);
    if (panelFade.length) {
      tl.fromTo(panelFade,
        { xPercent: 8, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 0.3, stagger: stagger(panelFade.length), ease: "power3.out" },
        0.25
      );
    }
  }

  function closeMobilePanel() {
    if (!state.mobilePanelActive) return;
    const el = getPanel(state.mobilePanelActive);
    if (!el) return;
    killMobilePanel();

    const navItems = getNavItems();
    const panelFade = getFade(el);

    const tl = gsap.timeline({
      onComplete() { state.mobilePanelActive = null; state.mobilePanelTl = null; },
    });
    state.mobilePanelTl = tl;

    if (panelFade.length) {
      tl.to(el, { xPercent: 20, autoAlpha: 0, duration: 0.3, stagger: 0.02, ease: "power2.in" }, 0);
    }
    tl.set(el, { autoAlpha: 0, pointerEvents: "none" }, 0.25);
    tl.to(backBtn, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0);
    tl.to(logo, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }, 0.15);
    if (navItems.length) {
      tl.fromTo(navItems,
        { xPercent: -20, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 0.35, stagger: 0.03, ease: "power3.out" },
        0.25
      );
    }
  }

  function handleToggleClick(e: Event) {
    if (!state.isMobile || !state.mobileMenuOpen) return;
    const name = (e.currentTarget as Element).getAttribute("data-dropdown-toggle");
    if (name) { e.preventDefault(); openMobilePanel(name); }
  }

  let resizeTimer: ReturnType<typeof setTimeout> | null = null;
  let lastWidth = window.innerWidth;
  function handleResize() {
    const w = window.innerWidth;
    if (w === lastWidth) return;
    lastWidth = w;
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const was = state.isMobile;
      state.isMobile = window.innerWidth <= 991;

      if (was && !state.isMobile) {
        killMobile(); killMobilePanel();
        gsap.set(navList, { clearProps: "all" });
        gsap.set(getNavItems(), { clearProps: "all" });
        gsap.set(backBtn, { autoAlpha: 0 });
        gsap.set(logo, { clearProps: "all" });
        gsap.set([lineTop, lineMid, lineBot], { rotation: 0, y: 0, autoAlpha: 1 });
        panels.forEach((p) => {
          gsap.set(p, { clearProps: "all" });
          gsap.set(getFade(p), { clearProps: "all" });
        });
        burger!.setAttribute("aria-expanded", "false");
        state.mobileMenuOpen = false;
        state.mobilePanelActive = null;
        document.body.style.overflow = "";
        resetDesktop();
      }

      if (!was && state.isMobile) {
        killDropdown();
        state.isOpen = false; state.activePanel = null; state.activePanelIndex = -1;
        clearTimers();
        menuWrap!.setAttribute("data-menu-open", "false");
        resetToggles();
        setupMobile();
      }
    }, 150);
  }

  toggles.forEach((btn) => {
    btn.addEventListener("mouseenter", handleToggleEnter);
    btn.addEventListener("mouseleave", handleToggleLeave);
    btn.addEventListener("keydown", handleKeydownOnToggle as EventListener);
    btn.addEventListener("click", handleToggleClick);
  });

  dropWrapper.addEventListener("mouseenter", handleWrapperEnter);
  dropWrapper.addEventListener("mouseleave", handleWrapperLeave);
  panels.forEach((p) => p.addEventListener("keydown", handleKeydownInPanel as EventListener));
  backdrop.addEventListener("click", closeDropdown);
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("click", handleDocClick);
  burger.addEventListener("click", () => (state.mobileMenuOpen ? closeMobileMenu() : openMobileMenu()));
  backBtn.addEventListener("click", closeMobilePanel);
  window.addEventListener("resize", handleResize);

  state.isMobile ? setupMobile() : resetDesktop();
}

const Chevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" className="mega-nav__bar-link-icon is--dropdown">
    <path d="M6.6665 8.3335L9.99984 11.6668L13.3332 8.3335" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Arrow = ({ cls = "mega-nav__bar-link-icon" }: { cls?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" className={cls}>
    <path d="M8.3335 13.3335L11.6668 10.0002L8.3335 6.66683" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Nav() {
  const inited = useRef(false);
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    initMegaNavDirectionalHover();
  }, []);

  return (
    <nav data-menu-open="false" data-menu-wrap="" className="mega-nav">
      <div className="mega-nav__bar">
        <div className="mega-nav__container">
          <div className="mega-nav__bar-start">
            <a data-menu-logo="" href="#" className="mega-nav__bar-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Acton Academy Santa Barbara" />
            </a>
            <div data-nav-list="" data-mobile-nav="" className="mega-nav__bar-inner">
              <ul className="mega-nav__bar-list">
                <li data-nav-list-item="">
                  <button data-dropdown-toggle="about" aria-expanded="false" aria-haspopup="true" className="mega-nav__bar-link is--dropdown">
                    <span className="mega-nav__bar-link-label">About</span>
                    <Chevron />
                  </button>
                </li>
                <li data-nav-list-item="">
                  <button data-dropdown-toggle="approach" aria-expanded="false" aria-haspopup="true" className="mega-nav__bar-link is--dropdown">
                    <span className="mega-nav__bar-link-label">Our Approach</span>
                    <Chevron />
                  </button>
                </li>
                <li data-nav-list-item="">
                  <button data-dropdown-toggle="spark" aria-expanded="false" aria-haspopup="true" className="mega-nav__bar-link is--dropdown">
                    <span className="mega-nav__bar-link-label">Spark Studio</span>
                    <Chevron />
                  </button>
                </li>
                <li data-nav-list-item="">
                  <a href="#faq" className="mega-nav__bar-link"><span className="mega-nav__bar-link-label">FAQs</span></a>
                </li>
              </ul>
              <ul data-nav-list-item="" className="mega-nav__bar-list is--actions">
                <li className="mega-nav__bar-action">
                  <a href="#connect" className="mega-nav__bar-cta is--secondary"><span className="mega-nav__bar-link-label">Book a tour</span></a>
                </li>
                <li className="mega-nav__bar-action">
                  <a href="#connect" className="mega-nav__bar-cta">
                    <span className="mega-nav__bar-link-label">Admissions</span>
                    <Arrow />
                  </a>
                </li>
              </ul>
            </div>
            <div className="mega-nav__bar-end">
              <button data-burger-toggle="" aria-label="toggle menu" aria-expanded="false" className="mega-nav__burger">
                <span data-burger-line="top" className="mega-nav__burger-line"></span>
                <span data-burger-line="mid" className="mega-nav__burger-line"></span>
                <span data-burger-line="bot" className="mega-nav__burger-line"></span>
              </button>
            </div>
            <div data-mobile-back="" className="mega-nav__back">
              <button aria-label="back to menu" className="mega-nav__bar-link is--back">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" className="mega-nav__bar-link-icon">
                  <path d="M11.6665 6.6665L8.33317 9.99984L11.6665 13.3332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="mega-nav__bar-link-label">Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div data-dropdown-wrapper="" className="mega-nav__dropdown-wrapper">
        <div data-dropdown-container="" className="mega-nav__dropdown-container">
          <div data-dropdown-bg="" className="mega-nav__dropdown-bg"></div>

          {/* ABOUT */}
          <div data-panel-state="" data-nav-content="about" role="region" aria-label="about menu" className="mega-nav__dropdown-panel">
            <div className="mega-nav__dropdown-inner">
              <div data-menu-fade="" className="mega-nav__panel-col">
                <span data-menu-fade="" className="mega-nav__panel-label">The school</span>
                <ul className="mega-nav__panel-list">
                  <li data-menu-fade=""><a href="#about" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Our Founder</span><span className="mega-nav__panel-link-desc">Meet Max Peck</span></a></li>
                  <li data-menu-fade=""><a href="#mission" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Our Mission</span><span className="mega-nav__panel-link-desc">Why we exist</span></a></li>
                  <li data-menu-fade=""><a href="#model" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Our Approach</span><span className="mega-nav__panel-link-desc">How children learn</span></a></li>
                </ul>
              </div>
              <div data-menu-fade="" className="mega-nav__panel-col">
                <span data-menu-fade="" className="mega-nav__panel-label">Visit</span>
                <ul className="mega-nav__panel-list">
                  <li data-menu-fade=""><a href="#faq" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">FAQs</span><span className="mega-nav__panel-link-desc">Common questions</span></a></li>
                  <li data-menu-fade=""><a href="#connect" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Admissions</span><span className="mega-nav__panel-link-desc">Start the journey</span></a></li>
                  <li data-menu-fade=""><a href="mailto:info@actonsb.org" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Contact</span><span className="mega-nav__panel-link-desc">info@actonsb.org</span></a></li>
                </ul>
              </div>
              <div data-menu-fade="" className="mega-nav__panel-col is--colored has--card">
                <div className="mega-nav__card">
                  <div className="mega-nav__card-visual">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/spark-community.jpg" loading="lazy" alt="Families at an Acton community day" className="mega-nav__card-img" />
                  </div>
                  <div className="mega-nav__card-content">
                    <div className="mega-nav__card-text">
                      <span className="mega-nav__panel-link-text">Tour Acton Academy</span>
                      <span className="mega-nav__panel-link-desc">See Spark Studio in action</span>
                    </div>
                    <a href="#connect" className="mega-nav__card-cta">
                      <span className="mega-nav__card-cta-label">Book a tour</span>
                      <Arrow cls="mega-nav__card-cta-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OUR APPROACH */}
          <div data-panel-state="" data-nav-content="approach" role="region" aria-label="our approach menu" className="mega-nav__dropdown-panel">
            <div className="mega-nav__dropdown-inner">
              <div data-menu-fade="" className="mega-nav__panel-col">
                <span data-menu-fade="" className="mega-nav__panel-label">Core beliefs</span>
                <ul className="mega-nav__panel-list">
                  <li data-menu-fade=""><a href="#model" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Universal Capability</span><span className="mega-nav__panel-link-desc">Every child can</span></a></li>
                  <li data-menu-fade=""><a href="#model" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Learning Through Action</span><span className="mega-nav__panel-link-desc">Learn by doing</span></a></li>
                  <li data-menu-fade=""><a href="#model" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Productive Struggle</span><span className="mega-nav__panel-link-desc">Struggle builds strength</span></a></li>
                </ul>
              </div>
              <div data-menu-fade="" className="mega-nav__panel-col">
                <span data-menu-fade="" className="mega-nav__panel-label">Core beliefs</span>
                <ul className="mega-nav__panel-list">
                  <li data-menu-fade=""><a href="#model" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Autonomy with Accountability</span><span className="mega-nav__panel-link-desc">Freedom with boundaries</span></a></li>
                  <li data-menu-fade=""><a href="#model" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Character Development</span><span className="mega-nav__panel-link-desc">Who you become matters</span></a></li>
                  <li data-menu-fade=""><a href="#model" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Adventure-Based Learning</span><span className="mega-nav__panel-link-desc">School as a journey</span></a></li>
                </ul>
              </div>
              <div data-menu-fade="" className="mega-nav__panel-col is--colored">
                <span data-menu-fade="" className="mega-nav__panel-label">Explore</span>
                <ul className="mega-nav__panel-list">
                  <li data-menu-fade=""><a href="#model" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Our Approach overview</span></a></li>
                  <li data-menu-fade=""><a href="#services" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Spark Studio program</span></a></li>
                  <li data-menu-fade=""><a href="#about" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Meet the founder</span></a></li>
                  <li data-menu-fade=""><a href="#mission" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Our mission</span></a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* SPARK STUDIO */}
          <div data-panel-state="" data-nav-content="spark" role="region" aria-label="spark studio menu" className="mega-nav__dropdown-panel">
            <div className="mega-nav__dropdown-inner">
              <div data-menu-fade="" className="mega-nav__panel-col">
                <span data-menu-fade="" className="mega-nav__panel-label">Program</span>
                <ul className="mega-nav__panel-list">
                  <li data-menu-fade=""><a href="#services" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Whole-Child Development</span><span className="mega-nav__panel-link-desc">Head, heart, and hands</span></a></li>
                  <li data-menu-fade=""><a href="#services" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Purposeful Play</span><span className="mega-nav__panel-link-desc">Serious work at this age</span></a></li>
                  <li data-menu-fade=""><a href="#services" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Montessori-Inspired Learning</span><span className="mega-nav__panel-link-desc">Self-directed materials</span></a></li>
                  <li data-menu-fade=""><a href="#services" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Character and Community</span><span className="mega-nav__panel-link-desc">Kindness, honesty, courage</span></a></li>
                </ul>
              </div>
              <div data-menu-fade="" className="mega-nav__panel-col">
                <span data-menu-fade="" className="mega-nav__panel-label">Details</span>
                <ul className="mega-nav__panel-list">
                  <li data-menu-fade=""><a href="#services" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Ages 4 to 7</span><span className="mega-nav__panel-link-desc">Our Spark Studio</span></a></li>
                  <li data-menu-fade=""><a href="#connect" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Daily rhythm</span><span className="mega-nav__panel-link-desc">Mon to Fri, 8:00 to 3:30</span></a></li>
                  <li data-menu-fade=""><a href="#connect" className="mega-nav__panel-link"><span className="mega-nav__panel-link-text">Tours</span><span className="mega-nav__panel-link-desc">By appointment</span></a></li>
                </ul>
              </div>
              <div data-menu-fade="" className="mega-nav__panel-col is--colored has--card">
                <div className="mega-nav__card">
                  <div className="mega-nav__card-visual">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/spark-classroom.jpg" loading="lazy" alt="A guide working with young learners" className="mega-nav__card-img" />
                  </div>
                  <div className="mega-nav__card-content">
                    <div className="mega-nav__card-text">
                      <span className="mega-nav__panel-link-text">A day in Spark Studio</span>
                      <span className="mega-nav__panel-link-desc">Learning through wonder, play, and purpose</span>
                    </div>
                    <a href="#services" className="mega-nav__card-cta">
                      <span className="mega-nav__card-cta-label">Explore the program</span>
                      <Arrow cls="mega-nav__card-cta-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-menu-backdrop="" className="mega-nav__backdrop"></div>
    </nav>
  );
}
