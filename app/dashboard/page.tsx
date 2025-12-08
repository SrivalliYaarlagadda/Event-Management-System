
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const bookingData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Bookings",
      data: [45, 52, 63, 60, 72, 88],
      borderColor: "#2563EB",
      backgroundColor: "#2563EB",
      tension: 0.4,
    },
  ],
};

const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 14500, 16800, 16000, 19000, 22000],
      backgroundColor: "#A78BFA",
      borderRadius: 8,
    },
  ],
};

const recentEvents = [
  { id: 1, name: "Tech Conference 2024", date: "2024-03-15", location: "San Francisco, CA", attendees: "450 / 800", status: "Upcoming" },
  { id: 2, name: "Summer Music Festival", date: "2024-06-20", location: "Austin, TX", attendees: "2800 / 3000", status: "Upcoming" },
  { id: 3, name: "Marketing Workshop", date: "2024-02-10", location: "New York, NY", attendees: "120 / 150", status: "Completed" },
  { id: 4, name: "Food & Wine Expo", date: "2024-04-05", location: "Chicago, IL", attendees: "680 / 800", status: "Ongoing" },
  { id: 5, name: "Startup Pitch Night", date: "2024-03-28", location: "Seattle, WA", attendees: "200 / 250", status: "Upcoming" },
];

function buildCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const title = today.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventDays = [3, 7, 15, 21];
  const cells: any[] = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, event: eventDays.includes(d) });

  return { title, cells };
}

const calendar = buildCalendar();



