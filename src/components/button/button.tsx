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
    primary: 'bg-primary-brand-900 text-white hover:bg-primary-brand-800',
    secondary:
      'bg-primary-brand-500 text-primary-brand-900 hover:bg-primary-brand-200',
  };

  return (
    <button
      className={clsx(
        'rounded-full py-2 px-4 md:px-8 ease-in duration-75',
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
