"use client";

import { ImageOff, Utensils, X, Upload, Camera } from "lucide-react";
import { useState, useRef } from "react";

export default function RecipeIconEditor({
  src: initialSrc,
  alt = "Recipe icon",
  size = "lg",
}: {
  src?: string | null | undefined;
  alt?: string;
  size?: "sm" | "lg";
}) {
  const [src, setSrc] = useState(initialSrc);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Styling logikk fra din originale komponent
  const iconSize = size === "sm" ? "w-12 h-12" : "w-24 h-24";
  const iconStyle = `${iconSize} text-gray-400`;
  const containerClasses = size === "sm" ? "w-24 h-24 rounded-md" : "w-48 h-48 rounded-lg";
  const containerStyle = `group relative flex-shrink-0 flex items-center justify-center bg-gray-100 border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-400 transition-all ${containerClasses}`;

  // Håndter bildevalg (Frontend kun)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSrc(imageUrl);
      setImageError(false);
      setIsModalOpen(false); // Lukker modalen etter valg, eller behold den åpen for "Lagre"-knapp
    }
  };

  return (
    <>
      {/* Selve Ikonet (Triggeren) */}
      <div className={containerStyle} onClick={() => setIsModalOpen(true)}>
        {!src || imageError ? (
          <div className="flex items-center justify-center">
            {!src ? (
              <Utensils className={iconStyle} strokeWidth={1.5} />
            ) : (
              <ImageOff className={iconStyle} strokeWidth={1.5} />
            )}
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Overlay som dukker opp ved hover for å indikere "Edit" */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all">
          <Camera className="text-white opacity-0 group-hover:opacity-100" size={size === "sm" ? 20 : 32} />
        </div>
      </div>

      {/* Popup / Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Endre bilde</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Skjult Input */}
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {/* Dropzone/Klikk-område i modalen */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
                >
                  <Upload className="text-gray-400 group-hover:text-blue-500 mb-2" size={40} />
                  <p className="text-sm font-medium text-gray-700">Trykk for å laste opp</p>
                  <p className="text-xs text-gray-400 mt-1">Støtter JPG, PNG og WEBP</p>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Ferdig
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}