import type { AISuggestion } from "../types";

export const aiSuggestions: AISuggestion[] = [
  {
    id: "summarize",
    title: "Summarize a meeting",
    description:
      "Turn meeting discussions into clear notes and action items.",
    prompt:
      "Summarize my latest meeting and identify the important decisions and action items.",
    icon: "FileText",
  },
  {
    id: "tasks",
    title: "Organize my tasks",
    description:
      "Break down your work into clear, manageable tasks.",
    prompt:
      "Help me organize my current tasks and prioritize what I should work on first.",
    icon: "ListChecks",
  },
  {
    id: "brainstorm",
    title: "Brainstorm ideas",
    description:
      "Explore ideas and find new approaches to a problem.",
    prompt:
      "Help me brainstorm ideas for my current project.",
    icon: "Lightbulb",
  },
  {
    id: "meeting",
    title: "Prepare for a meeting",
    description:
      "Create an agenda, questions, and talking points.",
    prompt:
      "Help me prepare an agenda and talking points for my next meeting.",
    icon: "Video",
  },
  {
    id: "write",
    title: "Write something",
    description:
      "Draft messages, documents, plans, or other content.",
    prompt:
      "Help me write a professional message.",
    icon: "PenLine",
  },
  {
    id: "analyze",
    title: "Analyze my workspace",
    description:
      "Find patterns, priorities, and useful insights.",
    prompt:
      "Analyze my workspace and tell me what I should focus on next.",
    icon: "Sparkles",
  },
];