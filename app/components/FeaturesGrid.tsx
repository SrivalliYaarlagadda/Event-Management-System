// components/FeaturesGrid.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  { title: "Event Management", icon: "/classmanagement.png", desc: "Create, organize, and manage all your events easily.", bg: "bg-[#EAF2FF]" },
  { title: "Attendee Insights", icon: "/traineeinsight.png", desc: "Understand your audience with powerful data insights.", bg: "bg-[#EAFDF3]" },
  { title: "Advanced Analytics", icon: "/analytics.png", desc: "Track statistics and performance in real time.", bg: "bg-[#F3EAFE]" },
  { title: "Smart Notifications", icon: "/notification.png", desc: "Get alerts about registrations, capacity, and updates.", bg: "bg-[#FFF2E4]" },
  { title: "Revenue Tracking", icon: "/revenuetracking.png", desc: "Monitor sales and financial performance effortlessly.", bg: "bg-[#FFEAF0]" },
  { title: "Great Experience", icon: "/star.png", desc: "Smooth and intuitive UI for event organizers.", bg: "bg-[#EDEBFF]" },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="
            bg-white 
            rounded-2xl 
            p-7 
            shadow-[0_4px_14px_rgba(0,0,0,0.05)]
            hover:shadow-md 
            transition 
            h-[220px]        /* Increased height */
            w-[92%] mx-auto  /* Reduced width */
          "
        >
          {/* ICON box */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.bg}`}>
            <Image src={f.icon} width={50} height={50} alt={f.title} />
          </div>

          <h3 className="font-semibold mt-4 text-[16px]">{f.title}</h3>

          <p className="text-gray-500 text-[13px] mt-2 leading-relaxed">
            {f.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
