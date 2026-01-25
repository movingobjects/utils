# moving-utils

A TypeScript utility library providing mathematical functions, geometry utilities, color manipulation, and more.

## Installation

```bash
npm install moving-utils
```

## Usage

### Importing Utilities

```typescript
import { maths, arrays, colors } from 'moving-utils';

// Use math utilities
const interpolated = maths.lerp(0, 100, 0.5); // 50

// Use array utilities
const shuffled = arrays.shuffled([1, 2, 3, 4, 5]);

// Use color utilities
const hex = colors.toHex(0xFF5733);
```

### Importing Classes

```typescript
import { Vec, Range } from 'moving-utils';

// Create a 2D vector
const vec = new Vec(10, 20);
console.log(vec.magnitude); // Calculate magnitude

// Create a range
const range = new Range(0, 100);
console.log(range.lerp(0.5)); // 50
```

## Modules

### `maths`

Mathematical utilities including interpolation (lerp, smoothLerp), mapping, clamping, wrapping, and easing functions.

### `arrays`

Array manipulation functions like shuffle, chunk, bifurcate, and navigation utilities.

### `colors`

Color conversion utilities supporting hex, RGB, and HSV color spaces.

### `geom`

Geometric calculations for points, rectangles, distances, and transformations.

### `random`

Random number generation including integers, floats, booleans, and array sampling.

### `text`

Text manipulation functions like case conversion, truncation, and lorem ipsum generation.

## Classes

### `Vec`

2D vector class with mathematical operations (add, subtract, normalize, rotate, etc.) and utility methods.

### `Range`

Numeric range class with interpolation, mapping, clamping, and wrapping functions.
