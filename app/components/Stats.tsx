// components/Stats.tsx
"use client";
import { motion } from "framer-motion";

const statList = [
  { title: "10K+", subtitle: "Events Managed" },
  { title: "500K+", subtitle: "Happy Attendees" },
  { title: "$5M+", subtitle: "Revenue Processed" },
  { title: "99.9%", subtitle: "Uptime" },
];

export default function Stats() {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {statList.map((s, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { delay: i * 0.08 } },
            }}
          >
            <div className="text-3xl font-bold">{s.title}</div>
            <div className="text-sm text-gray-500 mt-1">{s.subtitle}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
