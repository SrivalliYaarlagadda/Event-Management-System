// // app/dashboard/browse/page.tsx
// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// type ViewMode = "grid" | "list";
// type Category = "Conference" | "Workshop" | "Meetup" | "Webinar" | "Festival" | "Expo";
// type Status = "Upcoming" | "Ongoing" | "Completed";

// type EventItem = {
//   id: number;
//   img: string;
//   title: string;
//   date: string;
//   loc: string;
//   attendees: string;
//   percent: string;
//   category: Category;
//   status: Status;
//   locationKey: string;
//   popularity: number;
// };

// // ORDER stays EXACTLY as you defined
// const INITIAL_EVENTS: EventItem[] = [
//   { id: 1, img: "/conference.png", title: "Tech Conference 2024", date: "2024-03-15", loc: "San Francisco, CA", attendees: "450 / 800", percent: "90%", category: "Conference", status: "Upcoming", locationKey: "san-francisco", popularity: 95 },
//   { id: 2, img: "/summermusic.png", title: "Summer Music Festival", date: "2024-06-20", loc: "Austin, TX", attendees: "2800 / 3000", percent: "93%", category: "Festival", status: "Upcoming", locationKey: "austin", popularity: 98 },
//   { id: 3, img: "/marketingworkshop.png", title: "Marketing Workshop", date: "2024-02-10", loc: "New York, NY", attendees: "120 / 150", percent: "80%", category: "Workshop", status: "Completed", locationKey: "new-york", popularity: 80 },
//   { id: 4, img: "/food.png", title: "Food & Wine Expo", date: "2024-04-05", loc: "Chicago, IL", attendees: "680 / 800", percent: "85%", category: "Expo", status: "Ongoing", locationKey: "chicago", popularity: 88 },
//   { id: 5, img: "/startup.png", title: "Startup Pitch Night", date: "2024-03-28", loc: "Seattle, WA", attendees: "200 / 250", percent: "80%", category: "Meetup", status: "Upcoming", locationKey: "seattle", popularity: 82 },
//   { id: 6, img: "/arts.png", title: "Art Gallery Opening", date: "2024-02-19", loc: "Los Angeles, CA", attendees: "250 / 400", percent: "88%", category: "Expo", status: "Upcoming", locationKey: "los-angeles", popularity: 86 },

//   // repeat same order
//   { id: 7, img: "/conference.png", title: "Design Systems Meetup", date: "2024-05-10", loc: "San Francisco, CA", attendees: "120 / 200", percent: "60%", category: "Meetup", status: "Upcoming", locationKey: "san-francisco", popularity: 70 },
//   { id: 8, img: "/summermusic.png", title: "Indie Music Night", date: "2024-07-05", loc: "Austin, TX", attendees: "1400 / 2000", percent: "70%", category: "Festival", status: "Upcoming", locationKey: "austin", popularity: 76 },
//   { id: 9, img: "/marketingworkshop.png", title: "Growth Marketing Webinar", date: "2024-01-15", loc: "Online", attendees: "900 / 1000", percent: "90%", category: "Webinar", status: "Completed", locationKey: "online", popularity: 92 },
//   { id: 10, img: "/food.png", title: "Street Food Carnival", date: "2024-08-12", loc: "Chicago, IL", attendees: "900 / 1200", percent: "75%", category: "Expo", status: "Upcoming", locationKey: "chicago", popularity: 79 },
//   { id: 11, img: "/startup.png", title: "Founders Meetup", date: "2024-09-01", loc: "Seattle, WA", attendees: "110 / 200", percent: "55%", category: "Meetup", status: "Upcoming", locationKey: "seattle", popularity: 65 },
//   { id: 12, img: "/arts.png", title: "Digital Art Showcase", date: "2024-03-02", loc: "Los Angeles, CA", attendees: "300 / 500", percent: "60%", category: "Expo", status: "Ongoing", locationKey: "los-angeles", popularity: 83 },
// ];

// const EVENTS_PER_PAGE = 12;

// export default function BrowseEvents() {
//   const router = useRouter();

//   const [events, setEvents] = useState(INITIAL_EVENTS);
//   const [viewMode, setViewMode] = useState<ViewMode>("grid");

