import { HexColour } from '../../types';
import { debounce } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useStore } from '../../../../store.context';
import { useDebounce } from 'rooks';

export const ColourForm = () => {
  const { state, updateColour } = useStore();
  const debouncedUpdateColour = useDebounce(updateColour, 0);

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
                debouncedUpdateColour(e.target.value as HexColour, index)
              }
            />
            <label htmlFor="first-colour">Select First Colour</label>
          </div>
        );
      })}
    </>
  );
};
