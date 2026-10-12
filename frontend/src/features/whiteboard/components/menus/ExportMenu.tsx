import {
  FileImage,
  FileText,
  File,
} from "lucide-react";

export default function ExportMenu() {

  return (

    <div
      className="
      absolute
      right-8
      top-24
      w-64
      rounded-3xl
      border
      border-border
      bg-slate-900
      p-4
      shadow-2xl
      "
    >

      <h3
        className="
        mb-4
        text-lg
        font-bold
        "
      >
        Export
      </h3>

      <button
        className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        p-3
        hover:bg-white/10
        "
      >
        <FileImage size={18}/>
        PNG Image
      </button>

      <button
        className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        p-3
        hover:bg-white/10
        "
      >
        <FileText size={18}/>
        PDF Document
      </button>

      <button
        className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        p-3
        hover:bg-white/10
        "
      >
        <File size={18}/>
        SVG Vector
      </button>

    </div>

  );

}