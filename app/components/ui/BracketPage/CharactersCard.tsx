export type Character = {
  characterName?: string;
  playerName?: string;
};

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="flex items-center w-full justify-between bg-[#1e2235] px-3 py-2">
      <strong className="text-white text-md">
        {character.characterName ?? "Calma patrão"}
      </strong>
      <span className="text-gray-500 text-sm">
        {character.playerName ?? "Calma patrão"}
      </span>
    </div>
  );
}
