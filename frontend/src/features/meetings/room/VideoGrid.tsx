import ParticipantTile, { type Tile } from "./ParticipantTile";
import { cn } from "@/lib/utils";

function columns(n: number) {
  if (n <= 1) return "grid-cols-1";
  if (n === 2) return "grid-cols-1 sm:grid-cols-2";
  if (n <= 4) return "grid-cols-2";
  if (n <= 6) return "grid-cols-2 lg:grid-cols-3";
  if (n <= 9) return "grid-cols-3";
  return "grid-cols-3 lg:grid-cols-4";
}

/** Equal tiles normally; when someone presents, their screen takes the stage. */
export default function VideoGrid({ tiles }: { tiles: Tile[] }) {
  const presenter = tiles.find((t) => t.sharing);

  if (presenter) {
    const others = tiles.filter((t) => t.id !== presenter.id);
    return (
      <div className="flex h-full min-h-0 flex-col gap-2 p-2">
        <ParticipantTile tile={presenter} className="min-h-0 flex-1" />
        {others.length > 0 && (
          <div className="flex h-24 shrink-0 gap-2 overflow-x-auto sm:h-28">
            {others.map((t) => (
              <ParticipantTile key={t.id} tile={t} compact className="aspect-video h-full shrink-0" />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("grid h-full auto-rows-fr gap-2 p-2", columns(tiles.length))}>
      {tiles.map((t) => (
        <ParticipantTile key={t.id} tile={t} />
      ))}
    </div>
  );
}
