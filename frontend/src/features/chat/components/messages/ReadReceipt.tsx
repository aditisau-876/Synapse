import {
  Check,
  CheckCheck,
} from "lucide-react";

interface Props {
  status:
    | "sending"
    | "sent"
    | "delivered"
    | "read";
}

export default function ReadReceipt({
  status,
}: Props) {
  if (status === "sending") {
    return null;
  }

  if (status === "sent") {
    return (
      <Check
        size={15}
        className="opacity-70"
      />
    );
  }

  return (
    <CheckCheck
      size={15}
      className={
        status === "read"
          ? "text-sky-500"
          : "opacity-70"
      }
    />
  );
}