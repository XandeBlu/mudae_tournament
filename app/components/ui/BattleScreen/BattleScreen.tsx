"use client";

import { useEffect, useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import TertiaryButton from "../buttons/TertiaryButton";
import CharacterIMG from "./CharacterIMG";
import { themes } from "@/app/context/battleThemes";

export default function BattleScreen() {
  const [fcPoints, setFcPoints] = useState(0);

  const [scPoints, setScPoints] = useState(0);

  const winner = fcPoints === 3 ? "fc" : scPoints === 3 ? "sc" : null;

  const gameFinished = winner !== null;

  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  const canFinish = fcPoints === 3 || scPoints === 3;

  function handleDrawTheme() {
    const randomIndex = Math.floor(Math.random() * themes.length);
    const theme = themes[randomIndex];

    setCurrentTheme(theme);
  }

  return (
    <div className="bg-[#0d1117] min-h-screen flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="p-4 flex items-center">
        {/* esquerda */}
        <div className="flex-1 w-1/2">
          <SecondaryButton>← Voltar</SecondaryButton>
        </div>

        {/* centro */}
        <div className=" w-1/2 flex justify-end gap-10">
          <PrimaryButton
            onClick={() => {
              setFcPoints(0);
              setScPoints(0);
              setCurrentTheme(null);
            }}
          >
            Reiniciar
          </PrimaryButton>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex items-center justify-between">
        <div className="w-full flex items-center px-12">
          {/* esquerda */}
          <div className="flex-1 flex justify-start">
            <div
              className={`
    flex items-center gap-6
    transition-all duration-500 ease-out
    ${
      gameFinished
        ? winner === "fc"
          ? "scale-110 drop-shadow-[0_0_30px_#22c55e] animate-pulse"
          : "opacity-40 blur-sm"
        : ""
    }
  `}
            >
              {/* botões */}
              <div className="flex flex-col gap-2">
                <TertiaryButton
                  onClick={() => setFcPoints((prev) => Math.min(prev + 1, 3))}
                  disabled={gameFinished}
                >
                  +
                </TertiaryButton>
                <TertiaryButton
                  sub
                  onClick={() => setFcPoints((prev) => Math.max(prev - 1, 0))}
                >
                  -
                </TertiaryButton>
              </div>

              {/* personagem */}
              <CharacterIMG imageSrc="/images/meliodas.png" points={fcPoints} />
            </div>
          </div>

          {/* centro */}
          <div className="w-1/3 flex flex-col items-center gap-2">
            <div className="border px-4 py-2 rounded text-center select-none">
              {currentTheme ?? "Clique em sortear"}
            </div>
          </div>

          {/* direita */}
          <div className="flex-1 flex justify-end">
            <div
              className={` flex items-center gap-6
    transition-all duration-500 ease-out
    ${
      gameFinished
        ? winner === "sc"
          ? "scale-110 drop-shadow-[0_0_30px_#22c55e] animate-pulse"
          : "opacity-40 blur-sm"
        : ""
    }
  `}
            >
              {/* personagem */}
              <CharacterIMG imageSrc="/images/naruto.png" points={scPoints} />

              {/* botões */}
              <div className="flex flex-col gap-2">
                <TertiaryButton
                  onClick={() => setScPoints((prev) => Math.min(prev + 1, 3))}
                  disabled={gameFinished}
                >
                  +
                </TertiaryButton>
                <TertiaryButton
                  sub
                  onClick={() => setScPoints((prev) => Math.max(prev - 1, 0))}
                >
                  -
                </TertiaryButton>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="p-4 flex items-center">
        {/* esquerda */}
        <div className="flex-1" />

        {/* centro */}
        <div className="w-1/3 flex justify-center">
          <PrimaryButton onClick={handleDrawTheme}>Sortear</PrimaryButton>
        </div>

        {/* direita */}
        <div className="flex-1 flex justify-end">
          <SecondaryButton disabled={!canFinish}>Finalizar</SecondaryButton>
        </div>
      </footer>
    </div>
  );
}
