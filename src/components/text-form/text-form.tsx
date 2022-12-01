import { useId } from 'react';
import { useStore } from '../../store/store.context';
import { HexColour } from '../../types';
import { ColourInput } from '../colour-input/colour-input';

export const TextForm = () => {
  const { state, changeText, changeTextColour } = useStore();
  const textInputId = useId();
  const colorInputId = useId();
  
  return (
    <fieldset>
      <legend className="mb-3 block text-xl md:text-lg text-black-brand-300 font-semibold">
        Your frame text and color
      </legend>
      <label htmlFor={textInputId} className="text-sm mb-1 flex">
        Text
      </label>
      <div className="flex items-center relative">
        <div className="mr-3 w-full">
          <input
            value={state.text}
            className="w-full rounded-full border border-primary-brand-600 bg-white py-1 px-4 pr-10 text-base font-small text-black-brand-100 outline-none focus:border-primary-brand-500 focus:shadow-md focus:text-black-brand-300"
            onChange={(e) => changeText(e.target.value)}
            type="text"
            id={textInputId}
          />
        </div>
        <span className="absolute h-5 w-px bg-primary-brand-600 top-1/2 right-12 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-5 h-5 top-1/2 right-3 transform -translate-x-1/2 -translate-y-1/2">
          <label
            htmlFor={colorInputId}
            className={`absolute top-0 left-0 w-5 h-5 flex p-2 rounded-full cursor-pointer focus:outline-none`}
            style={{ backgroundColor: state.textColour }}
          />
          <input
            type="color"
            value={state.textColour}
            onChange={(e) => changeTextColour(e.target.value as HexColour)}
            className="sr-only peer"
            id={colorInputId}
          />
        </div>
      </div>
    </fieldset>
  );
};
