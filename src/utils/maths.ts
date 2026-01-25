/**
 * Mathematical constants and utility functions
 */

/**
 * Tau constant (2π)
 */
export const TAO = Math.PI * 2;

/**
 * Golden ratio (φ)
 */
export const PHI = (1 + Math.sqrt(5)) / 2;

/**
 * Golden ratio constant (alias for PHI)
 */
export const GOLDEN_RATIO = PHI;

/**
 * Golden angle in radians (~2.399...)
 */
export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Interpolation

/**
 * Linearly interpolate between two values
 * @param min - Lower bound
 * @param max - Upper bound
 * @param val - Interpolation factor (0 = min, 1 = max, default: 0.5)
 * @param doClamp - Whether to clamp output to [min, max] range (default: false)
 * @returns Interpolated value
 * @example
 * lerp(0, 100, 0.5)    // 50
 * lerp(0, 100, 1.5)    // 150 (not clamped)
 * lerp(0, 100, 1.5, true)  // 100 (clamped)
 */
export function lerp(min: number, max: number, val: number = 0.5, doClamp: boolean = false): number {
  const output = (min * (1 - val)) + (max * val);
  return doClamp ? clamp(output, min, max) : output;
}

/**
 * Cosine interpolation between two values (smoother than linear)
 * @param min - Lower bound
 * @param max - Upper bound
 * @param val - Interpolation factor (0-1, default: 0.5)
 * @param doClamp - Whether to clamp output to [min, max] range (default: false)
 * @returns Interpolated value
 * @example
 * coserp(0, 100, 0.5)  // 50 (smoother curve than lerp)
 */
export function coserp(min: number, max: number, val: number = 0.5, doClamp: boolean = false): number {
  const output = lerp(min, max, (1 - Math.cos(val * Math.PI)) / 2);
  return doClamp ? clamp(output, min, max) : output;
}

/**
 * Smooth interpolation using smoothstep (3rd order hermite)
 * @param min - Lower bound
 * @param max - Upper bound
 * @param val - Interpolation factor (0-1, default: 0.5)
 * @param doClamp - Whether to clamp output to [min, max] range (default: false)
 * @returns Interpolated value
 * @example
 * smoothLerp(0, 100, 0.5)  // 50 (with smoothstep easing)
 */
export function smoothLerp(min: number, max: number, val: number = 0.5, doClamp: boolean = false): number {
  const output = lerp(min, max, val * val * (3 - (2 * val)));
  return doClamp ? clamp(output, min, max) : output;
}

/**
 * Smoother interpolation using smootherstep (5th order hermite)
 * @param min - Lower bound
 * @param max - Upper bound
 * @param val - Interpolation factor (0-1, default: 0.5)
 * @param doClamp - Whether to clamp output to [min, max] range (default: false)
 * @returns Interpolated value
 * @example
 * smootherLerp(0, 100, 0.5)  // 50 (with smootherstep easing)
 */
export function smootherLerp(min: number, max: number, val: number = 0.5, doClamp: boolean = false): number {
  const output = lerp(min, max, val * val * val * (val * (6 * val - 15) + 10));
  return doClamp ? clamp(output, min, max) : output;
}

/**
 * Normalize a value to 0-1 range based on min/max bounds
 * @param val - Value to normalize
 * @param min - Lower bound
 * @param max - Upper bound
 * @param doClamp - Whether to clamp output to [0, 1] range (default: false)
 * @returns Normalized value (0-1)
 * @example
 * norm(50, 0, 100)   // 0.5
 * norm(150, 0, 100)  // 1.5 (not clamped)
 * norm(150, 0, 100, true)  // 1 (clamped)
 */
export function norm(val: number, min: number, max: number, doClamp: boolean = false): number {
  const output = (val - min) / (max - min);
  return doClamp ? clamp(output, 0, 1) : output;
}

/**
 * Normalize with smoothstep interpolation
 * @param val - Value to normalize
 * @param min - Lower bound
 * @param max - Upper bound
 * @param doClamp - Whether to clamp output to [0, 1] range (default: false)
 * @returns Normalized value with smoothstep
 * @example
 * smoothNorm(50, 0, 100)  // 0.5 (with smoothstep)
 */
export function smoothNorm(val: number, min: number, max: number, doClamp: boolean = false): number {
  const output = smoothLerp(0, 1, (val - min) / (max - min));
  return doClamp ? clamp(output, 0, 1) : output;
}

/**
 * Normalize with smootherstep interpolation
 * @param val - Value to normalize
 * @param min - Lower bound
 * @param max - Upper bound
 * @param doClamp - Whether to clamp output to [0, 1] range (default: false)
 * @returns Normalized value with smootherstep
 * @example
 * smootherNorm(50, 0, 100)  // 0.5 (with smootherstep)
 */