export default function Dashboard() {
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [username, setUsername] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);

  // ⭐ PAGE LOADING ANIMATION
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // GET USER NAME
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const last = users[users.length - 1];
    if (last) setUsername(last.name);
  }, []);

  // PROTECT ROUTE
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) router.push("/login");
  }, []);

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    document.cookie = "auth_token=; path=/; max-age=0;";
    router.push("/");
  };

  // NAV FUNCTIONS
  const goProfile = () => router.push("/dashboard/profile");
  const goSettings = () => router.push("/dashboard/settings");

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">

      {/* ================= SIDEBAR DESKTOP ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white p-6 shadow-md h-screen fixed left-0 top-0 z-40">
        <h2 className="text-xl font-bold">EventHub</h2>
        <p className="text-xs text-gray-500">Event Management</p>

        <nav className="space-y-3 mt-6 text-sm">
          <a href="/dashboard" className="flex items-center gap-3 p-2 bg-blue-50 text-blue-600 rounded-lg">
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

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <button className="text-2xl mb-6" onClick={() => setSidebarOpen(false)}>✕</button>

        <h2 className="text-xl font-bold">EventHub</h2>
        <p className="text-xs text-gray-500">Event Management</p>

        <nav className="space-y-3 mt-6 text-sm">
          <a href="/dashboard" className="flex items-center gap-3 p-2 bg-blue-50 text-blue-600 rounded-lg">
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

      {/* ================= MAIN CONTENT ================= */}
      <main
        className={`flex-1 md:ml-64 p-6 transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >

        {/* MOBILE HAMBURGER */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <button className="text-3xl" onClick={() => setSidebarOpen(true)}>☰</button>
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm">Welcome back! Here is your event summary.</p>
          </div>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm w-80">
            <input className="outline-none w-full text-sm" placeholder="Search events..." />
          </div>

          {/* NOTIFICATION + PROFILE */}
          <div className="flex items-center gap-4">

            {/* NOTIFICATIONS */}
            <div className="relative" ref={notifyRef}>
              <button
                className="relative bg-white p-3 rounded-full shadow-sm"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setProfileOpen(false);
                }}
              >
                <Image src="/notification.png" width={26} height={26} alt="Notifications" />
                <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg p-4 text-sm z-50">

                  <h2 className="text-sm font-semibold mb-3">Recent Notifications</h2>

                  {/* 1 */}
                  <div className="mb-3 bg-green-50 rounded-xl p-3 flex gap-3">
                    <Image src="/Gtick.png" width={14} height={14} alt="" className="w-4 h-4" />
                    <div>
                      <p className="text-xs font-semibold">New Event Registration</p>
                      <p className="text-[11px] text-gray-600 mt-1">
                        Tech Conference 2024 has 150 new registrations
                      </p>
                      <p className="text-[10px] text-gray-500 mt-2">2 hours ago</p>
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="mb-3 bg-orange-50 rounded-xl p-3 flex gap-3">
                    <Image src="/lowerror.png" width={14} height={14} alt="" className="w-4 h-4" />
                    <div>
                      <p className="text-xs font-semibold">Low Ticket Availability</p>
                      <p className="text-[11px] text-gray-600 mt-1">
                        Summer Music Festival has only 20 tickets left
                      </p>
                      <p className="text-[10px] text-gray-500 mt-2">5 hours ago</p>
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="bg-blue-50 rounded-xl p-3 flex gap-3">
                    <Image src="/blueerror.png" width={14} height={14} alt="" className="w-4 h-4" />
                    <div>
                      <p className="text-xs font-semibold">Event Starting Soon</p>
                      <p className="text-[11px] text-gray-600 mt-1">
                        Marketing Workshop begins in 2 days
                      </p>
                      <p className="text-[10px] text-gray-500 mt-2">1 day ago</p>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
              >
                <Image src="/userO.png" width={26} height={26} alt="" />
                <span className="text-sm font-medium">{username || "User"}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-lg w-40 p-2 z-50">

                  <button
                    type="button"
                    onClick={goProfile}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Profile
                  </button>

                  <button
                    type="button"
                    onClick={goSettings}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="lg:hidden mb-6">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mb-4">Welcome back! Here is your event summary.</p>

          <div className="flex gap-3 items-center">

            <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex-1">
              <input className="outline-none w-full text-sm" placeholder="Search events..." />
            </div>

            {/* MOBILE NOTIF */}
            <div className="relative" ref={notifyRef}>
              <button
                className="relative bg-white p-3 rounded-full shadow-sm"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setProfileOpen(false);
                }}
              >
                <Image src="/notification.png" width={26} height={26} alt="Notifications" />
                <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full" />
              </button>
            </div>

            {/* MOBILE PROFILE */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
              >
                <Image src="/userO.png" width={26} height={26} alt="" />
                <span className="text-sm font-medium">{username || "User"}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow text-sm z-50">

                  <button
                    type="button"
                    onClick={goProfile}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Profile
                  </button>

                  <button
                    type="button"
                    onClick={goSettings}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>

        {/* ===================== TOP CARDS ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between h-40">
            <div className="flex items-center justify-between">
              <Image src="/classmanagement.png" width={45} height={45} alt="" />
              <Image src="/12%25.png" width={55} height={55} alt="" />
            </div>
            <div>
              <h3 className="font-semibold mt-4 text-sm">Total Events</h3>
              <p className="text-2xl font-bold mt-1">24</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between h-40">
            <div className="flex items-center justify-between">
              <Image src="/traineeinsight.png" width={45} height={45} alt="" />
              <Image src="/18%25.png" width={55} height={55} alt="" />
            </div>
            <div>
              <h3 className="font-semibold mt-4 text-sm">Total Bookings</h3>
              <p className="text-2xl font-bold mt-1">1,847</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between h-40">
            <div className="flex items-center justify-between">
              <Image src="/revenueO.png" width={45} height={45} alt="" />
              <Image src="/23%25.png" width={55} height={55} alt="" />
            </div>
            <div>
              <h3 className="font-semibold mt-4 text-sm">Revenue</h3>
              <p className="text-2xl font-bold mt-1">$89,420</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between h-40">
            <div className="flex items-center justify-between">
              <Image src="/userO.png" width={45} height={45} alt="" />
              <Image src="/5%25.png" width={55} height={55} alt="" />
            </div>
            <div>
              <h3 className="font-semibold mt-4 text-sm">Avg Attendance</h3>
              <p className="text-2xl font-bold mt-1">77</p>
            </div>
          </div>
        </div>

        {/* ===================== CHARTS ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Booking Trends</h3>
            <div className="h-72"><Line data={bookingData} /></div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Revenue Overview</h3>
            <div className="h-72"><Bar data={revenueData} /></div>
          </div>
        </div>

        {/* ===================== RECENT EVENTS ===================== */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6 mt-10">

          {/* TABLE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Recent Events</h3>

            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2 text-left">Event</th>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Location</th>
                    <th className="py-2 text-left">Attendees</th>
                    <th className="py-2 text-left">Status</th>
                    <th className="py-2 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {recentEvents.map((e) => (
                    <tr key={e.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-2">{e.name}</td>
                      <td className="py-2 text-gray-600">{e.date}</td>
                      <td className="py-2 text-gray-600">{e.location}</td>
                      <td className="py-2 text-gray-600">{e.attendees}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            e.status === "Upcoming" ? "bg-blue-50 text-blue-600"
                            : e.status === "Ongoing" ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="py-2 space-x-3 text-sm">
                        <button className="text-blue-600 hover:underline">View</button>
                        <button className="text-gray-600 hover:underline">Edit</button>
                        <button className="text-red-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4 mt-4">
              {recentEvents.map((e) => (
                <div key={e.id} className="bg-white rounded-xl shadow p-4 border">
                  <p className="font-semibold">{e.name}</p>
                  <p className="text-sm text-gray-600 mt-1"><b>Date:</b> {e.date}</p>
                  <p className="text-sm text-gray-600"><b>Location:</b> {e.location}</p>
                  <p className="text-sm text-gray-600"><b>Attendees:</b> {e.attendees}</p>

                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        e.status === "Upcoming" ? "bg-blue-50 text-blue-600"
                        : e.status === "Ongoing" ? "bg-green-50 text-green-600"
                        : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {e.status}
                    </span>

                    <div className="flex gap-3 text-xs">
                      <button className="text-blue-600">View</button>
                      <button className="text-gray-600">Edit</button>
                      <button className="text-red-500">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* CALENDAR */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Upcoming Events Calendar</h3>
            <p className="text-sm text-gray-500 mb-4">{calendar.title}</p>

            <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {calendar.cells.map((c, i) =>
                c === null ? (
                  <div key={i}></div>
                ) : (
                  <div
                    key={i}
                    className={`h-9 flex items-center justify-center rounded-lg text-xs ${
                      c.event
                        ? "bg-blue-50 border border-blue-300 text-blue-700 font-semibold"
                        : "bg-white border border-gray-200 text-gray-700"
                    }`}
                  >
                    {c.day}
                  </div>
                )
              )}
            </div>

            <p className="text-xs text-gray-text-gray-400 mt-4">
              Highlighted dates have events.
            </p>

          </div>
        </div>

      </main>
    </div>
  );
}
