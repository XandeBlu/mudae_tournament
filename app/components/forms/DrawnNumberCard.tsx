import { pad } from "@/app/lib/format";

type DrawnNumberCardProps = {
  index: number;
  position: number;
};

export default function DrawnNumberCard({
  index,
  position,
}: DrawnNumberCardProps) {
  return (
    <div className="bg-[#1e2235] border border-[#2a3050] rounded-[10px] p-4 flex items-center gap-3.5">
      <div className="w-8 h-8 rounded-lg bg-[#00e5a0] text-[#0d1117] font-extrabold text-sm flex items-center justify-center shrink-0">
        {index + 1}
      </div>
      <div className="flex flex-col">
        <span className="text-[#8892aa] text-[11px] font-semibold tracking-wider">
          Posição
        </span>
        <span className="text-white text-2xl font-extrabold tabular-nums tracking-wide">
          {pad(position)}
        </span>
      </div>
    </div>
  );
}