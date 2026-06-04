"use client";

import { motion } from "motion/react";
import { Instagram, Facebook, Linkedin, Mail, Phone } from "lucide-react";

const FOOTER_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Our Approach", href: "#model" },
      { label: "Spark Studio", href: "#services" },
      { label: "About", href: "#about" },
      { label: "FAQs", href: "#faq" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Admissions", href: "#connect" },
      { label: "info@actonsb.org", href: "mailto:info@actonsb.org" },
      { label: "(805) 335-1796", href: "tel:+18053351796" },
      { label: "50 E. Alamar Ave, Santa Barbara, CA", href: "#" },
    ],
  },
  {
    heading: "Visit",
    links: [
      { label: "Mon to Fri, 8:00 to 3:30", href: "#" },
      { label: "Tours by appointment", href: "#connect" },
      { label: "@acton_sb", href: "https://instagram.com/acton_sb" },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: "https://instagram.com/acton_sb", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Linkedin, href: "https://linkedin.com/company/acton-academy-santa-barbara", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:info@actonsb.org", label: "Email" },
  { Icon: Phone, href: "tel:+18053351796", label: "Phone" },
];

export function Footer() {
  return (
    <section className="relative w-full overflow-hidden px-3 pb-3">
      <div className="relative overflow-hidden rounded-3xl">
        {/* video background */}
        <video
          src={FOOTER_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-[1] bg-black/55" aria-hidden />

        {/* liquid glass panel */}
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="liquid-glass relative z-10 w-full rounded-3xl p-6 text-white/70 md:p-12"
        >
          {/* top grid */}
          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            {/* brand */}
            <div className="md:col-span-5">
              <span className="inline-flex items-center rounded-2xl bg-white/95 px-5 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Acton Academy Santa Barbara" className="h-9 w-auto" />
              </span>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
                A learner-driven micro-school in Santa Barbara for ages 4 to 7. We
                believe every child has a calling.
              </p>
            </div>

            {/* link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
              {columns.map((col) => (
                <div key={col.heading}>
                  <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                    {col.heading}
                  </p>
                  <ul className="space-y-2 text-xs text-white/70">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} className="transition-colors hover:text-white">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:gap-4">
            <p className="text-[10px] uppercase tracking-widest text-white/50">
              © Acton Academy Santa Barbara, 2026 · Curiosity · Passion · Courage
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-white/50">
                Join the journey:
              </span>
              <div className="flex items-center gap-4">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
