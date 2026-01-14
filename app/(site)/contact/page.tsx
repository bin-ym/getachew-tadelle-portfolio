"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const formData = new FormData(e.currentTarget);

      const res = await fetch("https://formspree.io/f/xdaaknab", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-24 max-w-6xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl mb-12">Contact</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* ===== FORM ===== */}
        <div>
          <h2 className="font-serif text-2xl mb-6">Send a message</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 bg-background border border-border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-background border border-border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className="w-full px-4 py-3 bg-background border border-border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* FEEDBACK */}
            {status === "success" && (
              <p className="text-green-600 text-sm">
                Message sent successfully. Thank you!
              </p>
            )}

            {status === "error" && (
              <p className="text-red-600 text-sm">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* ===== CONTACT CARD ===== */}
        <div className="lg:sticky lg:top-32">
          <div className="rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
            <div className="relative h-40">
              <Image
                src="/exhibitions/exhibition3.jpg"
                alt="Contact visual"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <a
              href="tel:+251931388494"
              className="flex items-center gap-4 px-6 py-6 hover:bg-muted transition"
            >
              <span className="text-3xl">📞</span>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold text-lg">+251 931 388 494</p>
              </div>
            </a>

            <div className="h-px bg-border" />

            <a
              href="mailto:getzarsema7@gmail.com"
              className="flex items-center gap-4 px-6 py-6 hover:bg-muted transition"
            >
              <span className="text-3xl">✉️</span>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold text-lg">
                  getzarsema7@gmail.com
                </p>
              </div>
            </a>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Open for exhibitions, collaborations & creative work.
          </p>
        </div>
      </section>
    </main>
  );
}