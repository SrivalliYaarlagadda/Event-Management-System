
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToDashboard = () => {
    const logged = localStorage.getItem("eventhub_is_logged_in") === "true";
    window.location.href = logged ? "/dashboard" : "/login";
  };

  return (
    <>
      {/* NAVBAR */}
      <header
        className="
          w-full sticky top-0 z-40
          bg-[rgba(236,244,252,0.6)]
          backdrop-blur-xl 
          border-b border-white/40
        "
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">EventHub</h1>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <a>Features</a>
            <a>About</a>
            <a>Events</a>
            <a>Insights</a>
          </div>

          <div className="hidden md:flex gap-3">
            <button onClick={() => (window.location.href = "/login")}>Sign In</button>
            <button
              onClick={goToDashboard}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
            >
              Get Started
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <button className="md:hidden text-3xl" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </nav>
      </header>

      {/* =================== CONE-SHAPE MOBILE MENU =================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="
              fixed top-0 left-0 w-full h-full
              bg-[#D9ECFF]
              z-[9999]
              flex flex-col p-6
            "
          >
            {/* CLOSE BUTTON */}
            <button
              className="text-3xl absolute top-6 right-6"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {/* ==== CENTER CONTENT ==== */}
            <div className="flex flex-col items-center justify-center h-full gap-10 text-center">
              
              {/* Links */}
              <div className="flex flex-col gap-6 text-2xl text-black-700">
                <a className="hover:text-black cursor-pointer">Features</a>
                <a className="hover:text-black cursor-pointer">About</a>
                <a className="hover:text-black cursor-pointer">Events</a>
                <a className="hover:text-black cursor-pointer">Insights</a>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 w-48">
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="bg-white py-3 rounded-md shadow text-black-700"
                >
                  Sign In
                </button>

                <button
                  onClick={goToDashboard}
                  className="bg-blue-600 text-white py-3 rounded-md shadow"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
