import {
  Box,
  Card,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUtility } from "../hooks";
import { MyselfTexts } from "../MetaData";
import { useStore } from "../Providers";

const Myself = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const { getMonthStr } = useUtility();
  const [state] = useStore();
  const navigate = useNavigate();
  return (
    <Stack p={matches ? 3 : 1} gap={2}>
      <Stack
        p={1}
        gap={1}
        className="border-2 border-solid rounded border-slate-400"
      >
        <Typography variant="body1">
          {getMonthStr(new Date().getMonth())} month maintenance
        </Typography>
        <Box className="flex justify-between">
          <Typography variant="h6">
            {state.months[7]?.closing_balance}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: (theme) => theme.palette.error.main }}
          >
            Pending
          </Typography>
        </Box>
      </Stack>
      {/* Route Cards */}
      <Stack
        display="grid"
        gridTemplateColumns={"repeat(auto-fit, minmax(130px, 1fr))"}
        gap={2}
      >
        {MyselfTexts.cards.map(({ name, route, disabled = false }) => (
          <Card
            raised
            key={name}
            className="flex justify-center p-8"
            sx={{
              backgroundColor: "#93c5fd",
              minHeight: 120,
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "auto" : "pointer",
            }}
            onClick={() => !disabled && navigate(route)}
          >
            <Stack className="items-center justify-center">
              <Typography
                className="text-center"
                variant="body1"
                fontWeight={400}
              >
                {name}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
      <Typography variant="h4">Add Vehicles</Typography>
      <Typography variant="h4">User Details</Typography>
    </Stack>
  );
};

export default Myself;
