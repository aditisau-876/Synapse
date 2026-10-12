import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import ProfileAvatar from "@/components/layout/UserMenu/ProfileAvatar";
import { useChat } from "../../hooks/useChat";
import { getPublicKey } from "../../services/chat-api";
import { relativeTime } from "@/lib/format";

/** Groups the hex fingerprint into blocks that two people can read aloud to each other. */
function blocks(fp: string) {
  return (fp.slice(0, 32).match(/.{1,4}/g) ?? []).join(" ");
}

export default function ChatInfo() {
  const { conversation, source } = useChat();
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  const peer = conversation?.type === "direct" ? conversation.participants[0] : undefined;

  useEffect(() => {
    setFingerprint(null);
    if (!peer || source !== "server") return;
    let cancelled = false;
    getPublicKey(peer.id)
      .then(({ data }) => !cancelled && setFingerprint(data.fingerprint))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [peer, source]);

  if (!conversation) return null;

  return (
    <div className="border-b border-border px-5 py-6">
      <div className="flex flex-col items-center text-center">
        <ProfileAvatar
          name={conversation.name}
          image={conversation.avatar}
          group={conversation.type === "group"}
          size="xl"
        />
        <h2 className="mt-3 text-xl font-bold">{conversation.name}</h2>
        {peer && (
          <p className="text-sm text-muted-foreground">
            {peer.online
              ? "Online"
              : peer.lastSeen
                ? `Last seen ${/^\d{4}-/.test(peer.lastSeen) ? relativeTime(peer.lastSeen) : peer.lastSeen}`
                : "Offline"}
          </p>
        )}
      </div>

      {fingerprint && (
        <div className="mt-5 rounded-lg bg-muted p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold">
            <ShieldCheck size={14} className="text-brand" />
            Security code
          </p>
          <p className="mt-1.5 break-words font-medium tabular-nums tracking-wide text-sm">
            {blocks(fingerprint)}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Compare this with {conversation.name.split(" ")[0]} in person or on a call. If it
            matches on both devices, nobody is in the middle.
          </p>
        </div>
      )}
    </div>
  );
}
