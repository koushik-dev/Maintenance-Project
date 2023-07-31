import {
  Stack,
  Typography,
  Box,
  Divider,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useUtility } from "../hooks";
import { useStore } from "../Providers";

export const Defaulters = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [state] = useStore();
  const { filter } = useUtility();
  const [users, setUser] = useState<any[]>([]);

  useEffect(() => {
    setUser(filter(state.users, (user) => !user?.maintenance?.status));
  }, [state]);
  return (
    <Stack p={matches ? 3 : 1} gap={1}>
      <Typography variant="h5" textAlign={"center"}>
        Defaulters
      </Typography>
      <Stack
        className="border-2 border-solid border-slate-400 rounded p-2"
        gap={1}
      >
        {users?.map((user, index, arr) => (
          <Box key={user.name}>
            <Box className="flex justify-between items-center px-2">
              <Typography variant="body1">
                {user?.has_tenant ? user.tenant.name : user.name}
              </Typography>
              <Typography variant="body1">{user?.flat?.number}</Typography>
            </Box>
            {arr.length - 1 !== index && (
              <Divider className="py-1" variant="middle" />
            )}
          </Box>
          // TODO: On Click  of the defaulter what to do
        ))}
      </Stack>
    </Stack>
  );
};
