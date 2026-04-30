"use client";

import { useState } from "react";
import { Player } from "@/app/context/TournamentContext";
import { inputBase, labelBase } from "@/app/globalstyles/baseStyles";
import { Popover } from "antd";

const MAX_COLLECTION_SIZE = 9999;
const EMPTY = 0;

type PlayerInputRowProps = {
  index: number;
  player: Player;
  minCollectionSize: number;
  onChange: (player: Player) => void;
};

export default function PlayerInputRow({
  index,
  player,
  minCollectionSize,
  onChange,
}: PlayerInputRowProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [wasBlurred, setWasBlurred] = useState(false);

  const handleCollectionChange = (raw: string) => {

    setWasBlurred(false);

    if (raw === "") {
      onChange({ ...player, collectionSize: EMPTY });
      return;
    }
    if (!/^[1-9]\d*$/.test(raw)) return;
    if (Number(raw) > MAX_COLLECTION_SIZE) return;

    onChange({ ...player, collectionSize: Number(raw) });
  };

  const displayValue =
    player.collectionSize === EMPTY ? "" : String(player.collectionSize);

  const isEmpty = player.collectionSize === EMPTY;
  const isBelowMinimum = !isEmpty && player.collectionSize < minCollectionSize;

  const shouldShowError = isBelowMinimum && wasBlurred;

  let popoverContent = "";
  if (isEmpty) {
    popoverContent = "Insira o tamanho da sua coleção de personagens Mudae";
  } else if (shouldShowError) {
    popoverContent = `A coleção precisa ter no mínimo ${minCollectionSize} personagem${minCollectionSize > 1 ? "s" : ""}.`;
  }

  const shouldShowPopover =
    popoverContent !== "" && isHovered && !isFocused;

  const collectionInputClasses = [
    inputBase,
    "text-center font-bold px-2",
    shouldShowError && "border-red-500 hover:border-red-500 focus:border-red-500",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1 flex flex-col gap-1.5">
        <label className={labelBase}>
          JOGADOR {index + 1}
        </label>
        <input
          type="text"
          placeholder="Nome"
          value={player.name}
          onChange={(e) => onChange({ ...player, name: e.target.value })}
          className={inputBase}
        />
      </div>

      <div className="w-24 flex flex-col gap-1.5">
        <label className={labelBase}>
          COLEÇÃO
        </label>
        <Popover
          placement="right"
          content={popoverContent}
          arrow={false}
          open={shouldShowPopover}
        >
          <input
            type="text"
            inputMode="numeric"
            placeholder={isFocused ? "" : "—"}
            value={displayValue}
            onChange={(e) => handleCollectionChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setWasBlurred(true);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={collectionInputClasses}
          />
        </Popover>
      </div>
    </div>
  );
}