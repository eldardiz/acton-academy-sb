"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="px-3 pt-3">
      <div className="block-dark relative flex min-h-[88vh] flex-col justify-end overflow-hidden rounded-[34px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/kids-hiking.jpg"
          alt="Young children exploring a mountain trail together"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* scrim so text reads over the photo */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,16,11,0.35) 0%, rgba(20,16,11,0.1) 35%, rgba(20,16,11,0.7) 100%)",
          }}
          aria-hidden
        />

        <div className="relative z-[2] max-w-3xl px-7 pb-12 sm:px-12 sm:pb-16">
          <motion.span
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-1.5 text-[13px] font-medium text-cream backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cream/80" />
            A Learner-Driven School in Santa Barbara · Ages 4 to 7
          </motion.span>

          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease, delay: 0.15 }}
            className="font-display text-cream text-[clamp(2.9rem,7.5vw,6rem)] leading-[1.0] tracking-[-0.02em]"
          >
            What if school was a journey, not a system?
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.32 }}
            className="mt-6 max-w-xl text-[16px] leading-[1.6] text-cream/75"
          >
            We believe every child has a calling. Acton Academy Santa Barbara is
            a learner-driven micro-school for ages 4 to 7, where children learn
            through wonder, play, and purpose.
          </motion.p>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#connect" className="pill pill-light">
              Start the journey
              <span aria-hidden>→</span>
            </a>
            <a href="#model" className="pill pill-ghost">
              Explore our approach
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
