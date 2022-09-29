import { HexColour } from '../../types';
import { debounce } from 'lodash';
import { Dispatch, SetStateAction, useCallback } from 'react';

type Props = {
  colours: HexColour[];
  setColours: Dispatch<SetStateAction<HexColour[]>>;
};

export const ColourForm = ({ colours, setColours }: Props) => {
  const updateColour = (value: HexColour, index: number) => {
    setColours((prevColours) => {
      const newState = prevColours.map((prevColour, i) => {
        if (i === index) {
          return value;
        }
        return prevColour;
      });

      return newState;
    });
  };

  const debounced = useCallback(debounce(updateColour, 30), []);
  
  return (
    <>
      {colours.map((colour, index) => {
        return (
          <div key={index}>
            <input
              type="color"
              id="first-colour"
              name="First colour"
              value={colour}
              onChange={(e) => debounced(e.target.value as HexColour, index)}
            />
            <label htmlFor="first-colour">Select First Colour</label>
          </div>
        );
      })}
    </>
  );
};
