/**
 * Geometric calculations and transformations
 */

import * as maths from './maths';
import type { Point, Rect } from '../types/common';

// Points

/**
 * Transform a point by scaling and rotating it
 * @param pt - Point to transform
 * @param scaleX - X-axis scale factor
 * @param scaleY - Y-axis scale factor
 * @param rads - Rotation angle in radians
 * @returns Transformed point
 * @example
 * transformPt({x: 10, y: 0}, 2, 2, Math.PI / 2)  // {x: 0, y: 20}
 */
export function transformPt(pt: Point, scaleX: number, scaleY: number, rads: number): Point {
  return rotatePt(scalePt(pt, scaleX, scaleY), rads);
}

/**
 * Scale a point by given factors
 * @param pt - Point to scale
 * @param scaleX - X-axis scale factor
 * @param scaleY - Y-axis scale factor
 * @returns Scaled point
 * @example
 * scalePt({x: 10, y: 20}, 2, 0.5)  // {x: 20, y: 10}
 */
export function scalePt(pt: Point, scaleX: number, scaleY: number): Point {
  return {
    x: pt.x * scaleX,
    y: pt.y * scaleY,
  };
}

/**
 * Rotate a point around an origin
 * @param pt - Point to rotate
 * @param rads - Rotation angle in radians
 * @param origin - Point to rotate around (default: {0, 0})
 * @returns Rotated point
 * @example
 * rotatePt({x: 10, y: 0}, Math.PI / 2)  // {x: 0, y: 10}
 */
export function rotatePt(pt: Point, rads: number, origin?: Point): Point {
  const ox = (origin === undefined) ? 0 : origin.x;
  const oy = (origin === undefined) ? 0 : origin.y;

  const dx = pt.x - ox;
  const dy = pt.y - oy;

  const aSin = Math.sin(rads);
  const aCos = Math.cos(rads);

  const x = (aCos * dx) - (aSin * dy) + ox;
  const y = (aSin * dx) + (aCos * dy) + oy;

  return { x, y };
}

/**
 * Get a point on a circle at a given percentage around the circumference
 * @param radius - Circle radius
 * @param perc - Percentage around circle (0-1, where 0 is top)
 * @param origin - Center of circle (default: {0, 0})
 * @returns Point on circle
 * @example
 * ptAroundCircle(50, 0)     // {x: 0, y: -50} (top)
 * ptAroundCircle(50, 0.25)  // {x: 50, y: 0}  (right)
 * ptAroundCircle(50, 0.5)   // {x: 0, y: 50}  (bottom)
 */
export function ptAroundCircle(
  radius: number,
  perc: number,
  origin: Point | null = null,
): Point {
  const angle = (perc * maths.TAO) - (Math.PI / 2);
  const x = (origin ? origin.x : 0) + (radius * Math.cos(angle));
  const y = (origin ? origin.y : 0) + (radius * Math.sin(angle));
  return { x, y };
}

/**
 * Calculate Euclidean distance between two points
 * @param pt1 - First point
 * @param pt2 - Second point
 * @returns Distance between points
 * @example
 * dist({x: 0, y: 0}, {x: 3, y: 4})  // 5
 */
export function dist(pt1: Point, pt2: Point): number {
  return Math.sqrt(distSq(pt1, pt2));
}

/**
 * Calculate Euclidean distance between two coordinate pairs
 * @param x1 - First x coordinate
 * @param y1 - First y coordinate
 * @param x2 - Second x coordinate
 * @param y2 - Second y coordinate
 * @returns Distance between points
 * @example
 * distXY(0, 0, 3, 4)  // 5
 */
export function distXY(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(distSqXY(x1, y1, x2, y2));
}

/**
 * Calculate squared distance between two points (faster than dist, avoids sqrt)
 * @param pt1 - First point
 * @param pt2 - Second point
 * @returns Squared distance between points
 * @example
 * distSq({x: 0, y: 0}, {x: 3, y: 4})  // 25
 */
export function distSq(pt1: Point, pt2: Point): number {
  return distSqXY(pt1.x, pt1.y, pt2.x, pt2.y);
}

/**
 * Calculate squared distance between two coordinate pairs
 * @param x1 - First x coordinate
 * @param y1 - First y coordinate
 * @param x2 - Second x coordinate
 * @param y2 - Second y coordinate
 * @returns Squared distance between points
 * @example
 * distSqXY(0, 0, 3, 4)  // 25
 */
export function distSqXY(x1: number, y1: number, x2: number, y2: number): number {
  return ((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1));
}

/**
 * Linearly interpolate between two points
 * @param p1 - First point
 * @param p2 - Second point
 * @param val - Interpolation factor (0-1, default: 0.5)
 * @returns Interpolated point
 * @example
 * lerpPt({x: 0, y: 0}, {x: 100, y: 100}, 0.5)  // {x: 50, y: 50}
 */
