import CharacterCard, { Character } from "./CharactersCard";

type MatchProps = {
  player1: Character;
  player2: Character;
};

export default function Match({ player1, player2 }: MatchProps) {
  return (
    <div
      className="
    w-2xs
    cursor-pointer
    border-2
    border-gray-700
    rounded-lg
    overflow-hidden
    divide-y divide-gray-700
    hover:border-green-300
    hover:shadow-lg
    transition-all duration-300
  "
    >
      <CharacterCard
        character={{
          characterName: player1.characterName,
          playerName: player1.playerName,
        }}
      />
      <CharacterCard
        character={{
          characterName: player2.characterName,
          playerName: player2.playerName,
        }}
      />
    </div>
  );
}
