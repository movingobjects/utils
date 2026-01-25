/**
 * Array manipulation and utility functions
 */

export {
  shuffle as shuffled,
  item as randomItem,
} from './random';

import * as maths from './maths';
import Range from '../classes/Range';

/**
 * Get array with only unique values (removes duplicates)
 * @param arr - Array to process
 * @returns New array with unique values
 * @example
 * unique([1, 2, 2, 3, 3, 3])  // [1, 2, 3]
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Add item to array only if it doesn't already exist (mutates array)
 * @param arr - Array to add to
 * @param item - Item to add
 * @example
 * const arr = [1, 2, 3];
 * addOnce(arr, 2);  // arr is still [1, 2, 3]
 * addOnce(arr, 4);  // arr becomes [1, 2, 3, 4]
 */
export function addOnce<T>(arr: T[], item: T): void {
  if (arr.indexOf(item) === -1) {
    arr.push(item);
  }
}

/**
 * Return new array with item added only if it doesn't already exist (immutable)
 * @param arr - Array to process
 * @param item - Item to add
 * @returns New array with item included
 * @example
 * withItem([1, 2, 3], 2)  // [1, 2, 3]
 * withItem([1, 2, 3], 4)  // [1, 2, 3, 4]
 */
export function withItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr : [...arr, item];
}

/**
 * Check if array includes any of the provided values
 * @param arr - Array to check
 * @param vals - Values to check for
 * @returns True if array includes any of the values
 * @example
 * includesAny([1, 2, 3], [4, 5])  // false
 * includesAny([1, 2, 3], [2, 5])  // true
 */
export function includesAny<T>(arr: T[], vals: T[]): boolean {
  return vals.some((val) => arr.includes(val));
}

/**
 * Split array into two arrays based on a predicate function
 * @param arr - Array to split
 * @param fn - Function that returns true for first array, false for second
 * @returns Tuple of [matching items, non-matching items]
 * @example
 * bifurcate([1, 2, 3, 4], x => x % 2 === 0)  // [[2, 4], [1, 3]]
 */
export function bifurcate<T>(arr: T[], fn: (val: T, i: number) => boolean): [T[], T[]] {
  return arr.reduce<[T[], T[]]>((acc, val, i) => {
    acc[fn(val, i) ? 0 : 1].push(val);
    return acc;
  }, [[], []]);
}

/**
 * Split array into chunks of specified size
 * @param arr - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 * @example
 * chunk([1, 2, 3, 4, 5], 2)  // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({
    length: Math.ceil(arr.length / size),
  }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

/**
 * Get the next index in an array (wraps or clamps at boundaries)
 * @param i - Current index
 * @param arr - Array to get next index from
 * @param clamp - If true, clamps at end; if false, wraps around (default: false)
 * @returns Next index
 * @example
 * next(1, [1, 2, 3])           // 2
 * next(2, [1, 2, 3])           // 0 (wraps)
 * next(2, [1, 2, 3], true)     // 2 (clamps)
 */
export function next<T>(i: number, arr: T[], clamp: boolean = false): number {
  return maths.nextWithin(i, 0, arr.length - 1, clamp);
}

/**
 * Get the previous index in an array (wraps or clamps at boundaries)
 * @param i - Current index
 * @param arr - Array to get previous index from
 * @param clamp - If true, clamps at start; if false, wraps around (default: false)
 * @returns Previous index
 * @example
 * prev(1, [1, 2, 3])           // 0
 * prev(0, [1, 2, 3])           // 2 (wraps)
 * prev(0, [1, 2, 3], true)     // 0 (clamps)
 */
export function prev<T>(i: number, arr: T[], clamp: boolean = false): number {
  return maths.prevWithin(i, 0, arr.length - 1, clamp);
}

/**
 * Get the next item in an array (wraps or clamps at boundaries)
 * @param item - Current item
 * @param arr - Array to get next item from
 * @param clamp - If true, clamps at end; if false, wraps around (default: false)
 * @returns Next item
 * @example
 * nextItem('b', ['a', 'b', 'c'])  // 'c'
 * nextItem('c', ['a', 'b', 'c'])  // 'a' (wraps)
 */
export function nextItem<T>(item: T, arr: T[], clamp: boolean = false): T {
  return arr[next(arr.indexOf(item), arr, clamp)];
}

/**
 * Get the previous item in an array (wraps or clamps at boundaries)
 * @param item - Current item
 * @param arr - Array to get previous item from
 * @param clamp - If true, clamps at start; if false, wraps around (default: false)
 * @returns Previous item
 * @example
 * prevItem('b', ['a', 'b', 'c'])  // 'a'
 * prevItem('a', ['a', 'b', 'c'])  // 'c' (wraps)
 */
export function prevItem<T>(item: T, arr: T[], clamp: boolean = false): T {
  return arr[prev(arr.indexOf(item), arr, clamp)];
}

/**
 * Get the first item in an array
 * @param arr - Array to get first item from
 * @returns First item
 * @example
 * firstItem([1, 2, 3])  // 1
 */
export function firstItem<T>(arr: T[]): T {
  return arr[0];
}

/**
 * Get the last item in an array
 * @param arr - Array to get last item from
 * @returns Last item
 * @example
 * lastItem([1, 2, 3])  // 3
 */
export function lastItem<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

/**
 * Get the last index of an array
 * @param arr - Array to get last index from
 * @returns Last valid index
 * @example
 * lastIndex([1, 2, 3])  // 2
 */
export function lastIndex<T>(arr: T[]): number {
  return arr.length - 1;
}

/**
 * Wrap an index to stay within array bounds
 * @param i - Index to wrap
 * @param arr - Array to wrap index within
 * @returns Wrapped index
 * @example
 * wrapIndex(5, [1, 2, 3])   // 2
 * wrapIndex(-1, [1, 2, 3])  // 2
 */
export function wrapIndex<T>(i: number, arr: T[]): number {
  return maths.wrap(i, 0, arr.length - 1);
}

/**
 * Get all indices where a value appears in an array
 * @param arr - Array to search
 * @param val - Value to find
 * @returns Array of indices where value appears
 * @example
 * indexOfEach([1, 2, 3, 2, 1], 2)  // [1, 3]
 */
export function indexOfEach<T>(arr: T[], val: T): number[] {
  const indices: number[] = [];
  arr.forEach((item, i) => (item === val) && indices.push(i));
  return indices;
}

/**
 * Create a Range object representing the valid index range of an array
 * @param arr - Array to get index range from
 * @returns Range from 0 to array length - 1
 * @example
 * getIndexRange([1, 2, 3, 4, 5])  // Range(0, 4)
 */
export function getIndexRange<T>(arr: T[]): Range {
  return new Range(0, arr.length - 1);
}
