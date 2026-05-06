type ImageIndicatorProps = {
  imageSrc: string;
};

export default function CharacterIMG({ imageSrc }: ImageIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={imageSrc} alt="" className="w-40 object-contain" />

      <div className="flex gap-2">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`
              h-3 w-3 rounded-full border-2 border-green-700
              transition-colors
              
            `}
          />
        ))}
      </div>
    </div>
  );
}
