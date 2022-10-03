import {
  getGradientCanvas,
  getRoundedCanvas,
} from '../../utils/getRoundedCanvas';

import { useMemo, useState } from 'react';
import { HexColour } from '../../types';
import { exportAsImage } from '../../utils/saveToFile';
import { useSaveToFile } from '../../hooks/useSaveToFile';

export default exportAsImage;

type Props = {
  croppedImageData: HTMLCanvasElement;
  colours: HexColour[];
};

export const Frames = ({ croppedImageData, colours }: Props) => {
  const canvasSrc = useMemo(
    () => getRoundedCanvas(croppedImageData)?.toDataURL(),
    [croppedImageData]
  );
  const gradientSrc = useMemo(
    () => getGradientCanvas(colours)?.toDataURL(),
    [croppedImageData, colours]
  );

  const [text, setText] = useState('# not looking for job');

  const { canvasRef, canDownloadImage, downloadImage } = useSaveToFile();

  return (
    <div className="flex flex-wrap">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />

      {canDownloadImage && <button onClick={downloadImage}>dawaj</button>}
      <div
        className="relative w-80 rounded-full overflow-hidden"
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
              >
                {text}
              </textPath>
            </text>
          </svg>
        </div>

        <img src={canvasSrc} alt="siema" className="w-full -z-10" />
        <img src={gradientSrc} alt="siema" className="absolute z-10 top-0" />
      </div>
    </div>
  );
};
