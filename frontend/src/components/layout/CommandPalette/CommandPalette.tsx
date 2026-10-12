import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { CornerDownLeft, Link2, MessageSquare, Moon, Plus, Search } from "lucide-react";
import { toast } from "sonner";

import { navigation } from "@/constants/navigation";
import { useCommandStore } from "@/store/command-store";
import { useChatStore } from "@/features/chat/store/chat-store";
import { instantMeeting } from "@/features/meetings/services";
import { getErrorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: React.ElementType;
  run: () => void;
}

/** Ctrl/⌘ K: jump anywhere, start a meeting, or open a conversation. */
export default function CommandPalette() {
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const open = useCommandStore((s) => s.open);
  const setOpen = useCommandStore((s) => s.setOpen);
  const conversations = useChatStore((s) => s.conversations);
  const setConversation = useChatStore((s) => s.setConversation);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!useCommandStore.getState().open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const close = () => setOpen(false);
    const list: Command[] = [
      {
        id: "meet-now",
        label: "Start a meeting now",
        hint: "Action",
        icon: Plus,
        run: async () => {
          close();
          try {
            const m = await instantMeeting();
            navigate(`/app/meetings/${m.code}`);
          } catch (e) {
            toast.error(getErrorMessage(e, "Couldn't start a meeting."));
          }
        },
      },
      {
        id: "join",
        label: "Join a meeting with a code",
        hint: "Action",
        icon: Link2,
        run: () => {
          close();
          navigate("/app/meetings?join=1");
        },
      },
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        hint: "Action",
        icon: Moon,
        run: () => {
          close();
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        },
      },
      ...navigation.map((n) => ({
        id: n.href,
        label: `Go to ${n.label}`,
        hint: "Page",
        icon: n.icon,
        run: () => {
          close();
          navigate(n.href);
        },
      })),
      ...conversations.map((c) => ({
        id: `chat-${c.id}`,
        label: c.name,
        hint: "Chat",
        icon: MessageSquare,
        run: () => {
          close();
          setConversation(c.id);
          navigate("/app/chats");
        },
      })),
    ];
    const q = query.trim().toLowerCase();
    return q ? list.filter((c) => c.label.toLowerCase().includes(q)) : list;
  }, [query, conversations, navigate, resolvedTheme, setTheme, setOpen, setConversation]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, commands.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      commands[active]?.run();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      className="animate-fade fixed inset-0 z-[80] flex items-start justify-center bg-black/45 px-4 pt-[12vh]"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        className="animate-pop w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={17} className="text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search chats, pages and actions…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <ul role="listbox" className="max-h-80 overflow-y-auto p-1.5">
          {commands.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted-foreground">
              Nothing matches "{query}".
            </li>
          )}
          {commands.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseMove={() => setActive(i)}
                onClick={() => c.run()}
                className={cn(
                  "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm",
                  i === active ? "bg-muted" : "",
                )}
              >
                <c.icon size={16} className="shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate">{c.label}</span>
                <span className="text-xs text-muted-foreground">{c.hint}</span>
                {i === active && <CornerDownLeft size={13} className="text-muted-foreground" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
