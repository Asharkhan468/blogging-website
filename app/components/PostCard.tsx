"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { addComment, likePost, savePost } from "@/libs/api";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast"; 


export interface PostCardProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  likes: any[];
  comments: any[];
}

interface Comment {
  id: number;
  name: string;
  avatar: string;
  text: string;
}

export default function PostCard({
  _id,
  title,
  likes,
  description,
  image,
  createdAt,
  comments,
}: PostCardProps): any {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const currentUser = JSON.parse(storedUser);
    // Agar post.likes me current user id hai to true set karo
    if (likes?.includes(currentUser.id)) {
      setIsLiked(true);
    }
  }, [likes]);

  const handleLike = async () => {
    const res = await likePost(_id);
    if (res.success) {
      setIsLiked((prev) => !prev);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!comment.trim()) return;
    const response = await addComment(_id, commentText);
    if (response.success) {
      console.log("Comment added:", response.comments);
      setCommentText("");
    } else {
      console.log("Error:", response.message);
    }
  };

  const handleSave = async () => {
    const result = await savePost(_id);
    if (result.success) {
      console.log("✅", result.message);
      toast.success(result.message)
    } else {
      console.log("❌", result.message);
      toast.error(result.message)
    }
  };

  return (
    <>
      {/* Post Card */}
      <article
        key={_id}
        className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300 flex flex-col"
      >
        {/* Cover Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">
            {description}
          </p>

          {/* Author & Date */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {new Date(createdAt).toLocaleString()}
            </span>
          </div>

          {/* Action Icons */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-gray-500">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              <FontAwesomeIcon
                icon={isLiked ? faHeartSolid : faHeartRegular}
                className="w-5 h-5"
              />
              <span className="text-sm">{isLiked ? "Liked" : "Like"}</span>
            </button>

            <button
              className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <FontAwesomeIcon icon={faComment} className="w-5 h-5" />
              <span className="text-sm">Comment</span>
            </button>

            <button onClick={handleSave} className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
              <FontAwesomeIcon icon={faBookmark} className="w-5 h-5" />
              <span className="text-sm">Save</span>
            </button>
          </div>
        </div>
      </article>

      {/* Comment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl mx-4 rounded-2xl shadow-2xl p-6 relative animate-fade-in flex flex-col max-h-[80vh]">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            {/* Modal Title */}
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
              💬 Comments
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 mb-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-lg transition transform active:scale-95"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {comments.map((c) => (
                <div
                  key={c._id}
                  className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 shadow-sm"
                >
                  <img
                    src={c.userImage}
                    alt={c.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{c.userName}</h4>
                    <p className="text-sm text-gray-600">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
