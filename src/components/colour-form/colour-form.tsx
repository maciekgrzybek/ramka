import { HexColour } from '../../types';
import { debounce } from 'lodash';
import { useStore } from '../../store/store.context';
import { ColourInput } from './colour-input';

import { useId } from 'react';
import { useAnalyticsAction } from '../../use-analytics';

export const ColourForm = () => {
  const { state, updateColour } = useStore();
  const id = useId();
  const trackEvent = useAnalyticsAction('colour');

  const handleUpdate = (newColour: HexColour, index: number) => {
    const newColours = state.colours.map((prevColour, i) =>
      i === index ? newColour : prevColour
    );
    updateColour(newColours);
  };

  const debouncedUpdate = debounce(handleUpdate, 300);

  return (
    <fieldset>
      <label htmlFor={id} className="text-sm mb-2">
        Colors
      </label>
      <div className="flex gap-2">
        {state.colours.map((colour, index) => {
          return (
            <div key={index} className="">
              <ColourInput
                colour={colour}
                handleChange={(e) => {
                  trackEvent('select_colour');
                  return debouncedUpdate(e.target.value as HexColour, index);
                }}
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};