//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   const [showFilters, setShowFilters] = useState(false);
//   const [category, setCategory] = useState<"All" | Category>("All");
//   const [status, setStatus] = useState<"All" | Status>("All");
//   const [location, setLocation] = useState<string>("All");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   // ⭐ SORT IS DISABLED BY DEFAULT
//   const [sortBy, setSortBy] = useState<null | "date" | "name" | "attendees" | "popularity">(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);

//   // 🔹 ref for outside-click detection (search + filter + card area)
//   const filterAreaRef = useRef<HTMLDivElement | null>(null);

//   const locationOptions = useMemo(
//     () => ["All", ...Array.from(new Set(events.map((e) => e.locationKey))).sort()],
//     [events]
//   );

//   // debounce search
//   useEffect(() => {
//     const id = setTimeout(
//       () => setDebouncedSearch(search.trim().toLowerCase()),
//       300
//     );
//     return () => clearTimeout(id);
//   }, [search]);

//   // 🔹 close filter card when clicking outside search/filter/card
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent | TouchEvent) => {
//       if (!showFilters) return;
//       if (
//         filterAreaRef.current &&
//         !filterAreaRef.current.contains(event.target as Node)
//       ) {
//         setShowFilters(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("touchstart", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("touchstart", handleClickOutside);
//     };
//   }, [showFilters]);

//   // filtering + sorting
//   const filteredEvents = useMemo(() => {
//     let data = [...events];

//     if (debouncedSearch) {
//       data = data.filter(
//         (e) =>
//           e.title.toLowerCase().includes(debouncedSearch) ||
//           e.loc.toLowerCase().includes(debouncedSearch)
//       );
//     }

//     if (category !== "All") data = data.filter((e) => e.category === category);
//     if (status !== "All") data = data.filter((e) => e.status === status);
//     if (location !== "All") data = data.filter((e) => e.locationKey === location);

//     if (fromDate) data = data.filter((e) => e.date >= fromDate);
//     if (toDate) data = data.filter((e) => e.date <= toDate);

//     // ⭐ SORT ONLY IF USER SELECTS
//     if (sortBy) {
//       data.sort((a, b) => {
//         if (sortBy === "name") return a.title.localeCompare(b.title);
//         if (sortBy === "date") return new Date(a.date).getTime() - new Date(b.date).getTime();
//         if (sortBy === "attendees") {
//           const [aCur, aMax] = a.attendees.split("/").map(Number);
//           const [bCur, bMax] = b.attendees.split("/").map(Number);
//           return bCur / bMax - aCur / aMax;
//         }
//         if (sortBy === "popularity") return b.popularity - a.popularity;
//         return 0;
//       });
//     }

//     return data;
//   }, [events, debouncedSearch, category, status, location, fromDate, toDate, sortBy]);

//   const totalPages = Math.max(1, Math.ceil(filteredEvents.length / EVENTS_PER_PAGE));

//   const currentPageEvents = useMemo(() => {
//     const start = (currentPage - 1) * EVENTS_PER_PAGE;
//     return filteredEvents.slice(start, start + EVENTS_PER_PAGE);
//   }, [filteredEvents, currentPage]);

//   const allSelectedOnPage =
//     currentPageEvents.length > 0 &&
//     currentPageEvents.every((ev) => selectedIds.includes(ev.id));

//   const toggleSelectAllOnPage = () => {
//     if (allSelectedOnPage) {
//       setSelectedIds((prev) =>
//         prev.filter((id) => !currentPageEvents.some((ev) => ev.id === id))
//       );
//     } else {
//       setSelectedIds((prev) => [
//         ...prev,
//         ...currentPageEvents
//           .map((ev) => ev.id)
//           .filter((id) => !prev.includes(id)),
//       ]);
//     }
//   };

//   const toggleSelectOne = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleDeleteSelected = () => {
//     if (!selectedIds.length) return;
//     setEvents((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
//     setSelectedIds([]);
//     setCurrentPage(1);
//   };

//   const handleExportSelected = () => {
//     if (!selectedIds.length) return;
//     const selectedEvents = events.filter((e) => selectedIds.includes(e.id));
//     const blob = new Blob([JSON.stringify(selectedEvents, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "selected-events.json";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);
//   };

//   const handleResetFilters = () => {
//     setCategory("All");
//     setStatus("All");
//     setLocation("All");
//     setFromDate("");
//     setToDate("");
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [debouncedSearch, category, status, location, fromDate, toDate]);

