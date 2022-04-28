export const getRoundedCanvas = (
  sourceCanvas: HTMLCanvasElement,
  frameCanvas?: HTMLImageElement | null
) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const { width, height } = sourceCanvas;

  if (!context) return;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
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

  if (frameCanvas) {
    context.globalCompositeOperation = 'source-over';
    context.drawImage(frameCanvas, 0, 0, width, height);
  }

  return canvas;
};
