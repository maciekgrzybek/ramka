import clsx from 'clsx';
import { ChangeEvent, useId } from 'react';
import { useStore } from '../../store/store.context';
import { HexColour } from '../../types';
import { useAnalyticsAction } from '../../use-analytics';

export const TextForm = () => {
  const { state, changeText, changeTextColour, changeTextUppercase } =
    useStore();
  const trackEvent = useAnalyticsAction('text');
  const textInputId = useId();
  const colorInputId = useId();

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeText(event.target.value);
  };

  const handleTextFocus = () => {
    trackEvent('change_text');
  };

  const handleTextColourChange = (event: ChangeEvent<HTMLInputElement>) => {
    trackEvent('change_text_colour');
    changeTextColour(event.target.value as HexColour);
  };

  const handleTextUppercaseChange = () => {
    return changeTextUppercase(!state.isUppercase);
  };

  return (
    <fieldset>
      <legend className="mb-3 block text-xl md:text-lg text-black-brand-300 font-semibold">
        Your frame text and color
      </legend>
      <div className="mb-2 flex items-center text-sm gap-y-2 justify-between">
        <label htmlFor={textInputId}>Text</label>
        <label className="flex cursor-pointer items-center group">
          <div className="bg-white shadow rounded-full w-4 h-4 p-1 flex justify-center items-center mr-2 group-hover:shadow-md">
            <input
              type="checkbox"
              className="hidden"
              checked={state.isUppercase}
              onChange={handleTextUppercaseChange}
            />
            {state.isUppercase && (
              <svg viewBox="0 0 160 160">
                <g
                  fill="none"
                  strokeWidth="none"
                  strokeMiterlimit={10}
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: 'normal' }}
                >
                  <path d="M0 172V0h172v172z" />
                  <path
                    d="M145.433 37.933 64.5 118.866 33.734 88.1 23.6 98.234l40.9 40.9 91.067-91.067z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            )}
          </div>
          <span className="select-none">Uppercase</span>
        </label>
      </div>
      <div className="flex items-center relative">
        <div className="w-full">
          <input
            value={state.text}
            className={clsx(
              'w-full rounded-full border border-primary-brand-600 bg-white py-1 px-4 pr-10 text-base font-small text-black-brand-100 outline-none focus:border-primary-brand-500 focus:shadow-md focus:text-black-brand-300',
              {
                uppercase: state.isUppercase,
              }
            )}
            onChange={handleTextChange}
            onFocus={handleTextFocus}
            type="text"
            id={textInputId}
          />
        </div>
        <span className="absolute h-5 w-px bg-primary-brand-600 top-1/2 right-12 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-5 h-5 top-1/2 right-3 transform -translate-x-1/2 -translate-y-1/2">
          <label
            htmlFor={colorInputId}
            className={`absolute top-0 left-0 w-5 h-5 flex p-2 rounded-full cursor-pointer focus:outline-none border border-primary-brand-600`}
            style={{ backgroundColor: state.textColour }}
          />
          <input
            type="color"
            value={state.textColour}
            onChange={handleTextColourChange}
            className="sr-only peer"
            id={colorInputId}
          />
        </div>
      </div>
    </fieldset>
  );
};
