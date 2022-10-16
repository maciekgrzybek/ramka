import { HexColour } from '../../types';
import { debounce } from 'lodash';
import { useStore } from '../../../../store.context';

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
    <>
      {state.colours.map((colour, index) => {
        return (
          <div key={index}>
            <input
              type="color"
              id="first-colour"
              name="First colour"
              value={colour}
              onChange={(e) =>
                debouncedUpdate(e.target.value as HexColour, index)
              }
            />
            <label htmlFor="first-colour">Select First Colour</label>
          </div>
        );
      })}
    </>
  );
};