//   return (
//     <div className="min-h-screen bg-[#F7F9FC] flex flex-col md:flex-row">
//       {/* SIDEBAR */}
//       <aside className="w-56 bg-white shadow-md p-6 space-y-6 hidden md:block flex-shrink-0">
//         <h2 className="text-xl font-bold">EventHub</h2>
//         <p className="text-xs text-gray-500 -mt-3">Event Management</p>

//         <nav className="space-y-3 mt-6">
//           <a href="/dashboard" className="flex items-center gap-3 text-gray-700 hover:text-black p-2 rounded-lg">
//             <Image src="/overviewico.png" width={20} height={20} alt="Overview" />
//             Overview
//           </a>

//           <a href="/dashboard/browse" className="flex items-center gap-3 text-blue-600 font-medium bg-blue-50 p-2 rounded-lg">
//             <Image src="/browseeventico.png" width={20} height={20} alt="Browse Events" />
//             Browse Events
//           </a>

//           <a href="/dashboard/attendee-insights" className="flex items-center gap-3 text-gray-700 hover:text-black p-2 rounded-lg">
//             <Image src="/atendeeico.png" width={20} height={20} alt="Attendee Insights" />
//             Attendee Insights
//           </a>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full">
//         <h1 className="text-2xl font-bold">Browse Events</h1>
//         <p className="text-gray-500 text-sm mt-1">Discover and manage all your events</p>

//         {/* SEARCH + FILTER (with open/close + outside click) */}
//         <div className="mt-6 space-y-3" ref={filterAreaRef}>
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center flex-1 bg-white px-3 py-3 rounded-lg border border-gray-300 shadow-sm w-full sm:w-auto">
//               <input
//                 type="text"
//                 placeholder="Search events..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 // 🔹 click on search toggles card
//                 onClick={() => setShowFilters((prev) => !prev)}
//                 className="w-full outline-none text-sm"
//               />
//             </div>

//             <button
//               type="button"
//               // 🔹 click on filter also toggles card
//               onClick={() => setShowFilters((s) => !s)}
//               className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
//             >
//               <Image src="/filter.png" width={20} height={20} alt="Filter" />
//               <span>Filters</span>
//             </button>
//           </div>

//           {showFilters && (
//             <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
//               {/* Category */}
//               <div className="flex flex-col">
//                 <label className="text-xs text-gray-500 mb-1">Category</label>
//                 <select
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value as any)}
//                 >
//                   <option value="All">All</option>
//                   <option value="Conference">Conference</option>
//                   <option value="Workshop">Workshop</option>
//                   <option value="Meetup">Meetup</option>
//                   <option value="Webinar">Webinar</option>
//                   <option value="Festival">Festival</option>
//                   <option value="Expo">Expo</option>
//                 </select>
//               </div>

//               {/* Status */}
//               <div className="flex flex-col">
//                 <label className="text-xs text-gray-500 mb-1">Status</label>
//                 <select
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value as any)}
//                 >
//                   <option value="All">All</option>
//                   <option value="Upcoming">Upcoming</option>
//                   <option value="Ongoing">Ongoing</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>

//               {/* Date */}
//               <div className="flex flex-col">
//                 <label className="text-xs text-gray-500 mb-1">Date Range</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="date"
//                     className="border rounded-md px-2 py-2 text-xs flex-1"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                   />
//                   <input
//                     type="date"
//                     className="border rounded-md px-2 py-2 text-xs flex-1"
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Location */}
//               <div className="flex flex-col">
//                 <label className="text-xs text-gray-500 mb-1">Location</label>
//                 <select
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 >
//                   {locationOptions.map((locKey) => (
//                     <option key={locKey} value={locKey}>
//                       {locKey === "All"
//                         ? "All"
//                         : events.find((e) => e.locationKey === locKey)?.loc ?? locKey}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 mt-2">
//                 <button
//                   type="button"
//                   onClick={handleResetFilters}
//                   className="text-sm px-4 py-2 rounded-md border"
//                 >
//                   Reset
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowFilters(false)}
//                   className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white"
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* BULK ACTIONS */}
//         <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
//           <div className="flex flex-wrap items-center gap-3">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" checked={allSelectedOnPage} onChange={toggleSelectAllOnPage} />
//               <span>Select all on page</span>
//             </label>

