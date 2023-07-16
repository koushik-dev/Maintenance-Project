import { Stack, Box, useMediaQuery, Theme } from "@mui/material";
import React, { useEffect } from "react";
import { Header, Loader, Sidebar } from ".";
import { getAllExpenses } from "../api";
import { Actions } from "../model";
import { useStore } from "../Providers";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(0);
  const [, dispatch] = useStore();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    setLoading(2);
    getAllExpenses().then(({ months }) => {
      dispatch({ type: Actions.MONTHLY_EXPENSES, payload: months });
      setLoading((load) => load - 1);
    });
    setLoading(0);
  }, []);

  return (
    <Box
      display="flex"
      height="100%"
      className="bg-slate-100 flex overflow-y-scroll"
    >
      <Header />
      <Sidebar />
      <Stack flex={1} mt={matches ? 8 : 6} p={matches ? 3 : 1}>
        {loading > 0 ? <Loader /> : null}
        <Box
          className="bg-white rounded"
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
};
