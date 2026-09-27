import { Player, PlayerWithCompetitors } from "@/app/context/TournamentContext";

export type CompetitorInput = {
  name: string;
  image?: string;
};

export function buildPlayersWithCompetitors(
  players: Player[],
  draws: number[][],
  competitors: CompetitorInput[][],
): PlayerWithCompetitors[] {
  return players.map((player, playerIndex) => ({
    ...player,
    competitors: competitors[playerIndex].map(
      (competitor, competitorIndex) => ({
        position: draws[playerIndex][competitorIndex],
        name: competitor.name.trim(),
        image: competitor.image,
      }),
    ),
  }));
}
