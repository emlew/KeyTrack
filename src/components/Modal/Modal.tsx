import { ReactNode } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { useModal } from "@/hooks";
import { StyledButtonBox, StyledContent } from "./Modal.styles";

type ModalProps = {
  title: string;
  confirmButtonText?: string;
  onConfirm?: () => void;
  children?: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onConfirm,
  confirmButtonText = "save",
}) => {
  const { closeModal } = useModal();

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>{title}</DialogTitle>
      <StyledContent>{children}</StyledContent>
      <StyledButtonBox>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained">
          {confirmButtonText}
        </Button>
      </StyledButtonBox>
    </Dialog>
  );
};

export default Modal;
