import { create } from "zustand";
import type {WhiteboardElement, Tool, Point, Viewport} from "../types";
interface HistoryState { elements: WhiteboardElement[];}
interface WhiteboardStore {
  elements: WhiteboardElement[];
  selectedId: string | null;
  tool: Tool;
  color: string;
  strokeWidth: number;
  viewport: Viewport;
  setSelected: (id: string | null) => void;
  setTool: (tool: Tool) => void;
  setColor: (color: string) => void;
  setStrokeWidth: (size: number) => void;
  setViewport: (viewport: Viewport) => void;
  addElement: (element: WhiteboardElement) => void;
  updateElement: (
    id: string,
    points: Point[],
    extra?: Partial<WhiteboardElement>
  ) => void;
  deleteElement: (id: string) => void;
  moveElement: (id: string,dx: number,dy: number) => void;
  history: HistoryState[];
  future: HistoryState[];
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;
}

export const useWhiteboardStore =
  create<WhiteboardStore>((set, get) => ({
    elements: [],
    selectedId: null,
    tool: "pen",
    color: "#8b5cf6",
    strokeWidth: 4,
    viewport: {x: 0,y: 0,zoom: 1},
    history: [],
    future: [],
    setTool: (tool) =>set({ tool }),
    setSelected: (id) =>set({selectedId: id,}),
    setColor: (color) =>set({ color }),
    setStrokeWidth: (strokeWidth) =>set({ strokeWidth }),
    setViewport: (viewport) =>set({ viewport }),
    addElement: (element) =>
      set((state) => ({
        elements: [
          ...state.elements,
          element,
        ],
      })),

    updateElement: (
      id,
      points,
      extra
    ) =>
      set((state) => ({
        elements: state.elements.map(
          (element) =>
            element.id === id
              ? {
                  ...element,
                  points,
                  ...extra,
                }
              : element
        ),
      })),

    deleteElement: (id) =>
      set((state) => ({
        elements:
          state.elements.filter(
            (element) =>
              element.id !== id
          ),
        selectedId: null,
      })),

    moveElement: (
      id,
      dx,
      dy
    ) =>
      set((state) => ({
        elements:
          state.elements.map(
            (element) => {

              if (element.id !== id)
                return element;

              return {

                ...element,

                start:
                  element.start && {
                    x:
                      element.start.x +
                      dx,
                    y:
                      element.start.y +
                      dy,
                  },

                end:
                  element.end && {
                    x:
                      element.end.x +
                      dx,
                    y:
                      element.end.y +
                      dy,
                  },

                points:
                  element.points.map(
                    (point) => ({
                      x:
                        point.x + dx,
                      y:
                        point.y + dy,
                    })
                  ),

              };

            }
          ),
      })),

    //--------------------------------------
    // History
    //--------------------------------------

    saveHistory: () => {

      const snapshot =
        structuredClone(
          get().elements
        );

      set((state) => ({

        history: [

          ...state.history,

          {
            elements: snapshot,
          },

        ],

        future: [],

      }));

    },

    undo: () => {

      const {

        history,

        elements,

        future,

      } = get();

      if (
        history.length === 0
      )
        return;

      const previous =
        history[
          history.length - 1
        ];

      set({

        elements:
          structuredClone(
            previous.elements
          ),

        history:
          history.slice(
            0,
            history.length - 1
          ),

        future: [

          {
            elements:
              structuredClone(
                elements
              ),
          },

          ...future,

        ],

        selectedId: null,

      });

    },

    redo: () => {

      const {

        future,

        history,

        elements,

      } = get();

      if (
        future.length === 0
      )
        return;

      const next =
        future[0];

      set({

        elements:
          structuredClone(
            next.elements
          ),

        future:
          future.slice(1),

        history: [

          ...history,

          {
            elements:
              structuredClone(
                elements
              ),
          },

        ],

        selectedId: null,

      });

    },

  }));
  