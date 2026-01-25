/**
 * Moving Utils - TypeScript utility library
 *
 * Main entry point for the library. Exports both utility namespaces and classes.
 */

// Namespace exports (utilities)
export * as arrays from './utils/arrays';
export * as colors from './utils/colors';
export * as geom from './utils/geom';
export * as maths from './utils/maths';
export * as random from './utils/random';
export * as text from './utils/text';

// Class exports (default exports)
export { default as Range } from './classes/Range';
export { default as Vec } from './classes/Vec';

// Type exports
export type {
  Point,
  RGB,
  HSV,
} from './types/common';
