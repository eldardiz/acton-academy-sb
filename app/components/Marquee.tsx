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
    <section className="border-y border-line bg-white py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-[13px] uppercase tracking-[0.18em]"
              style={{ color: "#6F6F6F" }}
            >
              {t}
              <span style={{ color: "#c9c7c2" }} aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
