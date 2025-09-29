import Image from "next/image";
import PostGrid from "./components/PostGrid";

export default function Home() {
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
    <div>
      <PostGrid posts={demoPosts} />
    </div>
  );
}
