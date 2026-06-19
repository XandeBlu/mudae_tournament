import { Character } from "../components/ui/BracketPage/CharactersCard";

export const themes = [
  "Kakera value",
  "Strength",
  "Speed",
  "Character's design (Drip)",
  "Popularity",
  "IQ",
  "Battle IQ",
  "Durability",
  "Agility",
  "Skills",
  "Stamina",
  "Aura",
  "Free Point",
  "Iconic Moments",
  "Plot armor",
  "History",
];

export enum Round {
  OITAVAS = "oitavas",
  QUARTAS = "quartas",
  SEMI = "semi",
  FINAL = "final",
}

export function getCharacterById(id: string): Character | undefined {
  return players.find((p) => p.id === id);
}

export const players: Character[] = [
  {
    id: "p1",
    characterName: "Naruto",
    playerName: "P1",
    image: "/images/naruto.png",
  },
  {
    id: "p2",
    characterName: "Sasuke",
    playerName: "P2",
    image: "/images/sasuke.png",
  },
  {
    id: "p3",
    characterName: "Goku",
    playerName: "P3",
    image: "/images/goku.png",
  },
  {
    id: "p4",
    characterName: "Vegeta",
    playerName: "P4",
    image: "/images/vegeta.png",
  },
  {
    id: "p5",
    characterName: "Luffy",
    playerName: "P5",
    image: "/images/luffy.png",
  },
  {
    id: "p6",
    characterName: "Zoro",
    playerName: "P6",
    image: "/images/zoro.png",
  },
  {
    id: "p7",
    characterName: "Ichigo",
    playerName: "P7",
    image: "/images/ichigo.png",
  },
  {
    id: "p8",
    characterName: "Aizen",
    playerName: "P8",
    image: "/images/aizen.png",
  },
  {
    id: "p9",
    characterName: "Tanjiro",
    playerName: "P9",
    image: "/images/tanjiro.png",
  },
  {
    id: "p10",
    characterName: "Rengoku",
    playerName: "P10",
    image: "/images/rengoku.png",
  },
  {
    id: "p11",
    characterName: "Gojo",
    playerName: "P11",
    image: "/images/gojo.png",
  },
  {
    id: "p12",
    characterName: "Sukuna",
    playerName: "P12",
    image: "/images/sukuna.png",
  },
  {
    id: "p13",
    characterName: "Edward",
    playerName: "P13",
    image: "/images/edward.png",
  },
  {
    id: "p14",
    characterName: "Alphonse",
    playerName: "P14",
    image: "/images/alphonse.png",
  },
  {
    id: "p15",
    characterName: "Light",
    playerName: "P15",
    image: "/images/light.png",
  },
  {
    id: "p16",
    characterName: "L",
    playerName: "P16",
    image: "/images/l.png",
  },
];
