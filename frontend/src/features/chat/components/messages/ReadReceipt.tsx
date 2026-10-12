import { Check, CheckCheck } from "lucide-react";
import type { MessageStatus } from "../../types/chat";

export default function ReadReceipt({ status }: { status: MessageStatus }) {
  if (status === "sending") return null;
  const label = { sent: "Sent", delivered: "Delivered", read: "Read", failed: "Not sent" }[status];
  const Icon = status === "sent" || status === "failed" ? Check : CheckCheck;
  return <Icon size={14} aria-label={label} className={status === "read" ? "" : "opacity-80"} />;
}
