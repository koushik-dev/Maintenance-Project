import { Close, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { TimeRange } from "../components";
import { useUtility } from "../hooks";
import { Expenses as ExpensesMeta } from "../MetaData";
import { useCalculate } from "../hooks/useCalculate";
import { useSearchParams } from "react-router-dom";
import { ExpenseTable } from "../components/Expenses";

const Expenses = () => {
  const [searchParams] = useSearchParams();
  const [activeMonth, setActiveMonth] = React.useState(
    searchParams.get("month") || new Date().getMonth() + 1
  );
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [search, setSearch] = React.useState("");
  const [addOpen, setAddOpen] = React.useState(false);
  const { isPositive, capitalize } = useUtility();
  const { calculateTotal, monthlyData } = useCalculate();
  const { credit, debit, total } = calculateTotal(activeMonth);
  const addClose = () => setAddOpen(false);

  return (
    <>
      <Stack p={matches ? 3 : 1}>
        <Stack direction={"row"} justifyContent="space-between" mb={1}>
          <Typography variant="h5">Expenses</Typography>
          <Box display={"flex"} gap={2}>
            <TimeRange
              value={activeMonth}
              onChange={(e) => setActiveMonth(+e.target.value)}
              duration="month"
            />
          </Box>
        </Stack>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box></Box>
          <Button variant="contained" onClick={() => setAddOpen(true)}>
            {ExpensesMeta.add_expense}
          </Button>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Stack>
            <Typography variant="body1">
              {capitalize(ExpensesMeta.openingBalance)}
            </Typography>
            <Typography variant="h6" color="success.main">
              {monthlyData[activeMonth]?.opening_balance || 0}
            </Typography>
          </Stack>
          {matches ? (
            <Box
              display={"flex"}
              gap={4}
              sx={{ flex: 1 }}
              justifyContent="center"
            >
              <Box textAlign={"center"}>
                <Typography variant="body1">
                  {capitalize(ExpensesMeta.credit)}
                </Typography>
                <Typography variant="h6" color="success.main">
                  {credit}
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <Typography variant="body1">
                  {capitalize(ExpensesMeta.debit)}
                </Typography>
                <Typography variant="h6" color="error.main">
                  {debit}
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <Typography variant="body1">Final</Typography>
                <Typography
                  variant="h6"
                  color={isPositive(total) ? "success.main" : "error.main"}
                >
                  {total}
                </Typography>
              </Box>
            </Box>
          ) : null}

          <Stack>
            <Typography variant="body1" textAlign={"right"}>
              {capitalize(ExpensesMeta.closingBalance)}
            </Typography>
            <Typography variant="h6" color="success.main" textAlign={"right"}>
              {monthlyData[activeMonth]?.closing_balance || 0}
            </Typography>
          </Stack>
        </Box>
        {!matches ? (
          <Box
            display={"flex"}
            gap={4}
            sx={{ flex: 1 }}
            justifyContent="center"
            mb={2}
          >
            <Box textAlign={"center"}>
              <Typography variant="body1">
                {capitalize(ExpensesMeta.credit)}
              </Typography>
              <Typography variant="h6" color="success.main">
                {credit}
              </Typography>
            </Box>
            <Box textAlign={"center"}>
              <Typography variant="body1">
                {capitalize(ExpensesMeta.debit)}
              </Typography>
              <Typography variant="h6" color="error.main">
                {debit}
              </Typography>
            </Box>
            <Box textAlign={"center"}>
              <Typography variant="body1">Final</Typography>
              <Typography
                variant="h6"
                color={isPositive(total) ? "success.main" : "error.main"}
              >
                {total}
              </Typography>
            </Box>
          </Box>
        ) : null}
        <TextField
          label="Search Expenses"
          size="small"
          InputProps={{
            startAdornment: <Search />,
            endAdornment: search ? (
              <IconButton onClick={() => setSearch("")}>
                <Close />
              </IconButton>
            ) : null,
          }}
          sx={{ flex: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ExpenseTable {...{ search, activeMonth, addOpen, addClose }} />
        <Typography textAlign={"right"}>
          Total: {monthlyData[activeMonth]?.expenses.length || 0}
        </Typography>
      </Stack>
    </>
  );
};

export default Expenses;
