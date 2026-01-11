"use client";

import { useState } from "react";

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
    <main className="px-6 py-24 max-w-xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl mb-4">Contact</h1>

      {/* Interactive Contact Card */}
      <div className="mb-12 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <a
          href="tel:+251900000000"
          className="flex items-center gap-4 px-6 py-5 hover:bg-muted transition active:scale-[0.98]"
        >
          <span className="text-2xl">📞</span>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-semibold">+251 9 00 00 00 00</p>
          </div>
        </a>

        <div className="h-px bg-border" />

        <a
          href="mailto:info@example.com"
          className="flex items-center gap-4 px-6 py-5 hover:bg-muted transition active:scale-[0.98]"
        >
          <span className="text-2xl">✉️</span>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-semibold">info@example.com</p>
          </div>
        </a>
      </div>

      {/* Contact Form */}
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

      {/* Feedback Messages */}
      {submitted && (
        <div className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md">
          Message sent successfully! 🎉
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md">
          {error}
        </div>
      )}
    </main>
  );
}