import {
  Box,
  Divider,
  IconButton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Loader, TimeRange } from "../components";
import { useUtility } from "../hooks";
import { useCalculate } from "../hooks/useCalculate";
import { Expenses, MonthlyInvoice } from "../MetaData";
import { useStore } from "../Providers";
import { useReactToPrint } from "react-to-print";
import { Print } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { TExpense } from "../model";

const MonthlyBalanceSheet = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const printRef = React.useRef(null);
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  const [state] = useStore();
  const { calculateTotal, monthlyData } = useCalculate();
  const { isPositive, getWordsFromNum, getMonthStr } = useUtility();
  const [{ total, debit, credit }, setTotal] = React.useState({
    credit: 0,
    debit: 0,
    total: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [activeMonth, setActiveMonth] = React.useState(
    searchParams.get("month") || new Date().getMonth() + 1
  );
  const [expensesData, setExpensesData] = React.useState<TExpense[]>([]);

  React.useMemo(() => {
    if (state.months[activeMonth])
      setExpensesData(state.months[activeMonth].expenses);
  }, [state, activeMonth]);

  React.useEffect(() => {
    setLoading(!Object.keys(state.months).length);
  }, [state]);
  React.useEffect(() => {
    if (!loading && state.months[activeMonth])
      setTotal(calculateTotal(activeMonth));
    if (!state.months[activeMonth]) setTotal({ credit: 0, debit: 0, total: 0 });
  }, [loading, activeMonth]);
  return (
    <>
      <Stack direction={"row"} justifyContent="space-between" pt={3} pr={3}>
        <Box></Box>
        <Box display={"flex"} gap={2}>
          <TimeRange
            value={activeMonth}
            onChange={(e) => {
              setActiveMonth(+e.target.value);
              setSearchParams({ month: e.target.value });
            }}
            duration="month"
          />
          <IconButton onClick={handlePrint}>
            <Print />
          </IconButton>
        </Box>
      </Stack>
      <Stack p={matches ? 3 : 1} ref={printRef}>
        <Stack alignItems={"center"}>
          {/* <img
            src="https://images.pexels.com/photos/2077937/pexels-photo-2077937.jpeg"
            alt="apartment"
            className="w-32"
          /> */}
          <Typography variant="h5" textAlign={"center"}>
            {MonthlyInvoice.association}
          </Typography>
          <Typography variant="body1">{MonthlyInvoice.address2}</Typography>
          <Typography variant="body1">{MonthlyInvoice.city}</Typography>
          <Typography variant="body1">{MonthlyInvoice.pincode}</Typography>
          <Stack direction={"row"}>
            <Typography variant="overline">
              Society Registration Number: 000000000
            </Typography>
            <Divider variant="middle" />
            <Typography variant="overline">PAN Number: PSENC00000</Typography>
          </Stack>
          <Typography variant="h6" textAlign={"center"}>
            {getMonthStr(+activeMonth - 1)} Month Balance Sheet
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={4}>
          <Box flex={1}>
            <Divider
              sx={{
                mb: 1,
                borderBottomWidth: 4,
                borderColor: (theme) => theme.palette.common.black,
              }}
            />
            {loading ? (
              <Loader />
            ) : !state.months[activeMonth]?.expenses?.length ? (
              <p>No Expenses!</p>
            ) : (
              expensesData?.map((ex, index, arr) => (
                <React.Fragment key={ex.id}>
                  <Stack
                    direction={"row"}
                    alignItems="center"
                    justifyContent={"space-between"}
                  >
                    <Stack>
                      <Typography variant="body1">{ex.expense}</Typography>
                      <Typography variant="caption">{ex.reason}</Typography>
                    </Stack>
                    <Typography
                      variant="body1"
                      color={
                        ex.transaction === Expenses.credit
                          ? "success.main"
                          : "error.main"
                      }
                    >
                      {ex.transaction === Expenses.credit ? "" : "-"}
                      {ex.amount}
                    </Typography>
                  </Stack>
                  {index !== arr.length - 1 ? (
                    <Divider sx={{ width: "80%", ml: "auto", my: 2 }} />
                  ) : null}
                </React.Fragment>
              ))
            )}
            <Divider
              sx={{
                my: 1,
                borderBottomWidth: 4,
                borderColor: (theme) => theme.palette.common.black,
              }}
            />
          </Box>
        </Stack>
        <Stack direction={"row"} justifyContent="right" gap={4}>
          <Box>
            <Typography variant="body1">
              {MonthlyInvoice.totalCredits}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={400}
              color={"success.main"}
              textAlign="center"
            >
              {credit}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              {MonthlyInvoice.totalDebits}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={400}
              color={"error.main"}
              textAlign="center"
            >
              {debit}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              {MonthlyInvoice.totalAmount}
            </Typography>
            <Typography
              variant="h6"
              color={isPositive(total) ? "success.main" : "error.main"}
              textAlign="center"
            >
              {total}
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Stack gap={1} className="p-2 my-2">
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
              gap={2}
            >
              <Typography variant="body1">Opening Balance: </Typography>
              <Typography variant="body1" fontWeight={500} color="success.main">
                {monthlyData[activeMonth]?.opening_balance}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
              gap={2}
            >
              <Typography variant="body1">Closing Balance: </Typography>
              <Typography variant="body1" fontWeight={500} color="success.main">
                {monthlyData[activeMonth]?.closing_balance}
              </Typography>
            </Box>
          </Stack>
          <Box>
            <Typography variant="body2" textAlign={"right"}>
              {MonthlyInvoice.amountInWords}
            </Typography>
            <Typography variant="body1" fontWeight={500} textAlign={"right"}>
              {getWordsFromNum(total)}
            </Typography>
          </Box>
        </Stack>

        {/* Signature */}
        <Stack direction={"row"} justifyContent="space-between">
          <Box></Box>
          <Box>
            <Typography variant="h6" fontWeight={500} textAlign={"right"}>
              {MonthlyInvoice.association}
            </Typography>
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
              {MonthlyInvoice.signMember}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default MonthlyBalanceSheet;
