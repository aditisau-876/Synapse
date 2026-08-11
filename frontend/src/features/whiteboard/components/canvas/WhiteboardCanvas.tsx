import { useEffect, useRef, useState } from "react";

import InfiniteGrid from "./InfiniteGrid";
import { drawCanvas } from "./drawCanvas";

import { useWhiteboard } from "../../hooks/useWhiteboard";
import { useDrawing } from "../../hooks/useDrawing";
import useViewport from "../../hooks/useViewport";

export default function WhiteboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const isDragging = useRef(false);
  const lastPoint = useRef({x: 0,y: 0});
  const {elements,tool,selectedId,setSelected,updateElement,saveHistory,} = useWhiteboard();
  const {viewport,zoom} = useViewport();
  const {startDrawing,draw,move,erase,stopDrawing} = useDrawing();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingPosition, setEditingPosition] = useState({x: 0,y: 0,width: 220,height: 170});
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    return () =>
      window.removeEventListener(
        "resize",
        resize
      );

  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCanvas(canvas,elements,viewport,selectedId);
  }, 
  [elements,viewport,selectedId,]);
  function worldPoint(
    event: React.MouseEvent<HTMLCanvasElement>
  ) {
    const rect = event.currentTarget.getBoundingClientRect();
    return {x:(event.clientX - rect.left - viewport.x) / viewport.zoom, y:(event.clientY - rect.top - viewport.y) / viewport.zoom,
    };
  }
  function getClickedElement(x: number,y: number) {
    for (let i = elements.length - 1;i >= 0;i--) {
      const element = elements[i];
      if ( element.tool === "sticky" && element.start) {
        const width =element.width ?? 220;
        const height =element.height ?? 170;
        if ( x >= element.start.x && x <= element.start.x + width && y >= element.start.y && y <= element.start.y + height) { return element.id;
        }
      }
      if (
        element.tool === "text" &&
        element.start
      ) {

        const width =
          element.width ?? 220;

        const height =
          element.height ?? 45;

        if (
          x >= element.start.x &&
          x <= element.start.x + width &&
          y >= element.start.y &&
          y <= element.start.y + height
        ) {
          return element.id;
        }

      }
      if (
        element.tool === "circle" &&
        element.start &&
        element.end
      ) {

        const radius = Math.hypot(
          element.end.x - element.start.x,
          element.end.y - element.start.y
        );

        const distance = Math.hypot(
          x - element.start.x,
          y - element.start.y
        );

        if (distance <= radius + 8) {
          return element.id;
        }

      }
      if (
        element.start &&
        element.end
      ) {

        const minX = Math.min(
          element.start.x,
          element.end.x
        );

        const maxX = Math.max(
          element.start.x,
          element.end.x
        );

        const minY = Math.min(
          element.start.y,
          element.end.y
        );

        const maxY = Math.max(
          element.start.y,
          element.end.y
        );

        if (
          x >= minX &&
          x <= maxX &&
          y >= minY &&
          y <= maxY
        ) {
          return element.id;
        }

      }
      if (
        element.points.length > 0 &&
        element.points.some(point =>
          Math.hypot(
            point.x - x,
            point.y - y
          ) < 8
        )
      ) {
        return element.id;
      }

    }

    return null;

  }

  function handleWheel(event: React.WheelEvent<HTMLCanvasElement>) {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    zoom(
      event.deltaY < 0 ? 0.1 : -0.1,
      event.clientX - rect.left,
      event.clientY - rect.top
    );
  }
