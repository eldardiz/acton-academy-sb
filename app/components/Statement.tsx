"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type Tag = {
  label: string;
  top: string;
  left: string;
  rot: number;
  from: number; // parallax drift start (px)
  to: number; // parallax drift end (px)
};

const tags: Tag[] = [
  { label: "Universal Capability", top: "10%", left: "10%", rot: -6, from: 120, to: -120 },
  { label: "Learning Through Action", top: "6%", left: "62%", rot: 5, from: 180, to: -160 },
  { label: "Productive Struggle", top: "26%", left: "84%", rot: 8, from: 90, to: -90 },
  { label: "Autonomy with Accountability", top: "72%", left: "6%", rot: 5, from: -110, to: 130 },
  { label: "Character Development", top: "84%", left: "46%", rot: -4, from: -150, to: 150 },
  { label: "Adventure-Based Learning", top: "66%", left: "78%", rot: 7, from: -80, to: 110 },
];

function FloatTag({ tag, progress }: { tag: Tag; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [tag.from, tag.to]);
  const opacity = useTransform(progress, [0, 0.18, 0.85, 1], [0, 1, 1, 0.4]);
  return (
    <motion.span
      style={{ top: tag.top, left: tag.left, rotate: tag.rot, y, opacity }}
      className="float-tag hidden md:block"
    >
      {tag.label}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      id="mission"
      className="relative mx-auto flex min-h-[120vh] max-w-7xl items-center justify-center px-6 py-40 scroll-mt-24"
    >
      {/* scroll-driven floating tags */}
      {tags.map((t) => (
        <FloatTag key={t.label} tag={t} progress={scrollYProgress} />
      ))}

      <motion.h2
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className="font-display relative z-[2] mx-auto max-w-5xl text-center text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.04]"
        style={{ color: "#000000", letterSpacing: "-0.02em" }}
      >
        Most schools prepare children for tests. We prepare them for life.
      </motion.h2>
    </section>
  );
}
