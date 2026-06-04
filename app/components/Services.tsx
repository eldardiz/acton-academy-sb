"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    title: "Whole-Child Development",
    body: "We nurture the head, heart, and hands together, so children grow in mind, character, and body, not just in test scores.",
    img: "/images/kids-gardening.jpg",
    alt: "Children planting and tending a garden together",
  },
  {
    title: "Purposeful Play",
    body: "Play is serious work at this age. Through it children build problem-solving, creativity, language, and the simple joy of discovery.",
    img: "/images/coaching.jpg",
    alt: "Children at play outdoors",
  },
  {
    title: "Montessori-Inspired Learning",
    body: "Hands-on, self-directed materials let young learners explore at their own pace and follow their own questions wherever they lead.",
    img: "/images/team.jpg",
    alt: "Open natural landscape",
  },
  {
    title: "Character and Community",
    body: "Children practice kindness, honesty, and courage in a close community where every learner is known and every learner belongs.",
    img: "/images/nonprofit.jpg",
    alt: "Warm horizon at dusk",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <div className="max-w-2xl">
        <span className="eyebrow">✦ Spark Studio · Ages 4 to 7</span>
        <h2 className="font-display mt-6 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.06] text-ink">
          Learning through wonder, play, and purpose
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((s, i) => (
          <motion.a
            key={s.title}
            href="#connect"
            initial={{ y: 26, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: (i % 2) * 0.08 }}
            className="block-dark group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[26px] p-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.img}
              alt={s.alt}
              className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,16,11,0.25) 0%, rgba(20,16,11,0.1) 40%, rgba(20,16,11,0.78) 100%)",
              }}
              aria-hidden
            />
            <div className="relative z-[2]">
              <h3 className="text-[24px] font-semibold tracking-[-0.01em] text-cream">
                {s.title}
              </h3>
              <p className="mt-2 max-w-md text-[14.5px] leading-[1.55] text-cream/75">
                {s.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-cream/90">
                Explore
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
