"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
  "/art/art1.jpg",
  "/art/art2.jpg",
  "/art/art3.jpg",
  "/art/art4.jpg",
  "/art/art5.jpg",
  "/art/art6.jpg",
  "/art/art7.jpg",
  "/art/art8.jpg",
  "/art/art9.jpg",
  "/art/art10.jpg",
  "/art/art11.jpg",
  "/art/art12.jpg",
  "/art/art13.jpg",
  "/art/art14.jpg",
  "/art/art15.jpg",
  "/art/art16.jpg",
];

export default function ArtGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const startX = useRef(0);

  const activeImage =
    activeIndex !== null ? images[activeIndex] : null;

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);

      if (activeIndex !== null) {
        if (e.key === "ArrowRight" && activeIndex < images.length - 1) {
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

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow =
      activeIndex !== null ? "hidden" : "";
  }, [activeIndex]);

  // Swipe handlers
  const handleStart = (x: number) => {
    startX.current = x;
  };

  const handleEnd = (x: number) => {
    if (activeIndex === null) return;

    const diff = startX.current - x;

    if (Math.abs(diff) < 60) return;

    if (diff > 0 && activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
    }

    if (diff < 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <>
      {/* Gallery grid */}
      <div className="pt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, index) => (
          <button
            key={src}
            onClick={() => setActiveIndex(index)}
            className="overflow-hidden rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            <Image
              src={src}
              alt="Artwork"
              width={500}
              height={400}
              className="w-full h-60 md:h-64 lg:h-72 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Modal */}
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
            {/* Close */}
            <button
              aria-label="Close"
              className="absolute top-3 right-3 text-white text-3xl font-light hover:text-red-500 transition z-50"
              onClick={() => setActiveIndex(null)}
            >
              ×
            </button>

            {/* Left */}
            {activeIndex !== null && activeIndex > 0 && (
              <button
                aria-label="Previous image"
                className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition hidden md:block"
                onClick={() => setActiveIndex((i) => (i !== null ? i - 1 : i))}
              >
                ‹
              </button>
            )}

            {/* Right */}
            {activeIndex !== null && activeIndex < images.length - 1 && (
              <button
                aria-label="Next image"
                className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition hidden md:block"
                onClick={() => setActiveIndex((i) => (i !== null ? i + 1 : i))}
              >
                ›
              </button>
            )}

            {/* Image */}
            <Image
              src={activeImage}
              alt="Artwork large"
              width={1200}
              height={900}
              className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {/* Hint */}
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