export function lerpPt(p1: Point, p2: Point, val: number = 0.5): Point {
  return {
    x: maths.lerp(p1.x, p2.x, val),
    y: maths.lerp(p1.y, p2.y, val),
  };
}

// Trig

/**
 * Convert degrees to radians
 * @param degs - Angle in degrees
 * @returns Angle in radians
 * @example
 * degToRad(180)  // 3.14159... (Math.PI)
 * degToRad(90)   // 1.5708... (Math.PI / 2)
 */
export function degToRad(degs: number): number {
  return degs * (maths.TAO / 360);
}

/**
 * Convert radians to degrees
 * @param rads - Angle in radians
 * @returns Angle in degrees
 * @example
 * radToDeg(Math.PI)      // 180
 * radToDeg(Math.PI / 2)  // 90
 */
export function radToDeg(rads: number): number {
  return rads * (360 / maths.TAO);
}

/**
 * Get angle in radians between two points (or from origin to a point)
 * @param fromPt - Starting point (or target point if toPt is undefined)
 * @param toPt - Target point (optional, if undefined, fromPt is used and origin is {0, 0})
 * @returns Angle in radians
 * @example
 * getRadFromPts({x: 0, y: 0}, {x: 1, y: 1})  // Math.PI / 4 (45°)
 * getRadFromPts({x: 1, y: 0})                 // 0 (pointing right)
 */
export function getRadFromPts(fromPt: Point, toPt?: Point): number {
  if (toPt === undefined) {
    toPt = { x: fromPt.x, y: fromPt.y };
    fromPt = { x: 0, y: 0 };
  }

  return Math.atan2(toPt.y - fromPt.y, toPt.x - fromPt.x);
}

/**
 * Get angle in radians between two coordinate pairs
 * @param fromX - Starting x coordinate (or target x if toX/toY are undefined)
 * @param fromY - Starting y coordinate (or target y if toX/toY are undefined)
 * @param toX - Target x coordinate (optional)
 * @param toY - Target y coordinate (optional)
 * @returns Angle in radians
 * @example
 * getRadFromXY(0, 0, 1, 1)  // Math.PI / 4 (45°)
 * getRadFromXY(1, 0)        // 0 (pointing right)
 */
export function getRadFromXY(fromX: number, fromY: number, toX?: number, toY?: number): number {
  if (toX === undefined || toY === undefined) {
    toX = fromX;
    toY = fromY;
    fromX = 0;
    fromY = 0;
  }

  return Math.atan2(toY - fromY, toX - fromX);
}

// Areas

/**
 * Linearly interpolate between two rectangles
 * @param rectA - First rectangle
 * @param rectB - Second rectangle
 * @param val - Interpolation factor (0-1, default: 0.5)
 * @returns Interpolated rectangle
 * @example
 * lerpRect({x: 0, y: 0, width: 10, height: 10}, {x: 100, y: 100, width: 50, height: 50}, 0.5)
 * // {x: 50, y: 50, width: 30, height: 30}
 */
export function lerpRect(rectA: Rect, rectB: Rect, val: number = 0.5): Rect {
  return {
    x: maths.lerp(rectA.x, rectB.x, val),
    y: maths.lerp(rectA.y, rectB.y, val),
    width: maths.lerp(
      rectA.width ?? 0,
      rectB.width ?? 0,
      val,
    ),
    height: maths.lerp(
      rectA.height ?? 0,
      rectB.height ?? 0,
      val,
    ),
  };
}

/**
 * Calculate rectangle dimensions for 'cover' scaling (fills container, may crop)
 * @param w - Source width
 * @param h - Source height
 * @param aw - Container width
 * @param ah - Container height
 * @returns Rectangle for cover scaling (centered in container)
 * @example
 * getCoverRect(16, 9, 400, 400)  // Scale 16:9 to cover 400x400 square
 */
export function getCoverRect(w: number, h: number, aw: number, ah: number): Rect {
  const sw = ah * (w / h);
  const sh = aw * (h / w);
  const cw = (sw >= aw) ? sw : aw;
  const ch = (sw >= aw) ? ah : sh;

  return {
    x: (aw - cw) / 2,
    y: (ah - ch) / 2,
    width: cw,
    height: ch,
  };
}

/**
 * Calculate rectangle dimensions for 'contain' scaling (fits within container, may letterbox)
 * @param w - Source width
 * @param h - Source height
 * @param aw - Container width
 * @param ah - Container height
 * @returns Rectangle for contain scaling (centered in container)
 * @example
 * getContainRect(16, 9, 400, 400)  // Scale 16:9 to fit within 400x400 square
 */
export function getContainRect(w: number, h: number, aw: number, ah: number): Rect {
  const sw = ah * (w / h);
  const sh = aw * (h / w);
  const cw = (sw <= aw) ? sw : aw;
  const ch = (sw <= aw) ? ah : sh;

  return {
    x: (aw - cw) / 2,
    y: (ah - ch) / 2,
    width: cw,
    height: ch,
  };
}
