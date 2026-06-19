"use client";

import { players, Round } from "@/app/context/battleThemes";
import { useBracket } from "@/app/context/BattleScreenContext";
import Match from "../components/ui/BracketPage/Match";
import CharacterCard from "../components/ui/BracketPage/CharactersCard";
import CharacterIMG from "../components/ui/BattleScreen/CharacterIMG";

export default function BracketContent() {
  const { getWinner, results } = useBracket();

  const winner = (id: string) =>
    getWinner(id) ?? { id: `pendente-${id}`, characterName: "Aguardando..." };

  const champion = getWinner("f1");

  return (
    <div className="flex gap-16 overflow-x-auto p-4">
      {/* OITAVAS */}
      <div className="flex flex-col gap-4">
        <Match
          player1={players[0]}
          player2={players[1]}
          round={Round.OITAVAS}
          id="o1"
          winnerId={results["o1"] ?? null}
        />
        <Match
          player1={players[2]}
          player2={players[3]}
          round={Round.OITAVAS}
          id="o2"
          winnerId={results["o2"] ?? null}
        />
        <Match
          player1={players[4]}
          player2={players[5]}
          round={Round.OITAVAS}
          id="o3"
          winnerId={results["o3"] ?? null}
        />
        <Match
          player1={players[6]}
          player2={players[7]}
          round={Round.OITAVAS}
          id="o4"
          winnerId={results["o4"] ?? null}
        />
        <Match
          player1={players[8]}
          player2={players[9]}
          round={Round.OITAVAS}
          id="o5"
          winnerId={results["o5"] ?? null}
        />
        <Match
          player1={players[10]}
          player2={players[11]}
          round={Round.OITAVAS}
          id="o6"
          winnerId={results["o6"] ?? null}
        />
        <Match
          player1={players[12]}
          player2={players[13]}
          round={Round.OITAVAS}
          id="o7"
          winnerId={results["o7"] ?? null}
        />
        <Match
          player1={players[14]}
          player2={players[15]}
          round={Round.OITAVAS}
          id="o8"
          winnerId={results["o8"] ?? null}
        />
      </div>

      {/* QUARTAS */}
      <div className="flex flex-col gap-24 justify-center">
        <Match
          player1={winner("o1")}
          player2={winner("o2")}
          round={Round.QUARTAS}
          id="q1"
          winnerId={results["q1"] ?? null}
        />
        <Match
          player1={winner("o3")}
          player2={winner("o4")}
          round={Round.QUARTAS}
          id="q2"
          winnerId={results["q2"] ?? null}
        />
        <Match
          player1={winner("o5")}
          player2={winner("o6")}
          round={Round.QUARTAS}
          id="q3"
          winnerId={results["q3"] ?? null}
        />
        <Match
          player1={winner("o7")}
          player2={winner("o8")}
          round={Round.QUARTAS}
          id="q4"
          winnerId={results["q4"] ?? null}
        />
      </div>

      {/* SEMI */}
      <div className="flex flex-col gap-40 justify-center">
        <Match
          player1={winner("q1")}
          player2={winner("q2")}
          round={Round.SEMI}
          id="s1"
          winnerId={results["s1"] ?? null}
        />
        <Match
          player1={winner("q3")}
          player2={winner("q4")}
          round={Round.SEMI}
          id="s2"
          winnerId={results["s2"] ?? null}
        />
      </div>

      {/* FINAL */}
      <div className="flex items-center">
        <Match
          player1={winner("s1")}
          player2={winner("s2")}
          round={Round.FINAL}
          id="f1"
          winnerId={results["f1"] ?? null}
        />
      </div>

      {/* CAMPEÃO */}
      <div className="flex flex-col justify-center min-w-[220px]">
        {champion && (
          <div className="flex flex-col items-center gap-2 bg-[#1e2235] border-2 border-yellow-400 rounded-xl px-6 py-8 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
            <span className="text-yellow-400 text-xs uppercase tracking-wide">
              Campeão
            </span>
            <strong className="text-white text-2xl text-center">
              {champion.characterName}
            </strong>
            <CharacterIMG imageSrc={champion.image} points={null} />
            <span className="text-gray-400 text-sm">{champion.playerName}</span>
          </div>
        )}
      </div>
    </div>
  );
}
