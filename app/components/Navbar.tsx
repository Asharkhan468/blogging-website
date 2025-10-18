"use client";

import { logoutUser } from "@/libs/api";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

export default function Navbar(): any {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ✅ Load user only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    }
  }, []);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadUser = () => {
        const userData = localStorage.getItem("user");
        setCurrentUser(userData ? JSON.parse(userData) : null);
      };

      // load user initially
      loadUser();

      // ✅ Listen to localStorage changes (for login/logout)
      window.addEventListener("storage", loadUser);

      // ✅ Cleanup on unmount
      return () => window.removeEventListener("storage", loadUser);
    }
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      router.push("/auth/login");
    }
  };

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

        {/* ✅ Conditional rendering based on user login */}
        {currentUser ? (
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
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition overflow-hidden"
              >
                {currentUser?.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a8.25 8.25 0 0115 0"
                    />
                  </svg>
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden animate-fade-in">
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/saved")}
                  >
                    Saved
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          // ✅ When user is not logged in
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/auth/login")}
              className="px-4 py-2 rounded-full text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Log In
            </button>
            <button
              onClick={() => router.push("/auth/register")}
              className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      {/* Mobile Search for logged-in users */}
      {currentUser && (
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
      )}
    </nav>
  );
}
