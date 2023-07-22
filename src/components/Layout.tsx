import { Stack, Box, useMediaQuery, Theme } from "@mui/material";
import React, { useEffect } from "react";
import { Header, Loader, Sidebar } from ".";
import { getAllExpenses, getUsers } from "../api";
import { Actions } from "../model";
import { useStore } from "../Providers";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [, dispatch] = useStore();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    setLoading(true);
    getAllExpenses()
      .then(({ months }) =>
        dispatch({ type: Actions.MONTHLY_EXPENSES, payload: months })
      )
      .then(() => getUsers())
      .then((users) => dispatch({ type: Actions.SET_USER, payload: users }))
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
        {loading ? <Loader /> : null}
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
