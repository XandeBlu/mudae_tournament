export type Character = {
  id: string;
  characterName?: string;
  playerName?: string;
  image?: string;
};

type CharacterCardProps = {
  character: Character;
  eliminated?: boolean; // ← novo
};

export default function CharacterCard({
  character,
  eliminated,
}: CharacterCardProps) {
  return (
    <div
      className={`flex items-center w-full justify-between bg-[#1e2235] px-3 py-2 transition-opacity duration-300 ${
        eliminated ? "opacity-40" : ""
      }`}
    >
      <strong className="text-white text-md">
        {character.characterName ?? "Calma patrão"}
      </strong>
      <span className="text-gray-500 text-sm">
        {character.playerName ?? "Calma patrão"}
      </span>
    </div>
  );
}
