import { Snackbar } from "@/components";
import { atom, useAtom } from "jotai";
import { ReactNode } from "react";

const snackbarAtom = atom<ReactNode | undefined>(undefined);

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);

  const addSnackbar = (message: string) => {
    setSnackbar(<Snackbar message={message} />);
  };

  const removeSnackbar = () => {
    setSnackbar(undefined);
  };

  return { snackbar, addSnackbar, removeSnackbar };
};
