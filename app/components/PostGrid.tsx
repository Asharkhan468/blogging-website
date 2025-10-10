"use client";
import React from "react";
import PostCard, { PostCardProps } from "./PostCard";

interface PostGridProps {
  posts: PostCardProps[];
}

export default function PostGrid({ posts }: PostGridProps): any {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
}
