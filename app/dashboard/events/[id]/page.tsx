// "use client";

// import { use } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { EventType } from "@/app/data/events";

// export default function EventDetailsPage({ params }: any) {
//   const router = useRouter();

//   // unwrap async params
//   const { id } = use(params);
//   const eventId = Number(id);

//   const event = EventType.find((e) => e.id === eventId);

//   if (!event) {
//     return <div className="p-10 text-red-500">Event not found.</div>;
//   }

//   const availabilityPercent = Math.round(
//     (event.attendees / event.maxAttendees) * 100
//   );

//   return (
//     <div className="flex min-h-screen bg-[#F7F9FC]">
//       {/* SIDEBAR */}
//       <aside className="w-60 bg-white border-r border-gray-200 p-6 space-y-6">
//         <div>
//           <h2 className="text-xl font-bold">EventHub</h2>
//           <p className="text-xs text-gray-500 mt-3">Event Management</p>
//         </div>

//         <nav className="space-y-2">
//           <a
//             href="/dashboard"
//             className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
//           >
//             <Image src="/overviewico.png" width={20} height={20} alt="Overview" />
//             Overview
//           </a>

//           <a
//             href="/dashboard/browse"
//             className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 text-blue-600 font-medium"
//           >
//             <Image
//               src="/browseeventico.png"
//               width={20}
//               height={20}
//               alt="Browse Events"
//             />
//             Browse Events
//           </a>

//           <a
//             href="/dashboard/attendee-insights"
//             className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
//           >
//             <Image src="/atendeeico.png" width={20} height={20} alt="Insights" />
//             Attendee Insights
//           </a>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-8">
//         {/* Back button */}
//         <button
//           onClick={() => router.push("/dashboard/browse")}
//           className="text-sm text-gray-600 hover:text-black mb-4"
//         >
//           ← Back to Events
//         </button>

//         {/* IMAGE + INFO IN ONE CARD (attached) */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <Image
//             src={event.banner}
//             width={1200}
//             height={350}
//             alt={event.title}
//             className="w-full h-[320px] object-cover"
//           />

//           <div className="p-6">
//             <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
//               {event.category}
//             </span>

//             <h1 className="text-3xl font-bold mt-3">{event.title}</h1>

//             {/* date left, location right */}
//             <div className="flex items-center justify-between text-gray-600 text-sm mt-2">
//               <div className="flex items-center gap-2">
//                 <Image src="/date.png" width={18} height={18} alt="date" />
//                 {event.date}
//               </div>

//               <div className="flex items-center gap-2">
//                 <Image src="/location.png" width={18} height={18} alt="location" />
//                 {event.location}
//               </div>
//             </div>

//             <p className="text-gray-600 mt-4 leading-relaxed text-sm">
//               {event.description}
//             </p>
//           </div>
//         </div>

//         {/* STATS ROW – smaller width cards + bigger icons */}
//         <div className="flex flex-wrap justify-between gap-4 mt-6">
//           {/* Attendees */}
//           <div className="bg-white p-5 rounded-xl shadow-sm flex-1 max-w-[230px]">
//             <div className="flex items-center gap-3">
//               <Image src="/atendeeico1.png" width={34} height={34} alt="Attendees" />
//               <p className="text-xs text-gray-500">Attendees</p>
//             </div>
//             <p className="text-2xl font-bold mt-2">{event.attendees}</p>
//           </div>

//           {/* Tickets Sold */}
//           <div className="bg-white p-5 rounded-xl shadow-sm flex-1 max-w-[230px]">
//             <div className="flex items-center gap-3">
//               <Image src="/ticketsold.png" width={34} height={34} alt="Tickets" />
//               <p className="text-xs text-gray-500">Tickets Sold</p>
//             </div>
//             <p className="text-2xl font-bold mt-2">
//               {event.attendees}/{event.maxAttendees}
//             </p>
//           </div>

//           {/* Revenue */}
//           <div className="bg-white p-5 rounded-xl shadow-sm flex-1 max-w-[230px]">
//             <div className="flex items-center gap-3">
//               <Image src="/revenueO.png" width={34} height={34} alt="Revenue" />
//               <p className="text-xs text-gray-500">Revenue</p>
//             </div>
//             <p className="text-2xl font-bold mt-2">
//               ${event.revenue.toLocaleString()}
//             </p>
//           </div>

//           {/* Availability */}
//           <div className="bg-white p-5 rounded-xl shadow-sm flex-1 max-w-[230px]">
//             <div className="flex items-center gap-3">
//               <Image
//                 src="/availability.png"
//                 width={34}
//                 height={34}
//                 alt="Availability"
//               />
//               <p className="text-xs text-gray-500">Availability</p>
//             </div>
//             <p className="text-2xl font-bold mt-2">{availabilityPercent}%</p>
//           </div>
//         </div>

//         {/* GRAPH CARD */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
//           <h2 className="text-lg font-semibold mb-4">Ticket Sales Trend</h2>

//           <Image
//             src="/ticketsale.png"
//             width={900}
//             height={400}
//             alt="Ticket Sales Graph"
//             className="rounded-lg w-full object-cover"
//           />
//         </div>
//       </main>
//     </div>
//   );
// }

// "use client";

// import { use, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { EventType } from "@/app/data/events";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function EventDetailsPage({ params }: any) {
//   const router = useRouter();
//   const { id } = use(params);
//   const eventId = Number(id);

