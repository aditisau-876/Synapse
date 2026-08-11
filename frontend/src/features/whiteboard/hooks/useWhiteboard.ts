import { useWhiteboardStore } from "../store/whiteboard-store";

export function useWhiteboard() {
  return useWhiteboardStore();
}