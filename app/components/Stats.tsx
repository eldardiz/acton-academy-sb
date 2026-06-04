"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
};

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Years leading", desc: "Leading people in uniform and in business" },
  { value: 3000, suffix: "+", label: "Largest team", desc: "Led start to finish, from units of two to three thousand" },
  { value: 11, prefix: "$", suffix: "M", label: "Turnaround", desc: "Delivered with one team from 2017 to 2022" },
  { value: 27, suffix: " yrs", label: "In ministry", desc: "Leading in Christian business ministry" },
];

function CountUp({ value, prefix = "", suffix = "" }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 divide-y divide-line rounded-[26px] border border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="p-8">
            <p className="text-[14px] text-muted">{s.label}</p>
            <p className="mt-7 text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.02em] text-ink">
              <CountUp {...s} />
            </p>
            <p className="mt-4 text-[14px] leading-[1.5] text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
