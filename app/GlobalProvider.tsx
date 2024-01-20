import React, { ReactNode } from "react";
import { Toaster } from 'react-hot-toast';
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return <>
  <Toaster/>
  {children}
  </>;
};
