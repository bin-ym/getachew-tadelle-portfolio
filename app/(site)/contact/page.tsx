"use client";

import Image from "next/image";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xdaaknab");

  return (
    <main className="px-6 py-24 max-w-6xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl mb-12">Contact</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* ===== FORM ===== */}
        <div>
          <h2 className="font-serif text-2xl mb-6">Send a message</h2>

          {state.succeeded ? (
            <p className="text-green-600">
              Message sent successfully. Thank you!
            </p>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-md"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-md"
              />

              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />

              <textarea
                name="message"
                rows={5}
                placeholder="Message"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-md"
              />

              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />

              <button
                type="submit"
                disabled={state.submitting}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>

              {state.errors && Object.keys(state.errors).length > 0 && (
                <p className="text-red-600 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
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
                <p className="font-semibold text-lg">getzarsema7@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
