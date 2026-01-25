/**
 * Common type definitions used across the library
 */

/**
 * Point-like objects with x and y coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Rectangle-like objects
 */
export interface Rect {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

/**
 * RGB color (normalized 0-1 range)
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * HSV color
 */
export interface HSV {
  h: number;
  s: number;
  v: number;
}
