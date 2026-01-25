/**
 * Text manipulation and generation utilities
 *
 * Note: getWidth() requires a browser environment with canvas support
 */

import * as random from './random';
import * as arrays from './arrays';

/**
 * Left double quotation mark character
 */
export const QUOTE_L = '\u201C';

/**
 * Right double quotation mark character
 */
export const QUOTE_R = '\u201D';

// String functions

/**
 * Convert string to title case (capitalize first letter of each word)
 * @param str - String to convert
 * @returns Title-cased string
 * @example
 * toTitleCase('hello world')  // 'Hello World'
 */
export function toTitleCase(str: string): string {
  return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

/**
 * Convert string to camelCase
 * @param str - String to convert
 * @returns camelCase string
 * @example
 * toCamelCase('hello world')    // 'helloWorld'
 * toCamelCase('hello-world')    // 'helloWorld'
 * toCamelCase('hello_world')    // 'helloWorld'
 */
export function toCamelCase(str: string): string {
  const s = (
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  );
  return s ? s.slice(0, 1).toLowerCase() + s.slice(1) : '';
}

/**
 * Convert string to kebab-case
 * @param str - String to convert
 * @returns kebab-case string
 * @example
 * toKebabCase('hello world')    // 'hello-world'
 * toKebabCase('helloWorld')     // 'hello-world'
 * toKebabCase('hello_world')    // 'hello-world'
 */
export function toKebabCase(str: string): string {
  return (
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.map((x) => x.toLowerCase())
      .join('-')
  ) || '';
}

/**
 * Convert string to snake_case
 * @param str - String to convert
 * @returns snake_case string
 * @example
 * toSnakeCase('hello world')    // 'hello_world'
 * toSnakeCase('helloWorld')     // 'hello_world'
 * toSnakeCase('hello-world')    // 'hello_world'
 */
export function toSnakeCase(str: string): string {
  return (
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.map((x) => x.toLowerCase())
      .join('_')
  ) || '';
}

/**
 * Extract words from a string (splits on non-alphanumeric characters except hyphens)
 * @param str - String to extract words from
 * @returns Array of words
 * @example
 * words('hello, world!')        // ['hello', 'world']
 * words('foo-bar baz')          // ['foo-bar', 'baz']
 */
export function words(str: string): string[] {
  return str.split(/[^a-zA-Z-]+/).filter(Boolean);
}

/**
 * Truncate a string to a maximum length
 * @param str - String to truncate
 * @param count - Maximum length
 * @param addEllipsis - If true, adds '...' to truncated strings (default: false)
 * @returns Truncated string
 * @example
 * trunc('hello world', 5)         // 'hello'
 * trunc('hello world', 8, true)   // 'hello...'
 */
export function trunc(str: string, count: number, addEllipsis: boolean = false): string {
  if (str.length <= count) {
    return str;
  } else if (addEllipsis) {
    return str.slice(0, (count > 3) ? count - 3 : count) + '...';
  } else {
    return str.slice(0, count);
  }
}

// Text generation

/**
 * Generate Lorem Ipsum-style Latin placeholder text
 * @param wordCount - Number of words to generate (default: 1)
 * @param punctuate - If true, adds periods and commas (default: false)
 * @returns Generated Latin text
 * @example
 * getLatin(5)             // 'lorem ipsum dolor sit amet'
 * getLatin(10, true)      // 'Lorem ipsum dolor, sit amet. Consectetur adipiscing elit, sed.'
 */
export function getLatin(wordCount: number = 1, punctuate: boolean = false): string {
  const CHANCE_PERIOD = 0.1;
  const CHANCE_COMMA = 0.15;

  let sourceWords = [
    'a', 'ac', 'accumsan', 'ad', 'adipiscing', 'aenean', 'aliquam', 'amet', 'ante',
    'aptent', 'arcu', 'at', 'auctor', 'augue', 'bibendum', 'blandit', 'class',
    'commodo', 'congue', 'consectetur', 'consequat', 'conubia', 'convallis', 'cras',
    'curabitur', 'cursus', 'dapibus', 'diam', 'dictum', 'dignissim', 'dolor',
    'donec', 'dui', 'duis', 'egestas', 'eget', 'eleifend', 'elementum', 'elit',
    'enim', 'erat', 'eros', 'est', 'et', 'etiam', 'eu', 'euismod', 'fames',
    'faucibus', 'felis', 'fermentum', 'feugiat', 'fringilla', 'fusce', 'gravida',
    'habitant', 'hendrerit', 'himenaeos', 'iaculis', 'id', 'imperdiet', 'in',
    'inceptos', 'integer', 'interdum', 'ipsum', 'justo', 'lacinia', 'lacus',
    'laoreet', 'lectus', 'leo', 'libero', 'ligula', 'litora', 'lobortis', 'lorem',
    'luctus', 'maecenas', 'magna', 'malesuada', 'massa', 'mattis', 'mauris',
    'metus', 'mi', 'mollis', 'morbi', 'nam', 'nec', 'neque', 'netus', 'nibh',
    'nisi', 'nisl', 'non', 'nostra', 'nulla', 'nullam', 'nunc', 'odio', 'orci',
    'ornare', 'pellentesque', 'per', 'pharetra', 'phasellus', 'placerat',
    'porttitor', 'posuere', 'praesent', 'pretium', 'proin', 'pulvinar', 'purus',
    'quam', 'quis', 'quisque', 'rhoncus', 'risus', 'rutrum', 'sagittis', 'sapien',
    'scelerisque', 'sed', 'sem', 'semper', 'senectus', 'sit', 'sociosqu',
    'suscipit', 'suspendisse', 'taciti', 'tellus', 'tempor', 'tempus', 'tincidunt',
    'torquent', 'tortor', 'tristique', 'turpis', 'ullamcorper', 'ultrices',
    'ultricies', 'urna', 'ut', 'varius', 'vehicula', 'vel', 'velit', 'venenatis',
    'vitae', 'vivamus', 'viverra', 'volutpat', 'vulputate',
  ];

  while (sourceWords.length < wordCount) {
    sourceWords = sourceWords.concat(sourceWords);
  }

  let isNewSentence = true;
  const words = random.items(sourceWords, wordCount);
  let result = '';

  for (let i = 0; i < words.length; i++) {
    const isLastWord = (i === arrays.lastIndex(words));
    const nextWord = words[i];

    if (isNewSentence) {
      result += nextWord.charAt(0).toUpperCase() + nextWord.slice(1);
      isNewSentence = false;
    } else {
      result += words[i];
    }

    if (punctuate) {
      if (isLastWord) {
        result += '.';
      } else if (random.boolean(CHANCE_PERIOD)) {
        result += '. ';
        isNewSentence = true;
      } else if (random.boolean(CHANCE_COMMA)) {
        result += ', ';
      } else {
        result += ' ';
      }
    } else if (!isLastWord) {
      result += ' ';
    }
  }

  return result;
}

/**
 * Generate a fake pronounceable word of specified length
 * @param len - Desired length of the word
 * @returns Generated fake word
 * @example
 * getFakeWord(6)  // e.g., 'glorsh'
 * getFakeWord(8)  // e.g., 'drashift'
 */
export function getFakeWord(len: number): string {
  const CONSONANTS_INIT = [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't',
    'v', 'w', 'x', 'dr', 'gl', 'gr', 'ch', 'ph', 'ps', 'sh', 'st', 'th', 'wh',
  ];

  const CONSONANTS = [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't',
    'v', 'w', 'x', 'pt', 'gl', 'gr', 'ch', 'ph', 'ps', 'sh', 'st', 'th', 'wh',
    'ck', 'cm', 'fr', 'ds', 'ft', 'gh', 'gn', 'kr', 'ks', 'ls', 'lt', 'lr',
    'mp', 'mt', 'ms', 'ng', 'ns', 'rd', 'rg', 'rs', 'rt', 'ss', 'ts', 'tch',
  ];

  const VOWELS = [
    'a', 'e', 'i', 'o', 'u', 'y', 'ee', 'ea', 'oa', 'oo', 'ou',
  ];

  let word = '';
  let prevIsVowel = random.boolean();

  while (word.length < len) {
    if (prevIsVowel) {
      word += (word.length === 0) ? random.item(CONSONANTS_INIT) : random.item(CONSONANTS);
    } else {
      word += random.item(VOWELS);
    }
    prevIsVowel = !prevIsVowel;
  }

  return word.slice(0, len);
}
