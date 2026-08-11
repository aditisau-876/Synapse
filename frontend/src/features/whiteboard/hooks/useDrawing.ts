import { useRef } from "react";
import { nanoid } from "nanoid";

import { useWhiteboard } from "./useWhiteboard";

import type {
  WhiteboardElement,
} from "../types";

export function useDrawing() {

  const {

    tool,

    color,

    strokeWidth,

    addElement,

    updateElement,

    moveElement,

    deleteElement,

    selectedId,

    saveHistory,

  } = useWhiteboard();

  const current =
    useRef<WhiteboardElement | null>(null);

  //----------------------------------
  // Start Drawing
  //----------------------------------

  function startDrawing(
    x: number,
    y: number
  ): string | null {

    if (
      tool === "eraser" ||
      tool === "select"
    )
      return null;

    const id = nanoid();

    const element: WhiteboardElement = {

      id,

      tool,

      color,

      strokeWidth,

      points: [{ x, y }],

      start: { x, y },

      end: { x, y },

      width:
        tool === "sticky"
          ? 220
          : tool === "text"
          ? 220
          : undefined,

      height:
        tool === "sticky"
          ? 170
          : tool === "text"
          ? 45
          : undefined,

      text:
        tool === "sticky" ||
        tool === "text"
          ? ""
          : undefined,

    };

    current.current = element;
    saveHistory();

    addElement(element);

    return id;
  }

  //----------------------------------
  // Draw
  //----------------------------------

  function draw(
    x: number,
    y: number
  ) {

    if (!current.current)
      return;

    current.current = {

      ...current.current,

      points: [
        ...current.current.points,
        { x, y },
      ],

      end: {
        x,
        y,
      },

    };

    updateElement(

      current.current.id,

      current.current.points,

      {
        end: {
          x,
          y,
        },
      }

    );

  }

  //----------------------------------
  // Move Selected
  //----------------------------------

  function move(
    dx: number,
    dy: number
  ) {

    if (!selectedId)
      return;

    moveElement(
      selectedId,
      dx,
      dy
    );

  }

  //----------------------------------
  // Eraser
  //----------------------------------

  function erase(
    id: string | null
  ) {

    if (!id)
      return;

    saveHistory();

    deleteElement(id);

  }

  //----------------------------------
  // Stop Drawing
  //----------------------------------

  function stopDrawing() {
    current.current = null;
  }

  //----------------------------------

  return {

    startDrawing,

    draw,

    move,

    erase,

    stopDrawing,

  };

}