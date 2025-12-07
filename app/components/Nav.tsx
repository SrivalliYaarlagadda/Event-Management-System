// // components/Nav.tsx
// "use client";
// import { motion } from "framer-motion";

// export default function Nav() {
//   return (
//     <motion.header
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="
//         w-full 
//         sticky top-0 z-40
//         bg-[rgba(236,244,252,0.6)]
//         backdrop-blur-xl 
//         border-b border-white/40
//       "
//     >
//       <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
//         {/* Logo → Just name as you requested */}
//         <h1 className="text-xl font-semibold text-black-700">EventHub</h1>

//         {/* Desktop links */}
//         <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
//           <a className="hover:text-gray-900 cursor-pointer">Features</a>
//           <a className="hover:text-gray-900 cursor-pointer">About</a>
//           <a className="hover:text-gray-900 cursor-pointer">Events</a>
//           <a className="hover:text-gray-900 cursor-pointer">Insights</a>
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center gap-3">
//           <button className="hidden sm:inline-block text-sm px-4 py-2 rounded-md">
//             Sign In
//           </button>
//           <button 
//           onClick={() => (window.location.href = "/dashboard")}
//           className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition">
//             Get Started
        
//           </button>
//         </div>
//       </nav>
//     </motion.header>
//   );
// }
// components/Nav.tsx
"use client";
import { motion } from "framer-motion";

export default function Nav() {
  // Function to decide where to redirect "Get Started"
  const goToDashboard = () => {
    if (typeof window === "undefined") return;

    const isLogged = localStorage.getItem("eventhub_is_logged_in") === "true";

    if (isLogged) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        w-full 
        sticky top-0 z-40
        bg-[rgba(236,244,252,0.6)]
        backdrop-blur-xl 
        border-b border-white/40
      "
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-black-700">EventHub</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          <a className="hover:text-gray-900 cursor-pointer">Features</a>
          <a className="hover:text-gray-900 cursor-pointer">About</a>
          <a className="hover:text-gray-900 cursor-pointer">Events</a>
          <a className="hover:text-gray-900 cursor-pointer">Insights</a>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {/* Sign In */}
          <button
            onClick={() => (window.location.href = "/login")}
            className="hidden sm:inline-block text-sm px-4 py-2 rounded-md"
          >
            Sign In
          </button>

          {/* Get Started / Go Dashboard */}
          <button
            onClick={goToDashboard}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition"
          >
            Get Started
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
