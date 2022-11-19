import { HexColour } from '../../types';
import { debounce } from 'lodash';
import { useStore } from '../../store/store.context';
import { ColourInput } from '../colour-input/colour-input';
import { Label } from '../label/labelt';

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
      <Label>Gradient colors</Label>
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
