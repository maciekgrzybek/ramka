import { HexColour } from '../types';

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

const hexToRgb = (hex: HexColour) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('You need to pass an actual hex colour');

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const parseToRgba = (hex: HexColour) => {
  const rgb = hexToRgb(hex);

  if (!rgb) return 'something';

  const { r, g, b } = rgb;
  return `rgba(${r}, ${g}, ${b}, 1)`;
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
  gradient.addColorStop(0, 'transparent');
  // gradient.addColorStop(0.3, 'rgb(255,0,0, 0.05)');
  gradient.addColorStop(0.35, parseToRgba(colours[0]));
  gradient.addColorStop(0.55, parseToRgba(colours[1]));
  // gradient.addColorStop(0.6, 'rgb(255,0,150, 0.05)');
  gradient.addColorStop(1, 'transparent');

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
    Math.PI * 1.1,
    Math.PI / 3,
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
