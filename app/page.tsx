"use client";
import PostGrid from "./components/PostGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/libs/api";

export default function Home() {
  const router = useRouter();
  const [post, setPost] = useState([]);

  

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetchPosts();
      if (result.success) {
        console.log("Fetched posts:", result.data);
        setPost(result.data);
      } else {
        console.error(result.message);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="relative min-h-screen">
      <PostGrid posts={post} />

      {/* Floating Add Button with Text */}
      <button
        onClick={() => router.push("/createPost")}
        type="button"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center space-x-2"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
        <span className="font-medium">Create Post</span>
      </button>
    </div>
  );
}
