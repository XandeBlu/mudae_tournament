"use client";

import CharacterNameRow from "./CharacterNameRow";

type CharacterNamesListProps = {
  positions: number[];
  names: string[];
  onChangeName: (charIndex: number, name: string) => void;
};

export default function CharacterNamesList({
  positions,
  names,
  onChangeName,
}: CharacterNamesListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {positions.map((position, charIndex) => (
        <CharacterNameRow
          key={charIndex}
          position={position}
          name={names[charIndex]}
          onChange={(name) => onChangeName(charIndex, name)}
        />
      ))}
    </div>
  );
}