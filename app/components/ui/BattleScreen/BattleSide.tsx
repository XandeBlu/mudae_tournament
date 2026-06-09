import TertiaryButton from "../buttons/TertiaryButton";
import CharacterIMG from "./CharacterIMG";

type BattleSideProps = {
  imageSrc: string;
  points: number;
  onAdd: () => void;
  onSub: () => void;
  align: "left" | "right";
  disabledAdd: boolean;
};

export function BattleSide({
  imageSrc,
  points,
  onAdd,
  onSub,
  align,
  disabledAdd,
}: BattleSideProps) {
  const isLeft = align === "left";

  return (
    <div className={`flex-1 flex ${isLeft ? "justify-start" : "justify-end"}`}>
      <div className="flex items-center gap-6">
        {isLeft && (
          <div className="flex flex-col gap-2">
            <TertiaryButton onClick={onAdd} disabled={disabledAdd}>
              +
            </TertiaryButton>
            <TertiaryButton sub onClick={onSub}>
              -
            </TertiaryButton>
          </div>
        )}

        <CharacterIMG imageSrc={imageSrc} points={points} />

        {!isLeft && (
          <div className="flex flex-col gap-2">
            <TertiaryButton onClick={onAdd} disabled={disabledAdd}>
              +
            </TertiaryButton>
            <TertiaryButton sub onClick={onSub}>
              -
            </TertiaryButton>
          </div>
        )}
      </div>
    </div>
  );
}
