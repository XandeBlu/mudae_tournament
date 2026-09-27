"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useTournament } from "./TournamentContext";

export type BracketCompetitor = {
  id: string;
  name: string;
  playerName: string;
  image?: string;
};

type BracketContextType = {
  results: Record<string, string>;
  setWinner: (matchId: string, winnerId: string) => void;
  getWinner: (matchId: string) => BracketCompetitor | null;
  characters: BracketCompetitor[];
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

const BracketContext = createContext<BracketContextType | null>(null);

export function BracketProvider({ children }: { children: React.ReactNode }) {
  const { data } = useTournament();

  const [results, setResults] = useState<Record<string, string>>({});

  const competitors = useMemo<BracketCompetitor[]>(() => {
    const competitors = data.playersWithCompetitors.flatMap((player) =>
      player.competitors.map((competitor) => ({
        id: crypto.randomUUID(),
        name: competitor.name,
        playerName: player.name,
        image: competitor.image,
      })),
    );

    return shuffleArray(competitors);
  }, [data.playersWithCompetitors]);

  function setWinner(matchId: string, winnerId: string) {
    setResults((prev) => ({
      ...prev,
      [matchId]: winnerId,
    }));
  }

  function getWinner(matchId: string): BracketCompetitor | null {
    const winnerId = results[matchId];

    if (!winnerId) return null;

    return competitors.find((competitor) => competitor.id === winnerId) ?? null;
  }

  return (
    <BracketContext.Provider
      value={{
        results,
        setWinner,
        getWinner,
        characters: competitors,
      }}
    >
      {children}
    </BracketContext.Provider>
  );
}

export function useBracket() {
  const ctx = useContext(BracketContext);

  if (!ctx) {
    throw new Error("useBracket deve estar dentro de BracketProvider");
  }

  return ctx;
}
