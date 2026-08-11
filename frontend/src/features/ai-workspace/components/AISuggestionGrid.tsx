import { aiSuggestions } from "../constants/suggestions";
import AISuggestionCard from "./AISuggestionCard";

interface Props {
  onSuggestionClick: (prompt: string) => void;
}

export default function AISuggestionGrid({
  onSuggestionClick,
}: Props) {
  return (
    <section>
      {/* Section heading */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Start with something
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Try one of these actions or ask Synapse
          anything.
        </p>
      </div>

      {/* Cards */}
      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {aiSuggestions.map((suggestion) => (
          <AISuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            onClick={onSuggestionClick}
          />
        ))}
      </div>
    </section>
  );
}