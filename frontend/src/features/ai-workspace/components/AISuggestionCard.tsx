import {
  FileText,
  ListChecks,
  Lightbulb,
  Video,
  PenLine,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import type { AISuggestion } from "../types";

interface Props {
  suggestion: AISuggestion;
  onClick: (prompt: string) => void;
}

const iconMap = {
  FileText,
  ListChecks,
  Lightbulb,
  Video,
  PenLine,
  Sparkles,
};

export default function AISuggestionCard({
  suggestion,
  onClick,
}: Props) {
  const Icon =
    iconMap[
      suggestion.icon as keyof typeof iconMap
    ] ?? Sparkles;

  return (
    <button
      type="button"
      onClick={() => onClick(suggestion.prompt)}
      className="
        group
        relative
        flex
        min-h-[150px]
        flex-col
        rounded-2xl
        border
        border-border
        bg-card
        p-5
        text-left
        shadow-sm
        transition-all
        duration-200

        
        hover:border-primary/30
        hover:bg-primary/[0.03]
        hover:shadow-md
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-primary/10
          text-primary
          transition-all
          duration-200
          group-hover:bg-primary
          group-hover:text-primary-foreground
        "
      >
        <Icon size={19} />
      </div>

      {/* Arrow */}
      <div
        className="
          absolute
          right-5
          top-5
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          text-muted-foreground
          opacity-0
          transition-all
          duration-200
          group-hover:bg-primary/10
          group-hover:text-primary
          group-hover:opacity-100
        "
      >
        <ArrowUpRight size={17} />
      </div>

      {/* Content */}
      <div className="mt-auto pt-6">
        <h3 className="font-semibold">
          {suggestion.title}
        </h3>

        <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
          {suggestion.description}
        </p>
      </div>
    </button>
  );
}