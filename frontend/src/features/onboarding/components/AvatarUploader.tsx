import { Camera } from "lucide-react";

export default function AvatarUploader() {

  return (

    <div className="flex flex-col items-center">

      <button
        className="
        relative
        h-28
        w-28
        rounded-full
        bg-gradient-to-br
        from-indigo-500
        to-cyan-500
        shadow-xl
        "
      >

        <Camera
          className="
          absolute
          bottom-2
          right-2
          rounded-full
          bg-background
          p-1
          "
          size={28}
        />

      </button>

      <p className="mt-4 text-sm text-muted-foreground">
        Upload Profile Picture
      </p>

    </div>

  );

}