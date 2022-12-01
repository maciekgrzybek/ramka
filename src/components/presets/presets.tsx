import { useStore } from '../../store/store.context';
import { HexColour } from '../../types';

import { CgColorPicker } from 'react-icons/cg';
import { offset } from '@floating-ui/react-dom';
import { useState } from 'react';
import {
  useDismiss,
  useInteractions,
  useFloating,
  FloatingPortal,
  useClick,
  useListNavigation,
  autoPlacement,
} from '@floating-ui/react-dom-interactions';

type Preset = {
  text: string;
  colours: HexColour[];
};

const presets: Preset[] = [
  { text: 'Freelance Web Developer', colours: ['#85FFBD', '#FFFB7D'] },
  { text: 'I HATE MONDAYS', colours: ['#0093E9', '#80D0C7'] },
  { text: '#Not Looking For Job', colours: ['#F4D03F', '#16A085'] },
  { text: 'Marketing Queen', colours: ['#FAD961', '#F76B1C'] },
];

export const Presets = () => {
  const { setPreset } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [offset(5), autoPlacement()],
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
  });
  const click = useClick(context, {});
  const listNavigation = useListNavigation(context);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, click, listNavigation]
  );

  const changePreset = (preset: Preset) => {
    setPreset(preset.colours, preset.text);
  };

  return (
    <div>
      <button ref={reference} {...getReferenceProps()}>
        <span className="grid items-center px-2 py-[6px] rounded-full border border-primary-brand-600 bg-white grid-cols-[min-content_1fr] gap-2 text-sm cursor-pointer hover:shadow-md">
          <CgColorPicker /> Presets
        </span>
      </button>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
            }}
            {...getFloatingProps()}
          >
            <ul className="divide-y flex flex-col text-sm top-full bg-white rounded-md border border-primary-brand-600 shadow-lg shadow-primary-brand-200 overflow-hidden">
              {presets.map((preset) => (
                <li key={preset.text} className="flex items-center ">
                  <button
                    className="flex items-center  px-3 py-2 hover:bg-primary-brand-100 gap-px w-full"
                    onClick={() => changePreset(preset)}
                  >
                    <>
                      {preset.colours.map((colour) => (
                        <span
                          key={`${colour}-${preset.text}`}
                          className="w-3 h-3 rounded-full block"
                          style={{ backgroundColor: colour }}
                        />
                      ))}
                      <span className="ml-2">{preset.text}</span>
                    </>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </FloatingPortal>
    </div>
  );
};
