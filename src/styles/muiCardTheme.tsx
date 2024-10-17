import { Components, Theme } from "@mui/material";

export const MuiCard: Components<Theme>["MuiCard"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: "4px",
      border: `1px solid ${theme.palette.primary[800]}`,
      boxShadow: "none",
      display: "inline-flex",
      padding: "40px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "20px",
    }),
  },
};
