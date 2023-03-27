import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    common: {},
    primary: {
      main: "#3A3A3A", //home page bg color
    },
    secondary: {
      main: "#FFFFFF", //secondary color #25cfbc
    },
  },
  typography: {
    carsverify: {
      fontSize: "1.5rem",
      fontFamily: "Roboto",
      color: "black",
    },
    mainHeading: {
      fontFamily: ["Quicksand", "Oxygen"],
      fontWeight: "bold",
    },
    homepageText: {
      fontFamily: ["Quicksand", "Oxygen"],
    },
    button: {
      fontFamily: "Roboto",
      fontWeight: 300,
      textTransform: "none",
    },
  },
});
