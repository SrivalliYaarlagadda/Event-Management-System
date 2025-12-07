"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const last = users[users.length - 1];
    if (last) setUsername(last.name);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex justify-center items-start p-6 pt-20">

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-xl">

        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-gray-500 mb-8">Manage your profile information</p>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/userO.png"
            width={100}
            height={100}
            alt="User"
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold mt-3">{username || "User"}</h2>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium bg-gray-50 p-3 rounded-lg">{username}</p>

          <p className="text-sm text-gray-500 mt-6">Email</p>
          <p className="text-lg font-medium bg-gray-50 p-3 rounded-lg">
            user@example.com
          </p>

          <p className="text-sm text-gray-500 mt-6">Total Events Created</p>
          <p className="text-lg font-medium bg-gray-50 p-3 rounded-lg">24</p>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold"
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}
