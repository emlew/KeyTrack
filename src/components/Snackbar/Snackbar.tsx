import { useSnackbar } from "@/hooks";
import { Snackbar as MuiSnackbar } from "@mui/material";

export const Snackbar: React.FC<{ message: string }> = ({ message }) => {
  const { removeSnackbar } = useSnackbar();

  return (
    <MuiSnackbar
      open={true}
      onClose={removeSnackbar}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
};

export default Snackbar;
