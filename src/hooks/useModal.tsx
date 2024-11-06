import { atom, useAtom } from "jotai";
import { ReactNode } from "react";

const modalAtom = atom<ReactNode | undefined>(undefined);

export const useModal = () => {
  const [modal, setModal] = useAtom(modalAtom);

  const openModal = (modal: ReactNode) => {
    setModal(modal);
  };

  const closeModal = () => {
    setModal(undefined);
  };

  return { modal, openModal, closeModal };
};
