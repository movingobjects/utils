/**
 * 2D vector class for geometric calculations
 */

import * as geom from '../utils/geom';
import * as random from '../utils/random';
import * as maths from '../utils/maths';
import type { Point } from '../types/common';

/**
 * 2D vector class with common vector operations
 * @example
 * const v = new Vec(3, 4);
 * console.log(v.magnitude); // 5
 */
export default class Vec implements Point {
  x: number;
  y: number;

  /**
   * Create a new vector
   * @param x - X coordinate or Point object
   * @param y - Y coordinate (optional if x is a Point)
   * @example
   * new Vec(3, 4)
   * new Vec({ x: 3, y: 4 })
   */
  constructor(x: number | Point, y?: number) {
    const xIsVec = (x !== null) && (typeof x === 'object') && 'x' in x && 'y' in x;

    if (xIsVec) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x as number;
      this.y = y ?? 0;
    }
  }

  // Get/set

  /**
   * Get the magnitude (length) of the vector
   * @returns Vector magnitude
   */
  get magnitude(): number {
    return Math.sqrt(this.magSq);
  }

  /**
   * Alias for magnitude
   * @returns Vector length
   */
  get length(): number {
    return this.magnitude;
  }

  /**
   * Get the squared magnitude (faster than magnitude)
   * @returns Squared magnitude
   */
  get magSq(): number {
    return (this.x * this.x) + (this.y * this.y);
  }

  /**
   * Alias for magSq
   * @returns Squared length
   */
  get lenSq(): number {
    return this.magSq;
  }

  // Static factory methods

  /**
   * Create a random vector within specified bounds
   * @param minX - Minimum X value
   * @param maxX - Maximum X value
   * @param minY - Minimum Y value (defaults to minX)
   * @param maxY - Maximum Y value (defaults to maxX)
   * @returns Random vector
   */
  static random(minX: number, maxX: number, minY?: number, maxY?: number): Vec {
    if (minY === undefined || maxY === undefined) {
      minY = minX;
      maxY = maxX;
    }
    return new Vec(random.num(minX, maxX), random.num(minY, maxY));
  }

  /**
   * Create a vector from two points
   * @param x1 - Start X coordinate
   * @param y1 - Start Y coordinate
   * @param x2 - End X coordinate
   * @param y2 - End Y coordinate
   * @returns Vector from (x1,y1) to (x2,y2)
   */
  static fromPts(x1: number, y1: number, x2: number, y2: number): Vec {
    return new Vec(x2 - x1, y2 - y1);
  }

  /**
   * Create a unit vector from an angle
   * @param angle - Angle in radians (or degrees if inDegrees is true)
   * @param inDegrees - Whether angle is in degrees
   * @returns Unit vector pointing in the given direction
   */
  static fromAngle(angle: number, inDegrees: boolean = false): Vec {
    let a = angle;
    if (inDegrees) {
      a = angle * (maths.TAO / 360);
    }
    return new Vec(Math.cos(a), Math.sin(a));
  }

  /**
   * Add two vectors (functional style)
   * @param v1 - First vector
   * @param v2 - Second vector
   * @returns New vector with sum
   */
  static add(v1: Point, v2: Point): Vec {
    return new Vec(v1.x + v2.x, v1.y + v2.y);
  }

  /**
   * Subtract two vectors (functional style)
   * @param v1 - First vector
   * @param v2 - Second vector
   * @returns New vector with difference
   */
  static subtract(v1: Point, v2: Point): Vec {
    return new Vec(v1.x - v2.x, v1.y - v2.y);
  }

  /**
   * Multiply vector by scalar (functional style)
   * @param v - Vector to multiply
   * @param scalar - Scalar value
   * @returns New scaled vector
   */
  static multiply(v: Point, scalar: number): Vec {
    return new Vec(v.x * scalar, v.y * scalar);
  }

  /**
   * Divide vector by scalar (functional style)
   * @param v - Vector to divide
   * @param scalar - Scalar value
   * @returns New divided vector
   */
  static divide(v: Point, scalar: number): Vec {
    return new Vec(v.x / scalar, v.y / scalar);
  }

  /**
   * Linearly interpolate between two vectors (functional style)
   * @param v1 - Start vector
   * @param v2 - End vector
   * @param amount - Interpolation amount (0-1)
   * @returns Interpolated vector
   */
  static lerp(v1: Point, v2: Point, amount: number): Vec {
    return new Vec(
      maths.lerp(v1.x, v2.x, amount),
      maths.lerp(v1.y, v2.y, amount),
    );
  }

  // Distance methods

  /**
   * Calculate distance to another point
   * @param pt - Target point
   * @returns Distance
   */
  distTo(pt: Point): number {
    return geom.dist(this, pt);
  }

  /**
   * Calculate distance to coordinates
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns Distance
   */
  distToXY(x: number, y: number): number {
    return geom.distXY(this.x, this.y, x, y);
  }

  /**
   * Calculate squared distance to another point (faster than distTo)
   * @param pt - Target point
   * @returns Squared distance
   */
  distSqTo(pt: Point): number {
    return geom.distSq(this, pt);
  }

  /**
   * Calculate squared distance to coordinates (faster than distToXY)
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns Squared distance
   */
  distSqToXY(x: number, y: number): number {
    return geom.distSqXY(this.x, this.y, x, y);
  }

  // Vector operations (mutating)

  /**
   * Add another vector to this vector (mutates)
   * @param v - Vector to add
   */
  add(v: Point): void {
    this.x += v.x;
    this.y += v.y;
  }

  /**
   * Subtract another vector from this vector (mutates)
   * @param v - Vector to subtract
   */
  subtract(v: Point): void {
    this.x -= v.x;
    this.y -= v.y;
  }

  /**
   * Multiply this vector by a scalar (mutates)
   * @param val - Scalar value
   */
  multiply(val: number): void {
    this.x *= val;
    this.y *= val;
  }

  /**
   * Divide this vector by a scalar (mutates)
   * @param val - Scalar value
   */
  divide(val: number): void {
    this.x /= val;
    this.y /= val;
  }

  /**
   * Normalize this vector to unit length (mutates)
   * @param scale - Optional scale to apply after normalization
   */
  normalize(scale?: number): void {
    const mag = this.magnitude;
    if (mag !== 0) {
      this.divide(mag);
      if (scale !== undefined) {
        this.multiply(scale);
      }
    }
  }

  /**
   * Limit the magnitude of this vector (mutates)
   * @param val - Maximum magnitude
   */
  limit(val: number): void {
    const mag = this.magnitude;
    if (mag > val && mag !== 0) {
      this.divide(mag);
      this.multiply(val);
    }
  }

  // Angle and rotation

  /**
   * Calculate dot product with another vector
   * @param v - Other vector
   * @returns Dot product
   */
  dot(v: Point): number {
    return (this.x * v.x) + (this.y * v.y);
  }

  /**
   * Calculate angle between this vector and another
   * @param v - Other vector
   * @returns Angle in radians
   */
  angleBetween(v: Vec): number {
    return Math.acos(this.dot(v) / (this.magnitude * v.magnitude));
  }

  /**
   * Get the heading (angle) of this vector
   * @returns Angle in radians
   */
  heading(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Rotate this vector by an angle (mutates)
   * @param angle - Angle in radians
   */
  rotate(angle: number): void {
    const newHeading = this.heading() + angle;
    const mag = this.magnitude;
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
  }

  /**
   * Set the heading of this vector (mutates)
   * @param angle - New angle in radians
   */
  setHeading(angle: number): void {
    const mag = this.magnitude;
    this.x = Math.cos(angle) * mag;
    this.y = Math.sin(angle) * mag;
  }

  /**
   * Set the magnitude of this vector (mutates)
   * @param mag - New magnitude
   */
  setMagnitude(mag: number): void {
    this.normalize();
    this.multiply(mag);
  }

  // Utility methods

  /**
   * Wrap this vector within bounds (mutates)
   * @param x - Left bound
   * @param y - Top bound
   * @param w - Width
   * @param h - Height
   */
  wrapIn(x: number, y: number, w: number, h: number): void {
    this.x = ((this.x - x) % w + w) % w + x;
    this.y = ((this.y - y) % h + h) % h + y;
  }

  /**
   * Wrap this vector within a rectangle (mutates)
   * @param rect - Rectangle bounds
   */
  wrapInRect(rect: { x: number; y: number; w: number; h: number }): void {
    this.wrapIn(rect.x, rect.y, rect.w, rect.h);
  }

  /**
   * Create a copy of this vector
   * @returns New vector with same values
   */
  clone(): Vec {
    return new Vec(this.x, this.y);
  }

  /**
   * Alias for clone()
   * @returns New vector with same values
   */
  copy(): Vec {
    return this.clone();
  }

  /**
   * Check if this vector equals another point
   * @param v - Point to compare
   * @returns True if equal
   */
  equals(v: Point): boolean {
    return this.x === v.x && this.y === v.y;
  }

  /**
   * Convert vector to string representation
   * @returns String representation
   */
  toString(): string {
    return `(x: ${this.x}, y: ${this.y})`;
  }
}
