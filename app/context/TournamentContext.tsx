"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Player = {
  name: string;
  collectionSize: number;
};

export type Character = {
  position: number;
  name: string;
};

export type PlayerWithCharacters = Player & {
  characters: Character[];
};

export type TournamentData = {
  playerCount: number;
  players: Player[];
  draws: number[][]; // draws[playerIndex] = [pos1, pos2, ...]
  playersWithCharacters: PlayerWithCharacters[];
};

type StepContextType = {
  currentStep: number;
  goNext: () => void;
  goBack: () => void;
  data: TournamentData;
  updateData: (partial: Partial<TournamentData>) => void;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType,
);

export const useTournament = () => useContext(StepContext);

type TournamentProviderProps = {
  children: ReactNode;
  totalSteps: number;
};

export function TournamentProvider({
  children,
  totalSteps,
}: TournamentProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<TournamentData>({
    playerCount: 2,
    players: [],
    draws: [],
    playersWithCharacters: [],
  });

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const updateData = (partial: Partial<TournamentData>) =>
    setData((d) => ({ ...d, ...partial }));

  return (
    <StepContext.Provider
      value={{ currentStep, goNext, goBack, data, updateData }}
    >
      {children}
    </StepContext.Provider>
  );
}