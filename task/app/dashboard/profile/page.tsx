"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Simulate logged-in user (you can later use Context/Auth)
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/get-user");
      const data = await res.json();
      setUser(data.user);
      setEmail(data.user.email);
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        username: user.username,
      }),
    });

    if (res.ok) {
      alert("Updated successfully!");
    } else {
      alert("Failed to update.");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-2xl font-bold">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Phone:</strong> {user.phone || "N/A"}</p>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            type="password"
            placeholder="Leave blank to keep same"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
