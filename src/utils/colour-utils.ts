import { HexColour, RgbaColour, RgbColour } from '../types';

/**
 * Changes hex to RGB
 * @function
 * @param {string}
 * @returns {string}
 */
export const hexToRgb = (hex: HexColour): RgbColour => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('You need to pass a valid hex colour');

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

/**
 * Changes RGB to RGBA
 * @function
 * @param {string}
 * @returns {string}
 */
export const rgbToRgba = ({
  r,
  g,
  b,
  opacity,
}: RgbColour & { opacity: number }): RgbaColour =>
  `rgba(${r}, ${g}, ${b}, ${opacity})`;
