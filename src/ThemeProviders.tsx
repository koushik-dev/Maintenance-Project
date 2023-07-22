import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              //backgroundColor: "#8757d1",
              ":hover": {
                // backgroundColor: "#9b80c4",
              },
            }),
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "primary" &&
            {
              // borderColor: "#8757d1",
              // color: "#8757d1",
            }),
        }),
      },
    },
    MuiFab: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary" && {
            backgroundColor: "#8757d1",
            ":hover": {
              backgroundColor: "#9b80c4",
            },
          }),
        }),
      },
    },
  },
});

const Themes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>{children}</ThemeProvider>
  );
};

export default Themes;
