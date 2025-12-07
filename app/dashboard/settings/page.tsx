"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex justify-center items-start p-6 pt-20">

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-xl space-y-8">

        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mb-4">Customize your preferences</p>

        {/* Theme Toggle */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Theme</h2>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5"
            />
            <p>Enable Dark Mode</p>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>

          <div className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              checked={emailNotify}
              onChange={() => setEmailNotify(!emailNotify)}
              className="w-5 h-5"
            />
            <p>Email Notifications</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={pushNotify}
              onChange={() => setPushNotify(!pushNotify)}
              className="w-5 h-5"
            />
            <p>Push Notifications</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold"
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}
