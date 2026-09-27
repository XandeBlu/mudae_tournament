"use client";

import { useRef, useState } from "react";
import { inputBase } from "@/app/globalstyles/baseStyles";
import { pad } from "@/app/lib/format";

type CharacterNameRowProps = {
  position?: number;
  name: string;
  image?: string;
  onChangeName: (name: string) => void;
  onChangeImage: (image?: string) => void;
};

export default function CharacterNameRow({
  position,
  name,
  image,
  onChangeName,
  onChangeImage,
}: CharacterNameRowProps) {
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState(image ?? "");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveImage = () => {
    const trimmedUrl = imageUrl.trim();

    onChangeImage(trimmedUrl || undefined);
    setShowImageInput(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    onChangeImage(objectUrl);
    setImageUrl("");
    setShowImageInput(false);

    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    onChangeImage(undefined);
    setShowImageInput(false);
  };

  return (
    <div className="flex items-center gap-3 relative">
      {position !== undefined && (
        <div className="bg-[#1e2235] border border-[#00e5a0]/30 text-[#00e5a0] font-extrabold font-mono text-[13px] rounded-lg px-3 py-2 shrink-0 tracking-wider">
          {pad(position)}
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowImageInput((value) => !value)}
        className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-[#1e2235] flex items-center justify-center hover:border-[#00e5a0]/50 transition-colors"
      >
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 text-xl">+</span>
        )}
      </button>

      <input
        type="text"
        placeholder="Nome do competidor"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
        className={inputBase}
      />

      {showImageInput && (
        <div className="absolute z-20 left-0 top-14 w-80 bg-[#141727] border border-white/10 rounded-xl p-4 shadow-xl">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-white text-sm font-semibold">
                Imagem do competidor
              </p>

              <p className="text-gray-500 text-xs mt-1">
                Escolha uma imagem do computador ou cole uma URL.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-white/10 hover:border-[#00e5a0]/50 text-white rounded-lg px-3 py-2 text-sm transition-colors"
            >
              📁 Escolher imagem
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-gray-600 text-xs">ou</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <input
              type="url"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputBase}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSaveImage}
                disabled={!imageUrl.trim()}
                className="flex-1 bg-[#00e5a0] text-[#0d1117] font-bold rounded-lg px-3 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Usar URL
              </button>

              {image && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 py-2 rounded-lg border border-red-500/30 text-red-400 text-sm"
                >
                  Remover
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowImageInput(false)}
                className="px-3 py-2 rounded-lg border border-white/10 text-gray-400 text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
