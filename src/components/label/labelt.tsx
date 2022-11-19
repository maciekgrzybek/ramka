import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Label = ({ children }: Props) => (
  <legend className="mb-2 block text-base font-small md:text-lg text-black-brand-300 font-semibold">
    {children}
  </legend>
);
