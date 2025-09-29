"use client";
import React, { useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit?: (data: { email: string; password: string }) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Email */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 
                      transition-colors duration-200"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-colors duration-200"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-xl 
                   shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-all duration-200"
      >
        {type === "login" ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
}
