"use client";
import { useRouter } from "next/navigation";
import PostGrid from "../components/PostGrid";
import { useEffect, useState } from "react";
import { getSavedPost } from "@/libs/api";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getSavedPost();
      console.log(response)
      if (response.success) setPosts(response.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Page Heading */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">
          Saved Posts
        </h1>
        {posts && posts.length > 0 ? (
          <PostGrid posts={posts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-lg">No saved posts yet.</p>
            <p className="text-sm">Start saving posts to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
