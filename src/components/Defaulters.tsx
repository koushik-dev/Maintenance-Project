import { Stack, Typography, Box, Theme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUtility } from "../hooks";
import { useStore } from "../Providers";

export const Defaulters = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [state] = useStore();
  const { filter } = useUtility();
  const [users, setUser] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(filter(state.users, (user) => !user?.maintenance?.status));
  }, [state]);
  return (
    <Stack p={matches ? 3 : 1} gap={1}>
      <Typography variant="h5" textAlign={"center"}>
        Defaulters
      </Typography>
      <Stack className="p-2" gap={1}>
        {users?.map((user, index, arr) => (
          <Box
            className="border border-solid"
            key={user.name}
            onClick={() => navigate("/users")}
          >
            <Box className="flex justify-between items-center px-2">
              <Typography variant="body1">
                {user?.has_tenant ? user.tenant.name : user.name}
              </Typography>
              <Typography variant="body1">{user?.flat?.number}</Typography>
            </Box>
          </Box>
          // TODO: On Click  of the defaulter what to do
        ))}
      </Stack>
    </Stack>
  );
};
