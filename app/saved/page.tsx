'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import PostGrid from "../components/PostGrid";

export default function Home() {
  const router = useRouter();
  const demoPosts = [
    {
      id: "1",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build blazing-fast web apps with Next.js...",
      imageUrl:
        "https://tse3.mm.bing.net/th/id/OIP.tykIp1IgQNMDSuEtPJWRgAHaE8?pid=Api&P=0&h=220",
      author: "Ashar Khan",
      date: "Sept 27, 2025",
    },
    {
      id: "2",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build blazing-fast web apps with Next.js...",
      imageUrl:
        "https://tse3.mm.bing.net/th/id/OIP.tykIp1IgQNMDSuEtPJWRgAHaE8?pid=Api&P=0&h=220",
      author: "Ashar Khan",
      date: "Sept 27, 2025",
    },
    {
      id: "3",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build blazing-fast web apps with Next.js...",
      imageUrl:
        "https://tse3.mm.bing.net/th/id/OIP.tykIp1IgQNMDSuEtPJWRgAHaE8?pid=Api&P=0&h=220",
      author: "Ashar Khan",
      date: "Sept 27, 2025",
    },
    
  ];

  return (
    // <div className="relative min-h-screen">
    //   <PostGrid posts={demoPosts} />

     
    // </div>
    <div className="relative min-h-screen bg-gray-50">
      {/* Page Heading */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">
          Saved Posts
        </h1>

        {/* Saved Posts List */}
        {demoPosts && demoPosts.length > 0 ? (
          <PostGrid posts={demoPosts} />
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