export function smootherNorm(val: number, min: number, max: number, doClamp: boolean = false): number {
  const output = smootherLerp(0, 1, (val - min) / (max - min));
  return doClamp ? clamp(output, 0, 1) : output;
}

/**
 * Map a value from one range to another
 * @param val - Value to map
 * @param min - Source range minimum
 * @param max - Source range maximum
 * @param tmin - Target range minimum
 * @param tmax - Target range maximum
 * @param doClamp - Whether to clamp to target range (default: false)
 * @returns Mapped value
 * @example
 * map(50, 0, 100, 0, 1)    // 0.5
 * map(75, 0, 100, 0, 200)  // 150
 */
export function map(val: number, min: number, max: number, tmin: number, tmax: number, doClamp: boolean = false): number {
  return lerp(tmin, tmax, norm(val, min, max, doClamp));
}

/**
 * Map a value from one range to another with smoothstep
 * @param val - Value to map
 * @param min - Source range minimum
 * @param max - Source range maximum
 * @param tmin - Target range minimum
 * @param tmax - Target range maximum
 * @param doClamp - Whether to clamp to target range (default: false)
 * @returns Mapped value with smoothstep
 * @example
 * smoothMap(50, 0, 100, 0, 1)  // 0.5 (with smoothstep)
 */
export function smoothMap(val: number, min: number, max: number, tmin: number, tmax: number, doClamp: boolean = false): number {
  return smoothLerp(tmin, tmax, norm(val, min, max, doClamp));
}

/**
 * Map a value from one range to another with smootherstep
 * @param val - Value to map
 * @param min - Source range minimum
 * @param max - Source range maximum
 * @param tmin - Target range minimum
 * @param tmax - Target range maximum
 * @param doClamp - Whether to clamp to target range (default: false)
 * @returns Mapped value with smootherstep
 * @example
 * smootherMap(50, 0, 100, 0, 1)  // 0.5 (with smootherstep)
 */
export function smootherMap(val: number, min: number, max: number, tmin: number, tmax: number, doClamp: boolean = false): number {
  return smootherLerp(tmin, tmax, norm(val, min, max, doClamp));
}

/**
 * Convert unipolar (0-1) to bipolar (-1 to 1) range
 * @param val - Value in 0-1 range
 * @returns Value in -1 to 1 range
 * @example
 * uniToBi(0)    // -1
 * uniToBi(0.5)  // 0
 * uniToBi(1)    // 1
 */
export function uniToBi(val: number): number {
  return map(val, 0, 1, -1, 1);
}

/**
 * Convert bipolar (-1 to 1) to unipolar (0-1) range
 * @param val - Value in -1 to 1 range
 * @returns Value in 0-1 range
 * @example
 * biToUni(-1)  // 0
 * biToUni(0)   // 0.5
 * biToUni(1)   // 1
 */
export function biToUni(val: number): number {
  return norm(val, -1, 1);
}

// Loops & ranges

/**
 * Get next value in a range (wraps or clamps)
 * @param num - Current value
 * @param min - Range minimum
 * @param max - Range maximum
 * @param doClamp - If true, clamps; if false, wraps (default: false)
 * @returns Next value
 * @example
 * nextWithin(2, 0, 5)        // 3
 * nextWithin(5, 0, 5)        // 0 (wraps)
 * nextWithin(5, 0, 5, true)  // 5 (clamps)
 */
export function nextWithin(num: number, min: number, max: number, doClamp: boolean = false): number {
  if (doClamp) {
    return clamp(num + 1, min, max);
  } else {
    return addWithin(num, 1, min, max);
  }
}

/**
 * Get previous value in a range (wraps or clamps)
 * @param num - Current value
 * @param min - Range minimum
 * @param max - Range maximum
 * @param doClamp - If true, clamps; if false, wraps (default: false)
 * @returns Previous value
 * @example
 * prevWithin(2, 0, 5)        // 1
 * prevWithin(0, 0, 5)        // 5 (wraps)
 * prevWithin(0, 0, 5, true)  // 0 (clamps)
 */
export function prevWithin(num: number, min: number, max: number, doClamp: boolean = false): number {
  if (doClamp) {
    return clamp(num - 1, min, max);
  } else {
    return subtractWithin(num, 1, min, max);
  }
}

/**
 * Add to a value and wrap within range
 * @param num - Current value
 * @param inc - Amount to add
 * @param min - Range minimum
 * @param max - Range maximum
 * @returns Wrapped result
 * @example
 * addWithin(4, 3, 0, 5)  // 1 (7 wraps to 1)
 */
export function addWithin(num: number, inc: number, min: number, max: number): number {
  return wrap(num + inc, min, max);
}

/**
 * Subtract from a value and wrap within range
 * @param num - Current value
 * @param sub - Amount to subtract
 * @param min - Range minimum
 * @param max - Range maximum
 * @returns Wrapped result
 * @example
 * subtractWithin(1, 3, 0, 5)  // 4 (-2 wraps to 4)
 */
