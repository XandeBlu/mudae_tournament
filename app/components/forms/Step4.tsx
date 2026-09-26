"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTournament } from "@/app/context/TournamentContext";
import StepHeader from "@/app/components/ui/StepHeader";
import Pagination from "@/app/components/ui/Pagination";
import PrimaryButton from "@/app/components/ui/buttons/PrimaryButton";
import SecondaryButton from "@/app/components/ui/buttons/SecondaryButton";
import CharacterNamesList from "./CharacterNamesList";
import { charactersPerPlayer } from "@/app/lib/tournamentRules";
import { buildPlayersWithCharacters } from "@/app/lib/tournamentBuild";
import { PlayerCount } from "@/app/types/tournament";

function createEmptyNames(
  playerCount: number,
  namesPerPlayer: number,
): string[][] {
  return Array.from({ length: playerCount }, () =>
    Array<string>(namesPerPlayer).fill(""),
  );
}

function areAllNamesFilled(names: string[]): boolean {
  return names.every((name) => name.trim().length > 0);
}

export default function Step4() {
  const router = useRouter();

  const { goToStep, data, updateData } = useTournament();

  const { players, playerCount, draws, isMudae } = data;

  const namesPerPlayer = charactersPerPlayer(playerCount as PlayerCount);

  const [characterNames, setCharacterNames] = useState<string[][]>(() =>
    createEmptyNames(playerCount, namesPerPlayer),
  );

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const currentPlayer = players[currentPlayerIndex];
  const currentDraws = draws[currentPlayerIndex];
  const currentNames = characterNames[currentPlayerIndex];

  if (!currentPlayer || !currentNames) {
    return null;
  }

  const isLastPlayer = currentPlayerIndex === playerCount - 1;

  const isCurrentPlayerDone = areAllNamesFilled(currentNames);

  const allPlayersDone = characterNames.every(areAllNamesFilled);

  const canAdvance = isLastPlayer ? allPlayersDone : isCurrentPlayerDone;

  const updateCharacterName = (charIndex: number, name: string) => {
    setCharacterNames((prev) =>
      prev.map((names, playerIndex) =>
        playerIndex === currentPlayerIndex
          ? names.map((n, i) => (i === charIndex ? name : n))
          : names,
      ),
    );
  };

  const goToPrevPlayer = () => {
    setCurrentPlayerIndex((i) => Math.max(i - 1, 0));
  };

  const goToNextPlayer = () => {
    setCurrentPlayerIndex((i) => Math.min(i + 1, playerCount - 1));
  };

  const handleBack = () => {
    if (currentPlayerIndex === 0) {
      if (isMudae) {
        // Mudae: Step4 → Step3
        goToStep(2);
      } else {
        // Normal: Step4 → Step2
        goToStep(1);
      }

      return;
    }

    goToPrevPlayer();
  };

  const handleAdvance = () => {
    if (!canAdvance) return;

    if (!isLastPlayer) {
      goToNextPlayer();
      return;
    }

    if (isMudae) {
      updateData({
        playersWithCharacters: buildPlayersWithCharacters(
          players,
          draws,
          characterNames,
        ),
      });
    } else {
      const playersWithCharacters = players.map((player, playerIndex) => ({
        ...player,
        characters: characterNames[playerIndex].map((name, charIndex) => ({
          position: charIndex + 1,
          name: name.trim(),
        })),
      }));

      updateData({
        playersWithCharacters,
      });
    }

    router.push("/bracket");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-start gap-4">
        <StepHeader
          eyebrow="NOMES DOS PERSONAGENS"
          title={currentPlayer.name}
          subtitle={
            isMudae
              ? "Informe os personagens sorteados"
              : "Informe os personagens escolhidos"
          }
        />

        <Pagination
          current={currentPlayerIndex}
          total={playerCount}
          onPrev={goToPrevPlayer}
          onNext={goToNextPlayer}
        />
      </div>

      <CharacterNamesList
        positions={isMudae ? currentDraws : undefined}
        names={currentNames}
        onChangeName={updateCharacterName}
      />

      <div className="flex gap-3">
        <SecondaryButton onClick={handleBack}>← Voltar</SecondaryButton>

        <PrimaryButton
          disabled={!canAdvance}
          onClick={handleAdvance}
          className="flex-1"
        >
          {isLastPlayer ? "Gerar chaveamento →" : "Próximo jogador →"}
        </PrimaryButton>
      </div>
    </div>
  );
}
