import freelanceWebDeveloper from '@frames/freelance-web-developer.png';
import iLoveMondays from '@frames/i-love-mondays.png';
import iLoveMyJob from '@frames/i-love-my-job.png';
import marketingExpert from '@frames/marketing-expert.png';
import marketingQueen from '@frames/marketing-queen.png';
import pleaseHireMe from '@frames/please-hire-me.png';
import stopMessagingMe from '@frames/stop-messaging-me.png';

import { getRoundedCanvas } from '../../utils/getRoundedCanvas';

import type { ImageFrame } from '../../types';
import { RefObject } from 'react';

type FrameConfig = {
  imageData: StaticImageData;
};

const framesList: Record<ImageFrame, FrameConfig> = {
  'freelance-web-developer': {
    imageData: freelanceWebDeveloper,
  },
  'i-love-mondays': {
    imageData: iLoveMondays,
  },
  'i-love-my-job': {
    imageData: iLoveMyJob,
  },
  'marketing-expert': {
    imageData: marketingExpert,
  },
  'marketing-queen': {
    imageData: marketingQueen,
  },
  'please-hire-me': {
    imageData: pleaseHireMe,
  },
  'stop-messaging-me': {
    imageData: stopMessagingMe,
  },
};

type Props = {
  croppedImageData: HTMLCanvasElement;
  refs: Record<ImageFrame, RefObject<HTMLImageElement>>;
  onFrameSelect: (frame: ImageFrame) => void;
};

export const Frames = ({ croppedImageData, refs, onFrameSelect }: Props) => {
  const canvasSrc = getRoundedCanvas(croppedImageData)?.toDataURL();

  return (
    <div className="flex flex-wrap">
      <div className="relative w-52 mr-4">
        {/* <img
              ref={refs[typedName]}
              src={image.imageData.src}
              alt="siema"
              className="absolute inset-0 w-full z-10"
            /> */}
        <img src={canvasSrc} alt="siema" className="w-full -z-10" />
        {/* <button onClick={() => onFrameSelect(typedName)}>Select this</button> */}
      </div>
    </div>
  );
};
