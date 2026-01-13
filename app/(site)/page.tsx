"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const heroItems = [
  "/art/art1.jpg",
  "/art/art2.jpg",
  "/art/art3.jpg",
  "/art/art4.jpg",
  "/art/art5.jpg",
];

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(Math.random() > 0.5 ? "left" : "right");
      setCurrent((prev) => (prev + 1) % heroItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic hero images */}
      {heroItems.map((src, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out filter ${
              isActive
                ? "opacity-100 blur-0 scale-100"
                : "opacity-0 blur-sm scale-110"
            }`}
            style={{
              backgroundImage: `url(${src})`,
              transform: `translateX(${
                isActive ? "0" : direction === "right" ? "100%" : "-100%"
              }) translateY(${offsetY}px)`,
            }}
          />
        );
      })}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

      {/* Hero content */}
      <section className="relative z-10 text-center text-white max-w-2xl px-6 space-y-6">
        <h1 className="text-6xl md:text-7xl font-serif drop-shadow-lg">
          Getachew Tadele
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300 drop-shadow">
          Artist & Filmmaker shaped by spirituality, culture, and inner vision.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <a
            href="/art"
            className="px-6 py-3 bg-gold text-earth font-semibold rounded-lg hover:bg-amber-600 transition"
          >
            Explore Art
          </a>
          <a
            href="/films"
            className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
          >
            View Films
          </a>
        </div>
      </section>

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
    </main>
  );
}
