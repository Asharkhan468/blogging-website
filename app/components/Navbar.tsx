// components/Navbar.tsx
"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

export default function Navbar(): any {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo / Site Name */}
        <div
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-gray-800 tracking-wide cursor-pointer hover:text-blue-600 transition-colors"
        >
          Blogging&nbsp;App
        </div>

        {/* Right Section: Search + Profile */}
        <div className="flex items-center gap-4">
          {/* Search (desktop) */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search posts..."
              className="pl-10 pr-4 py-2 w-72 rounded-full border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition"
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              {/* Replace with user image if available */}
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden animate-fade-in">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  type="button"
                  onClick={() => router.push("/profile")}
                >
                  Profile
                </button>

                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  type="button"
                  onClick={() => router.push("/saved")}
                >
                  Saved
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  type="button"
                  onClick={() => router.push("/auth/login")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search (full width below navbar) */}
      <div className="sm:hidden px-4 py-2 border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
