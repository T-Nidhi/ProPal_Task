"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json(); 

    if (res.ok) {
      console.log("Signup successful, redirecting...");
      router.push("/login");
    } else {
      alert(data.error || "Signup failed");
      console.error("Signup error:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong.");
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
        />

        <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};
