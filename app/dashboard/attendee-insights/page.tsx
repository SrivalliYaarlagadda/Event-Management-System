
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function AttendeeInsights() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ⭐ PAGE LOADING ANIMATION
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // ====================  RECHARTS DATA  ====================
  const ageData = [
    { name: "18-24", value: 17 },
    { name: "25-34", value: 30 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 19 },
    { name: "55+", value: 10 },
  ];

  const topLocations = [
    { city: "San Francisco", attendees: 480 },
    { city: "Austin", attendees: 420 },
    { city: "London", attendees: 380 },
    { city: "New York", attendees: 360 },
    { city: "Seattle", attendees: 340 },
  ];

  const engagement = [
    { month: "Jan", engagement: 60 },
    { month: "Feb", engagement: 72 },
    { month: "Mar", engagement: 78 },
    { month: "Apr", engagement: 82 },
    { month: "May", engagement: 88 },
    { month: "Jun", engagement: 93 },
  ];

  const interestData = [
    { name: "Technology", value: 35 },
    { name: "Business", value: 25 },
    { name: "Music", value: 20 },
    { name: "Food", value: 12 },
    { name: "Art", value: 8 },
  ];

  const COLORS1 = ["#6366F1", "#EC4899", "#F97316", "#22C55E", "#06B6D4"];
  const COLORS2 = ["#6366F1", "#F97316", "#EC4899", "#22C55E", "#0EA5E9"];

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">

      {/* ================= SIDEBAR DESKTOP ================= */}
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

          <a href="/dashboard/attendee-insights" className="flex items-center gap-3 p-2 bg-blue-50 text-blue-600 rounded-lg">
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
          <a href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Image src="/overviewico.png" width={20} height={20} alt="" />
            Overview
          </a>

          <a href="/dashboard/browse" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Image src="/browseeventico.png" width={20} height={20} alt="" />
            Browse Events
          </a>

          <a href="/dashboard/attendee-insights" className="flex items-center gap-3 p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Image src="/atendeeico.png" width={20} height={20} alt="" />
            Attendee Insights
          </a>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className={`flex-1 md:ml-64 p-6 sm:p-10 transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >

        {/* ======== MOBILE HAMBURGER ======== */}
        <div className="md:hidden mb-6 flex justify-between items-center">
          <button className="text-3xl" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
        </div>

        <h1 className="text-2xl font-bold">Attendee Insights</h1>
        <p className="text-gray-500 text-sm mt-1">
          Understand your audience demographics and engagement.
        </p>

        {/* ================= CHART GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">

          {/* AGE DISTRIBUTION */}
          <div className="bg-white p-6 rounded-xl shadow max-w-[500px] w-full mx-auto">
            <h3 className="font-semibold mb-4">Age Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ageData} dataKey="value" nameKey="name" outerRadius="75%">
                    {ageData.map((_, i) => (
                      <Cell key={i} fill={COLORS1[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TOP LOCATIONS */}
          <div className="bg-white p-6 rounded-xl shadow max-w-[500px] w-full mx-auto">
            <h3 className="font-semibold mb-4">Top Locations</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topLocations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendees" fill="#6366F1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ENGAGEMENT */}
          <div className="bg-white p-6 rounded-xl shadow max-w-[500px] w-full mx-auto">
            <h3 className="font-semibold mb-4">Engagement Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="engagement" stroke="#A855F7" strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* INTEREST CATEGORIES */}
          <div className="bg-white p-6 rounded-xl shadow max-w-[500px] w-full mx-auto">
            <h3 className="font-semibold mb-4">Interest Categories</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={interestData} dataKey="value" nameKey="name" outerRadius="75%">
                    {interestData.map((_, i) => (
                      <Cell key={i} fill={COLORS2[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
