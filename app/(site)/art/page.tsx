"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ================= IMAGE SETS ================= */
const artImages = [
  "/art/art8.jpg",
  "/art/art1.jpg",
  "/art/art2.jpg",
  "/art/art3.jpg",
  "/art/art4.jpg",
  "/art/art5.jpg",
  "/art/art6.jpg",
  "/art/art7.jpg",
  "/art/art9.jpg",
  "/art/art10.jpg",
  "/art/art11.jpg",
  "/art/art12.jpg",
  "/art/art13.jpg",
  "/art/art14.jpg",
  "/art/art15.jpg",
  "/art/art16.jpg",
];

const liveEventImages = [
  "/art/live-event1.jpg",
  "/art/live-event2.jpg",
];

export default function ArtGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const startX = useRef(0);

  const activeImage =
    activeIndex !== null ? activeImages[activeIndex] : null;

  /* ================= Keyboard ================= */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);

      if (activeIndex !== null) {
        if (e.key === "ArrowRight" && activeIndex < activeImages.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
        if (e.key === "ArrowLeft" && activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex, activeImages]);

  /* ================= Lock scroll ================= */
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
  }, [activeIndex]);

  /* ================= Swipe ================= */
  const handleStart = (x: number) => {
    startX.current = x;
  };

  const handleEnd = (x: number) => {
    if (activeIndex === null) return;

    const diff = startX.current - x;
    if (Math.abs(diff) < 60) return;

    if (diff > 0 && activeIndex < activeImages.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (diff < 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const openGallery = (images: string[], index: number) => {
    setActiveImages(images);
    setActiveIndex(index);
  };

  return (
    <>
      {/* ================= FEATURED ARTWORK ================= */}
      <section className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Big Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/art/art8.jpg"
              alt="Featured artwork"
              width={1200}
              height={900}
              className="w-full h-[420px] md:h-[520px] object-cover"
              priority
            />
          </div>

          {/* Story */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl">
              Featured Artwork
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              This artwork gained massive attention during a TikTok live art
              event, where almost 1 Million viewers engaged with the creative
              process in real time.
            </p>

            <div className="rounded-xl border border-border bg-muted/40 p-5">
              <p className="font-semibold text-lg">
                💰 Sold for more than 5,000,000 Birr
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                TikTok Live Art Event
              </p>
            </div>

            {/* ================= LIVE EVENT ================= */}
            <div>
              <p className="text-lg font-semibold mb-3">
                TikTok Live Event Moments
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {liveEventImages.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => openGallery(liveEventImages, index)}
                    className="relative overflow-hidden rounded-xl border border-border shadow-md group"
                  >
                    <Image
                      src={src}
                      alt="TikTok live event"
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ART TITLE ================= */}
      <h1 className="text-center font-serif text-2xl md:text-5xl mb-12">
        Artworks Gallary
      </h1>

      {/* ================= GALLERY GRID ================= */}
      <div className="pb-24 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artImages.map((src, index) => (
          <button
            key={src}
            onClick={() => openGallery(artImages, index)}
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
            {/* Close */}
            <button
              className="absolute top-3 right-3 text-white text-3xl hover:text-red-500 transition"
              onClick={() => setActiveIndex(null)}
            >
              ×
            </button>

            {/* Left */}
            {activeIndex! > 0 && (
              <button
                className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition hidden md:block"
                onClick={() => setActiveIndex(activeIndex! - 1)}
              >
                ‹
              </button>
            )}

            {/* Right */}
            {activeIndex! < activeImages.length - 1 && (
              <button
                className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100 transition hidden md:block"
                onClick={() => setActiveIndex(activeIndex! + 1)}
              >
                ›
              </button>
            )}

            <Image
              src={activeImage}
              alt="Artwork large"
              width={1400}
              height={1000}
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