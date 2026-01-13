import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="px-6 py-24 max-w-5xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl mb-12">About Me</h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Portrait */}
        <div className="relative w-full max-w-sm mx-auto md:mx-0 aspect-[3/4]">
          <Image
            src="/about/getachew.jpg"
            alt="Getachew Tadele portrait"
            fill
            className="object-cover rounded-2xl shadow-lg grayscale hover:grayscale-0 transition duration-700"
            priority
          />
        </div>

        {/* Text */}
        <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            I am Getachew Tadele, an Ethiopian artist and filmmaker. My work is
            born from spirituality, cultural identity, and inner consciousness.
          </p>

          <p>
            I was born in Yirgalem, and my artistic journey began in 2002 E.C. I
            taught myself through observation, practice, and spiritual
            exploration. My time at St. Arema Gedam shaped my symbolic and
            contemplative visual language.
          </p>

          <p>
            Over the years, I expanded into the film industry, working as an
            artist, storyteller, and creative collaborator across multiple
            productions. I aim to create works that resonate with both the
            spirit and the culture.
          </p>
        </div>
      </div>
    </main>
  );
}
