"use client";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { updateUserProfile } from "@/libs/api";
import toast from "react-hot-toast";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Access localStorage only on client-side
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setCurrentUser(parsed);
      setName(parsed.name || "");
      setImageSrc(parsed.profileImage || "");
    }
  }, []);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  const finishEditingName = () => setEditingName(false);
  const handleNameKey = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && finishEditingName();

  const handleUpdateProfile = async () => {
    if (!currentUser?.id) return;

    setIsUpdating(true);
    try {
      const result = await updateUserProfile(currentUser.id, name, imageFile);

      if (result.success) {
        toast.success(result.message);
        window.dispatchEvent(new Event("storage"));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-2xl flex flex-col items-center transition-transform hover:scale-[1.02]">
      {/* Profile Image */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg border-4 border-gray-100">
        <img
          src={imageSrc || "/default-avatar.png"}
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

      {/* Name Section */}
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

      <p className="mt-3 text-sm text-gray-500">
        Click the pen to edit your profile
      </p>

      {/* Update Profile Button */}
      <button
        onClick={handleUpdateProfile}
        disabled={isUpdating}
        className={`mt-5 px-6 py-2 text-white font-semibold rounded-lg transition-all shadow-md ${
          isUpdating
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isUpdating ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
}
