
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function EventDetailsClient({ event }: any) {
  const router = useRouter();

  const eventId = event.id;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [downloading, setDownloading] = useState(false);

  // ⭐ PAGE LOAD ANIMATION
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const availabilityPercent = Math.round(
    (event.attendees / event.maxAttendees) * 100
  );

  const pattern = [0.15, 0.22, 0.3, 0.38, 0.5, 0.25, 0.2];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const ticketData = days.map((day, index) => ({
    day,
    sold: Math.round(event.attendees * pattern[index]),
  }));

  const attendeesList =
    (event as any).attendeesList ??
    Array.from({ length: Math.min(event.attendees, 12) }, (_, i) => ({
      name: `Attendee ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

  const similarEvents = event.similarEvents ?? [];

  const handleShare = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      if (navigator.clipboard && url) {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied to clipboard!");
      } else {
        setShareMessage("Sharing not supported.");
      }
      setTimeout(() => setShareMessage(""), 2000);
    } catch {
      setShareMessage("Failed to copy link.");
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  const handleDownloadAttendees = () => {
    if (!attendeesList.length) return;
    setDownloading(true);

    const header = "Name,Email\n";
    const rows = attendeesList.map((a: any) => `${a.name},${a.email}`).join("\n");
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
    setShowDeleteModal(false);
    router.push("/dashboard/browse");
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-white p-6 shadow-md h-screen fixed left-0 top-0 z-40">
        <h2 className="text-xl font-bold">EventHub</h2>
        <p className="text-xs text-gray-500">Event Management</p>

        <nav className="space-y-3 mt-6 text-sm">
          <a href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Image src="/overviewico.png" width={20} height={20} alt="" />
            Overview
          </a>

          <a href="/dashboard/browse" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Image src="/browseeventico.png" width={20} height={20} alt="" />
            Browse Events
          </a>

          <a href="/dashboard/attendee-insights" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Image src="/atendeeico.png" width={20} height={20} alt="" />
            Attendee Insights
          </a>
        </nav>
      </aside>

      {/* MOBILE SIDEBAR */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <button className="text-2xl mb-6" onClick={() => setSidebarOpen(false)}>✕</button>

        <h2 className="text-xl font-bold">EventHub</h2>
        <p className="text-xs text-gray-500">Event Management</p>

        <nav className="space-y-3 mt-6 text-sm">
          <a href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Image src="/overviewico.png" width={20} height={20} alt="" />
            Overview
          </a>

          <a href="/dashboard/browse" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Image src="/browseeventico.png" width={20} height={20} alt="" />
            Browse Events
          </a>

          <a href="/dashboard/attendee-insights" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Image src="/atendeeico.png" width={20} height={20} alt="" />
            Attendee Insights
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`flex-1 md:ml-64 p-6 sm:p-10 transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* MOBILE MENU */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button className="text-3xl" onClick={() => setSidebarOpen(true)}>☰</button>
        </div>

        {/* BACK */}
        <button onClick={() => router.push("/dashboard/browse")} className="text-sm text-gray-600 hover:text-black mb-4">
          ← Back to Events
        </button>

        {/* EVENT BANNER */}
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

            <h1 className="text-2xl sm:text-3xl font-bold mt-3">{event.title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm mt-2 gap-2">
              <div className="flex items-center gap-2">
                <Image src="/date.png" width={18} height={18} alt="date" />
                {event.date}
              </div>

              <div className="flex items-center gap-2">
                <Image src="/location.png" width={18} height={18} alt="location" />
                {event.location}
              </div>
            </div>

            <p className="text-gray-600 mt-4 leading-relaxed text-sm">
              {event.description}
            </p>
          </div>
        </div>

        {/* STATS + ACTIONS */}
        <div className="mt-6 flex flex-col lg:flex-row gap-6">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            <StatCard icon="/atendeeico1.png" label="Attendees" value={event.attendees} />
            <StatCard icon="/ticketsold.png" label="Tickets Sold" value={`${event.attendees}/${event.maxAttendees}`} />
            <StatCard icon="/revenueO.png" label="Revenue" value={`$${event.revenue.toLocaleString()}`} />
            <StatCard icon="/availability.png" label="Availability" value={`${availabilityPercent}%`} />
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm p-4 lg:w-64 flex flex-col gap-3">
            <h3 className="text-sm font-semibold mb-1">Actions</h3>

            <button
              onClick={() => router.push(`/dashboard/create-event?id=${eventId}`)}
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

        {/* AVAILABILITY + LIST */}
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-[2fr,1.3fr] gap-6">
          
          {/* Availability */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-semibold mb-3">Attendee Statistics</h2>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>{event.attendees} / {event.maxAttendees} attendees</span>
                <span>{availabilityPercent}% filled</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${availabilityPercent}%` }} />
              </div>
            </div>

            <h3 className="text-xs font-semibold text-gray-500 mb-2">Attendee List</h3>

            <div className="border rounded-lg max-h-64 overflow-y-auto">
              {attendeesList.length === 0 ? (
                <p className="text-xs text-gray-500 p-4">No attendees listed yet.</p>
              ) : (
                <ul className="divide-y">
                  {attendeesList.map((a: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 px-4 py-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <Image src="/userO.png" alt={a.name} width={20} height={20} className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{a.name}</p>
                        <p className="text-xs text-gray-500">{a.email}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-semibold mb-4">Ticket Sales Trend</h2>

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
                    dot={{ r: 5, stroke: "#2563EB", strokeWidth: 2, fill: "white" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SIMILAR EVENTS */}
        {similarEvents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Similar Events</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarEvents.map((ev: any) => (
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
                    <p className="text-xs text-blue-600 font-medium">{ev.category}</p>
                    <h3 className="text-sm font-semibold mt-1">{ev.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{ev.date} • {ev.location}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[80]">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm">
              <h2 className="text-lg font-semibold mb-2">Delete this event?</h2>
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

/* STAT CARD */
function StatCard({ icon, label, value }: any) {
  return (
    <div
      className="bg-white p-5 rounded-xl shadow-sm flex flex-col 
      transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <Image src={icon} width={34} height={34} alt={label} />
        <p className="text-xs text-gray-500">{label}</p>
      </div>
      <p className="text-xl sm:text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
