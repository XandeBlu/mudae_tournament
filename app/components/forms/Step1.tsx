"use client";

import { useState } from "react";
import { useTournament } from "@/app/context/TournamentContext";
import StepHeader from "@/app/components/ui/StepHeader";
import PrimaryButton from "@/app/components/ui/buttons/PrimaryButton";
import PlayerCountSelect from "./PlayerCountSelect";
import { PlayerCount } from "@/app/types/tournament";
import { labelBase } from "@/app/globalstyles/baseStyles";

export default function Step1() {
  const { goNext, updateData } = useTournament();
  const [playerCount, setPlayerCount] = useState<PlayerCount | null>(null);

  const handleContinue = () => {
    if (playerCount === null) return;
    updateData({ playerCount });
    goNext();
  };

  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        eyebrow="ETAPA 1 DE 4"
        title="Quantos jogadores?"
        subtitle="O torneio usa 16 personagens no total."
      />

      <div>
        <label className={`block ${labelBase} mb-2`}>
          QUANTIDADE DE JOGADORES
        </label>
        <PlayerCountSelect value={playerCount} onChange={setPlayerCount} />
      </div>

      <PrimaryButton
        disabled={playerCount === null}
        onClick={handleContinue}
        className="w-full"
      >
        Continuar →
      </PrimaryButton>
    </div>
  );
}
