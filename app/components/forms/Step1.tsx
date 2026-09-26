"use client";

import { useState } from "react";
import { useTournament } from "@/app/context/TournamentContext";
import StepHeader from "@/app/components/ui/StepHeader";
import PrimaryButton from "@/app/components/ui/buttons/PrimaryButton";
import PlayerCountSelect from "./PlayerCountSelect";
import { PlayerCount } from "@/app/types/tournament";
import { labelBase } from "@/app/globalstyles/baseStyles";

export default function Step1() {
  const { goNext, updateData, goToStep } = useTournament();
  const [playerCount, setPlayerCount] = useState<PlayerCount | null>(null);
  const [isMudae, setIsMudae] = useState(true);

  const handleContinue = () => {
    if (playerCount === null) return;

    updateData({
      playerCount,
      isMudae,
    });

    if (isMudae) {
      goNext();
    } else {
      goToStep(1);
    }
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

      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-medium">Torneio Mudae</p>

          <p className="text-sm text-gray-400">
            Sortear posições da coleção dos jogadores
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsMudae((prev) => !prev)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isMudae ? "bg-green-500" : "bg-gray-600"
          }`}
          aria-pressed={isMudae}
          aria-label="Ativar torneio Mudae"
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              isMudae ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
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
