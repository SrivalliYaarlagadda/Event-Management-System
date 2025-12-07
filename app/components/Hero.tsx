// components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-20 pb-16 relative overflow-hidden">

      {/* LEFT BLUE GLOW – moved center, increased brightness */}
      <div
    className="absolute left-[8%] top-10 
    w-[420px] h-[220px]
    bg-[radial-gradient(circle,rgba(120,170,255,0.85),rgba(120,170,255,0.55),transparent_70%)]
    blur-[90px] rounded-full -z-10"
  />
      {/* RIGHT PINK GLOW – moved center, more bright */}
      <div
    className="absolute right-[8%] top-0
    w-[420px] h-[220px]
    bg-[radial-gradient(circle,rgba(255,150,215,0.9),rgba(255,150,215,0.6),transparent_70%)]
    blur-[90px] rounded-full -z-10"
  />

      <div className="max-w-4xl mx-auto px-6 text-center relative">

        {/* TITLE */}
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-extrabold text-3xl sm:text-5xl leading-tight relative"
        >
          Welcome to{" "}
          <span className="inline-block align-middle relative -mt-1">
            <Image
              src="/Eventhubbtn.png"
              width={200}
              height={70}
              alt="EventHub"
              className="inline-block h-10 sm:h-14 w-auto"
            />
          </span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto"
        >
          The all-in-one platform for managing events, tracking attendees,
          and growing your business with powerful analytics.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition">
            Go to Dashboard
          </a>
          <a 
          href="/dashboard/browse"
          className="bg-white border border-gray-200 px-6 py-3 rounded-lg">
            Browse Events
          </a>
        </motion.div>
      </div>
    </section>
  );
}