function handleMouseDown(
  event: React.MouseEvent<HTMLCanvasElement>
) {
  const point = worldPoint(event);
  const id = getClickedElement( point.x, point.y);
  if (tool === "eraser") {
    erase(id);
    return;
  }
  if (tool === "select") {
    setSelected(id);
    if (id) {
      isDragging.current = true;
      lastPoint.current = point;
    }
    return;

  }
if (tool === "sticky") { 
  const id = startDrawing( point.x, point.y ); 
  console.log("Created Sticky:", id); 
  if (id) { setEditingId(id); setEditingText(""); 
    const canvas = canvasRef.current; 
    if (!canvas) return; 
    setEditingPosition({ 
      x: viewport.x + point.x * viewport.zoom, 
      y: viewport.y + point.y * viewport.zoom, 
      width: 220 * viewport.zoom, 
      height: 170 * viewport.zoom, }); 
    } return; } 
if (tool === "text") { 
    const id = startDrawing( point.x, point.y ); 
    if (id) { setEditingId(id); 
      setEditingText(""); 
      const canvas = canvasRef.current; 
      if (!canvas) return; 
      setEditingPosition({ 
        x: viewport.x + point.x * viewport.zoom, 
        y: viewport.y + point.y * viewport.zoom, 
        width:220 * viewport.zoom, 
        height:45 * viewport.zoom, }); } 
        return; }
  isDrawing.current = true;

  startDrawing(
    point.x,
    point.y
  );

}
function handleMouseMove( event: React.MouseEvent<HTMLCanvasElement>) {
  const point = worldPoint(event);
  if (

    tool === "select" &&
    isDragging.current &&
    selectedId
  ) {

    const dx = point.x - lastPoint.current.x;
    const dy = point.y - lastPoint.current.y;
    move(dx, dy);

    lastPoint.current = point;
    return;
  }

  if (!isDrawing.current) return;
  draw( point.x, point.y);
}

function handleMouseUp() {
  if ( tool === "select" && isDragging.current && selectedId) {saveHistory();}
  isDrawing.current = false;
  isDragging.current = false;
  stopDrawing();
}

function handleDoubleClick(
  event: React.MouseEvent<HTMLCanvasElement>
) {
  if (tool !== "select") return;
  const point = worldPoint(event);
  const id = getClickedElement( point.x, point.y);
  if (!id) return;
  const element = elements.find(
    (e) => e.id === id
  );
  if (!element) return;
  if ( element.tool !== "sticky" && element.tool !== "text")
    return;
  setEditingId(id);
  setEditingText(element.text ?? "");
  setEditingPosition({
    x: viewport.x + element.start!.x * viewport.zoom,
    y: viewport.y + element.start!.y * viewport.zoom,
    width:
      (element.width ??
        (element.tool === "sticky"
          ? 220
          : 220)) * viewport.zoom,

    height:
      (element.height ??
        (element.tool === "sticky"
          ? 170
          : 45)) * viewport.zoom,
  });
}

function saveEditing() {
  if (!editingId) return;
  saveHistory();
  updateElement(
    editingId,
    [],
    {
      text: editingText,
    }
  );
  setEditingId(null);
}

const editingElement =elements.find((element) => element.id === editingId );
const isDark =document.documentElement.classList.contains("dark");

return (

  <div
    className="relative h-full w-full overflow-hidden bg-background">
    <InfiniteGrid />
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-crosshair"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
    />
    {editingId && editingElement && (
      <textarea
        autoFocus
        value={editingText}
        onChange={(event) =>setEditingText(event.target.value)}
        onBlur={() => {}}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setEditingId(null);
          }
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            saveEditing();
          }
        }}
        style={{
          position: "absolute",
          left: editingPosition.x,
          top: editingPosition.y,
          width: editingPosition.width,
          height: editingPosition.height,
          resize: "none",
          padding: "12px",
          fontSize: editingElement.tool === "text" ? "22px" : "16px",
          fontWeight: editingElement.tool === "text" ? "600" : "400",
          lineHeight: "1.4",
          outline: "none",
          border: editingElement.tool === "sticky" ? "2px solid #8b5cf6" : "2px dashed #8b5cf6",
          borderRadius: editingElement.tool === "sticky" ? "12px" : "6px",
          background: editingElement?.tool === "sticky" ? "#FDE68A" : "transparent",
          color: editingElement?.tool === "sticky" ? "#111827" : isDark ? "#ffffff" : "#111827",
          boxShadow: editingElement.tool === "sticky" ? "0 10px 25px rgba(0,0,0,.18)" : "none",
          zIndex: 1000,
        }}
      />
    )}
  </div>
);
}