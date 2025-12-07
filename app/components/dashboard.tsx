// "use client";
// import Image from "next/image";

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-[#F7F9FC] flex">

//       {/* SIDEBAR */}
//       <aside className="w-64 bg-white shadow-md p-6 space-y-6">
//         <h2 className="text-xl font-bold mb-4">EventHub</h2>

//         <nav className="space-y-3">
//           <a href="/dashboard" className="flex items-center gap-3 text-blue-600 font-medium">
//             <Image src="/overviewico.png" width={20} height={20} alt="Overview" />
//             Overview
//           </a>

//           <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-black">
//             <Image src="/browseeventico.png" width={20} height={20} alt="Browse" />
//             Browse Events
//           </a>

//           <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-black">
//             <Image src="/atendeeico.png" width={20} height={20} alt="Attendees" />
//             Attendee Insights
//           </a>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold">Dashboard Overview</h1>
//         <p className="text-gray-500 mt-1">Welcome back! Here is your event summary</p>

//         {/* TOP CARDS */}
//         <div className="grid grid-cols-4 gap-6 mt-6">
//           <div className="bg-white p-6 rounded-xl shadow text-center">
//             <Image src="/classmanagement.png" width={40} height={40} alt="Events" />
//             <h3 className="mt-3 font-semibold">Total Events</h3>
//             <p className="text-2xl font-bold mt-1">24</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow text-center">
//             <Image src="/traineeinsight.png" width={40} height={40} alt="Bookings" />
//             <h3 className="mt-3 font-semibold">Total Bookings</h3>
//             <p className="text-2xl font-bold mt-1">1,847</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow text-center">
//             <Image src="/revenueO.png" width={40} height={40} alt="Revenue" />
//             <h3 className="mt-3 font-semibold">Revenue</h3>
//             <p className="text-2xl font-bold mt-1">$89,420</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow text-center">
//             <Image src="/userO.png" width={40} height={40} alt="Attendance" />
//             <h3 className="mt-3 font-semibold">Avg Attendance</h3>
//             <p className="text-2xl font-bold mt-1">77</p>
//           </div>
//         </div>

//         {/* GRAPHS */}
//         <div className="grid grid-cols-2 gap-6 mt-10">
//           <Image src="/bookingtrends.png" width={500} height={300} alt="Booking Trends" className="rounded-xl shadow" />
//           <Image src="/revenuegraphO.png" width={500} height={300} alt="Revenue Graph" className="rounded-xl shadow" />
//         </div>

//         {/* NOTIFICATIONS */}
//         <div className="mt-10 bg-white p-6 rounded-xl shadow space-y-4">
//           <h2 className="text-lg font-semibold">Recent Notifications</h2>

//           <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
//             <Image src="/Gtick.png" width={22} height={22} alt="Success" />
//             <div>
//               <h4 className="font-medium">New Event Registration</h4>
//               <p className="text-sm text-gray-600">Tech Conference 2024 has 150 new registrations</p>
//             </div>
//           </div>

//           <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg">
//             <Image src="/lowerror.png" width={22} height={22} alt="Warning" />
//             <div>
//               <h4 className="font-medium">Low Ticket Availability</h4>
//               <p className="text-sm text-gray-600">Summer Music Festival has only 20 tickets left</p>
//             </div>
//           </div>

//           <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
//             <Image src="/blueerror.png" width={22} height={22} alt="Info" />
//             <div>
//               <h4 className="font-medium">Event Starting Soon</h4>
//               <p className="text-sm text-gray-600">Marketing Workshop begins in 2 days</p>
//             </div>
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }
