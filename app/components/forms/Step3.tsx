"use client";

import { useState } from "react";
import { useTournament } from "../../context/TournamentContext";
import StepHeader from "../ui/StepHeader";
import Pagination from "../ui/Pagination";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";

// ---------- Random utilities ----------
function cryptoRandom(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function drawUniqueNumbers(max: number, count: number): number[] {
  const pool = Array.from({ length: max }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = cryptoRandom(i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).sort((a, b) => a - b);
}

function pad(n: number): string {
  return String(n).padStart(3, "0");
}

// ---------- Component ----------
export default function Step3() {
  const { goBack, goNext, data, updateData } = useTournament();
  const { players, playerCount } = data;
  const charactersPerPlayer = 16 / playerCount;

  const [draws] = useState<number[][]>(() =>
    players.map((p) =>
      drawUniqueNumbers(p.collectionSize, charactersPerPlayer),
    ),
  );

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = players[currentPlayerIndex];
  const currentDraws = draws[currentPlayerIndex];

  const handleAdvance = () => {
    updateData({ draws });
    goNext();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header + Pagination */}
      <div className="flex justify-between items-start gap-4">
        <StepHeader
          eyebrow="SORTEIO DE NÚMEROS"
          title={currentPlayer.name}
          subtitle={`${charactersPerPlayer} número${charactersPerPlayer > 1 ? "s" : ""} sorteado${charactersPerPlayer > 1 ? "s" : ""}`}
        />
        <Pagination
          current={currentPlayerIndex}
          total={playerCount}
          onPrev={() => setCurrentPlayerIndex((i) => Math.max(i - 1, 0))}
          onNext={() =>
            setCurrentPlayerIndex((i) => Math.min(i + 1, playerCount - 1))
          }
        />
      </div>

      {/* Grid de números */}
      <div className="grid grid-cols-2 gap-3">
        {currentDraws.map((num, i) => (
          <div
            key={i}
            className="bg-[#1e2235] border border-[#2a3050] rounded-[10px] p-4 flex items-center gap-3.5"
          >
            <div className="w-8 h-8 rounded-lg bg-[#00e5a0] text-[#0d1117] font-extrabold text-sm flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            <div className="flex flex-col">
              <span className="text-[#8892aa] text-[11px] font-semibold tracking-wider">
                Posição
              </span>
              <span className="text-white text-2xl font-extrabold tabular-nums tracking-wide">
                {pad(num)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="bg-[#1a1f35] border border-[#2a3050] rounded-[10px] p-4">
        <p className="text-[#8892aa] text-[13px] leading-relaxed m-0">
          Use o comando{" "}
          <code className="bg-[#2a3050] text-[#00e5a0] px-1.5 py-0.5 rounded text-xs font-mono">
            $mmi [número]
          </code>{" "}
          no servidor do Discord para descobrir qual personagem está nessa
          posição da sua coleção.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <SecondaryButton onClick={goBack}>← Voltar</SecondaryButton>
        <PrimaryButton onClick={handleAdvance} className="flex-1">
          Informar nomes →
        </PrimaryButton>
      </div>
    </div>
  );
}
