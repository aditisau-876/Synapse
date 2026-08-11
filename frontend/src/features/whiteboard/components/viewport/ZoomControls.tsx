import {
  Minus,
  Plus,
  Maximize2,
} from "lucide-react";

import useViewport from "../../hooks/useViewport";

export default function ZoomControls() {

  const {
    viewport,
    zoom,
    resetViewport,
  } = useViewport();

  return (

    <div
      className="
      absolute
      bottom-6
      right-6
      z-40
      flex
      items-center
      gap-3
      rounded-3xl
      border
      border-border
      bg-card/90
      px-4
      py-3
      shadow-xl
      backdrop-blur-xl
      "
    >

      <button

        onClick={() =>
          zoom(
            -0.1,
            window.innerWidth / 2,
            window.innerHeight / 2
          )
        }

        className="
        rounded-xl
        p-2
        hover:bg-[var(--synapse-accent-500)]/10
        "
      >

        <Minus size={18}/>

      </button>

      <span
        className="
        w-14
        text-center
        font-semibold
        "
      >

        {Math.round(viewport.zoom * 100)}%

      </span>

      <button

        onClick={() =>
          zoom(
            0.1,
            window.innerWidth / 2,
            window.innerHeight / 2
          )
        }

        className="
        rounded-xl
        p-2
        hover:bg-[var(--synapse-accent-500)]/10
        "
      >

        <Plus size={18}/>

      </button>

      <div className="h-6 w-px bg-border"/>

      <button

        onClick={resetViewport}

        className="
        rounded-xl
        p-2
        hover:bg-[var(--synapse-accent-500)]/10
        "

      >

        <Maximize2 size={18}/>

      </button>

    </div>

  );

}