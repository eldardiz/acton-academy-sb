import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acton Academy Santa Barbara | A Learner-Driven School for Ages 4 to 7",
  description:
    "Acton Academy Santa Barbara is a learner-driven micro-school for ages 4 to 7. Spark Studio: learning through wonder, play, and purpose. Tours by appointment.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-ink">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
