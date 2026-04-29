"use client";

import { Player } from "@/app/context/TournamentContext";
import { inputBase } from "@/app/globalstyles/baseStyles";
import { Popover, PopoverProps } from "antd";

type PlayerInputRowProps = {
  index: number;
  player: Player;
  onChange: (player: Player) => void;
};

export default function PlayerInputRow({
  index,
  player,
  onChange,
}: PlayerInputRowProps) {
  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1 flex flex-col gap-1.5">
        <label className="text-[#8892aa] text-[11px] font-bold tracking-widest">
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
        <label className="text-[#8892aa] text-[11px] font-bold tracking-widest">
          COLEÇÃO
        </label>
        <Popover
          placement="right"
          content="Insira o tamanho da sua coleção de personagens Mudae"
          className="bg-[#0d1117] text-[#c9d1d9] text-sm p-2 rounded"
          arrow={false}
        >
          <input
            type="number"
            min={1}
            max={9999}
            value={player.collectionSize}
            onChange={(e) =>
              onChange({
                ...player,
                collectionSize: Number(e.target.value) || 1,
              })
            }
            className={`${inputBase} text-center font-bold px-2`}
          />
        </Popover>
      </div>
    </div>
  );
}
