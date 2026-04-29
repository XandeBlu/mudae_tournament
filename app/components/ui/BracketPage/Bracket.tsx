import Match from "./Match";
import { Character } from "./CharactersCard";

const players: Character[] = [
  { characterName: "Naruto", playerName: "P1" },
  { characterName: "Sasuke", playerName: "P2" },
  { characterName: "Goku", playerName: "P3" },
  { characterName: "Vegeta", playerName: "P4" },
  { characterName: "Luffy", playerName: "P5" },
  { characterName: "Zoro", playerName: "P6" },
  { characterName: "Ichigo", playerName: "P7" },
  { characterName: "Aizen", playerName: "P8" },
  { characterName: "Tanjiro", playerName: "P9" },
  { characterName: "Rengoku", playerName: "P10" },
  { characterName: "Gojo", playerName: "P11" },
  { characterName: "Sukuna", playerName: "P12" },
  { characterName: "Edward", playerName: "P13" },
  { characterName: "Alphonse", playerName: "P14" },
  { characterName: "Light", playerName: "P15" },
  { characterName: "L", playerName: "P16" },
];

export default function Bracket() {
  return (
    <div className="flex gap-16 overflow-x-auto p-4">
      {/* OITAVAS DE FINAL */}
      <div className="flex flex-col gap-4">
        <Match player1={players[0]} player2={players[1]} />
        <Match player1={players[2]} player2={players[3]} />
        <Match player1={players[4]} player2={players[5]} />
        <Match player1={players[6]} player2={players[7]} />
        <Match player1={players[8]} player2={players[9]} />
        <Match player1={players[10]} player2={players[11]} />
        <Match player1={players[12]} player2={players[13]} />
        <Match player1={players[14]} player2={players[15]} />
      </div>

      {/* QUARTAS */}
      <div className="flex flex-col gap-24 justify-center">
        <Match
          player1={{ characterName: "Vencedor O1" }}
          player2={{ characterName: "Vencedor O2" }}
        />
        <Match
          player1={{ characterName: "Vencedor O3" }}
          player2={{ characterName: "Vencedor O4" }}
        />
        <Match
          player1={{ characterName: "Vencedor O5" }}
          player2={{ characterName: "Vencedor O6" }}
        />
        <Match
          player1={{ characterName: "Vencedor O7" }}
          player2={{ characterName: "Vencedor O8" }}
        />
      </div>

      {/* SEMI */}
      <div className="flex flex-col gap-40 justify-center">
        <Match
          player1={{ characterName: "Vencedor Q1" }}
          player2={{ characterName: "Vencedor Q2" }}
        />
        <Match
          player1={{ characterName: "Vencedor Q3" }}
          player2={{ characterName: "Vencedor Q4" }}
        />
      </div>

      {/* FINAL */}
      <div className="flex items-center">
        <Match
          player1={{ characterName: "Finalista 1" }}
          player2={{ characterName: "Finalista 2" }}
        />
      </div>
    </div>
  );
}
