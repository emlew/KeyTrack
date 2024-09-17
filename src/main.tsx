import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app";
import { CssBaseline, theme, ThemeProvider } from "./styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
