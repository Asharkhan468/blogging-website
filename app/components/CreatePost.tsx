"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { createPost } from "@/libs/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await createPost(title, description, image);

    if (res.success) {
      router.push("/");
      toast.success("Post created successfully");
      setTitle("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(res.message || "Failed to create post ");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload + Preview */}
          <div>
            {preview ? (
              <div className="relative w-full h-56 sm:h-64 md:h-72">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl border shadow-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-md transition"
                >
                  <FontAwesomeIcon icon={faTimes} size="sm" />
                </button>
              </div>
            ) : (
              <label className="w-full h-56 sm:h-64 md:h-72 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition text-center px-4">
                <span className="text-sm sm:text-base font-medium">
                  Click to upload image
                </span>
                <span className="text-xs sm:text-sm text-gray-400 mt-1">
                  JPG, PNG or GIF (max 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full border border-gray-300 text-gray-700 rounded-lg px-3 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write something..."
              rows={4}
              className="w-full border border-gray-300 text-gray-700 rounded-lg px-3 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3 rounded-lg font-semibold shadow-lg transition transform"
          >
            🚀 Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
