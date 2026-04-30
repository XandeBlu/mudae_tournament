export default function MudaeCommandHint() {
  return (
    <div className="bg-[#1a1f35] border border-[#2a3050] rounded-[10px] p-4">
      <p className="text-[#8892aa] text-[13px] leading-relaxed m-0">
        Use o comando{" "}
        <code className="bg-[#2a3050] text-[#00e5a0] px-1.5 py-0.5 rounded text-xs font-mono">
          $mmi [número]
        </code>{" "}
        no servidor do Discord para descobrir qual personagem está nessa posição
        da sua coleção.
      </p>
    </div>
  );
}