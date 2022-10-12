import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <div className="max-w-6xl my-0 mx-auto">{children}</div>;
};
