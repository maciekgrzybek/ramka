import clsx from 'clsx';
import { ButtonHTMLAttributes, HTMLProps, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

export const Button = ({ children, variant = 'primary', ...rest }: Props) => {
  const classNames = {
    primary:
      'bg-primary-brand-800 text-primary-brand-100 hover:bg-primary-brand-900',
    secondary:
      'bg-white text-primary-brand-800 hover:bg-primary-brand-100 border border-primary-brand-600',
  };

  return (
    <button
      className={clsx(
        'rounded-full py-2 px-5 md:px-5 ease-in duration-75',
        classNames[variant]
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};
