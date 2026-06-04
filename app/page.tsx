import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Statement } from "./components/Statement";
import { HatRack } from "./components/HatRack";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Statement />
      <HatRack />
      <Services />
      <About />
      <Faq />
      <Cta />

      <footer className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 border-t border-line pt-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-[22px] text-ink">Acton Academy Santa Barbara</span>
            <p className="mt-3 max-w-xs text-[13.5px] leading-[1.55] text-muted">
              A learner-driven micro-school in Santa Barbara for ages 4 to 7. We
              believe every child has a calling.
            </p>
          </div>
          <div>
            <p className="text-[13px] text-muted">Explore</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-ink/80">
              <li><a href="#model" className="hover:text-ink">Our Approach</a></li>
              <li><a href="#services" className="hover:text-ink">Spark Studio</a></li>
              <li><a href="#about" className="hover:text-ink">About</a></li>
              <li><a href="#faq" className="hover:text-ink">FAQs</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] text-muted">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-ink/80">
              <li><a href="#connect" className="hover:text-ink">Admissions</a></li>
              <li><a href="mailto:info@actonsb.org" className="hover:text-ink">info@actonsb.org</a></li>
              <li><a href="tel:+18053351796" className="hover:text-ink">(805) 335-1796</a></li>
              <li>50 E. Alamar Ave, Santa Barbara, CA</li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] text-muted">Visit</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-ink/80">
              <li>Mon to Fri, 8:00 to 3:30</li>
              <li>Tours by appointment</li>
              <li><a href="https://instagram.com/acton_sb" className="hover:text-ink">@acton_sb</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row">
          <span>© Acton Academy Santa Barbara, 2026</span>
          <span className="tracking-[0.04em]">Curiosity · Passion · Courage</span>
        </div>
      </footer>
    </main>
  );
}
