"use client";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type Props = {
  initialName?: string;
  initialImage?: string;
};

export default function ProfileCard({
  initialName = "Ashar Khan",
  initialImage = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
}: Props) {
  const [name, setName] = useState(initialName);
  const [editingName, setEditingName] = useState(false);
  const [imageSrc, setImageSrc] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(String(reader.result));
    reader.readAsDataURL(file);
  };

  const finishEditingName = () => setEditingName(false);

  const handleNameKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") finishEditingName();
    if (e.key === "Escape") setEditingName(false);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-2xl flex flex-col items-center transition-transform hover:scale-[1.02]">
      {/* Profile Image */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg border-4 border-gray-100">
        <img
          src={imageSrc}
          alt="profile"
          className="w-full h-full object-cover"
        />

        {/* Edit Icon */}
        <button
          onClick={handleImageClick}
          aria-label="Edit profile image"
          className="absolute bottom-2 right-2 bg-white hover:bg-gray-100 border shadow-md
             w-10 h-10 flex items-center justify-center rounded-full transition-transform hover:scale-110"
        >
          <FontAwesomeIcon icon={faPen} className="text-gray-600" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Name + Edit */}
      <div className="mt-5 w-full text-center">
        {!editingName ? (
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>

            <button
              onClick={() => setEditingName(true)}
              aria-label="Edit name"
              className="bg-white border hover:bg-gray-100 w-9 h-9 flex items-center 
             justify-center rounded-full shadow-md"
            >
              <FontAwesomeIcon icon={faPen} className="text-gray-600" />
            </button>
          </div>
        ) : (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={finishEditingName}
            onKeyDown={handleNameKey}
            className="w-full max-w-xs text-gray-700 text-center border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        )}
      </div>

      {/* Info Text */}
      <p className="mt-4 text-sm text-gray-500">
        Click the pen to edit your profile
      </p>
    </div>
  );
}
