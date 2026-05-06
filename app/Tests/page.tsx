import BattleScreen from "../components/ui/BattleScreen/BattleScreen";
import CharacterIMG from "../components/ui/BattleScreen/CharacterIMG";

export default function Tests() {
  return (
    <div className="p-2">
      <BattleScreen />
      <CharacterIMG imageSrc="/images/Sukkuna.png"></CharacterIMG>
    </div>
  );
}
