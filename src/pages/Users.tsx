import { Close, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { UserCard } from "../components";
import { useUtility } from "../hooks";
import { useStore } from "../Providers";

const Users = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [search, setSearch] = useState("");
  const [state] = useStore();
  const { filter } = useUtility();
  return (
    <Stack p={matches ? 3 : 1} gap={2}>
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h5">Residents</Typography>
        <Box display={"flex"} gap={2}></Box>
      </Stack>
      <TextField
        label="Search Name"
        size="small"
        InputProps={{
          startAdornment: <Search />,
          endAdornment: true ? (
            <IconButton onClick={() => setSearch("")}>
              <Close />
            </IconButton>
          ) : null,
        }}
        sx={{ flex: 1 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Stack
        display="grid"
        gridTemplateColumns={"repeat(auto-fit, minmax(240px, 1fr));"}
        gap={matches ? 2 : 1}
      >
        {filter(state.users, (user) =>
          (user.has_tenant ? user.tenant.name : user.name)
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ).map((v) => (
          <React.Fragment key={v.docId}>
            <UserCard {...v} />
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

export default Users;
