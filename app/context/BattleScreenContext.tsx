"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Character } from "../components/ui/BracketPage/CharactersCard";
import { useTournament } from "./TournamentContext";

type BracketContextType = {
  results: Record<string, string>;
  setWinner: (matchId: string, winnerId: string) => void;
  getWinner: (matchId: string) => Character | null;
  characters: Character[];
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

  const characters = useMemo<Character[]>(() => {
    const characters = data.playersWithCharacters.flatMap((player) =>
      player.characters.map((character) => ({
        id: crypto.randomUUID(),
        characterName: character.name,
        playerName: player.name,
        image: "/images/placeholder.png",
      })),
    );

    return shuffleArray(characters);
  }, [data.playersWithCharacters]);

  function setWinner(matchId: string, winnerId: string) {
    setResults((prev) => ({
      ...prev,
      [matchId]: winnerId,
    }));
  }

  function getWinner(matchId: string): Character | null {
    const winnerId = results[matchId];

    if (!winnerId) return null;

    return characters.find((character) => character.id === winnerId) ?? null;
  }

  return (
    <BracketContext.Provider
      value={{
        results,
        setWinner,
        getWinner,
        characters,
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
