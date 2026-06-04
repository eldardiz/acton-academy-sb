"use client";

const topics = [
  "Learning Through Wonder",
  "Purposeful Play",
  "Character & Community",
  "Montessori-Inspired",
  "Productive Struggle",
  "Adventure-Based Learning",
  "Whole-Child Development",
];

export function Marquee() {
  const row = [...topics, ...topics];
  return (
    <section className="px-3 pt-3">
      <div className="overflow-hidden rounded-full bg-sand py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-7 whitespace-nowrap">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-7 text-[17px] text-ink/80">
              {t}
              <span className="text-espresso/40" aria-hidden>✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
