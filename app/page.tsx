// app/page.tsx
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import FeaturesGrid from "./components/FeaturesGrid";
import CTA from "./components/CTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ECF4FC99] to-white">
      <Nav />
      <Hero />

      {/* UPDATED SPACING */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <Stats />
      </section>

      {/* UPDATED SPACING */}
      <section className="max-w-6xl mx-auto px-6 mt-28">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold">
          Everything you need to succeed
        </h2>

        <p className="text-center text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          Powerful features designed to help you create memorable events and grow your business.
        </p>

        <div className="mt-10">
          <FeaturesGrid />
        </div>
      </section>

      {/* UPDATED SPACING */}
      <div className="max-w-6xl mx-auto px-6 mt-28">
        <CTA />
      </div>

      <footer className="text-center text-gray-400 text-sm py-10">
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </footer>
    </main>
  );
}
