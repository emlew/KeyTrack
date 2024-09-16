import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app";
import { CssBaseline, theme, ThemeProvider } from "./styles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> <App />
    </ThemeProvider>
  </StrictMode>
);
