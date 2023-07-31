import {
  Card,
  Divider,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Defaulters } from "../components";

const Reports = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return (
    <Stack>
      <Stack direction={"row"} gap={2} p={matches ? 3 : 1}>
        {[
          { name: "Monthly Balance Sheets", route: "/bsmonthly" },
          { name: "Yearly Balance Sheets", route: "/bsyearly" },
        ].map(({ name, route }) => (
          <Card
            raised
            key={name}
            className="flex justify-center p-8"
            sx={{
              backgroundColor: "#93c5fd",
              minHeight: 120,
              cursor: "pointer",
            }}
            onClick={() => navigate(route)}
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
      <Divider variant="middle" sx={{ my: 2 }} />
      <Defaulters />
    </Stack>
  );
};

export default Reports;
