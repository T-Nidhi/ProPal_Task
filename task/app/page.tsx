import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Office App</h1>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
          Manage profiles, agents, and more with ease.
        </p>
        <Link
          href="/signup"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
