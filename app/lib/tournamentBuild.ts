import { Player, PlayerWithCharacters } from "@/app/context/TournamentContext";

/**
 * Combina a lista de jogadores, seus números sorteados e os nomes
 * digitados num único array de PlayerWithCharacters pronto pro chaveamento.
 *
 * Pré-condição: os três arrays têm o mesmo comprimento, e cada par
 * draws[i] / characterNames[i] também tem comprimento igual.
 */
export function buildPlayersWithCharacters(
  players: Player[],
  draws: number[][],
  characterNames: string[][],
): PlayerWithCharacters[] {
  return players.map((player, playerIndex) => ({
    ...player,
    characters: characterNames[playerIndex].map((name, charIndex) => ({
      position: draws[playerIndex][charIndex],
      name: name.trim(),
    })),
  }));
}