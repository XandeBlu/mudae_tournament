"use client";

import { useState } from "react";
import { useTournament, Player } from "@/app/context/TournamentContext";
import StepHeader from "@/app/components/ui/StepHeader";
import PrimaryButton from "@/app/components/ui/buttons/PrimaryButton";
import SecondaryButton from "@/app/components/ui/buttons/SecondaryButton";
import PlayerInputRow from "./PlayerInputRow";
import { charactersPerPlayer } from "@/app/lib/tournamentRules";
import { PlayerCount } from "@/app/types/tournament";

const DEFAULT_COLLECTION_SIZE = 0;

function createEmptyPlayers(count: number): Player[] {
  return Array.from({ length: count }, () => ({
    name: "",
    collectionSize: DEFAULT_COLLECTION_SIZE,
  }));
}

function isPlayerValid(player: Player, minCollectionSize: number): boolean {
  return (
    player.name.trim().length > 0 && player.collectionSize >= minCollectionSize
  );
}

export default function Step2() {
  const { goNext, goBack, data, updateData } = useTournament();
  const minCollectionSize = charactersPerPlayer(data.playerCount as PlayerCount);

  const [players, setPlayers] = useState<Player[]>(() =>
    createEmptyPlayers(data.playerCount),
  );

  const updatePlayer = (index: number, updated: Player) => {
    setPlayers((prev) => prev.map((p, i) => (i === index ? updated : p)));
  };

  const isValid = players.every((p) => isPlayerValid(p, minCollectionSize));

  const handleConfirm = () => {
    if (!isValid) return;
    updateData({ players });
    goNext();
  };

  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        eyebrow="ETAPA 2 DE 4"
        title="Dados dos jogadores"
        subtitle={`Cada jogador precisa de uma coleção com no mínimo ${minCollectionSize} personagem${minCollectionSize > 1 ? "s" : ""}.`}
      />

      <div className="flex flex-col gap-4">
        {players.map((player, index) => (
          <PlayerInputRow
            key={index}
            index={index}
            player={player}
            minCollectionSize={minCollectionSize}
            onChange={(updated) => updatePlayer(index, updated)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={goBack}>← Voltar</SecondaryButton>
        <PrimaryButton
          disabled={!isValid}
          onClick={handleConfirm}
          className="flex-1"
        >
          Confirmar →
        </PrimaryButton>
      </div>
    </div>
  );
}