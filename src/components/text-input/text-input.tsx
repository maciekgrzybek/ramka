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
        className="w-full rounded-full border border-gray-100 bg-white py-2 px-4 md:px-8 text-base font-small text-black-brand-100 outline-none focus:border-primary-brand-500 focus:shadow-md"
        onChange={handleChange}
        type="text"
        id={id}
      />
    </>
  );
};
