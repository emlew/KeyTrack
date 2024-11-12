import { Modal } from "../Modal";
import { Typography } from "@mui/material";
import { Hour } from "@/api";
import { useModal } from "@/hooks";

type ModalProps = {
  approved: Hour[];
  denied: Hour[];
  onSave: () => void;
};

export const ApproveHoursModal: React.FC<ModalProps> = ({
  approved,
  denied,
  onSave,
}) => {
  const { closeModal } = useModal();

  const approvedHours = approved.length > 0 ? approved
    .map((h) => h.hours)
    .reduce((prev, h) => h + prev) : 0;
  const deniedHours = denied.length > 0 ? denied.map((h) => h.hours).reduce((prev, h) => h + prev): 0;

  const handleSave = () => {
    onSave();
    closeModal();
  };

  return (
    <Modal
      title="Confirm Changes"
      confirmButtonText="Confirm changes"
      onConfirm={handleSave}
    >
      <Typography>
        {"Are you sure you want to approve " +
          approvedHours.toString() +
          " hours and deny " +
          deniedHours.toString() +
          " hours?"}
      </Typography>
    </Modal>
  );
};

export default ApproveHoursModal;
