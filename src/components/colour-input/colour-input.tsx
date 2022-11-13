import { useId } from 'react';
import { HexColour } from '../../types';

type Props = {
  colour: HexColour;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ColourInput = ({ colour, handleChange }: Props) => {
  const id = useId();
  return (
    <>
      <label
        htmlFor={id}
        className={`absolute top-0 left-0 w-8 h-8 flex p-2 border-2 border-gray-400 rounded-full cursor-pointer focus:outline-none`}
        style={{ backgroundColor: colour }}
      />
      <input
        type="color"
        value={colour}
        onChange={handleChange}
        className="sr-only peer"
        id={id}
      />
    </>
  );
};
