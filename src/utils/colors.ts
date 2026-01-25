/**
 * Color conversion and manipulation utilities
 * Colors are represented as hex integers (0x000000 to 0xFFFFFF)
 */

import * as maths from './maths';
import type { RGB, HSV } from '../types/common';

/**
 * Convert color integer to hex string
 * @param color - Color as integer (0x000000 to 0xFFFFFF)
 * @returns Hex string with # prefix
 * @example
 * toHex(0xFF0000)  // '#ff0000'
 * toHex(0x000000)  // '#000000'
 */
export function toHex(color: number): string {
  let hex = color.toString(16);
  hex = '000000'.slice(0, 6 - hex.length) + hex;
  return `#${hex}`;
}

/**
 * Convert color integer to RGB object (values 0-1)
 * @param color - Color as integer (0x000000 to 0xFFFFFF)
 * @returns RGB object with r, g, b values (0-1)
 * @example
 * toRgb(0xFF0000)  // {r: 1, g: 0, b: 0}
 * toRgb(0x808080)  // {r: 0.5, g: 0.5, b: 0.5}
 */
export function toRgb(color: number): RGB {
  return {
    r: ((color >> 16) & 0xFF) / 255,
    g: ((color >> 8) & 0xFF) / 255,
    b: ((color) & 0xFF) / 255,
  };
}

/**
 * Convert color integer to HSV object (hue, saturation, value)
 * @param color - Color as integer (0x000000 to 0xFFFFFF)
 * @returns HSV object with h, s, v values (0-1)
 * @example
 * toHsv(0xFF0000)  // {h: 0, s: 1, v: 1} (red)
 */
export function toHsv(color: number): HSV {
  const { r, g, b } = toRgb(color);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h: number;
  const v = max;

  const d = max - min;
  const s = (max === 0) ? 0 : (d / max);

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return { h, s, v };
}

/**
 * Convert color integer to RGB comma-separated string (0-255 values)
 * @param color - Color as integer (0x000000 to 0xFFFFFF)
 * @returns RGB string (e.g., "255,0,0")
 * @example
 * toRgbString(0xFF0000)  // '255,0,0'
 * toRgbString(0x808080)  // '128,128,128'
 */
export function toRgbString(color: number): string {
  if (!color) return `0,0,0`;

  const c = toRgb(color);
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);

  return `${r},${g},${b}`;
}

/**
 * Convert hex string to color integer
 * @param hex - Hex string (with or without # prefix)
 * @returns Color as integer
 * @example
 * fromHex('#ff0000')  // 0xFF0000
 * fromHex('00ff00')   // 0x00FF00
 */
export function fromHex(hex: string): number {
  const hasHash = hex.charAt(0) === '#';
  const hexVal = hex.slice(hasHash ? 1 : 0, hasHash ? 7 : 6);
  return parseInt(hexVal, 16);
}

/**
 * Convert RGB values to color integer
 * @param r - Red component (0-1)
 * @param g - Green component (0-1)
 * @param b - Blue component (0-1)
 * @returns Color as integer
 * @example
 * fromRgb(1, 0, 0)      // 0xFF0000 (red)
 * fromRgb(0.5, 0.5, 0.5)  // 0x808080 (gray)
 */
export function fromRgb(r: number, g: number, b: number): number {
  return (((r * 255) << 16) + ((g * 255) << 8) + (b * 255 | 0));
}

/**
 * Convert HSV values to color integer
 * @param h - Hue (0-1)
 * @param s - Saturation (0-1)
 * @param v - Value/brightness (0-1)
 * @returns Color as integer
 * @example
 * fromHsv(0, 1, 1)    // 0xFF0000 (red)
 * fromHsv(0.33, 1, 1) // 0x00FF00 (green)
 */
export function fromHsv(h: number, s: number, v: number): number {
  let r: number, g: number, b: number;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0;
  }

  return fromRgb(r, g, b);
}

/**
 * Convert hex string to RGB object
 * @param hex - Hex string (with or without # prefix)
 * @returns RGB object with r, g, b values (0-1)
 * @example
 * hexToRgb('#ff0000')  // {r: 1, g: 0, b: 0}
 */
export function hexToRgb(hex: string): RGB {
  return toRgb(fromHex(hex));
}

