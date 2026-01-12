"use client";

import { useState } from "react";

const films = [
  {
    title: "Bamacash",
    youtubeUrl: "https://www.youtube.com/watch?v=uhH96azqaE0",
    roles: ["Writer", "Actor", "Action Director", "Executive Producer"],
  },
  {
    title: "Yearbegaw Lij",
    youtubeUrl: "https://www.youtube.com/watch?v=QaeElqsgMBY",
    roles: ["Actor", "Makeup Artist", "Executive Producer"],
  },
  {
    title: "Yefeker Kal",
    youtubeUrl: "https://www.youtube.com/watch?v=NMHY-w5kJJU",
    roles: ["Makeup Artist", "Color Director"],
  },
  {
    title: "College ena Webet",
    youtubeUrl: "https://www.youtube.com/watch?v=sS0h-AnR_1Y",
    roles: ["Makeup Artist", "Color Director"],
  },
];

// Extract YouTube ID
function getYoutubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : "";
}

export default function FilmsPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeFilm = films[activeIndex];
  const videoId = getYoutubeId(activeFilm.youtubeUrl);

  return (
    <main className="px-6 py-24 max-w-6xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl mb-12">Films</h1>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Film list */}
        <ul className="space-y-6">
          {films.map((film, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={film.title} className="border-b border-border pb-4">
                <button
                  onClick={() => setActiveIndex(index)}
                  className={`w-full flex justify-between items-center text-left font-semibold text-lg transition ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {film.title}
                  <span
                    className={`text-sm transition-transform duration-300 ${
                      isActive ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Roles accordion */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="overflow-hidden ml-4 list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {film.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Video + details */}
        <div className="space-y-4">
          <div className="aspect-video rounded-xl overflow-hidden border border-border bg-black">
            <iframe
              loading="lazy"
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={activeFilm.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* ================= INTERVIEWS ================= */}
      <section className="mt-24">
        <h2 className="font-serif text-3xl md:text-4xl mb-12">
          Interviews & Talks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Interview – Getachew Tadelle",
              youtubeId: "8CixyhC0qBk",
            },
            {
              title: "Creative Journey & Film Career",
              youtubeId: "5B6uhp1FSj8",
            },
            {
              title: "Art, Cinema & Vision",
              youtubeId: "spznSAmj3xs",
            },
            {
              title: "Behind the Scenes Discussion",
              youtubeId: "zlZVVN-jB20",
            },
          ].map((item) => (
            <div
              key={item.youtubeId}
              className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-2xl transition"
            >
              {/* Video */}
              <div className="aspect-video bg-black">
                <iframe
                  loading="lazy"
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Caption */}
              <div className="p-4">
                <p className="font-semibold text-base">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Interview / Media appearance
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
