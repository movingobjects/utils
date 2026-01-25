/**
 * Numeric range class for managing min/max ranges
 */

import * as maths from '../utils/maths';
import * as random from '../utils/random';

/**
 * Class representing a numeric range with utility methods
 * @example
 * const range = new Range(0, 100);
 * console.log(range.center); // 50
 */
export default class Range {
  min: number;
  max: number;

  /**
   * Create a new numeric range
   * @param min - Minimum value (defaults to 0 if both NaN, or becomes 0 if only max provided)
   * @param max - Maximum value (defaults to 1 if both NaN, or becomes min value if omitted)
   * @example
   * new Range(0, 100)  // Range from 0 to 100
   * new Range(50)      // Range from 0 to 50
   * new Range()        // Range from 0 to 1
   */
  constructor(min: number = NaN, max: number = NaN) {
    if (isNaN(min) && isNaN(max)) {
      this.min = 0;
      this.max = 1;
    } else if (isNaN(max)) {
      this.min = 0;
      this.max = min;
    } else {
      this.min = min;
      this.max = max;
    }
  }

  // Get/set

  /**
   * Get the center point of the range
   * @returns Center value
   */
  get center(): number {
    return this.lerp(0.5);
  }

  /**
   * Get the length (span) of the range
   * @returns Range length
   */
  get length(): number {
    return this.max - this.min;
  }

  /**
   * Get a random floating point number within the range
   * @returns Random number
   */
  get random(): number {
    return random.num(this.min, this.max);
  }

  /**
   * Get a random integer within the range
   * @returns Random integer
   */
  get randomInt(): number {
    return random.int(this.min, this.max);
  }

  /**
   * Check if this range contains only integers
   * @returns True if both min and max are integers
   */
  get isIntRange(): boolean {
    return Number.isInteger(this.min) && Number.isInteger(this.max);
  }

  // Methods

  /**
   * Linearly interpolate within the range
   * @param val - Interpolation factor (0 = min, 1 = max)
   * @param clamp - Whether to clamp result to range
   * @returns Interpolated value
   * @example
   * const r = new Range(0, 100);
   * r.lerp(0.5); // 50
   */
  lerp(val: number, clamp: boolean = false): number {
    return maths.lerp(this.min, this.max, val, clamp);
  }

  /**
   * Normalize a value to 0-1 based on this range
   * @param val - Value to normalize
   * @param clamp - Whether to clamp result to 0-1
   * @returns Normalized value
   * @example
   * const r = new Range(0, 100);
   * r.norm(50); // 0.5
   */
  norm(val: number, clamp: boolean = false): number {
    return maths.norm(val, this.min, this.max, clamp);
  }

  /**
   * Map a value from another range to this range
   * @param val - Value to map
   * @param fromMin - Source range minimum
   * @param fromMax - Source range maximum
   * @returns Mapped value
   */
  mapFrom(val: number, fromMin: number, fromMax: number): number {
    return maths.map(val, fromMin, fromMax, this.min, this.max);
  }

  /**
   * Map a value from this range to another range
   * @param val - Value to map
   * @param toMin - Target range minimum
   * @param toMax - Target range maximum
   * @returns Mapped value
   */
  mapTo(val: number, toMin: number, toMax: number): number {
    return maths.map(val, this.min, this.max, toMin, toMax);
  }

  /**
   * Map a value from another Range object to this range
   * @param val - Value to map
   * @param fromRange - Source range
   * @param clamp - Whether to clamp result
   * @returns Mapped value
   */
  mapFromRange(val: number, fromRange: Range, clamp: boolean = false): number {
    return maths.map(val, fromRange.min, fromRange.max, this.min, this.max, clamp);
  }

  /**
   * Map a value from this range to another Range object
   * @param val - Value to map
   * @param toRange - Target range
   * @param clamp - Whether to clamp result
   * @returns Mapped value
   */
  mapToRange(val: number, toRange: Range, clamp: boolean = false): number {
    return maths.map(val, this.min, this.max, toRange.min, toRange.max, clamp);
  }

  /**
   * Clamp a value to this range
   * @param val - Value to clamp
   * @returns Clamped value
   * @example
   * const r = new Range(0, 100);
   * r.clamp(150); // 100
   * r.clamp(-10); // 0
   */
  clamp(val: number): number {
    return maths.clamp(val, this.min, this.max);
  }

  /**
   * Wrap a value within this range
   * @param val - Value to wrap
   * @returns Wrapped value
   * @example
   * const r = new Range(0, 10);
   * r.wrap(12); // 2
   * r.wrap(-1); // 10
   */
  wrap(val: number): number {
    if (Number.isInteger(val) && this.isIntRange) {
      return maths.wrap(val, this.min, this.max);
    } else {
      return maths.wrapNum(val, this.min, this.max);
    }
  }

  /**
   * Check if a value is within this range
   * @param val - Value to check
   * @returns True if value is within range (inclusive)
   */
  contains(val: number): boolean {
    return (val >= this.min) && (val <= this.max);
  }

  /**
   * Swap min and max values (mutates)
   */
  invert(): void {
    const temp = this.min;
    this.min = this.max;
    this.max = temp;
  }

  /**
   * Trim this range to fit within bounds (mutates)
   * @param trimMin - Lower bound
   * @param trimMax - Upper bound
   */
  trim(trimMin: number, trimMax: number): void {
    this.min = maths.clamp(this.min, trimMin, trimMax);
    this.max = maths.clamp(this.max, trimMin, trimMax);
  }

  /**
   * Convert range to string representation
   * @returns String representation
   */
  toString(): string {
    return `[${this.min}..${this.max}]`;
  }

  /**
   * Create a copy of this range
   * @returns New range with same values
   */
  clone(): Range {
    return new Range(this.min, this.max);
  }

  /**
   * Expand this range to include a value (mutates)
   * @param val - Value to include
   * @example
   * const r = new Range(0, 10);
   * r.envelop(15);
   * console.log(r.max); // 15
   */
  envelop(val: number): void {
    this.min = Math.min(this.min, val);
    this.max = Math.max(this.max, val);
  }
}
