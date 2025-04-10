import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { isDartheme, darkTheme, lightTheme } from "./Uitls/ThemeChecker.js";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={isDartheme.matches ? darkTheme : lightTheme}>
      <CssBaseline />
      <NotificationsProvider
        slotProps={{
          snackbar: {
            anchorOrigin: { vertical: "top", horizontal: "center" },
            sx: {
              maxWidth: 500, 
              mx: "auto",
            },
          },
        }}
      >
        <App />
      </NotificationsProvider>
    </ThemeProvider>
  </StrictMode>
);
