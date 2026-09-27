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
import {
  buildPlayersWithCompetitors,
  CompetitorInput,
} from "@/app/lib/tournamentBuild";
import { PlayerCount } from "@/app/types/tournament";

function createEmptyCompetitors(
  playerCount: number,
  competitorsPerPlayer: number,
): CompetitorInput[][] {
  return Array.from({ length: playerCount }, () =>
    Array.from({ length: competitorsPerPlayer }, () => ({
      name: "",
      image: undefined,
    })),
  );
}

function areAllNamesFilled(competitors: CompetitorInput[]): boolean {
  return competitors.every((competitor) => competitor.name.trim().length > 0);
}

export default function Step4() {
  const router = useRouter();

  const { goToStep, data, updateData } = useTournament();

  const { players, playerCount, draws, isMudae } = data;

  const namesPerPlayer = charactersPerPlayer(playerCount as PlayerCount);

  const [competitors, setCompetitors] = useState<CompetitorInput[][]>(() =>
    createEmptyCompetitors(playerCount, namesPerPlayer),
  );

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const currentPlayer = players[currentPlayerIndex];
  const currentDraws = draws[currentPlayerIndex];
  const currentCompetitors = competitors[currentPlayerIndex];

  if (!currentPlayer || !currentCompetitors) {
    return null;
  }

  const isLastPlayer = currentPlayerIndex === playerCount - 1;

  const isCurrentPlayerDone = areAllNamesFilled(currentCompetitors);

  const allPlayersDone = competitors.every(areAllNamesFilled);

  const canAdvance = isLastPlayer ? allPlayersDone : isCurrentPlayerDone;

  const updateCompetitorName = (competitorIndex: number, name: string) => {
    setCompetitors((prev) =>
      prev.map((playerCompetitors, playerIndex) =>
        playerIndex === currentPlayerIndex
          ? playerCompetitors.map((competitor, index) =>
              index === competitorIndex
                ? {
                    ...competitor,
                    name,
                  }
                : competitor,
            )
          : playerCompetitors,
      ),
    );
  };

  const updateCompetitorImage = (competitorIndex: number, image?: string) => {
    setCompetitors((prev) =>
      prev.map((playerCompetitors, playerIndex) =>
        playerIndex === currentPlayerIndex
          ? playerCompetitors.map((competitor, index) =>
              index === competitorIndex
                ? {
                    ...competitor,
                    image,
                  }
                : competitor,
            )
          : playerCompetitors,
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
        goToStep(2);
      } else {
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
        playersWithCompetitors: buildPlayersWithCompetitors(
          players,
          draws,
          competitors,
        ),
      });
    } else {
      const playersWithCompetitors = players.map((player, playerIndex) => ({
        ...player,
        competitors: competitors[playerIndex].map(
          (competitor, competitorIndex) => ({
            position: competitorIndex + 1,
            name: competitor.name.trim(),
            image: competitor.image,
          }),
        ),
      }));

      updateData({
        playersWithCompetitors,
      });
    }

    router.push("/bracket");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-start gap-4">
        <StepHeader
          eyebrow="NOMES DOS COMPETIDORES"
          title={currentPlayer.name}
          subtitle={
            isMudae
              ? "Informe os personagens sorteados"
              : "Informe os competidores escolhidos"
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
        names={currentCompetitors.map((competitor) => competitor.name)}
        images={currentCompetitors.map((competitor) => competitor.image)}
        onChangeName={updateCompetitorName}
        onChangeImage={updateCompetitorImage}
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
