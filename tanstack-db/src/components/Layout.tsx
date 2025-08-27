import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <div className="grid grid-rows-[auto_1fr] ">{children}</div>;
};
