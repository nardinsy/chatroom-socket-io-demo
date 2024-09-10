import { ReactElement, ReactNode } from "react";

export type HasChildren = {
  children: ReactNode | ReactNode[];
};
export type WithChildren<T> = T & HasChildren;

// type x = WithChildren<{}>;

// const x: { name: string } = { name: "Nardin" };