//             <button
//               type="button"
//               onClick={handleDeleteSelected}
//               disabled={!selectedIds.length}
//               className={`px-3 py-1 rounded-md border text-xs ${
//                 selectedIds.length ? "border-red-500 text-red-600" : "border-gray-300 text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Delete selected
//             </button>

//             <button
//               type="button"
//               onClick={handleExportSelected}
//               disabled={!selectedIds.length}
//               className={`px-3 py-1 rounded-md border text-xs ${
//                 selectedIds.length ? "border-gray-400 text-gray-700" : "border-gray-300 text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Export selected
//             </button>
//           </div>

//           {/* VIEW + SORT */}
//           <div className="flex flex-wrap items-center gap-3">
//             <div className="inline-flex rounded-md border bg-white overflow-hidden">
//               <button
//                 type="button"
//                 onClick={() => setViewMode("grid")}
//                 className={`px-3 py-1 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600"}`}
//               >
//                 Grid
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setViewMode("list")}
//                 className={`px-3 py-1 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600"}`}
//               >
//                 List
//               </button>
//             </div>

//             <select
//               value={sortBy ?? ""}
//               onChange={(e) => setSortBy(e.target.value === "" ? null : (e.target.value as any))}
//               className="border rounded-md px-2 py-1 bg-white text-xs sm:text-sm"
//             >
//               <option value="">Sort (None)</option>
//               <option value="date">Sort by date</option>
//               <option value="name">Sort by name</option>
//               <option value="attendees">Sort by attendees</option>
//               <option value="popularity">Sort by popularity</option>
//             </select>
//           </div>
//         </div>

//         {/* GRID VIEW */}
//         {viewMode === "grid" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//             {currentPageEvents.map((event) => (
//               // <div key={event.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
//               <div
//   key={event.id}
//   onClick={() => router.push(`/dashboard/events/${event.id}`)}
//   className="bg-white rounded-xl shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
// >

//                 <div className="flex items-center justify-between mb-2">
//                   <label className="flex items-center gap-2 text-xs text-gray-500">
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.includes(event.id)}
//                       onChange={() => toggleSelectOne(event.id)}
//                     />
//                     Select
//                   </label>
//                   <span
//                     className={`px-2 py-1 rounded-full text-[10px] font-medium ${
//                       event.status === "Upcoming"
//                         ? "bg-blue-50 text-blue-600"
//                         : event.status === "Ongoing"
//                         ? "bg-green-50 text-green-700"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {event.status}
//                   </span>
//                 </div>

//                 <Image
//                   src={event.img}
//                   width={350}
//                   height={260}
//                   alt={event.title}
//                   className="rounded-lg w-full object-contain"
//                 />

//                 <h3 className="font-semibold mt-3">{event.title}</h3>

//                 <div className="mt-3 space-y-2 text-gray-600 text-sm">
//                   <div className="flex items-center gap-2">
//                     <Image src="/date.png" width={18} height={18} alt="date" />
//                     {event.date}
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Image src="/location.png" width={18} height={18} alt="location" />
//                     {event.loc}
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Image src="/attendees.png" width={18} height={18} alt="attendees" />
//                     {event.attendees} attendees
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mt-6">
//                   <p className="text-xs text-gray-500">Availability</p>
//                   <span className="font-bold text-black">{event.percent}</span>
//                 </div>

//                 <div className="h-2 bg-gray-200 rounded-full mt-1">
//                   <div className="h-full rounded-full bg-blue-600" style={{ width: event.percent }}></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           // LIST VIEW
//           <div className="mt-8 space-y-4">
//             {currentPageEvents.map((event) => (
//               // <div key={event.id} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div
//   key={event.id}
//   onClick={() => router.push(`/dashboard/events/${event.id}`)}
//   className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:shadow-lg transition"
// >

//                 <div className="flex items-start gap-4">
//                   <input
//                     type="checkbox"
//                     checked={selectedIds.includes(event.id)}
//                     onChange={() => toggleSelectOne(event.id)}
//                     className="mt-2"
//                   />

//                   <Image src={event.img} width={120} height={80} alt={event.title} className="rounded-lg object-contain" />

