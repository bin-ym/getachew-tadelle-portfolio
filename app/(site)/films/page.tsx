"use client";

import { useState } from "react";

const films = [
  {
    title: "Bamacash",
    youtubeUrl: "https://www.youtube.com/watch?v=uhH96azqaE0",
    roles: ["Writer", "Actor", "Action Director", "Executive Producer"],
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
  {
    title: "Yearbegaw Lij",
    youtubeUrl: "https://www.youtube.com/watch?v=QaeElqsgMBY",
    roles: ["Actor", "Makeup Artist", "Executive Producer"],
  },
];

// Helper to extract YouTube ID
function getYoutubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : "";
}

export default function FilmsPage() {
  const [active, setActive] = useState<typeof films[0] | null>(films[0]);
  const videoId = active ? getYoutubeId(active.youtubeUrl) : null;

  return (
    <main className="px-6 py-24 max-w-6xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl mb-12">Film & Media</h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Film list */}
        <ul className="space-y-4 text-muted-foreground">
          {films.map((film) => {
            const isActive = active?.title === film.title;
            return (
              <li key={film.title} className="border-b border-border pb-3">
                <button
                  onClick={() =>
                    setActive((prev) =>
                      prev?.title === film.title ? null : film
                    )
                  }
                  className={`w-full text-left flex justify-between items-center font-semibold text-lg transition hover:text-foreground ${
                    isActive ? "text-foreground" : ""
                  }`}
                >
                  {film.title}
                  <span className="ml-2 text-sm">{isActive ? "▲" : "▼"}</span>
                </button>

                {/* Show roles only for active film */}
                {isActive && (
                  <ul className="mt-2 ml-4 list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {film.roles.map((role, idx) => (
                      <li key={idx}>{role}</li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Video player */}
        {videoId && (
          <div className="aspect-video rounded-xl overflow-hidden border border-border bg-black">
            <iframe
              key={videoId}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={active?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Interview section */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl md:text-3xl mb-6">
          Interview with ሰአሊ ጌታቸው ታደለ - Getachew Tadelle
        </h2>
        <div className="aspect-video rounded-xl overflow-hidden border border-border bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/8CixyhC0qBk"
            title="Getachew Tadelle Interview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}