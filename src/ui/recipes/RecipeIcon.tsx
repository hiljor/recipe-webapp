"use client"

import { ImageOff, Utensils } from "lucide-react"; // Eller ditt eget SVG-ikon
import { useState } from "react";

export default function RecipeIcon({
  src,
  alt = "Recipe icon",
}: {
  src: string | null | undefined;
  alt?: string;
}) {
  const [imageError, setImageError] = useState(false);

  const containerStyle =
    "flex-shrink-0 w-48 h-48 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 overflow-hidden";
  const iconStyle = "w-12 h-12 text-gray-400";
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