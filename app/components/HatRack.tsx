"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    num: "01",
    icon: "♥",
    name: "Universal Capability",
    question: "Every child can.",
    body: "We believe every child has a calling and the capacity to find it. Our job is not to rank them, but to help them discover who they are meant to be.",
  },
  {
    num: "02",
    icon: "✦",
    name: "Learning Through Action",
    question: "Learn by doing.",
    body: "Children learn best when they do real work, make real choices, and see real results. Hands-on projects and Socratic dialogue replace lectures and worksheets.",
  },
  {
    num: "03",
    icon: "◆",
    name: "Productive Struggle",
    question: "Struggle builds strength.",
    body: "Challenge is not something to remove. Working through hard things, with support, is how children build the confidence, grit, and resilience that last.",
  },
  {
    num: "04",
    icon: "♥",
    name: "Autonomy with Accountability",
    question: "Freedom with boundaries.",
    body: "Learners set their own goals, manage their time, and answer for the promises they make, to themselves and to the community, without shame or control.",
  },
  {
    num: "05",
    icon: "✦",
    name: "Character Development",
    question: "Who you become matters.",
    body: "Honesty, kindness, and courage are practiced every day, woven into how the community lives and learns together, not posted on a wall.",
  },
  {
    num: "06",
    icon: "◆",
    name: "Adventure-Based Learning",
    question: "School as a journey.",
    body: "Each day is framed as a hero's journey, full of quests, discovery, and the wonder of finding out. Curiosity, not compliance, drives the work.",
  },
];

export function HatRack() {
  return (
    <section id="model" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* sticky left */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="eyebrow">✦ Our Approach</span>
          <h2 className="font-display mt-6 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.06] text-ink">
            Learning driven by the learner
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-[1.6] text-muted">
            Acton Academy Santa Barbara is built on a few core beliefs about how
            children actually grow. Live them every day, and learning becomes
            something children own, not something done to them.
          </p>
        </div>

        {/* scrolling cards */}
        <div className="flex flex-col gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ y: 26, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              className="card-sand p-9"
            >
              <p className="text-[14px] text-muted">{p.num}</p>
              <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-full bg-sand-deep text-[18px] text-espresso">
                {p.icon}
              </div>
              <h3 className="mt-7 text-[26px] font-semibold tracking-[-0.01em] text-ink">
                {p.name}
              </h3>
              <p className="font-display mt-1 text-[20px] italic text-espresso">
                {p.question}
              </p>
              <p className="mt-4 max-w-md text-[15.5px] leading-[1.6] text-muted">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
