import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useStore } from "../Providers";
import { useReactToPrint } from "react-to-print";
import { Print } from "@mui/icons-material";
import { TimeRange } from "../components";
import { useSearchParams } from "react-router-dom";

const Receipt = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [state] = useStore();
  const [activeMonth, setActiveMonth] = React.useState(
    searchParams.get("month") || new Date().getMonth() + 1
  );
  const printRef = React.useRef(null);
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  return (
    <>
      <Stack direction={"row"} justifyContent="space-between" pt={3} pr={3}>
        <Box></Box>
        <Box display={"flex"} gap={2}>
          <TimeRange
            value={activeMonth}
            onChange={(e) => setActiveMonth(+e.target.value)}
            duration="month"
          />
          <IconButton onClick={handlePrint}>
            <Print />
          </IconButton>
        </Box>
      </Stack>
      <Stack p={matches ? 3 : 1} gap={2} ref={printRef}>
        <Stack direction={"row"} justifyContent="space-between">
          <Stack alignItems={"start"}>
            <Typography variant="body1">#9</Typography>
            <Typography variant="body1">30-{activeMonth}-2023</Typography>
          </Stack>

          <Typography variant="h3" fontWeight={500} textAlign="right">
            Invoice
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent="space-between">
          <Stack>
            <Typography variant="body2">Invoice To:</Typography>
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="body1">F3</Typography>
            <Typography variant="body1">9876543210</Typography>
          </Stack>
          <Box>
            <Typography variant="h6" textAlign={"right"}>
              Casagrand The Address Association
            </Typography>
            <Typography variant="body1" textAlign={"right"}>
              Riverview residency 2nd street
            </Typography>
            <Typography variant="body1" textAlign={"right"}>
              West Mambalam
            </Typography>
            <Typography variant="body1" textAlign={"right"}>
              Chennai.
            </Typography>
          </Box>
        </Stack>
        <TableContainer component={Paper} sx={{ border: "1px solid" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="bg-slate-200">
                {[
                  { key: "no", align: "center", value: "No" },
                  { key: "description", align: "center", value: "Description" },
                  { key: "amount", align: "center", value: "Amount" },
                ].map((e) => (
                  <TableCell key={e.key} align={e.align as any}>
                    {e.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {[
                  { key: "1", align: "center", value: "1" },
                  {
                    key: "bill",
                    align: "center",
                    value: "Monthly Standard Maintenance",
                  },
                  { key: "payment", align: "center", value: "1500" },
                ].map((e) => (
                  <TableCell key={e.key} align={e.align as any}>
                    <Typography variant="body1" fontWeight={500}>
                      {e.value}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align={"center"}>
                  <Typography variant="h6" fontWeight={500}>
                    1500
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body1">
          Payment Mode: <b>Cash</b>
        </Typography>
        <Stack direction={"row"} my={3} justifyContent="space-between">
          <Box></Box>
          <Box>
            <Typography variant="h5">Casagrand Association</Typography>
            <img
              style={{ width: "200px", marginLeft: "auto" }}
              src="https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Oprah-Winfrey-Signature-1.png"
              alt="signature"
            />
            <Typography
              variant="body2"
              fontWeight={700}
              textAlign={"center"}
              className="bg-blue-300"
              sx={{ p: 1 }}
            >
              Authorised Signature
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Receipt;
