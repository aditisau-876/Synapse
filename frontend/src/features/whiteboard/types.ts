export interface Point {

  x:number;

  y:number;

}

export type Tool=

| "select"
| "pen"
| "marker"
| "eraser"
| "line"
| "rectangle"
| "circle"
| "arrow"
| "text"
| "sticky";

export interface WhiteboardElement {
  id: string;
  tool: Tool;
  color: string;
  strokeWidth: number;
  points: Point[];
  start?: Point;
  end?: Point;
  text?: string;
  width?: number;
  height?: number;

}

export interface Viewport{

x:number;

y:number;

zoom:number;

}