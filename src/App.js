import logo from "./logo.svg";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Answers from "./components/Answers";
import { theme } from "./commons/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Answers />
    </ThemeProvider>
  );
}

export default App;
