"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(data.error || "Failed to send message");
      }
    } catch {
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-24 max-w-6xl mx-auto">
      {/* ================= TITLE ================= */}
      <h1 className="font-serif text-4xl md:text-5xl mb-12">
        Contact
      </h1>

      {/* ================= CONTENT ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* ===== FORM ===== */}
        <div>
          <h2 className="font-serif text-2xl mb-6">Send a message</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 bg-background border border-border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-background border border-border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              placeholder="Message"
              rows={5}
              className="w-full px-4 py-3 bg-background border border-border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {submitted && (
            <div className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md">
              Message sent successfully ✨
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* ===== CONTACT CARD ===== */}
        <div className="lg:sticky lg:top-32">
          <div className="rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
            {/* IMAGE ON TOP */}
            <div className="relative h-40">
              <Image
                src="/exhibitions/exhibition3.jpg"
                alt="Contact visual"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* PHONE */}
            <a
              href="tel:+251931388494"
              className="flex items-center gap-4 px-6 py-6 hover:bg-muted transition"
            >
              <span className="text-3xl">📞</span>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold text-lg">
                  +251931388494
                </p>
              </div>
            </a>

            <div className="h-px bg-border" />

            {/* EMAIL */}
            <a
              href="mailto:getzarsema7@gmail.com"
              className="flex items-center gap-4 px-6 py-6 hover:bg-muted transition"
            >
              <span className="text-3xl">✉️</span>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold text-lg">
                  getzarsema7@gamil.com
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