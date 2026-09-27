"use client";

import CharacterNameRow from "./CharacterNameRow";

type CharacterNamesListProps = {
  positions?: number[];
  names: string[];
  images: (string | undefined)[];
  onChangeName: (charIndex: number, name: string) => void;
  onChangeImage: (charIndex: number, image?: string) => void;
};

export default function CharacterNamesList({
  positions,
  names,
  images,
  onChangeName,
  onChangeImage,
}: CharacterNamesListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {names.map((name, charIndex) => (
        <CharacterNameRow
          key={charIndex}
          position={positions?.[charIndex]}
          name={name}
          image={images[charIndex]}
          onChangeName={(name) => onChangeName(charIndex, name)}
          onChangeImage={(image) => onChangeImage(charIndex, image)}
        />
      ))}
    </div>
  );
}
