"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarCircleItem {
  imageUrl: string;
  profileUrl?: string;
  name?: string;
}

export interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: (string | AvatarCircleItem)[];
}

export const defaultClientAvatars: (string | AvatarCircleItem)[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Elena Rostova",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Marcus Vance",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Aria Thorne",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Devon Chen",
  }
];

export const AvatarCircles: React.FC<AvatarCirclesProps> = ({
  numPeople = 30,
  className,
  avatarUrls = defaultClientAvatars,
}) => {
  return (
    <div className={cn("z-10 flex items-center -space-x-2.5 rtl:space-x-reverse", className)}>
      {avatarUrls.map((item, index) => {
        const url = typeof item === "string" ? item : item.imageUrl;
        const name = typeof item === "string" ? `Client ${index + 1}` : item.name || `Client ${index + 1}`;
        const profileUrl = typeof item === "object" ? item.profileUrl : undefined;

        const imgEl = (
          <img
            key={index}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-2 border-[#0A0A0A] object-cover object-center ring-1 ring-white/20 transition-transform duration-200 hover:scale-110 hover:z-20 shadow-md"
            src={url}
            width={36}
            height={36}
            alt={name}
            title={name}
          />
        );

        return profileUrl ? (
          <a key={index} href={profileUrl} target="_blank" rel="noopener noreferrer">
            {imgEl}
          </a>
        ) : (
          <React.Fragment key={index}>{imgEl}</React.Fragment>
        );
      })}

      {numPeople !== undefined && numPeople > 0 && (
        <div
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 border-[#0A0A0A] bg-neutral-900 ring-1 ring-white/25 text-center text-[11px] font-semibold text-white shadow-md transition-transform duration-200 hover:scale-110 hover:z-20"
        >
          +{numPeople}
        </div>
      )}
    </div>
  );
};

export default AvatarCircles;
