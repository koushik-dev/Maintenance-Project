import { Close, Search } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  TextField,
  Theme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { UserCard } from "../components";
import { useStore } from "../Providers";

const Users = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [search, setSearch] = useState("");
  const [state] = useStore();
  return (
    <Stack>
      <TextField
        label="Search"
        size="small"
        InputProps={{
          startAdornment: <Search />,
          endAdornment: true ? (
            <IconButton onClick={() => setSearch("")}>
              <Close />
            </IconButton>
          ) : null,
        }}
        sx={{ flex: 1, m: 1 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Stack
        display="grid"
        gridTemplateColumns={"repeat(auto-fill, minmax(300px, 1fr));"}
        gap={matches ? 2 : 1}
        p={matches ? 3 : 0}
      >
        {state.users.map((v) => (
          <React.Fragment key={v.docId}>
            <UserCard {...v} />
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

export default Users;