export function subtractWithin(num: number, sub: number, min: number, max: number): number {
  return wrap(num - sub, min, max);
}

/**
 * Wrap an integer value within a range (inclusive)
 * @param num - Value to wrap
 * @param min - Range minimum
 * @param max - Range maximum
 * @returns Wrapped value
 * @example
 * wrap(7, 0, 5)   // 1
 * wrap(-1, 0, 5)  // 5
 */
export function wrap(num: number, min: number, max: number): number {
  const r = max - min + 1;
  const n = ((num - min) % r);
  if (n < 0) {
    return max + n + 1;
  } else {
    return min + n;
  }
}

/**
 * Wrap a floating point value within a range
 * @param num - Value to wrap
 * @param min - Range minimum (default: 0)
 * @param max - Range maximum (default: 1)
 * @returns Wrapped value
 * @example
 * wrapNum(1.5, 0, 1)   // 0.5
 * wrapNum(-0.5, 0, 1)  // 0.5
 */
export function wrapNum(num: number, min: number = 0, max: number = 1): number {
  if (num < min) {
    return max - (min - num) % (max - min);
  } else {
    return min + (num - min) % (max - min);
  }
}

/**
 * Clamp a value to a range
 * @param num - Value to clamp
 * @param min - Range minimum (default: 0)
 * @param max - Range maximum (default: 1)
 * @returns Clamped value
 * @example
 * clamp(1.5, 0, 1)   // 1
 * clamp(-0.5, 0, 1)  // 0
 * clamp(0.5, 0, 1)   // 0.5
 */
export function clamp(num: number, min: number = 0, max: number = 1): number {
  if (min <= max) {
    return Math.max(min, Math.min(max, num));
  } else {
    return Math.max(max, Math.min(min, num));
  }
}

// Misc

/**
 * Round a number to specified decimal places
 * @param n - Number to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 * @example
 * roundTo(3.14159, 2)  // 3.14
 * roundTo(3.5, 0)      // 4
 */
export function roundTo(n: number, decimals: number): number {
  const m = Math.pow(10, decimals);
  return Math.round(n * m) / m;
}

/**
 * Get absolute difference between two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Absolute difference
 * @example
 * diff(10, 5)   // 5
 * diff(5, 10)   // 5
 */
export function diff(a: number, b: number): number {
  return Math.abs(a - b);
}

/**
 * Calculate average of numbers
 * @param nums - Numbers to average
 * @returns Average value
 * @example
 * avg(1, 2, 3, 4, 5)  // 3
 * avg(10, 20)         // 15
 */
export function avg(...nums: number[]): number {
  return nums.reduce((acc, cur) => (acc + cur), 0) / nums.length;
}

/**
 * Ease a value toward a target (stops when within threshold)
 * @param val - Current value
 * @param trgt - Target value
 * @param factor - Easing factor (0-1, default: 0.5)
 * @param threshold - Distance threshold to snap to target (default: 1)
 * @returns Eased value
 * @example
 * ease(100, 0, 0.1)  // Moves 10% closer to 0
 */
export function ease(val: number, trgt: number, factor: number = 0.5, threshold: number = 1): number {
  return (isNaN(val) || diff(val, trgt) < threshold) ? trgt : lerp(val, trgt, factor);
}

/**
 * Ease with smoothstep interpolation
 * @param val - Current value
 * @param trgt - Target value
 * @param factor - Easing factor (0-1, default: 0.5)
 * @param threshold - Distance threshold to snap to target (default: 1)
 * @returns Eased value
 * @example
 * smoothEase(100, 0, 0.1)  // Smoothly moves toward 0
 */
export function smoothEase(val: number, trgt: number, factor: number = 0.5, threshold: number = 1): number {
  return (isNaN(val) || diff(val, trgt) < threshold) ? trgt : smoothLerp(val, trgt, factor);
}

/**
 * Ease with smootherstep interpolation
 * @param val - Current value
 * @param trgt - Target value
 * @param factor - Easing factor (0-1, default: 0.5)
 * @param threshold - Distance threshold to snap to target (default: 1)
 * @returns Eased value
 * @example
 * smootherEase(100, 0, 0.1)  // Very smoothly moves toward 0
 */
export function smootherEase(val: number, trgt: number, factor: number = 0.5, threshold: number = 1): number {
  return (isNaN(val) || diff(val, trgt) < threshold) ? trgt : smootherLerp(val, trgt, factor);
}

/**
 * Check if a value is evenly divisible by a divisor
 * @param val - Value to check
 * @param divisor - Divisor
 * @returns True if evenly divisible
 * @example
 * divisibleBy(10, 5)  // true
 * divisibleBy(10, 3)  // false
 */
export function divisibleBy(val: number, divisor: number): boolean {
  return (val % divisor) === 0;
}
