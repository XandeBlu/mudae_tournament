"use client";

import { useRef, useState } from "react";
import {
  PlayerCount,
  PlayerCountOption as PlayerCountOptionType,
} from "@/app/types/tournament";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { inputBase } from "@/app/globalstyles/baseStyles";

const PLAYER_OPTIONS: PlayerCountOptionType[] = [
  { value: 2, label: "2 jogadores — 8 personagens cada" },
  { value: 4, label: "4 jogadores — 4 personagens cada" },
  { value: 8, label: "8 jogadores — 2 personagens cada" },
  { value: 16, label: "16 jogadores — 1 personagem cada" },
];

type PlayerCountSelectProps = {
  value: PlayerCount | null;
  onChange: (value: PlayerCount) => void;
};

export default function PlayerCountSelect({
  value,
  onChange,
}: PlayerCountSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const selected = PLAYER_OPTIONS.find((opt) => opt.value === value);

  const handleSelect = (next: PlayerCount) => {
    onChange(next);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`${inputBase} transition-colors text-left tracking-tight`}
      >
        {selected ? (
          selected.label
        ) : (
          <span className="text-[#4a5568]">— Selecione —</span>
        )}
      </button>

      <span
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8892aa] transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        ▾
      </span>

      {isOpen && (
        <ul className="absolute z-50 mt-2 w-full bg-[#1e2235] border border-[#2a3050] rounded-lg shadow-2xl overflow-hidden divide-y divide-[#2a3050]/40">
          {PLAYER_OPTIONS.map((opt) => (
            <PlayerCountOption
              key={opt.value}
              option={opt}
              isSelected={value === opt.value}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

type PlayerCountOptionProps = {
  option: PlayerCountOptionType;
  isSelected: boolean;
  onSelect: (value: PlayerCount) => void;
};

function PlayerCountOption({
  option,
  isSelected,
  onSelect,
}: PlayerCountOptionProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(option.value)}
        className={`w-full text-left px-4 py-3.5 text-[15px] tracking-tight transition-colors ${
          isSelected
            ? "bg-[#00e5a0]/15 text-[#00e5a0] font-semibold"
            : "text-white font-medium hover:bg-[#2a3050]"
        }`}
      >
        {option.label}
      </button>
    </li>
  );
}
