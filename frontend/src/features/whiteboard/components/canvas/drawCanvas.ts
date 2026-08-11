import type {
  Viewport,
  WhiteboardElement,
} from "../../types";

export function drawCanvas(
  canvas: HTMLCanvasElement,
  elements: WhiteboardElement[],
  viewport: Viewport,
  selectedId: string | null
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  //------------------------------------------
  // Clear
  //------------------------------------------

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  //------------------------------------------
  // Camera
  //------------------------------------------

  ctx.save();

  ctx.translate(
    viewport.x,
    viewport.y
  );

  ctx.scale(
    viewport.zoom,
    viewport.zoom
  );

  //------------------------------------------
  // Draw Elements
  //------------------------------------------

  elements.forEach((element) => {

    ctx.strokeStyle = element.color;
    ctx.fillStyle = element.color;
    ctx.lineWidth = element.strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    switch (element.tool) {

      //----------------------------------
      // PEN / MARKER
      //----------------------------------

      case "pen":
      case "marker": {

        if (element.points.length < 2)
          break;

        ctx.globalAlpha =
          element.tool === "marker"
            ? 0.35
            : 1;

        ctx.beginPath();

        ctx.moveTo(
          element.points[0].x,
          element.points[0].y
        );

        element.points
          .slice(1)
          .forEach((point) => {

            ctx.lineTo(
              point.x,
              point.y
            );

          });

        ctx.stroke();

        ctx.globalAlpha = 1;

        break;
      }

      //----------------------------------
      // LINE
      //----------------------------------

      case "line": {

        if (
          !element.start ||
          !element.end
        )
          break;

        ctx.beginPath();

        ctx.moveTo(
          element.start.x,
          element.start.y
        );

        ctx.lineTo(
          element.end.x,
          element.end.y
        );

        ctx.stroke();

        break;
      }

      //----------------------------------
      // RECTANGLE
      //----------------------------------

      case "rectangle": {

        if (
          !element.start ||
          !element.end
        )
          break;

        ctx.strokeRect(
          element.start.x,
          element.start.y,
          element.end.x - element.start.x,
          element.end.y - element.start.y
        );

        break;
      }

      //----------------------------------
      // CIRCLE
      //----------------------------------

      case "circle": {

        if (
          !element.start ||
          !element.end
        )
          break;

        const radius = Math.hypot(
          element.end.x - element.start.x,
          element.end.y - element.start.y
        );

        ctx.beginPath();

        ctx.arc(
          element.start.x,
          element.start.y,
          radius,
          0,
          Math.PI * 2
        );

        ctx.stroke();

        break;
      }

      //----------------------------------
      // ARROW
      //----------------------------------

      case "arrow": {

        if (
          !element.start ||
          !element.end
        )
          break;

        const sx = element.start.x;
        const sy = element.start.y;
        const ex = element.end.x;
        const ey = element.end.y;

        ctx.beginPath();

        ctx.moveTo(sx, sy);

        ctx.lineTo(ex, ey);

        ctx.stroke();

        const angle =
          Math.atan2(
            ey - sy,
            ex - sx
          );

        const head = 16;

        ctx.beginPath();

        ctx.moveTo(ex, ey);

        ctx.lineTo(
          ex -
            head *
              Math.cos(
                angle - Math.PI / 6
              ),
          ey -
            head *
              Math.sin(
                angle - Math.PI / 6
              )
        );

        ctx.lineTo(
          ex -
            head *
              Math.cos(
                angle + Math.PI / 6
              ),
          ey -
            head *
              Math.sin(
                angle + Math.PI / 6
              )
        );

        ctx.closePath();

        ctx.fill();

        break;
      }

      //----------------------------------
      // TEXT
      //----------------------------------

      case "text": {

        if (!element.start)
          break;

        ctx.fillStyle =
          element.color;

        ctx.font =
          "26px sans-serif";

        ctx.textBaseline =
          "top";

        const text =
          element.text ?? "";

        text
          .split("\n")
          .forEach((line, index) => {

            ctx.fillText(
              line,
              element.start!.x,
              element.start!.y +
                index * 32
            );

          });

        break;
      }

      //----------------------------------
      // STICKY NOTE
      //----------------------------------

      case "sticky": {

        if (!element.start)
          break;

        const x =
          element.start.x;

        const y =
          element.start.y;

        const width =
          element.width ?? 220;

        const height =
          element.height ?? 170;

        ctx.save();

        ctx.shadowColor =
          "rgba(0,0,0,.25)";

        ctx.shadowBlur = 18;

        ctx.fillStyle =
          "#FDE68A";

        ctx.fillRect(
          x,
          y,
          width,
          height
        );

        ctx.restore();

        ctx.strokeStyle =
          "#EAB308";

        ctx.lineWidth = 2;

        ctx.strokeRect(
          x,
          y,
          width,
          height
        );

        ctx.fillStyle =
          "#111827";

        ctx.font =
          "16px sans-serif";

        ctx.textBaseline =
          "top";

        const text =
          element.text ?? "";

        text
          .split("\n")
          .forEach((line, index) => {

            ctx.fillText(
              line,
              x + 15,
              y + 15 + index * 22
            );

          });

        break;
      }

      default:
        break;
    }

    //----------------------------------
    // Selection Outline
    //----------------------------------

    if (
      element.id === selectedId &&
      element.start
    ) {

      let width = 0;
      let height = 0;

      if (element.tool === "sticky") {

        width =
          element.width ?? 220;

        height =
          element.height ?? 170;

      }

      else if (element.tool === "text") {

        width =
          element.width ?? 220;

        height =
          element.height ?? 45;

      }

      else if (element.end) {

        width =
          element.end.x -
          element.start.x;

        height =
          element.end.y -
          element.start.y;

      }

      ctx.save();

      ctx.strokeStyle =
        "#3B82F6";

      ctx.lineWidth = 2;

      ctx.setLineDash([
        6,
        6,
      ]);

      ctx.strokeRect(

        Math.min(
          element.start.x,
          element.start.x + width
        ) - 6,

        Math.min(
          element.start.y,
          element.start.y + height
        ) - 6,

        Math.abs(width) + 12,

        Math.abs(height) + 12

      );

      ctx.restore();
    }

  });

  //------------------------------------------

  ctx.restore();
}