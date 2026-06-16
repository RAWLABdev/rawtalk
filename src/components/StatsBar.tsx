type Props = {
  day: number;
  totalDays: number;
};

export function StatsBar({
  day,
  totalDays,
}: Props) {
  const progress = Math.round(
    (day / totalDays) * 100
  );

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>

      <div className="mt-3 h-2 rounded bg-neutral-800">
        <div
          className="h-2 rounded bg-white"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}