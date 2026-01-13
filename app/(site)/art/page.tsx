"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ================= IMAGE SETS ================= */
const artCategories = {
  spiritual: {
    title: "Spiritual Collection",
    subtitle:
      "Sacred expressions inspired by faith, tradition, and inner reflection.",
    images: [
      "/art/art1.jpg",
      "/art/art2.jpg",
      "/art/art3.jpg",
      "/art/art4.jpg",
      "/art/art5.jpg",
      "/art/art6.jpg",
      "/art/art7.jpg",
      "/art/art8.jpg",
    ],
  },
  contemporary: {
    title: "Contemporary Expressions",
    subtitle:
      "Modern visual narratives exploring identity, culture, and emotion.",
    images: [
      "/art/art9.jpg",
      "/art/art10.jpg",
      "/art/art11.jpg",
      "/art/art12.jpg",
      "/art/art13.jpg",
      "/art/art14.jpg",
      "/art/art15.jpg",
      "/art/art16.jpg",
    ],
  },
};

const liveEventImages = [
  "/art/live-event1.jpg",
  "/art/live-event2.jpg",
];

export default function ArtGallery() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof artCategories>("spiritual");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalImages, setModalImages] = useState<string[]>([]);

  const startX = useRef(0);

  const activeImage =
    activeIndex !== null ? modalImages[activeIndex] : null;

  const categoryData = artCategories[activeCategory];

  /* ================= Keyboard ================= */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);

      if (activeIndex !== null) {
        if (e.key === "ArrowRight" && activeIndex < modalImages.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
        if (e.key === "ArrowLeft" && activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex, modalImages]);

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

    if (diff > 0 && activeIndex < modalImages.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (diff < 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <>
      {/* ================= FEATURED ================= */}
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/art/art8.jpg"
              alt="Featured artwork"
              width={1600}
              height={1100}
              className="w-full h-[520px] md:h-[620px] object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl">
              Featured Artwork
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              This artwork gained massive attention during a TikTok live art
              event, engaging thousands of viewers in real time.
            </p>

            <div className="rounded-2xl border border-border bg-muted/40 p-6">
              <p className="font-semibold text-xl">
                💰 Sold for 32,216.49 USD
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                TikTok Live Art Event · Over 5 Million Birr
              </p>
            </div>

            {/* LIVE EVENT */}
            <div>
              <p className="text-xl font-semibold mb-4">
                TikTok Live Event Moments
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {liveEventImages.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => {
                      setModalImages(liveEventImages);
                      setActiveIndex(index);
                    }}
                    className="relative overflow-hidden rounded-2xl shadow-lg group"
                  >
                    <Image
                      src={src}
                      alt="Live event"
                      width={800}
                      height={600}
                      className="w-full h-60 object-cover transition group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY TITLE ================= */}
      <section className="text-center mb-14 px-6">
        <h1 className="font-serif text-4xl md:text-6xl mb-4">
          {categoryData.title}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {categoryData.subtitle}
        </p>
      </section>

      {/* ================= FILTER ================= */}
      <div className="flex justify-center gap-4 mb-14 flex-wrap">
        {Object.keys(artCategories).map((category) => (
          <button
            key={category}
            onClick={() =>
              setActiveCategory(category as keyof typeof artCategories)
            }
            className={`px-6 py-2 rounded-full text-sm font-medium transition
              ${
                category === activeCategory
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted hover:bg-muted/70 text-muted-foreground"
              }`}
          >
            {artCategories[category as keyof typeof artCategories].title}
          </button>
        ))}
      </div>

      {/* ================= GALLERY ================= */}
      <div className="pb-32 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categoryData.images.map((src, index) => (
          <button
            key={src}
            onClick={() => {
              setModalImages(categoryData.images);
              setActiveIndex(index);
            }}
            className="overflow-hidden rounded-2xl shadow-xl hover:scale-[1.04] transition"
          >
            <Image
              src={src}
              alt="Artwork"
              width={700}
              height={900}
              className="w-full h-[340px] md:h-[380px] object-cover"
            />
          </button>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-[92vw] max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseUp={(e) => handleEnd(e.clientX)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl"
              onClick={() => setActiveIndex(null)}
            >
              ×
            </button>

            <Image
              src={activeImage}
              alt="Artwork large"
              width={1800}
              height={1200}
              className="max-h-[92vh] max-w-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}