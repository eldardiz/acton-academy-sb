"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    let resetTimer: ReturnType<typeof setTimeout>;
    const FADE = 0.5;

    const tick = () => {
      const d = video.duration;
      if (d && !Number.isNaN(d)) {
        const t = video.currentTime;
        let o = 1;
        if (t < FADE) o = t / FADE;
        else if (t > d - FADE) o = Math.max(0, (d - t) / FADE);
        video.style.opacity = String(o);
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = "0";
      resetTimer = setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resetTimer);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* video background band */}
      <div className="absolute z-0" style={{ top: "300px", inset: "auto 0 0 0" }}>
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ opacity: 0, transition: "opacity 0.1s linear" }}
        />
      </div>
      {/* gradient overlays blending video into white */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.15) 70%, #ffffff 100%)",
        }}
        aria-hidden
      />

      {/* hero content */}
      <div
        className="relative z-10 flex flex-col items-center justify-start px-6 text-center"
        style={{ paddingTop: "calc(9rem - 75px)", paddingBottom: "10rem" }}
      >
        <h1
          className="font-display animate-fade-rise max-w-5xl text-5xl font-normal sm:text-7xl md:text-[5.5rem]"
          style={{ lineHeight: 0.95, letterSpacing: "-2.46px", color: "#000000" }}
        >
          What if school was{" "}
          <em className="italic" style={{ color: "#6F6F6F" }}>
            a journey,
          </em>{" "}
          not{" "}
          <em className="italic" style={{ color: "#6F6F6F" }}>
            a system?
          </em>
        </h1>

        <p
          className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: "#6F6F6F" }}
        >
          Acton Academy Santa Barbara is a learner-driven micro-school for ages 4
          to 7. We believe every child has a calling, and we built a place where
          they learn through wonder, play, and purpose.
        </p>

        <a
          href="#connect"
          className="animate-fade-rise-delay-2 mt-12 rounded-full bg-black px-14 py-5 text-base font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          Start the journey
        </a>

        <span
          className="animate-fade-rise-delay-3 mt-6 text-xs uppercase tracking-[0.2em]"
          style={{ color: "#9a9a9a" }}
        >
          A learner-driven school in Santa Barbara · Ages 4 to 7
        </span>
      </div>
    </section>
  );
}
