import { useId } from 'react';

type Props = {
  text: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hideLabel?: boolean;
};

export const TextInput = ({ text, label, handleChange, hideLabel }: Props) => {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : ''}>
        {label}
      </label>
      <input
        value={text}
        className="w-full rounded-md border border-gray-100 bg-white py-2 px-4 text-base font-small text-black outline-none focus:border-blue-900 focus:shadow-md"
        onChange={handleChange}
        type="text"
        id={id}
      />
    </>
  );
};
