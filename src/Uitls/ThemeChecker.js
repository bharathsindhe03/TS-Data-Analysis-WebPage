import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const isDartheme = window.matchMedia("(prefers-color-scheme: dark)");

export { isDartheme, darkTheme, lightTheme };
