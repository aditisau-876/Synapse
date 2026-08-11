import { useMemo, useRef, useState } from "react";
import { Map } from "lucide-react";

import { useWhiteboard } from "../../hooks/useWhiteboard";
import useViewport from "../../hooks/useViewport";

export default function MiniMap() {
  const { elements } = useWhiteboard();

  const { viewport, setCamera } = useViewport();

  const mapRef =
    useRef<HTMLDivElement>(null);

  const [dragging, setDragging] =
    useState(false);

  //-----------------------------------
  // Calculate board bounds
  //-----------------------------------

  const bounds = useMemo(() => {
    if (elements.length === 0) {
      return {
        minX: -500,
        minY: -500,
        maxX: 500,
        maxY: 500,
      };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    elements.forEach((el) => {
      if (el.start) {
        minX = Math.min(minX, el.start.x);
        minY = Math.min(minY, el.start.y);
      }

      if (el.end) {
        maxX = Math.max(maxX, el.end.x);
        maxY = Math.max(maxY, el.end.y);
      }

      el.points.forEach((p) => {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      });
    });

    return {
      minX: minX - 100,
      minY: minY - 100,
      maxX: maxX + 100,
      maxY: maxY + 100,
    };
  }, [elements]);

  const mapWidth = 176;
  const mapHeight = 128;

  const boardWidth =
    bounds.maxX - bounds.minX;

  const boardHeight =
    bounds.maxY - bounds.minY;

  const scale =
    Math.min(
      mapWidth / boardWidth,
      mapHeight / boardHeight
    );

  //-----------------------------------
  // Convert world → minimap
  //-----------------------------------

  function tx(x: number) {
    return (x - bounds.minX) * scale;
  }

  function ty(y: number) {
    return (y - bounds.minY) * scale;
  }

  //-----------------------------------
  // Move camera
  //-----------------------------------

  function moveCamera(
    clientX: number,
    clientY: number
  ) {
    if (!mapRef.current) return;

    const rect =
      mapRef.current.getBoundingClientRect();

    const mx =
      clientX - rect.left;

    const my =
      clientY - rect.top;

    const worldX =
      mx / scale + bounds.minX;

    const worldY =
      my / scale + bounds.minY;

    setCamera(
      -worldX * viewport.zoom +
        window.innerWidth / 2,

      -worldY * viewport.zoom +
        window.innerHeight / 2
    );
  }

  //-----------------------------------

  return (
    <div
      className="
      absolute
      bottom-28
      right-6
      z-40
      w-44
      overflow-hidden
      rounded-3xl
      border
      border-border
      bg-card/90
      shadow-xl
      backdrop-blur-xl
      "
    >
      <div
        className="
        flex
        items-center
        gap-2
        border-b
        border-border
        px-4
        py-3
        font-semibold
        text-sm
        "
      >
        <Map size={16} />
        Mini Map
      </div>

      <div
        ref={mapRef}
        className="
        relative
        h-32
        cursor-pointer
        bg-muted
        overflow-hidden
        "
        onMouseDown={(e) => {
          setDragging(true);
          moveCamera(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => {
          if (!dragging) return;
          moveCamera(e.clientX, e.clientY);
        }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        {/* Shapes */}

        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
        >
          {elements.map((el) => {
            switch (el.tool) {
              case "pen":
              case "marker":
                return (
                  <polyline
                    key={el.id}
                    fill="none"
                    stroke={el.color}
                    strokeWidth={1}
                    points={el.points
                      .map(
                        (p) =>
                          `${tx(p.x)},${ty(p.y)}`
                      )
                      .join(" ")}
                  />
                );

              case "line":
              case "arrow":
                if (!el.start || !el.end)
                  return null;

                return (
                  <line
                    key={el.id}
                    x1={tx(el.start.x)}
                    y1={ty(el.start.y)}
                    x2={tx(el.end.x)}
                    y2={ty(el.end.y)}
                    stroke={el.color}
                    strokeWidth={1}
                  />
                );

              case "rectangle":
                if (!el.start || !el.end)
                  return null;

                return (
                  <rect
                    key={el.id}
                    x={tx(
                      Math.min(
                        el.start.x,
                        el.end.x
                      )
                    )}
                    y={ty(
                      Math.min(
                        el.start.y,
                        el.end.y
                      )
                    )}
                    width={
                      Math.abs(
                        el.end.x -
                          el.start.x
                      ) * scale
                    }
                    height={
                      Math.abs(
                        el.end.y -
                          el.start.y
                      ) * scale
                    }
                    fill="none"
                    stroke={el.color}
                    strokeWidth={1}
                  />
                );

              case "circle":
                if (!el.start || !el.end)
                  return null;

                return (
                  <circle
                    key={el.id}
                    cx={tx(el.start.x)}
                    cy={ty(el.start.y)}
                    r={
                      Math.hypot(
                        el.end.x -
                          el.start.x,
                        el.end.y -
                          el.start.y
                      ) * scale
                    }
                    fill="none"
                    stroke={el.color}
                    strokeWidth={1}
                  />
                );

              case "sticky":
                if (!el.start)
                  return null;

                return (
                  <rect
                    key={el.id}
                    x={tx(el.start.x)}
                    y={ty(el.start.y)}
                    width={
                      (el.width ??
                        220) * scale
                    }
                    height={
                      (el.height ??
                        170) * scale
                    }
                    rx={2}
                    fill="#FDE68A"
                    stroke="#EAB308"
                    strokeWidth={0.5}
                  />
                );

              case "text":
                if (!el.start)
                  return null;

                return (
                  <circle
                    key={el.id}
                    cx={tx(el.start.x)}
                    cy={ty(el.start.y)}
                    r={2}
                    fill="#8b5cf6"
                  />
                );

              default:
                return null;
            }
          })}
        </svg>

        {/* Viewport */}

        <div
          className="absolute border-2 border-[var(--synapse-accent-500)] rounded-sm pointer-events-none"
          style={{
            left:
              (-viewport.x /
                viewport.zoom -
                bounds.minX) *
              scale,

            top:
              (-viewport.y /
                viewport.zoom -
                bounds.minY) *
              scale,

            width:
              (window.innerWidth /
                viewport.zoom) *
              scale,

            height:
              (window.innerHeight /
                viewport.zoom) *
              scale,
          }}
        />
      </div>
    </div>
  );
}