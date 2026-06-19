"use client";
import { Round } from "@/app/context/battleThemes";
import CharacterCard, { Character } from "./CharactersCard";
import { useRouter } from "next/navigation";

type MatchProps = {
  id?: string;
  round: Round;
  player1: Character;
  player2: Character;
  winnerId?: string | null; // ← agora é o id do vencedor, não um Character
};

export default function Match({
  id,
  player1,
  player2,
  round,
  winnerId,
}: MatchProps) {
  const router = useRouter();

  function handleClick() {
    router.push(
      `/battle?id=${id}&p1=${player1.id}&p2=${player2.id}&round=${round}`,
    );
  }

  const hasWinner = !!winnerId;
  const p1Eliminated = hasWinner && winnerId !== player1.id;
  const p2Eliminated = hasWinner && winnerId !== player2.id;

  return (
    <div
      onClick={handleClick}
      className="w-2xs cursor-pointer border-2 border-gray-700 rounded-lg overflow-hidden divide-y divide-gray-700 hover:border-green-300 hover:shadow-lg transition-all duration-300"
    >
      <CharacterCard character={player1} eliminated={p1Eliminated} />
      <CharacterCard character={player2} eliminated={p2Eliminated} />
    </div>
  );
}