//   const event = EventType.find((e) => e.id === eventId);

//   if (!event) {
//     return <div className="p-10 text-red-500">Event not found.</div>;
//   }

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const availabilityPercent = Math.round(
//     (event.attendees / event.maxAttendees) * 100
//   );

//   // =====================
//   // TICKET SALES GRAPH DATA
//   // =====================
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const pattern = [0.15, 0.22, 0.30, 0.38, 0.5, 0.25, 0.2];

//   const ticketData = days.map((day, i) => ({
//     day,
//     sold: Math.round(event.attendees * pattern[i]),
//   }));

//   return (
//     <div className="flex min-h-screen bg-[#F7F9FC]">

     

// {/* ================= SIDEBAR DESKTOP ================= */}
// <aside className="hidden md:flex flex-col w-64 bg-white p-6 shadow-md h-screen fixed left-0 top-0 z-40">
//   <h2 className="text-xl font-bold">EventHub</h2>
//   <p className="text-xs text-gray-500">Event Management</p>

//   <nav className="space-y-3 mt-6 text-sm">
//     <a href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
//       <Image src="/overviewico.png" width={20} height={20} alt="" />
//       Overview
//     </a>

//     <a href="/dashboard/browse" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
//       <Image src="/browseeventico.png" width={20} height={20} alt="" />
//       Browse Events
//     </a>

//     <a href="/dashboard/attendee-insights" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
//       <Image src="/atendeeico.png" width={20} height={20} alt="" />
//       Attendee Insights
//     </a>
//   </nav>
// </aside>

// {/* ================= MOBILE SIDEBAR ================= */}
// <aside
//   className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ${
//     sidebarOpen ? "translate-x-0" : "-translate-x-64"
//   }`}
// >
//   <button className="text-2xl mb-6" onClick={() => setSidebarOpen(false)}>
//     ✕
//   </button>

//   <h2 className="text-xl font-bold">EventHub</h2>
//   <p className="text-xs text-gray-500">Event Management</p>

//   <nav className="space-y-3 mt-6 text-sm">
//     <a href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
//       <Image src="/overviewico.png" width={20} height={20} alt="" />
//       Overview
//     </a>

//     <a href="/dashboard/browse" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
//       <Image src="/browseeventico.png" width={20} height={20} alt="" />
//       Browse Events
//     </a>

//     <a href="/dashboard/attendee-insights" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
//       <Image src="/atendeeico.png" width={20} height={20} alt="" />
//       Attendee Insights
//     </a>
//   </nav>
// </aside>


//       {/* ================= MAIN CONTENT ================= */}
//       <main className="flex-1 md:ml-64 p-6 sm:p-10">

//         {/* BACK BUTTON */}
//         <button
//           onClick={() => router.push("/dashboard/browse")}
//           className="text-sm text-gray-600 hover:text-black mb-4"
//         >
//           ← Back to Events
//         </button>

//         {/* EVENT CARD */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <Image
//             src={event.banner}
//             width={1200}
//             height={350}
//             alt={event.title}
//             className="w-full h-[280px] sm:h-[320px] object-cover"
//           />

//           <div className="p-6">
//             <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
//               {event.category}
//             </span>

//             <h1 className="text-2xl sm:text-3xl font-bold mt-3">{event.title}</h1>

//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm mt-2 gap-2">
//               <div className="flex items-center gap-2">
//                 <Image src="/date.png" width={18} height={18} alt="date" />
//                 {event.date}
//               </div>

//               <div className="flex items-center gap-2">
//                 <Image src="/location.png" width={18} height={18} alt="location" />
//                 {event.location}
//               </div>
//             </div>

//             <p className="text-gray-600 mt-4 leading-relaxed text-sm">
//               {event.description}
//             </p>
//           </div>
//         </div>

//         {/* STATS ROW */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//           <StatCard icon="/atendeeico1.png" label="Attendees" value={event.attendees} />
//           <StatCard icon="/ticketsold.png" label="Tickets Sold" value={`${event.attendees}/${event.maxAttendees}`} />
//           <StatCard icon="/revenueO.png" label="Revenue" value={`$${event.revenue.toLocaleString()}`} />
//           <StatCard icon="/availability.png" label="Availability" value={`${availabilityPercent}%`} />
//         </div>

//         {/* TICKET SALES CHART */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
//           <h2 className="text-lg font-semibold mb-4">Ticket Sales Trend</h2>

//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={ticketData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="sold"
//                   stroke="#2563EB"
//                   strokeWidth={3}
//                   dot={{ r: 5, stroke: "#2563EB", strokeWidth: 2, fill: "white" }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }

// /* ---------------- REUSABLE STAT CARD ---------------- */
// function StatCard({ icon, label, value }: any) {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col">
//       <div className="flex items-center gap-3">
//         <Image src={icon} width={34} height={34} alt={label} />
//         <p className="text-xs text-gray-500">{label}</p>
//       </div>
//       <p className="text-xl sm:text-2xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }

import { EventType } from "@/app/data/events";
import EventDetailsClient from "./EventDetailsClient";

// ⭐ params MUST be treated as a Promise in new Next.js versions
export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ⭐ Correct: unwrap params on the SERVER
  const { id } = await params;

  const eventId = Number(id);
  const event = EventType.find((e) => e.id === eventId);

  if (!event) {
    return <div className="p-10 text-red-500">Event not found.</div>;
  }

  return <EventDetailsClient event={event} />;
}
