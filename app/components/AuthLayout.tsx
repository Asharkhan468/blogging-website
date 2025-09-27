'use client'
import React from "react";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
