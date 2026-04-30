"use client";

import { useState } from "react";
import { useTournament } from "@/app/context/TournamentContext";
import StepHeader from "@/app/components/ui/StepHeader";
import Pagination from "@/app/components/ui/Pagination";
import PrimaryButton from "@/app/components/ui/buttons/PrimaryButton";
import SecondaryButton from "@/app/components/ui/buttons/SecondaryButton";
import DrawnNumberCard from "./DrawnNumberCard";
import MudaeCommandHint from "./MudaeCommandHint";
import { drawUniqueNumbers } from "@/app/lib/random";
import { charactersPerPlayer } from "@/app/lib/tournamentRules";
import { PlayerCount } from "@/app/types/tournament";

export default function Step3() {
  const { goBack, goNext, data, updateData } = useTournament();
  const { players, playerCount } = data;
  const drawCount = charactersPerPlayer(playerCount as PlayerCount);

  const [draws] = useState<number[][]>(() =>
    players.map((player) => drawUniqueNumbers(player.collectionSize, drawCount)),
  );

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = players[currentPlayerIndex];
  const currentDraws = draws[currentPlayerIndex];

  const goToPrevPlayer = () =>
    setCurrentPlayerIndex((i) => Math.max(i - 1, 0));
  const goToNextPlayer = () =>
    setCurrentPlayerIndex((i) => Math.min(i + 1, playerCount - 1));

  const handleAdvance = () => {
    updateData({ draws });
    goNext();
  };

  const drawCountLabel = drawCount > 1 ? "números sorteados" : "número sorteado";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-start gap-4">
        <StepHeader
          eyebrow="SORTEIO DE NÚMEROS"
          title={currentPlayer.name}
          subtitle={`${drawCount} ${drawCountLabel}`}
        />
        <Pagination
          current={currentPlayerIndex}
          total={playerCount}
          onPrev={goToPrevPlayer}
          onNext={goToNextPlayer}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {currentDraws.map((position, index) => (
          <DrawnNumberCard key={index} index={index} position={position} />
        ))}
      </div>

      <MudaeCommandHint />

      <div className="flex gap-3">
        <SecondaryButton onClick={goBack}>← Voltar</SecondaryButton>
        <PrimaryButton onClick={handleAdvance} className="flex-1">
          Informar nomes →
        </PrimaryButton>
      </div>
    </div>
  );
}