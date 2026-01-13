"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const exhibitions = [
  "Wetatoch Exhibition – Yirgalem",
  "Mekelle Exhibition",
  "Beteseb Memriya Exhibition",
  "Washington Hotel",
  "Hilton Hotel",
  "De Leopol Hotel",
];

const exhibitionImages = [
  "/exhibitions/exhibition3.jpg",
  "/exhibitions/exhibition2.jpg",
  "/exhibitions/exhi11.jpg",
  "/exhibitions/exhi9.jpg",
  "/exhibitions/exhi12.jpg",
  "/exhibitions/exhi13.jpg",
  "/exhibitions/exhi8.jpg",
  "/exhibitions/exhibition4.jpg",
  "/exhibitions/exhi5.jpg",
  "/exhibitions/exhi2.jpg",
  "/exhibitions/exhi3.jpg",
  "/exhibitions/exhi4.jpg",
  "/exhibitions/exhi6.jpg",
  "/exhibitions/exhi7.jpg",
  "/exhibitions/exhi10.jpg",
  "/exhibitions/exhibition1.jpg",
];
export default function ExhibitionsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const startX = useRef(0);

  const activeImage =
    activeIndex !== null ? exhibitionImages[activeIndex] : null;

  /* ---------------- Keyboard ---------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);

      if (activeIndex !== null) {
        if (
          e.key === "ArrowRight" &&
          activeIndex < exhibitionImages.length - 1
        ) {
          setActiveIndex(activeIndex + 1);
        }
        if (e.key === "ArrowLeft" && activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  /* ---------------- Lock scroll ---------------- */
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
  }, [activeIndex]);

  /* ---------------- Swipe ---------------- */
  const handleStart = (x: number) => {
    startX.current = x;
  };

  const handleEnd = (x: number) => {
    if (activeIndex === null) return;

    const diff = startX.current - x;
    if (Math.abs(diff) < 60) return;

    if (diff > 0 && activeIndex < exhibitionImages.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (diff < 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <>
      <main className="px-6 py-24 max-w-6xl mx-auto">
        {/* ================= HERO IMAGE WITH LIST ================= */}
        <section className="mb-20">
          <div className="relative w-full h-[360px] md:h-[460px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/exhibitions/exhibition.jpg"
              alt="Exhibition overview"
              fill
              priority
              className="object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Title */}
            <div className="absolute bottom-6 left-6 z-10">
              <h1 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl">
                Exhibitions
              </h1>
              <p className="text-white/70 mt-2 text-sm md:text-base">
                Selected exhibitions & showcases
              </p>
            </div>

            {/* Exhibition List Card */}
            <div className="absolute right-6 bottom-6 md:top-1/2 md:-translate-y-1/2 z-10 max-w-sm w-full">
              <div className="rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 p-5 shadow-xl">
                <h3 className="text-white font-semibold mb-4">
                  Exhibition List
                </h3>

                <ul className="space-y-2 text-sm text-white/80">
                  {exhibitions.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-white/40 pl-3 hover:text-white transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= GALLERY TITLE ================= */}
        <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">
          Exhibition Moments
        </h2>

        {/* ================= GALLERY GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-24">
          {exhibitionImages.map((src, index) => (
            <button
              key={src}
              onClick={() => setActiveIndex(index)}
              className="overflow-hidden rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              <Image
                src={src}
                alt="Exhibition moment"
                width={500}
                height={400}
                className="w-full h-60 md:h-64 lg:h-72 object-cover"
              />
            </button>
          ))}
        </div>
      </main>

      {/* ================= MODAL ================= */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseUp={(e) => handleEnd(e.clientX)}
          >
            <button
              className="absolute top-3 right-3 text-white text-3xl hover:text-red-500 transition z-50"
              onClick={() => setActiveIndex(null)}
            >
              ×
            </button>

            {activeIndex! > 0 && (
              <button
                className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition hidden md:block"
                onClick={() => setActiveIndex(activeIndex! - 1)}
              >
                ‹
              </button>
            )}

            {activeIndex! < exhibitionImages.length - 1 && (
              <button
                className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition hidden md:block"
                onClick={() => setActiveIndex(activeIndex! + 1)}
              >
                ›
              </button>
            )}

            <Image
              src={activeImage}
              alt="Exhibition large"
              width={1200}
              height={900}
              className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60">
              Swipe or use arrows
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
