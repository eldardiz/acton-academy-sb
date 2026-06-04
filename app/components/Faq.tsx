"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "What is Spark Studio?",
    a: "Spark Studio is our program for ages 4 to 7. Children learn through wonder, play, and purpose, building strong foundations in academics, character, and a lifelong love of learning.",
  },
  {
    q: "What does learner-driven mean?",
    a: "Children take ownership of their own learning. With guidance, they set goals, make choices, and answer for their progress, supported by real autonomy paired with real accountability.",
  },
  {
    q: "How do you measure progress without grades?",
    a: "We use dashboards, portfolios, and badges rather than traditional grades, so families see real evidence of growth, mastery, and independence over time.",
  },
  {
    q: "Who founded the school?",
    a: "Acton Academy Santa Barbara was founded by Max Peck, a former U.S. Marine Corps officer, so his own children could become who they were meant to be.",
  },
  {
    q: "How can we visit?",
    a: "Tours are by appointment. Reach out and we will arrange a time for you to see Spark Studio, meet our community, and ask anything you like.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28">
      <div className="mb-10 text-center">
        <span className="eyebrow">✦ Questions, answered</span>
        <h2 className="font-display mt-6 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] text-ink">
          Good to know before you visit
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="rounded-[20px] bg-sand px-6">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-[16.5px] font-medium text-ink">{f.q}</span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand-deep text-[18px] text-espresso transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-10 text-[15px] leading-[1.6] text-muted">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
