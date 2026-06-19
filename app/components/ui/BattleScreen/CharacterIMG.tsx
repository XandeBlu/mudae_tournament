type ImageIndicatorProps = {
  imageSrc?: string;
  points?: number | null;
};

export default function CharacterIMG({
  imageSrc,
  points,
}: ImageIndicatorProps) {
  const showPoints = points !== null && points !== undefined;

  return (
    <div className="flex flex-col items-center gap-2">
      {imageSrc ? (
        <img src={imageSrc} alt="" className="w-80 object-fill" />
      ) : (
        <div className="w-80 h-80 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Imagem não disponível</span>
        </div>
      )}

      {showPoints && (
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => {
            const filled = index < points;
            return (
              <span
                key={index}
                className={`h-3 w-3 rounded-full border-2 border-green-700 transition-colors ${
                  filled ? "bg-green-700" : "bg-transparent"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
