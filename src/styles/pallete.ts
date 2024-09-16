import { PaletteOptions } from "@mui/material";

const colors = {
  black: "#003366",
  white: "#FFFFFF",

  primary50: "#CFD8FF",
  primary100: "#A5C3FA",
  primary200: "#8DA6E1",
  primary300: "#6E8CCA",
  primary400: "#5A7AB9",
  primary500: "#4066A7",
  primary600: "#2D5895",
  primary700: "#17457D",
  primary800: "#003366",
  primary900: "#00204D",
};

export const palette: PaletteOptions = {
  common: {
    black: colors.black,
    white: colors.white,
  },
  background: { default: colors.white },
  primary: {
    main: colors.primary500,
    light: colors.primary300,
    dark: colors.primary700,
    "900": colors.primary900,
    "800": colors.primary800,
    "700": colors.primary700,
    "600": colors.primary600,
    "500": colors.primary500,
    "400": colors.primary400,
    "300": colors.primary300,
    "200": colors.primary200,
    "100": colors.primary100,
    "50": colors.primary50,
  },
  text: {
    primary: colors.primary800,
  },
};
