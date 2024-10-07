import { atom, useAtom } from "jotai";
import { ReactNode } from "react";

const drawerAtom = atom<ReactNode | undefined>(undefined);

export const useDrawer = () => {
  const [drawer, setDrawer] = useAtom(drawerAtom);

  const openDrawer = (drawer: ReactNode) => {
    setDrawer(drawer);
  };

  const closeDrawer = () => {
    setDrawer(undefined);
  };

  return { drawer, openDrawer, closeDrawer };
};
