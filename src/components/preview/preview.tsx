import { getGradientCanvas, getRoundedCanvas } from '../../utils/canvas-utils';
import { useMemo } from 'react';
import { useStore } from '../../store/store.context';
import clsx from 'clsx';

type Props = {
  croppedImageData: HTMLCanvasElement;
  canvasRef: React.RefObject<HTMLDivElement>;
};

const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

export const Preview = ({ croppedImageData, canvasRef }: Props) => {
  const {
    state: { colours, text, textColour, isUppercase },
  } = useStore();

  const canvasSrc = useMemo(
    () => getRoundedCanvas(croppedImageData)?.toDataURL(),
    [croppedImageData]
  );
  const gradientSrc = useMemo(
    () => getGradientCanvas(colours)?.toDataURL(),
    [croppedImageData, colours]
  );

  return (
    <div className="flex flex-wrap items-center flex-col w-full max-w-[200px] mx-auto md:mx-0 lg:h-full">
      <div
        className="relative w-full max-w-[200px] rounded-full overflow-hidden mb-6 md:mb-0"
        ref={canvasRef}
      >
        <div
          className={clsx(
            'absolute w-full h-full flex items-end z-20 tracking-widest',
            { uppercase: isUppercase }
          )}
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width="100%"
            height="100%"
          >
            <path
              d="M86.359.935C36.869 7.749 0 50.043 0 100c0 55.192 44.808 100 100 100 49.957 0 92.251-36.869 99.065-86.359"
              fill="none"
              id="curve"
              transform={
                isFirefox
                  ? 'matrix(.90725 0 0 .90725 9.231 9.318)'
                  : 'matrix(.85653 0 0 .85653 14.28 14.414)'
              }
            />
            <text startOffset="50%" fontFamily="Arial" fontWeight="bold">
              <textPath
                alignmentBaseline="middle"
                xlinkHref="#curve"
                fontSize="1.05rem"
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
    </div>
  );
};
