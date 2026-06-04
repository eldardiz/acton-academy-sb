"use client";

import { motion } from "framer-motion";

const links = [
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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-2">
        {/* circular monogram button */}
        <a
          href="#"
          aria-label="Acton Academy Santa Barbara"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-sand font-display text-[15px] text-ink"
        >
          AS
        </a>

        {/* links pill */}
        <div className="flex items-center gap-1 rounded-full bg-sand/90 px-2.5 py-2 backdrop-blur-md">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-[14px] text-ink/80 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#connect"
            className="ml-1 rounded-full bg-espresso px-4 py-1.5 text-[14px] font-medium text-cream transition-colors hover:bg-[#2c241a]"
          >
            Admissions
          </a>
        </div>
      </div>
    </motion.header>
  );
}
