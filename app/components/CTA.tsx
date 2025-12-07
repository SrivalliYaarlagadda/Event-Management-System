// components/CTA.tsx
"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white text-center shadow-xl"
    >
      <h3 className="text-xl sm:text-2xl font-bold">Ready to transform your events?</h3>
      <p className="mt-2 text-white/90 text-sm sm:text-base">
        Join thousands of organizers using EventHub
      </p>

      <motion.a
        whileHover={{ scale: 1.03 }}
        href="/dashboard"
        className="inline-block mt-6 bg-white text-blue-600 px-6 py-2 rounded-md shadow"
      >
        Get Started Now
      </motion.a>
    </motion.div>
  );
}
