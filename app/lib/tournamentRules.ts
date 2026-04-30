import { PlayerCount } from "@/app/types/tournament";

export const TOTAL_CHARACTERS = 16;

export function charactersPerPlayer(playerCount: PlayerCount): number {
  return TOTAL_CHARACTERS / playerCount;
}