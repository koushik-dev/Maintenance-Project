import { Stack, Box, useMediaQuery, Theme } from "@mui/material";
import React, { useEffect } from "react";
import { Header, Loader, MobileNavigation, Sidebar } from ".";
import { getAllExpenses, getUsers } from "../api";
import { useAuth } from "../hooks";
import { Actions } from "../model";
import { useStore } from "../Providers";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [, dispatch] = useStore();
  const { user, isAdmin } = useAuth();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    setLoading(true);
    getAllExpenses()
      .then(({ months }) =>
        dispatch({ type: Actions.MONTHLY_EXPENSES, payload: months })
      )
      .then(() => getUsers())
      .then((users) =>
        dispatch({
          type: Actions.SET_USER,
          payload: { users, userId: isAdmin ? "" : user.uid },
        })
      )
      .then(() => setLoading(false))
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
      {matches && <Sidebar />}
      <Stack flex={1} mt={matches ? 8 : 6} p={matches ? 3 : 1}>
        {loading ? <Loader /> : null}
        <Box
          className="bg-white rounded"
          component="main"
          sx={{
            flexGrow: 1,
            pb: matches ? 0 : 7,
          }}
        >
          {children}
          {!matches && <MobileNavigation />}
        </Box>
      </Stack>
    </Box>
  );
};
