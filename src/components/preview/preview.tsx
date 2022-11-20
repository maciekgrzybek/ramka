import { getGradientCanvas, getRoundedCanvas } from '../../utils/canvas-utils';

import { useMemo } from 'react';
import { useSaveToFile } from '../../hooks/use-save-to-file';
import { useStore } from '../../store/store.context';
import { Button } from '../button/button';

type Props = {
  croppedImageData: HTMLCanvasElement;
};

export const Preview = ({ croppedImageData }: Props) => {
  const {
    state: { colours, text, textColour },
  } = useStore();

  const canvasSrc = useMemo(
    () => getRoundedCanvas(croppedImageData)?.toDataURL(),
    [croppedImageData]
  );
  const gradientSrc = useMemo(
    () => getGradientCanvas(colours)?.toDataURL(),
    [croppedImageData, colours]
  );

  const { canvasRef, downloadImage } = useSaveToFile(text);

  return (
    <div className="flex flex-wrap items-center flex-col w-full max-w-[300px] mx-auto lg:h-full">
      <div
        className="relative w-full max-w-[300px] rounded-full overflow-hidden mb-6"
        ref={canvasRef}
      >
        <div className="absolute w-full h-full flex items-end z-20 tracking-widest">
          <svg
            viewBox="0 0 380 380"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width="100%"
            height="100%"
          >
            <path
              d="M150 0C67.157 0 0 67.157 0 150c0 82.787 67.213 150 150 150 82.843 0 150-67.157 150-150"
              fill="none"
              id="curve"
              transform="translate(40 40)"
            />
            <text startOffset="50%">
              <textPath
                alignmentBaseline="middle"
                xlinkHref="#curve"
                fontSize="2rem"
                startOffset="50%"
                textAnchor="middle"
                fill={textColour}
              >
                {text}
              </textPath>
            </text>
          </svg>
        </div>

        <img src={canvasSrc} className="w-full -z-10" />
        <img src={gradientSrc} className="absolute z-10 top-px" />
      </div>
      <Button onClick={downloadImage} fullWidth>
        Save image
      </Button>
    </div>
  );
};
