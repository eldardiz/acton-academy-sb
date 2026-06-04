"use client";

import { motion } from "motion/react";

const links = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Our Approach", href: "#model" },
  { label: "Spark Studio", href: "#services" },
  { label: "FAQs", href: "#faq" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 z-30 w-full"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 sm:py-6">
        {/* real logo */}
        <a href="#" aria-label="Acton Academy Santa Barbara" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Acton Academy Santa Barbara" className="h-9 w-auto sm:h-10" />
        </a>

        {/* centered links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm transition-colors"
              style={{ color: i === 0 ? "#000000" : "#6F6F6F" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#connect"
          className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          Admissions
        </a>
      </nav>
    </motion.header>
  );
}
