"use client";

import { ImageOff, Utensils } from "lucide-react"; // Eller ditt eget SVG-ikon
import { useState } from "react";

export default function RecipeIcon({
  src,
  alt = "Recipe icon",
  size = "lg",
}: {
  src?: string | null | undefined;
  alt?: string;
  size?: "sm" | "lg";
}) {
  const [imageError, setImageError] = useState(false);

  const iconSize = size === "sm" ? "w-12 h-12" : "w-24 h-24";
  const iconStyle = `${iconSize} text-gray-400`;
  
  const containerClasses =
    size === "sm" ? "w-24 h-24 rounded-md" : "w-48 h-48 rounded-lg";

  const containerStyle = `flex-shrink-0 flex items-center justify-center bg-gray-100 border border-gray-200 overflow-hidden ${containerClasses}`;

  if (!src || imageError) {
    return (
      <div className={containerStyle}>
        {!src ? (
          <Utensils className={iconStyle} strokeWidth={1.5} />
        ) : (
          <ImageOff className={iconStyle} strokeWidth={1.5} />
        )}
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