//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-semibold">{event.title}</h3>
//                       <span
//                         className={`px-2 py-1 rounded-full text-[10px] font-medium ${
//                           event.status === "Upcoming"
//                             ? "bg-blue-50 text-blue-600"
//                             : event.status === "Ongoing"
//                             ? "bg-green-50 text-green-700"
//                             : "bg-gray-100 text-gray-600"
//                         }`}
//                       >
//                         {event.status}
//                       </span>
//                     </div>

//                     <div className="mt-2 space-y-1 text-xs text-gray-600">
//                       <div className="flex items-center gap-2">
//                         <Image src="/date.png" width={16} height={16} alt="date" />
//                         {event.date}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Image src="/location.png" width={16} height={16} alt="location" />
//                         {event.loc}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Image src="/attendees.png" width={16} height={16} alt="attendees" />
//                         {event.attendees} attendees
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full sm:w-56">
//                   <div className="flex items-center justify-between text-xs text-gray-500">
//                     <span>Availability</span>
//                     <span className="font-bold text-black">{event.percent}</span>
//                   </div>

//                   <div className="h-2 bg-gray-200 rounded-full mt-1">
//                     <div className="h-full rounded-full bg-blue-600" style={{ width: event.percent }}></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

// {/* PAGINATION */}
// <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
  
//   <p>
//     Showing{" "}
//     <span className="font-semibold">
//       {filteredEvents.length === 0 ? 0 : (currentPage - 1) * EVENTS_PER_PAGE + 1}
//     </span>{" "}
//     –{" "}
//     <span className="font-semibold">
//       {Math.min(currentPage * EVENTS_PER_PAGE, filteredEvents.length)}
//     </span>{" "}
//     of{" "}
//     <span className="font-semibold">{filteredEvents.length}</span>{" "}
//     events
//   </p>

//   <div className="flex items-center gap-2">

//     {/* PREV BUTTON */}
//     <button
//       type="button"
//       disabled={currentPage === 1}
//       onClick={() => setCurrentPage((p) => p - 1)}
//       className={`px-3 py-1 rounded-md border ${
//         currentPage === 1
//           ? "border-gray-200 text-gray-300 cursor-not-allowed"
//           : "border-gray-300 text-gray-700"
//       }`}
//     >
//       Prev
//     </button>

//     {/* PAGE NUMBERS */}
//     {Array.from({ length: totalPages }).map((_, index) => {
//       const page = index + 1;
//       return (
//         <button
//           key={page}
//           onClick={() => setCurrentPage(page)}
//           className={`w-8 h-8 rounded-md text-xs ${
//             currentPage === page
//               ? "bg-blue-600 text-white"
//               : "bg-white border border-gray-300 text-gray-700"
//           }`}
//         >
//           {page}
//         </button>
//       );
//     })}

//     {/* NEXT BUTTON */}
//     <button
//       type="button"
//       disabled={currentPage === totalPages}
//       onClick={() => setCurrentPage((p) => p + 1)}
//       className={`px-3 py-1 rounded-md border ${
//         currentPage === totalPages
//           ? "border-gray-200 text-gray-300 cursor-not-allowed"
//           : "border-gray-300 text-gray-700"
//       }`}
//     >
//       Next
//     </button>

//   </div>
// </div>

//       </main>
//     </div>
//   );
// }
// app/dashboard/browse/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ViewMode = "grid" | "list";
type Category =
  | "Conference"
  | "Workshop"
  | "Meetup"
  | "Webinar"
  | "Festival"
  | "Expo";
type Status = "Upcoming" | "Ongoing" | "Completed";

type EventItem = {
  id: number;
  img: string;
  title: string;
  date: string;
  loc: string;
  attendees: string;
  percent: string;
  category: Category;
  status: Status;
  locationKey: string;
  popularity: number;
};

