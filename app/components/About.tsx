"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const credentials = [
  "Founded by a U.S. Marine Corps veteran",
  "Part of the Acton Academy network",
  "Ages 4 to 7",
  "Learner-driven",
  "Montessori-inspired",
  "Santa Barbara, CA",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="eyebrow">✦ Our Founder</span>
          <h2 className="font-display mt-6 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.06] text-ink">
            Built for children to become who they are meant to be
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          {/* portrait slot */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="block-dark relative flex aspect-[4/5] items-end overflow-hidden rounded-[26px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/forest-canopy.jpg"
              alt="Forest canopy near Santa Barbara"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.1) 45%, rgba(10,10,10,0.85) 100%)",
              }}
              aria-hidden
            />
            <div className="relative z-[2] p-8">
              <p className="font-display text-[34px] leading-none text-white">Max Peck</p>
              <p className="mt-2 text-[13px] text-white/70">
                Founder · Former U.S. Marine Corps officer
              </p>
            </div>
          </motion.div>

          {/* bio */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="space-y-4 text-[16px] leading-[1.65] text-muted"
            >
              <p>
                Max Peck is a former officer in the U.S. Marine Corps. He founded
                Acton Academy Santa Barbara for the most personal reason there
                is: his own children.
              </p>
              <p>
                He wanted a school where his son and daughter could become who
                they were meant to be, learning through curiosity and real
                challenge rather than tests and worksheets. So he built one,
                rooted in the belief that children are far more capable than
                we have been led to believe.
              </p>
              <p className="text-ink">
                That belief now anchors the whole school. Curiosity ignites here.
                Passion finds its purpose. Courage is cultivated. Opportunity
                awaits.
              </p>
            </motion.div>

            <motion.ul
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {credentials.map((c) => (
                <li
                  key={c}
                  className="rounded-full bg-sand px-3.5 py-1.5 text-[13px] text-ink/80"
                >
                  {c}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
