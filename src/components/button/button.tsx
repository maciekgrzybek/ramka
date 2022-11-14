import clsx from 'clsx';
import { ButtonHTMLAttributes, HTMLProps, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  ...rest
}: Props) => {
  const classNames = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
  };

  return (
    <button
      className={clsx(
        'rounded-full py-2 px-4 ease-in duration-75',
        classNames[variant],
        { 'w-full': fullWidth }
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};
