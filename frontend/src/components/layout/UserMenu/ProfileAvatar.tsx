import { User } from "lucide-react";

interface Props {
  name: string;
  online?: boolean;
  image?: string;
}

export default function ProfileAvatar({
  name,
  online = true,
  image,
}: Props) {
  return (
    <div className="relative">
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-11 w-11 rounded-full object-cover"
        />
      ) : (
        <div
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-indigo-500
          to-cyan-500
          text-white
          "
        >
          <User size={20} />
        </div>
      )}

      {online && (
        <span
          className="
          absolute
          bottom-0
          right-0
          h-3.5
          w-3.5
          rounded-full
          border-2
          border-background
          bg-green-500
          "
        />
      )}
    </div>
  );
}