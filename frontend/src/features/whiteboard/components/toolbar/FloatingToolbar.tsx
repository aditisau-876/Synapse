import { useState } from "react";

import {
  MousePointer2,
  Pencil,
  Eraser,
  Square,
  Circle,
  Minus,
  ArrowRight,
  StickyNote,
  Type,
  Settings2,
} from "lucide-react";

import ToolButton from "./ToolButton";
import ToolSettings from "./ToolSettings";

import { useWhiteboard } from "../../hooks/useWhiteboard";

export default function FloatingToolbar() {
  const [open, setOpen] =
    useState(false);

  const {
    tool,
    setTool,
  } = useWhiteboard();

  return (
    <>
      <div
        className="
        absolute
        left-5
        top-1/2
        z-40

        -translate-y-1/2

        rounded-3xl
        border
        border-border

        bg-card/90

        p-3

        shadow-2xl

        backdrop-blur-xl

        space-y-3
        "
      >
        <ToolButton
          tooltip="Select"
          active={tool === "select"}
          icon={<MousePointer2 size={20} />}
          onClick={() =>
            setTool("select")
          }
        />

        <ToolButton
          tooltip="Pen"
          active={tool === "pen"}
          icon={<Pencil size={20} />}
          onClick={() =>
            setTool("pen")
          }
        />

        <ToolButton
          tooltip="Eraser"
          active={tool === "eraser"}
          icon={<Eraser size={20} />}
          onClick={() =>
            setTool("eraser")
          }
        />

        <ToolButton
          tooltip="Rectangle"
          active={tool === "rectangle"}
          icon={<Square size={20} />}
          onClick={() =>
            setTool("rectangle")
          }
        />

        <ToolButton
          tooltip="Circle"
          active={tool === "circle"}
          icon={<Circle size={20} />}
          onClick={() =>
            setTool("circle")
          }
        />

        <ToolButton
          tooltip="Line"
          active={tool === "line"}
          icon={<Minus size={20} />}
          onClick={() =>
            setTool("line")
          }
        />

        <ToolButton
          tooltip="Arrow"
          active={tool === "arrow"}
          icon={<ArrowRight size={20} />}
          onClick={() =>
            setTool("arrow")
          }
        />

        <ToolButton
          tooltip="Sticky Note"
          active={tool === "sticky"}
          icon={<StickyNote size={20} />}
          onClick={() =>
            setTool("sticky")
          }
        />

        <ToolButton
          tooltip="Text"
          active={tool === "text"}
          icon={<Type size={20} />}
          onClick={() =>
            setTool("text")
          }
        />

        <ToolButton
          tooltip="Settings"
          icon={<Settings2 size={20} />}
          onClick={() =>
            setOpen((value) => !value)
          }
        />
      </div>

      <ToolSettings
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
}