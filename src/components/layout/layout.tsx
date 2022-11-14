import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <div className="my-0 mx-auto">{children}</div>;
};
