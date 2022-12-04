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
        className="grid items-center p-[6px] rounded-full border border-primary-brand-600 bg-white grid-cols-[min-content_min-content_1fr] gap-2 pr-3 cursor-pointer hover:shadow-md"
      >
        <input
          type="color"
          value={colour}
          onChange={handleChange}
          className="sr-only peer"
          id={id}
        />
        <span
          className="w-5 h-5 flex p-2 rounded-full cursor-pointer focus:outline-none"
          style={{ backgroundColor: colour }}
        ></span>
        <span className="h-5 w-px bg-primary-brand-600" />
        <span className="text-sm uppercase">{colour}</span>
      </label>
    </>
  );
};