/**
 * Convert hex string to HSV object
 * @param hex - Hex string (with or without # prefix)
 * @returns HSV object with h, s, v values (0-1)
 * @example
 * hexToHsv('#ff0000')  // {h: 0, s: 1, v: 1}
 */
export function hexToHsv(hex: string): HSV {
  return toHsv(fromHex(hex));
}

/**
 * Convert RGB values to hex string
 * @param r - Red component (0-1)
 * @param g - Green component (0-1)
 * @param b - Blue component (0-1)
 * @returns Hex string with # prefix
 * @example
 * rgbToHex(1, 0, 0)  // '#ff0000'
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return toHex(fromRgb(r, g, b));
}

/**
 * Convert RGB values to HSV object
 * @param r - Red component (0-1)
 * @param g - Green component (0-1)
 * @param b - Blue component (0-1)
 * @returns HSV object with h, s, v values (0-1)
 * @example
 * rgbToHsv(1, 0, 0)  // {h: 0, s: 1, v: 1}
 */
export function rgbToHsv(r: number, g: number, b: number): HSV {
  return toHsv(fromRgb(r, g, b));
}

/**
 * Convert HSV values to hex string
 * @param h - Hue (0-1)
 * @param s - Saturation (0-1)
 * @param v - Value/brightness (0-1)
 * @returns Hex string with # prefix
 * @example
 * hsvToHex(0, 1, 1)  // '#ff0000'
 */
export function hsvToHex(h: number, s: number, v: number): string {
  return toHex(fromHsv(h, s, v));
}

/**
 * Convert HSV values to RGB object
 * @param h - Hue (0-1)
 * @param s - Saturation (0-1)
 * @param v - Value/brightness (0-1)
 * @returns RGB object with r, g, b values (0-1)
 * @example
 * hsvToRgb(0, 1, 1)  // {r: 1, g: 0, b: 0}
 */
export function hsvToRgb(h: number, s: number, v: number): RGB {
  return toRgb(fromHsv(h, s, v));
}

/**
 * Create a grayscale color
 * @param amt - Brightness level (0-1)
 * @returns Grayscale color as integer
 * @example
 * grayscale(1)    // 0xFFFFFF (white)
 * grayscale(0.5)  // 0x808080 (gray)
 * grayscale(0)    // 0x000000 (black)
 */
export function grayscale(amt: number): number {
  return fromRgb(amt, amt, amt);
}

/**
 * Mix two colors by interpolating between them
 * @param colorA - First color as integer
 * @param colorB - Second color as integer
 * @param amt - Mix amount (0-1, clamped)
 * @returns Mixed color as integer
 * @example
 * getMix(0xFF0000, 0x0000FF, 0.5)  // 0x800080 (purple, mix of red and blue)
 * getMix(0xFF0000, 0x0000FF, 0)    // 0xFF0000 (red)
 * getMix(0xFF0000, 0x0000FF, 1)    // 0x0000FF (blue)
 */
export function getMix(colorA: number, colorB: number, amt: number): number {
  const rgbA = toRgb(colorA);
  const rgbB = toRgb(colorB);

  const r = maths.lerp(rgbA.r, rgbB.r, maths.clamp(amt));
  const g = maths.lerp(rgbA.g, rgbB.g, maths.clamp(amt));
  const b = maths.lerp(rgbA.b, rgbB.b, maths.clamp(amt));

  return fromRgb(r, g, b);
}

/**
 * Calculate perceived brightness of a color using luminance formula
 * @param color - Color as integer
 * @returns Brightness value (0-1)
 * @example
 * brightness(0xFFFFFF)  // ~1 (white is bright)
 * brightness(0x000000)  // 0 (black has no brightness)
 * brightness(0xFF0000)  // ~0.49 (red has medium brightness)
 */
export function brightness(color: number): number {
  const MULT_R = 0.241;
  const MULT_G = 0.691;
  const MULT_B = 0.068;

  const rgb = toRgb(color);
  const r = MULT_R * (rgb.r * rgb.r);
  const g = MULT_G * (rgb.g * rgb.g);
  const b = MULT_B * (rgb.b * rgb.b);

  return Math.sqrt(r + g + b);
}
