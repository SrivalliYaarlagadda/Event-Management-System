"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/app/utils/auth";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setToast(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Read all registered users
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Validate
      const userFound = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!userFound) {
        setToast({ type: "error", msg: "Invalid email or password." });
        return;
      }

      // Generate token
      const token = "auth-token-" + Date.now();

      // Save token
      saveToken(token);
      document.cookie = `auth_token=${token}; path=/; max-age=86400`;

      setToast({ type: "success", msg: "Login successful! Redirecting..." });

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ECF4FC] to-white px-4">

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-sm text-white
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.msg}
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-xs mb-3 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white 
            text-sm font-medium py-2.5 rounded-lg shadow-md transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
