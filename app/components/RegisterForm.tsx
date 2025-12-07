"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrength from "./PasswordStrength";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setToast(null);

    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Read existing users
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Check for duplicate email
      const alreadyExists = existingUsers.some((u: any) => u.email === email);
      if (alreadyExists) {
        setToast({
          type: "error",
          msg: "This email is already registered.",
        });
        return;
      }

      // Save new user
      existingUsers.push({
        name,
        email,
        password,
      });

      localStorage.setItem("users", JSON.stringify(existingUsers));

      setToast({
        type: "success",
        msg: "Account created! Please log in.",
      });

      setTimeout(() => {
        router.push("/login");
      }, 900);
    }, 700);
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
          Create your EventHub account
        </h2>

        {error && (
          <p className="text-red-500 text-xs mb-3 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-xs font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
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
              placeholder="••••••••"
            />
            <PasswordStrength password={password} />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white 
            text-sm font-medium py-2.5 rounded-lg shadow-md transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
