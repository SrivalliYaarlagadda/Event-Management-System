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
"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EventType } from "@/app/data/events";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function EventDetailsPage({ params }: any) {
  const router = useRouter();
  const { id } = use(params);
  const eventId = Number(id);

  const event = EventType.find((e) => e.id === eventId);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [downloading, setDownloading] = useState(false);

  if (!event) {
    return <div className="p-10 text-red-500">Event not found.</div>;
  }

  const availabilityPercent = Math.round(
    (event.attendees / event.maxAttendees) * 100
  );

  // ===== Ticket Sales Dynamic Data (per event) =====
  const pattern = [0.15, 0.22, 0.3, 0.38, 0.5, 0.25, 0.2];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const ticketData = days.map((day, index) => ({
    day,
    sold: Math.round(event.attendees * pattern[index]),
  }));

  // ===== Fake attendee list (replace with real data if you have it) =====
  const attendeesList =
    (event as any).attendeesList ??
    Array.from({ length: Math.min(event.attendees, 12) }, (_, i) => ({
      name: `Attendee ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

  // ===== Similar events by category =====
  const similarEvents = EventType.filter(
    (e) => e.id !== eventId && e.category === event.category
  ).slice(0, 3);

  const handleShare = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      if (navigator.clipboard && url) {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied to clipboard!");
      } else {
        setShareMessage("Sharing not supported in this browser.");
      }
      setTimeout(() => setShareMessage(""), 2000);
    } catch (err) {
      setShareMessage("Failed to copy link.");
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  const handleDownloadAttendees = () => {
    if (!attendeesList.length) return;
    setDownloading(true);
    const header = "Name,Email\n";
    const rows = attendeesList
      .map((a: any) => `${a.name},${a.email}`)
      .join("\n");
    const csv = header + rows;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `event-${eventId}-attendees.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  const handleConfirmDelete = () => {
    // TODO: hook to backend delete
    setShowDeleteModal(false);
    router.push("/dashboard/browse");
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* ================= SIDEBAR DESKTOP ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white p-6 shadow-md h-screen fixed left-0 top-0 z-40">
        <h2 className="text-xl font-bold">EventHub</h2>
        <p className="text-xs text-gray-500">Event Management</p>

        <nav className="space-y-3 mt-6 text-sm">
          {/* NOTE: no blue active state here, as you requested */}
          <a
            href="/dashboard"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/overviewico.png" width={20} height={20} alt="" />
            Overview
          </a>

          <a
            href="/dashboard/browse"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/browseeventico.png" width={20} height={20} alt="" />
            Browse Events
          </a>

          <a
            href="/dashboard/attendee-insights"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/atendeeico.png" width={20} height={20} alt="" />
            Attendee Insights
          </a>
        </nav>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <button
          className="text-2xl mb-6"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold">EventHub</h2>
        <p className="text-xs text-gray-500">Event Management</p>

        <nav className="space-y-3 mt-6 text-sm">
          <a
            href="/dashboard"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/overviewico.png" width={20} height={20} alt="" />
            Overview
          </a>

          <a
            href="/dashboard/browse"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/browseeventico.png" width={20} height={20} alt="" />
            Browse Events
          </a>

          <a
            href="/dashboard/attendee-insights"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Image src="/atendeeico.png" width={20} height={20} alt="" />
            Attendee Insights
          </a>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 md:ml-64 p-6 sm:p-10">
        {/* MOBILE HAMBURGER */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button
            className="text-3xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => router.push("/dashboard/browse")}
          className="text-sm text-gray-600 hover:text-black mb-4"
        >
          ← Back to Events
        </button>

        {/* ======= EVENT CARD ======= */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Image
            src={event.banner}
            width={1200}
            height={350}
            alt={event.title}
            className="w-full h-[260px] sm:h-[320px] object-cover"
          />

          <div className="p-6">
            <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {event.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold mt-3">
              {event.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm mt-2 gap-2">
              <div className="flex items-center gap-2">
                <Image src="/date.png" width={18} height={18} alt="date" />
                {event.date}
              </div>

              {/* If you have separate time in EventType, append here */}
              {/* <div className="flex items-center gap-2">
                <Image src="/time.png" width={18} height={18} alt="time" />
                {event.time}
              </div> */}

              <div className="flex items-center gap-2">
                <Image
                  src="/location.png"
                  width={18}
                  height={18}
                  alt="location"
                />
                {event.location}
              </div>
            </div>

            {/* Rich-ish description styling */}
            <p className="text-gray-600 mt-4 leading-relaxed text-sm">
              {event.description}
            </p>
          </div>
        </div>

        {/* ======= STATS + ACTIONS ======= */}
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            <StatCard
              icon="/atendeeico1.png"
              label="Attendees"
              value={event.attendees}
            />

            <StatCard
              icon="/ticketsold.png"
              label="Tickets Sold"
              value={`${event.attendees}/${event.maxAttendees}`}
            />

            <StatCard
              icon="/revenueO.png"
              label="Revenue"
              value={`$${event.revenue.toLocaleString()}`}
            />

            <StatCard
              icon="/availability.png"
              label="Availability"
              value={`${availabilityPercent}%`}
            />
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm p-4 lg:w-64 flex flex-col gap-3">
            <h3 className="text-sm font-semibold mb-1">Actions</h3>

            <button
              onClick={() =>
                router.push(`/dashboard/create-event?id=${eventId}`)
              }
              className="w-full text-sm py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Event
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full text-sm py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50"
            >
              Delete Event
            </button>

            <button
              onClick={handleShare}
              className="w-full text-sm py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Share Event
            </button>

            <button
              onClick={handleDownloadAttendees}
              disabled={downloading}
              className={`w-full text-sm py-2 rounded-lg border border-gray-300 hover:bg-gray-50 ${
                downloading ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
              }`}
            >
              {downloading ? "Downloading..." : "Download Attendee List"}
            </button>

            {shareMessage && (
              <p className="text-xs text-green-600 mt-1">{shareMessage}</p>
            )}
          </div>
        </div>

        {/* ======= AVAILABILITY BAR + ATTENDEE LIST ======= */}
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-[2fr,1.3fr] gap-6">
          {/* Availability + attendees */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-semibold mb-3">
              Attendee Statistics
            </h2>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>
                  {event.attendees} / {event.maxAttendees} attendees
                </span>
                <span>{availabilityPercent}% filled</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${availabilityPercent}%` }}
                />
              </div>
            </div>

            {/* Attendee list */}
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              Attendee List
            </h3>
            <div className="border rounded-lg max-h-64 overflow-y-auto">
              {attendeesList.length === 0 ? (
                <p className="text-xs text-gray-500 p-4">
                  No attendees listed yet.
                </p>
              ) : (
                <ul className="divide-y">
                  {attendeesList.map((a: any, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <Image
                          src="/userO.png"
                          alt={a.name}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {a.name}
                        </p>
                        <p className="text-xs text-gray-500">{a.email}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Ticket sales chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-semibold mb-4">
              Ticket Sales Trend
            </h2>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ticketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sold"
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      stroke: "#2563EB",
                      strokeWidth: 2,
                      fill: "white",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ======= SIMILAR EVENTS ======= */}
        {similarEvents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">
              Similar Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarEvents.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => router.push(`/dashboard/events/${ev.id}`)}
                  className="bg-white rounded-xl shadow-sm overflow-hidden text-left hover:shadow-md transition"
                >
                  <Image
                    src={ev.banner}
                    width={400}
                    height={200}
                    alt={ev.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xs text-blue-600 font-medium">
                      {ev.category}
                    </p>
                    <h3 className="text-sm font-semibold mt-1">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {ev.date} • {ev.location}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ======= DELETE CONFIRM MODAL ======= */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[80]">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm">
              <h2 className="text-lg font-semibold mb-2">
                Delete this event?
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone. Are you sure you want to delete{" "}
                <span className="font-semibold">{event.title}</span>?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-md text-sm border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------- REUSABLE STAT CARD ---------------- */
function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col">
      <div className="flex items-center gap-3">
        <Image src={icon} width={34} height={34} alt={label} />
        <p className="text-xs text-gray-500">{label}</p>
      </div>
      <p className="text-xl sm:text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
