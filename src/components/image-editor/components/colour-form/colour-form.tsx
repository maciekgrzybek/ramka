import { HexColour } from '../../../../types';
import { debounce } from 'lodash';
import { useStore } from '../../../../store/store.context';
import { ColourInput } from '../../../colour-input/colour-input';

export const ColourForm = () => {
  const { state, updateColour } = useStore();

  const handleUpdate = (newColour: HexColour, index: number) => {
    const newColours = state.colours.map((prevColour, i) =>
      i === index ? newColour : prevColour
    );
    updateColour(newColours);
  };

  const debouncedUpdate = debounce(handleUpdate, 300);

  return (
    <fieldset>
      <legend className="mb-1 block text-base font-small text-gray-600">
        Gradient colors
      </legend>
      <div className="flex">
        {state.colours.map((colour, index) => {
          return (
            <div key={index} className="relative w-10 h-10">
              <ColourInput
                colour={colour}
                handleChange={(e) =>
                  debouncedUpdate(e.target.value as HexColour, index)
                }
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};
