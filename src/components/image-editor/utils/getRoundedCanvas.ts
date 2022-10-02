import { HexColour, RgbColour } from '../types';

type AddColoursToGradientArguments = {
  endingPoint: number;
  startingPoint: number;
  stepColours: string[];
  gradient: CanvasGradient;
  reversed?: boolean;
};

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

const hexToRgb = (hex: HexColour): RgbColour => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('You need to pass a valid hex colour');

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

const rgbaToRgba = ({ r, g, b, opacity }: RgbColour & { opacity: number }) =>
  `rgba(${r}, ${g}, ${b}, ${opacity})`;

const getGradientStepColours = (hex: HexColour) =>
  new Array(15)
    .fill(null)
    .map((_, i) => rgbaToRgba({ ...hexToRgb(hex), opacity: i / 10 }));

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
    stepColours: getGradientStepColours(colours[0]),
    gradient,
  });

  addColoursToGradient({
    endingPoint: 0.77,
    startingPoint: 0.55,
    stepColours: getGradientStepColours(colours[1]),
    gradient,
    reversed: true,
  });

  // Create a polyline path
  // Note: Nothing visually appears during this process
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

  // Set the stroke style to be the gradient
  // Note: Nothing visually appears during this process
  context.strokeStyle = gradient;

  // stroke the path
  // FINALLY! The gradient-stroked path is visible on the canvas
  context.stroke();

  return canvas;
};
