"use client";

import { inputBase } from "@/app/globalstyles/baseStyles";
import { pad } from "@/app/lib/format";

type CharacterNameRowProps = {
  position: number;
  name: string;
  onChange: (name: string) => void;
};

export default function CharacterNameRow({
  position,
  name,
  onChange,
}: CharacterNameRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#1e2235] border border-[#00e5a0]/30 text-[#00e5a0] font-extrabold font-mono text-[13px] rounded-lg px-3 py-2 shrink-0 tracking-wider">
        {pad(position)}
      </div>
      <input
        type="text"
        placeholder="Nome do personagem"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      />
    </div>
  );
}