import { Paperclip } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function AttachmentButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      text-muted-foreground
      transition-all
      duration-200
      hover:bg-muted
      hover:text-foreground
      "
    >
      <Paperclip size={20} />
    </button>
  );
}