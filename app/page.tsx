import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Statement } from "./components/Statement";
import { HatRack } from "./components/HatRack";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";

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
      <Footer />
    </main>
  );
}
