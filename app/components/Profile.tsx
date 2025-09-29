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
    <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center">
      <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-md">
        {/* profile image */}
        <img
          src={imageSrc}
          alt="profile"
          className="w-full h-full object-cover"
        />

        {/* edit icon overlay */}
        <button
          onClick={handleImageClick}
          aria-label="Edit profile image"
          className="absolute bottom-2 right-2 bg-gray-300 hover:bg-gray-300 
             w-10 h-10 flex items-center justify-center rounded-full 
             shadow-lg transition-transform transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faPen} className="text-gray-700" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* name + edit */}
      <div className="mt-4 w-full text-center">
        {!editingName ? (
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-xl font-semibold text-gray-600">{name}</h2>

            <button
              onClick={() => setEditingName(true)}
              aria-label="Edit name"
              className="bg-gray-300 hover:bg-gray-300 w-8 h-8 flex items-center 
             justify-center rounded-full shadow-sm"
            >
              <FontAwesomeIcon icon={faPen} className="text-gray-700" />
            </button>
          </div>
        ) : (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={finishEditingName}
            onKeyDown={handleNameKey}
            className="w-full max-w-xs text-gray-600 mx-auto text-center border rounded-md px-3 py-2 focus:outline-none focus:ring"
          />
        )}
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Click the pen to edit image or name
      </p>
    </div>
  );
}
