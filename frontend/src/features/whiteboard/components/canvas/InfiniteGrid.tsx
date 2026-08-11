import { useWhiteboard } from "../../hooks/useWhiteboard";

export default function InfiniteGrid() {

  const { viewport } =
    useWhiteboard();

  const gridSize = 24;

  return (

    <div

      className="
      absolute
      inset-0
      pointer-events-none
      overflow-hidden
      "

    >

      {/* Small Grid */}

      <div

        className="
        absolute
        inset-0
        opacity-50
        "

        style={{

          backgroundImage: `

            linear-gradient(
              rgba(148,163,184,.15) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(148,163,184,.15) 1px,
              transparent 1px
            )

          `,

          backgroundSize: `${gridSize * viewport.zoom}px ${gridSize * viewport.zoom}px`,

          backgroundPosition: `${viewport.x}px ${viewport.y}px`,

        }}

      />

      {/* Major Grid */}

      <div

        className="
        absolute
        inset-0
        opacity-40
        "

        style={{

          backgroundImage: `

            linear-gradient(
              rgba(148,163,184,.22) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(148,163,184,.22) 1px,
              transparent 1px
            )

          `,

          backgroundSize: `${gridSize * 5 * viewport.zoom}px ${gridSize * 5 * viewport.zoom}px`,

          backgroundPosition: `${viewport.x}px ${viewport.y}px`,

        }}

      />

    </div>

  );

}