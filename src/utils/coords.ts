import { DraggableEvent } from "react-draggable";

export interface Coords {
  x: number;
  y: number;
}

export function getCoords(e: DraggableEvent): Coords {
  //workarond for Firefox lol
  if (window.TouchEvent) {
    if (e instanceof MouseEvent) {
      return { x: e.clientX, y: e.clientY };
    }
    if ("nativeEvent" in e && e.nativeEvent instanceof MouseEvent) {
      return { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
    }
  }

  if (e instanceof MouseEvent) {
    return { x: e.clientX, y: e.clientY };
  }

  if (e instanceof TouchEvent) {
    const touch = e.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  }

  if (e.nativeEvent instanceof MouseEvent) {
    return { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
  }

  if (e.nativeEvent instanceof TouchEvent) {
    const touch = e.nativeEvent.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  }

  console.error("Invalid event type", e);

  return { x: 0, y: 0 };
}
