import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export const Button = ({ children, variant = 'primary' }: Props) => {
  const classNames = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-blue-100 text-blue-600 hover:bg-blue-100',
  };
  return (
    <button
      className={`w-full rounded-full py-2 px-4 ease-in duration-75 ${classNames[variant]}}`}
    >
      {children}
    </button>
  );
};
