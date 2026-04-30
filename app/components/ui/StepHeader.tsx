type StepHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function StepHeader({
  eyebrow,
  title,
  subtitle,
}: StepHeaderProps) {
  return (
    <div>
      <p className="text-[#00e5a0] text-xs font-bold tracking-[0.15em] mb-2">
        {eyebrow}
      </p>
      <h1 className="text-white text-2xl md:text-[28px] font-extrabold leading-tight mb-1">
        {title}
      </h1>
      <p className="text-[#8892aa] text-sm">{subtitle}</p>
    </div>
  );
}