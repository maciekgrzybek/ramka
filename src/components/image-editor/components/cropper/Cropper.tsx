import { useRef } from 'react';
import ReactCropper, { ReactCropperElement } from 'react-cropper';
import { debounce } from 'lodash';

import 'cropperjs/dist/cropper.css';

type Props = {
  imageData: string;
  setCroppedImageData: (data: HTMLCanvasElement) => void;
};

export const Cropper = ({ imageData, setCroppedImageData }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = () => {
    if (cropperRef.current) {
      const { cropper } = cropperRef.current;
      const croppedCanvas = cropper?.getCroppedCanvas();
      setCroppedImageData(croppedCanvas);
    }
  };

  return (
    <ReactCropper
      src={imageData}
      initialAspectRatio={1}
      aspectRatio={1}
      style={{ height: 300, width: '100%' }}
      guides={false}
      ref={cropperRef}
      viewMode={1}
      crop={debounce(onCrop, 300)}
    />
  );
};
