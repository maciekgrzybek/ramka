import { HexColour, RgbaColour } from '../types';
import { hexToRgb, rgbToRgba } from './colour-utils';

type AddColoursToGradientArguments = {
  endingPoint: number;
  startingPoint: number;
  stepColours: string[];
  gradient: CanvasGradient;
  reversed?: boolean;
};

/**
 * Modifies canvas data coming from the cropper tool to a rounded canvas
 * @function
 */
export const getRoundedCanvas = (sourceCanvas: HTMLCanvasElement) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const { width, height } = sourceCanvas;

  if (!context) return;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-atop';
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();

  return canvas;
};

/**
 * Generates an array of RGBA colours to create a gradient
 * @function
 */
const getGradientStepColours = (hex: HexColour): RgbaColour[] =>
  new Array(15)
    .fill(null)
    .map((_, i) => rgbToRgba({ ...hexToRgb(hex), opacity: i / 10 }));

/**
 * Places the gradient on the rounded canvas
 * @function
 */
const addColoursToGradient = ({
  endingPoint,
  startingPoint,
  stepColours,
  gradient,
  reversed,
}: AddColoursToGradientArguments) => {
  const positionFactor = (endingPoint - startingPoint) / stepColours.length;
  const colours = !reversed ? stepColours : [...stepColours].reverse();

  colours.forEach((colourInRgba, i) => {
    const position = startingPoint + i * positionFactor;

    gradient.addColorStop(position, colourInRgba);
  });
};

/**
 * Creates a canvas with the colour gradients
 * @function
 */
export const getGradientCanvas = (colours: HexColour[]) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const lineWidth = 100;
  const width = lineWidth * 5;
  const height = lineWidth * 5;

  if (!context) return null;

  const gradient = context.createConicGradient(
    -Math.PI / 4,
    height / 2,
    width / 2
  );

  addColoursToGradient({
    endingPoint: 0.4,
    startingPoint: 0.2,
    stepColours: getGradientStepColours(colours[1]),
    gradient,
  });

  addColoursToGradient({
    endingPoint: 0.77,
    startingPoint: 0.55,
    stepColours: getGradientStepColours(colours[0]),
    gradient,
    reversed: true,
  });

  canvas.width = width;
  canvas.height = height;
  context.lineCap = 'butt';
  context.lineWidth = lineWidth;

  context.moveTo(0, height / 2);
  context.beginPath();

  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2 - lineWidth / 2,
    Math.PI * 1.8,
    Math.PI / 11,
    true
  );

  context.strokeStyle = gradient;

  context.stroke();

  return canvas;
};
