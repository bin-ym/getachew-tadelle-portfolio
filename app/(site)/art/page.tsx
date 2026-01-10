"use client";

import { useEffect, useState } from "react";
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
  const [active, setActive] = useState<string | null>(null);

  // ESC key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
  }, [active]);

  return (
    <>
      {/* Gallery grid */}
      <div className="pt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src) => (
          <button
            key={src}
            onClick={() => setActive(src)}
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
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActive(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50 hover:text-red-500 transition"
              onClick={() => setActive(null)}
            >
              ×
            </button>
            <Image
              src={active}
              alt="Artwork large"
              width={1200}
              height={900}
              className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
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
