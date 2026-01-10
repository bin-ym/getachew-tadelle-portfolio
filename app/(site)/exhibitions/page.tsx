const exhibitions = [
  "Wetatoch Exhibition – Yirgalem",
  "Mekelle Exhibition",
  "Beteseb Memriya Exhibition",
  "Washington Hotel",
  "Hilton Hotel",
  "Ghion Hotel",
];

export default function ExhibitionsPage() {
  return (
    <main className="px-6 py-24 max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl mb-12">
        Exhibitions
      </h1>

      <ul className="space-y-4 text-muted-foreground">
        {exhibitions.map((item) => (
          <li key={item} className="border-l-2 border-accent pl-4">
            {item}
          </li>
        ))}
      </ul>
    </main>
  );
}
