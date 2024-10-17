import { createTheme } from "@mui/material/styles";
import { palette } from "./pallete";
import { MuiCard } from "./muiCardTheme";

const theme = createTheme({
  palette,
  components: {
    MuiCard,
  },
});

export default theme;