// ORDER stays EXACTLY as you defined
const INITIAL_EVENTS: EventItem[] = [
  {
    id: 1,
    img: "/conference.png",
    title: "Tech Conference 2024",
    date: "2024-03-15",
    loc: "San Francisco, CA",
    attendees: "450 / 800",
    percent: "90%",
    category: "Conference",
    status: "Upcoming",
    locationKey: "san-francisco",
    popularity: 95,
  },
  {
    id: 2,
    img: "/summermusic.png",
    title: "Summer Music Festival",
    date: "2024-06-20",
    loc: "Austin, TX",
    attendees: "2800 / 3000",
    percent: "93%",
    category: "Festival",
    status: "Upcoming",
    locationKey: "austin",
    popularity: 98,
  },
  {
    id: 3,
    img: "/marketingworkshop.png",
    title: "Marketing Workshop",
    date: "2024-02-10",
    loc: "New York, NY",
    attendees: "120 / 150",
    percent: "80%",
    category: "Workshop",
    status: "Completed",
    locationKey: "new-york",
    popularity: 80,
  },
  {
    id: 4,
    img: "/food.png",
    title: "Food & Wine Expo",
    date: "2024-04-05",
    loc: "Chicago, IL",
    attendees: "680 / 800",
    percent: "85%",
    category: "Expo",
    status: "Ongoing",
    locationKey: "chicago",
    popularity: 88,
  },
  {
    id: 5,
    img: "/startup.png",
    title: "Startup Pitch Night",
    date: "2024-03-28",
    loc: "Seattle, WA",
    attendees: "200 / 250",
    percent: "80%",
    category: "Meetup",
    status: "Upcoming",
    locationKey: "seattle",
    popularity: 82,
  },
  {
    id: 6,
    img: "/arts.png",
    title: "Art Gallery Opening",
    date: "2024-02-19",
    loc: "Los Angeles, CA",
    attendees: "250 / 400",
    percent: "88%",
    category: "Expo",
    status: "Upcoming",
    locationKey: "los-angeles",
    popularity: 86,
  },

  // repeat same order
  {
    id: 7,
    img: "/conference.png",
    title: "Design Systems Meetup",
    date: "2024-05-10",
    loc: "San Francisco, CA",
    attendees: "120 / 200",
    percent: "60%",
    category: "Meetup",
    status: "Upcoming",
    locationKey: "san-francisco",
    popularity: 70,
  },
  {
    id: 8,
    img: "/summermusic.png",
    title: "Indie Music Night",
    date: "2024-07-05",
    loc: "Austin, TX",
    attendees: "1400 / 2000",
    percent: "70%",
    category: "Festival",
    status: "Upcoming",
    locationKey: "austin",
    popularity: 76,
  },
  {
    id: 9,
    img: "/marketingworkshop.png",
    title: "Growth Marketing Webinar",
    date: "2024-01-15",
    loc: "Online",
    attendees: "900 / 1000",
    percent: "90%",
    category: "Webinar",
    status: "Completed",
    locationKey: "online",
    popularity: 92,
  },
  {
    id: 10,
    img: "/food.png",
    title: "Street Food Carnival",
    date: "2024-08-12",
    loc: "Chicago, IL",
    attendees: "900 / 1200",
    percent: "75%",
    category: "Expo",
    status: "Upcoming",
    locationKey: "chicago",
    popularity: 79,
  },
  {
    id: 11,
    img: "/startup.png",
    title: "Founders Meetup",
    date: "2024-09-01",
    loc: "Seattle, WA",
    attendees: "110 / 200",
    percent: "55%",
    category: "Meetup",
    status: "Upcoming",
    locationKey: "seattle",
    popularity: 65,
  },
  {
    id: 12,
    img: "/arts.png",
    title: "Digital Art Showcase",
    date: "2024-03-02",
    loc: "Los Angeles, CA",
    attendees: "300 / 500",
    percent: "60%",
    category: "Expo",
    status: "Ongoing",
    locationKey: "los-angeles",
    popularity: 83,
  },
];

const EVENTS_PER_PAGE = 12;

