import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { initAccent } from "@/features/settings/hooks/useAccentTheme";

initAccent();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      {/* Without a mounted Toaster every toast.error()/toast.success() call is silently dropped. */}
      <Toaster position="top-center" closeButton />
    </ThemeProvider>
  </React.StrictMode>
);
