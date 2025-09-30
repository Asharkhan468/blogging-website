"use client";
import React from "react";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight mb-8">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
