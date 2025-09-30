'use client'
import PostGrid from "./components/PostGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

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
    {
      id: "4",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build blazing-fast web apps with Next.js...",
      imageUrl:
        "https://tse3.mm.bing.net/th/id/OIP.tykIp1IgQNMDSuEtPJWRgAHaE8?pid=Api&P=0&h=220",
      author: "Ashar Khan",
      date: "Sept 27, 2025",
    },
    {
      id: "5",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build blazing-fast web apps with Next.js...",
      imageUrl:
        "https://tse3.mm.bing.net/th/id/OIP.tykIp1IgQNMDSuEtPJWRgAHaE8?pid=Api&P=0&h=220",
      author: "Ashar Khan",
      date: "Sept 27, 2025",
    },
    {
      id: "6",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build blazing-fast web apps with Next.js...",
      imageUrl:
        "https://tse3.mm.bing.net/th/id/OIP.tykIp1IgQNMDSuEtPJWRgAHaE8?pid=Api&P=0&h=220",
      author: "Ashar Khan",
      date: "Sept 27, 2025",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <PostGrid posts={demoPosts} />

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
