import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg">
          Getachew Tadelle
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <div className="hidden md:flex gap-6">
            <Link href="/about">About</Link>
            <Link href="/art">Art</Link>
            <Link href="/films">Films</Link>
            <Link href="/exhibitions">Exhibitions</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}