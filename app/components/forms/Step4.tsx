"use client";

import { useState } from "react";
import {
  useTournament,
  PlayerWithCharacters,
} from "../../context/TournamentContext";
import StepHeader from "../ui/StepHeader";
import Pagination from "../ui/Pagination";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";

function pad(n: number): string {
  return String(n).padStart(3, "0");
}

const inputBase =
  "w-full h-12 bg-[#1e2235] border border-[#2a3050] rounded-lg px-4 text-white text-[15px] outline-none transition-colors placeholder:text-[#4a5568] hover:border-[#00e5a0] focus:border-[#00e5a0] focus:ring-2 focus:ring-[#00e5a0]/20";

export default function Step4() {
  const { goBack, goNext, data, updateData } = useTournament();
  const { players, playerCount, draws } = data;
  const charactersPerPlayer = 16 / playerCount;

  const [characterNames, setCharacterNames] = useState<string[][]>(() =>
    players.map(() => Array(charactersPerPlayer).fill("")),
  );

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const currentPlayer = players[currentPlayerIndex];
  const currentDraws = draws[currentPlayerIndex] ?? [];
  const currentNames = characterNames[currentPlayerIndex];

  const isCurrentPlayerDone = currentNames.every((n) => n.trim().length > 0);
  const isLastPlayer = currentPlayerIndex === playerCount - 1;
  const allDone = characterNames.every((names) =>
    names.every((n) => n.trim().length > 0),
  );

  const updateName = (charIndex: number, value: string) => {
    setCharacterNames((prev) =>
      prev.map((names, pi) =>
        pi === currentPlayerIndex
          ? names.map((n, ci) => (ci === charIndex ? value : n))
          : names,
      ),
    );
  };

  const handleNext = () => {
    if (isLastPlayer) {
      const playersWithCharacters: PlayerWithCharacters[] = players.map(
        (p, pi) => ({
          ...p,
          characters: characterNames[pi].map((name, ci) => ({
            position: draws[pi][ci],
            name,
          })),
        }),
      );
      updateData({ playersWithCharacters });
      goNext();
    } else {
      setCurrentPlayerIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentPlayerIndex === 0) {
      goBack();
    } else {
      setCurrentPlayerIndex((i) => i - 1);
    }
  };

  const canAdvance = isLastPlayer ? allDone : isCurrentPlayerDone;

  return (
    <div className="flex flex-col gap-5">
      {/* Header + Pagination */}
      <div className="flex justify-between items-start gap-4">
        <StepHeader
          eyebrow="NOMES DOS PERSONAGENS"
          title={currentPlayer.name}
          subtitle="Informe os personagens sorteados"
        />
        <Pagination
          current={currentPlayerIndex}
          total={playerCount}
          onPrev={() =>
            currentPlayerIndex > 0 && setCurrentPlayerIndex((i) => i - 1)
          }
          onNext={() =>
            currentPlayerIndex < playerCount - 1 &&
            setCurrentPlayerIndex((i) => i + 1)
          }
        />
      </div>

      {/* Linhas de inputs */}
      <div className="flex flex-col gap-2.5">
        {currentDraws.map((position, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="bg-[#1e2235] border border-[#00e5a0]/30 text-[#00e5a0] font-extrabold font-mono text-[13px] rounded-lg px-3 py-2 shrink-0 tracking-wider">
              {pad(position)}
            </div>
            <input
              type="text"
              placeholder="Nome do personagem"
              value={currentNames[i]}
              onChange={(e) => updateName(i, e.target.value)}
              className={inputBase}
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <SecondaryButton onClick={handlePrev}>← Voltar</SecondaryButton>
        <PrimaryButton
          disabled={!canAdvance}
          onClick={handleNext}
          className="flex-1"
        >
          {isLastPlayer ? "Gerar chaveamento →" : "Próximo jogador →"}
        </PrimaryButton>
      </div>
    </div>
  );
}