export default function BrowseEvents() {
  const router = useRouter();

  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState<"All" | Category>("All");
  const [status, setStatus] = useState<"All" | Status>("All");
  const [location, setLocation] = useState<string>("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ⭐ SORT IS DISABLED BY DEFAULT
  const [sortBy, setSortBy] = useState<null | "date" | "name" | "attendees" | "popularity">(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔹 ref for outside-click detection (search + filter + card area)
  const filterAreaRef = useRef<HTMLDivElement | null>(null);

  const locationOptions = useMemo(
    () => ["All", ...Array.from(new Set(events.map((e) => e.locationKey))).sort()],
    [events]
  );

  // debounce search
  useEffect(() => {
    const id = setTimeout(
      () => setDebouncedSearch(search.trim().toLowerCase()),
      300
    );
    return () => clearTimeout(id);
  }, [search]);

  // 🔹 close filter card when clicking outside search/filter/card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!showFilters) return;
      if (
        filterAreaRef.current &&
        !filterAreaRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showFilters]);

  // filtering + sorting
  const filteredEvents = useMemo(() => {
    let data = [...events];

    if (debouncedSearch) {
      data = data.filter(
        (e) =>
          e.title.toLowerCase().includes(debouncedSearch) ||
          e.loc.toLowerCase().includes(debouncedSearch)
      );
    }

    if (category !== "All") data = data.filter((e) => e.category === category);
    if (status !== "All") data = data.filter((e) => e.status === status);
    if (location !== "All") data = data.filter((e) => e.locationKey === location);

    if (fromDate) data = data.filter((e) => e.date >= fromDate);
    if (toDate) data = data.filter((e) => e.date <= toDate);

    // ⭐ SORT ONLY IF USER SELECTS
    if (sortBy) {
      data.sort((a, b) => {
        if (sortBy === "name") return a.title.localeCompare(b.title);
        if (sortBy === "date")
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortBy === "attendees") {
          const [aCur, aMax] = a.attendees.split("/").map(Number);
          const [bCur, bMax] = b.attendees.split("/").map(Number);
          return bCur / bMax - aCur / aMax;
        }
        if (sortBy === "popularity") return b.popularity - a.popularity;
        return 0;
      });
    }

    return data;
  }, [events, debouncedSearch, category, status, location, fromDate, toDate, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / EVENTS_PER_PAGE));

  const currentPageEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return filteredEvents.slice(start, start + EVENTS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const allSelectedOnPage =
    currentPageEvents.length > 0 &&
    currentPageEvents.every((ev) => selectedIds.includes(ev.id));

  const toggleSelectAllOnPage = () => {
    if (allSelectedOnPage) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentPageEvents.some((ev) => ev.id === id))
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...currentPageEvents
          .map((ev) => ev.id)
          .filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (!selectedIds.length) return;
    setEvents((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleExportSelected = () => {
    if (!selectedIds.length) return;
    const selectedEvents = events.filter((e) => selectedIds.includes(e.id));
    const blob = new Blob([JSON.stringify(selectedEvents, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "selected-events.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleResetFilters = () => {
    setCategory("All");
    setStatus("All");
    setLocation("All");
    setFromDate("");
    setToDate("");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category, status, location, fromDate, toDate]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* ================= SIDEBAR DESKTOP ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white p-6 shadow-md h-screen fixed left-0 top-0 z-40">
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
            className="flex items-center gap-3 p-2 bg-blue-50 text-blue-600 rounded-lg"
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
            className="flex items-center gap-3 p-2 bg-blue-50 text-blue-600 rounded-lg"
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
      <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-10 w-full">
        {/* MOBILE HAMBURGER */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button className="text-3xl" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
        </div>

        <h1 className="text-2xl font-bold">Browse Events</h1>
        <p className="text-gray-500 text-sm mt-1">
          Discover and manage all your events
        </p>

        {/* SEARCH + FILTER (with open/close + outside click) */}
        <div className="mt-6 space-y-3" ref={filterAreaRef}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center flex-1 bg-white px-3 py-3 rounded-lg border border-gray-300 shadow-sm w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // 🔹 click on search toggles card
                onClick={() => setShowFilters((prev) => !prev)}
                className="w-full outline-none text-sm"
              />
            </div>

            <button
              type="button"
              // 🔹 click on filter also toggles card
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
            >
              <Image src="/filter.png" width={20} height={20} alt="Filter" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Category</label>
                <select
                  className="border rounded-md px-3 py-2 text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                >
                  <option value="All">All</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Festival">Festival</option>
                  <option value="Expo">Expo</option>
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Status</label>
                <select
                  className="border rounded-md px-3 py-2 text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <option value="All">All</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="border rounded-md px-2 py-2 text-xs flex-1"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="border rounded-md px-2 py-2 text-xs flex-1"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Location</label>
                <select
                  className="border rounded-md px-3 py-2 text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locationOptions.map((locKey) => (
                    <option key={locKey} value={locKey}>
                      {locKey === "All"
                        ? "All"
                        : events.find((e) => e.locationKey === locKey)?.loc ??
                          locKey}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-sm px-4 py-2 rounded-md border"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* BULK ACTIONS */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allSelectedOnPage}
                onChange={toggleSelectAllOnPage}
              />
              <span>Select all on page</span>
            </label>

            <button
              type="button"
              onClick={handleDeleteSelected}
              disabled={!selectedIds.length}
              className={`px-3 py-1 rounded-md border text-xs ${
                selectedIds.length
                  ? "border-red-500 text-red-600"
                  : "border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              Delete selected
            </button>

            <button
              type="button"
              onClick={handleExportSelected}
              disabled={!selectedIds.length}
              className={`px-3 py-1 rounded-md border text-xs ${
                selectedIds.length
                  ? "border-gray-400 text-gray-700"
                  : "border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              Export selected
            </button>
          </div>

          {/* VIEW + SORT */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-md border bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                List
              </button>
            </div>

            <select
              value={sortBy ?? ""}
              onChange={(e) =>
                setSortBy(
                  e.target.value === "" ? null : (e.target.value as any)
                )
              }
              className="border rounded-md px-2 py-1 bg-white text-xs sm:text-sm"
            >
              <option value="">Sort (None)</option>
              <option value="date">Sort by date</option>
              <option value="name">Sort by name</option>
              <option value="attendees">Sort by attendees</option>
              <option value="popularity">Sort by popularity</option>
            </select>
          </div>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {currentPageEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => router.push(`/dashboard/events/${event.id}`)}
                className="bg-white rounded-xl shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-xs text-gray-500">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(event.id)}
                      onChange={() => toggleSelectOne(event.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    Select
                  </label>
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      event.status === "Upcoming"
                        ? "bg-blue-50 text-blue-600"
                        : event.status === "Ongoing"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <Image
                  src={event.img}
                  width={350}
                  height={260}
                  alt={event.title}
                  className="rounded-lg w-full object-contain"
                />

                <h3 className="font-semibold mt-3">{event.title}</h3>

                <div className="mt-3 space-y-2 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Image src="/date.png" width={18} height={18} alt="date" />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Image
                      src="/location.png"
                      width={18}
                      height={18}
                      alt="location"
                    />
                    {event.loc}
                  </div>

                  <div className="flex items-center gap-2">
                    <Image
                      src="/attendees.png"
                      width={18}
                      height={18}
                      alt="attendees"
                    />
                    {event.attendees} attendees
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <p className="text-xs text-gray-500">Availability</p>
                  <span className="font-bold text-black">{event.percent}</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: event.percent }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // LIST VIEW
          <div className="mt-8 space-y-4">
            {currentPageEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => router.push(`/dashboard/events/${event.id}`)}
                className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(event.id)}
                    onChange={() => toggleSelectOne(event.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2"
                  />

                  <Image
                    src={event.img}
                    width={120}
                    height={80}
                    alt={event.title}
                    className="rounded-lg object-contain"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                          event.status === "Upcoming"
                            ? "bg-blue-50 text-blue-600"
                            : event.status === "Ongoing"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="mt-2 space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/date.png"
                          width={16}
                          height={16}
                          alt="date"
                        />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/location.png"
                          width={16}
                          height={16}
                          alt="location"
                        />
                        {event.loc}
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/attendees.png"
                          width={16}
                          height={16}
                          alt="attendees"
                        />
                        {event.attendees} attendees
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-56">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Availability</span>
                    <span className="font-bold text-black">
                      {event.percent}
                    </span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: event.percent }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
          <p>
            Showing{" "}
            <span className="font-semibold">
              {filteredEvents.length === 0
                ? 0
                : (currentPage - 1) * EVENTS_PER_PAGE + 1}
            </span>{" "}
            –{" "}
            <span className="font-semibold">
              {Math.min(currentPage * EVENTS_PER_PAGE, filteredEvents.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold">{filteredEvents.length}</span>{" "}
            events
          </p>

          <div className="flex items-center gap-2">
            {/* PREV BUTTON */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-xs ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* NEXT BUTTON */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
