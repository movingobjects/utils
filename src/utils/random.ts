/**
 * Random number and value generation utilities
 */

import type { Point } from '../types/common';

// Get

/**
 * Generate a random floating point number within a range
 * @param min - Minimum value (or maximum if max is undefined, defaults to 1)
 * @param max - Maximum value (optional)
 * @returns Random number between min and max
 * @example
 * num(10)      // Random number between 0 and 10
 * num(5, 10)   // Random number between 5 and 10
 */
export function num(min: number = 1, max?: number): number {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return (Math.random() * (max - min)) + min;
}

/**
 * Generate a random integer within a range (inclusive)
 * @param min - Minimum value (or maximum if max is undefined)
 * @param max - Maximum value (optional)
 * @returns Random integer between min and max (inclusive)
 * @example
 * int(10)      // Random integer between 0 and 10
 * int(5, 10)   // Random integer between 5 and 10
 */
export function int(min: number, max?: number): number {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random boolean with a given probability
 * @param chance - Probability of returning true (0-1, defaults to 0.5)
 * @returns Random boolean
 * @example
 * boolean()      // 50% chance of true
 * boolean(0.8)   // 80% chance of true
 */
export function boolean(chance: number = 0.5): boolean {
  return (Math.random() < chance);
}

/**
 * Generate a random sign (1 or -1) with a given probability
 * @param chance - Probability of returning 1 (0-1, defaults to 0.5)
 * @returns Either 1 or -1
 * @example
 * sign()       // 50% chance of 1, 50% chance of -1
 * sign(0.7)    // 70% chance of 1, 30% chance of -1
 */
export function sign(chance: number = 0.5): number {
  return (Math.random() < chance) ? 1 : -1;
}

/**
 * Generate a random bit (1 or 0) with a given probability
 * @param chance - Probability of returning 1 (0-1, defaults to 0.5)
 * @returns Either 1 or 0
 * @example
 * bit()        // 50% chance of 1, 50% chance of 0
 * bit(0.3)     // 30% chance of 1, 70% chance of 0
 */
export function bit(chance: number = 0.5): number {
  return (Math.random() < chance) ? 1 : 0;
}

/**
 * Generate a random color as a hex integer
 * @returns Random color integer (0x000000 to 0xFFFFFF)
 * @example
 * color()  // e.g., 0xFF3366
 */
export function color(): number {
  return int(0xffffff);
}

/**
 * Add random variation to a number
 * @param n - Base number
 * @param freedom - Maximum variation in either direction
 * @returns Number with random variation
 * @example
 * wiggle(100, 10)  // Returns number between 90 and 110
 */
export function wiggle(n: number, freedom: number): number {
  return n + num(-freedom, freedom);
}

// Geom

/**
 * Generate a random point within a circle using uniform distribution
 * @param radius - Circle radius
 * @returns Random point within the circle
 * @example
 * ptInCircle(50)  // Random point within a circle of radius 50
 */
export function ptInCircle(radius: number): Point {
  const t = num(2 * Math.PI);
  const u = num() + num();
  const r = (u > 1) ? (2 - u) : u;

  return {
    x: radius * r * Math.cos(t),
    y: radius * r * Math.sin(t),
  };
}

// Arrays

/**
 * Shuffle an array using Fisher-Yates algorithm (returns new array)
 * @param arr - Array to shuffle
 * @returns New shuffled array
 * @example
 * shuffle([1, 2, 3, 4])  // e.g., [3, 1, 4, 2]
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  let m = a.length;
  let i = 0;
  let swap: T;

  while (m) {
    i = Math.floor(Math.random() * m--);
    swap = a[m];
    a[m] = a[i];
    a[i] = swap;
  }

  return a;
}

/**
 * Get a random valid index from an array
 * @param a - Array to get index from
 * @returns Random valid index, or -1 if array is empty
 * @example
 * index([1, 2, 3])  // Returns 0, 1, or 2
 */
export function index<T>(a: T[]): number {
  return (a.length) ? int(a.length - 1) : -1;
}

/**
 * Get a random item from an array
 * @param a - Array to get item from
 * @returns Random item from the array
 * @example
 * item(['a', 'b', 'c'])  // Returns 'a', 'b', or 'c'
 */
export function item<T>(a: T[]): T {
  return a[index(a)];
}

/**
 * Get multiple random items from an array (without replacement)
 * @param a - Array to get items from
 * @param count - Number of items to get
 * @returns Array of random items
 * @example
 * items([1, 2, 3, 4, 5], 3)  // e.g., [2, 5, 1]
 */
export function items<T>(a: T[], count: number): T[] {
  return shuffle(a).slice(0, count);
}
