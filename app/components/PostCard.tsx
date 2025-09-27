"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";

export interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
}

export default function PostCard({
  id,
  title,
  excerpt,
  imageUrl,
  author,
  date,
}: PostCardProps):any {
  return (
    <article
      key={id}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300 flex flex-col"
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h2>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{excerpt}</p>

        {/* Author & Date */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium">{author}</span>
          </div>
          <span className="text-xs text-gray-400">{date}</span>
        </div>

        {/* Action Icons */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-gray-500">
          <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
            <span className="text-sm">Like</span>
          </button>

          <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            <FontAwesomeIcon icon={faComment} className="w-5 h-5" />
            <span className="text-sm">Comment</span>
          </button>

          <button className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
            <FontAwesomeIcon icon={faBookmark} className="w-5 h-5" />
            <span className="text-sm">Save</span>
          </button>
        </div>
      </div>
    </article>
  );
}
