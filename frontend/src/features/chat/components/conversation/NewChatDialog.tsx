import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { toast } from "sonner";

import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { createConversation, getConversations, searchUsers, type ApiMember } from "../../services/chat-api";
import { toConversation } from "../../hooks/useChat";
import { useChatStore } from "../../store/chat-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getErrorMessage } from "@/lib/errors";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Find a person by name or email and open a one-to-one chat. */
export default function NewChatDialog({ open, onOpenChange }: Props) {
  const me = useAuthStore((s) => s.user);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ApiMember[]>([]);
  const [busy, setBusy] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const { data } = await searchUsers(q);
        setResults(data);
      } catch (error) {
        toast.error(getErrorMessage(error, "Search failed."));
      } finally {
        setSearching(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const start = async (person: ApiMember) => {
    const store = useChatStore.getState();
    const existing = store.conversations.find(
      (c) => c.type === "direct" && c.participants[0]?.id === person.id,
    );
    if (existing) {
      store.setConversation(existing.id);
      onOpenChange(false);
      return;
    }
    setBusy(true);
    try {
      const { data: created } = await createConversation([person.id]);
      const { data } = await getConversations();
      store.setConversations(data.map((c) => toConversation(c, me?.id)), "server");
      store.setConversation(created.id);
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "Couldn't start the chat."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-fade fixed inset-0 z-[70] bg-black/50" />
        <Dialog.Content className="animate-pop fixed left-1/2 top-[14vh] z-[71] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
          <div className="flex items-center justify-between px-5 pt-4">
            <Dialog.Title className="font-display text-lg font-semibold">New chat</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
            >
              <X size={17} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="px-5 pt-1 text-sm text-muted-foreground">
            Search by name or email. Chats are end-to-end encrypted.
          </Dialog.Description>

          <div className="p-4">
            <label className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
              <Search size={16} className="text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name or email"
                aria-label="Search people"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>

          <ul className="max-h-72 overflow-y-auto px-2 pb-3">
            {query.trim().length < 2 && (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                Type at least 2 letters to search.
              </li>
            )}
            {query.trim().length >= 2 && !searching && results.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                No one found for "{query.trim()}". They need a Synapse account first.
              </li>
            )}
            {results.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void start(p)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted disabled:opacity-60"
                >
                  <ProfileAvatar name={p.name} image={p.avatar ?? undefined} size="sm" />
                  <span className="truncate text-sm font-medium">{p.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
