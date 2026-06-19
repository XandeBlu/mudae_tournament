"use client";
import { createContext, useContext, useState } from "react";
import { Character } from "../components/ui/BracketPage/CharactersCard";
import { getCharacterById } from "./battleThemes"; // ← importa o helper

type BracketContextType = {
  results: Record<string, string>;
  setWinner: (matchId: string, winnerId: string) => void;
  getWinner: (matchId: string) => Character | null;
};

const BracketContext = createContext<BracketContextType | null>(null);

export function BracketProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<Record<string, string>>({});

  function setWinner(matchId: string, winnerId: string) {
    setResults((prev) => ({ ...prev, [matchId]: winnerId }));
  }

  function getWinner(matchId: string): Character | null {
    const winnerId = results[matchId];
    if (!winnerId) return null;
    return getCharacterById(winnerId) ?? null; // ← busca o personagem real
  }

  return (
    <BracketContext.Provider value={{ results, setWinner, getWinner }}>
      {children}
    </BracketContext.Provider>
  );
}

export function useBracket() {
  const ctx = useContext(BracketContext);
  if (!ctx) throw new Error("useBracket deve estar dentro de BracketProvider");
  return ctx;
}
