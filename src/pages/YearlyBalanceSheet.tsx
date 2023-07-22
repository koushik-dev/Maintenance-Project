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

const YearlyBalanceSheet = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const printRef = React.useRef(null);
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  const [state] = useStore();
  const { calculateTotal } = useCalculate();
  const { isPositive, getWordsFromNum } = useUtility();
  const [{ total }, setTotal] = React.useState({
    credit: 0,
    debit: 0,
    total: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [activeMonth, setActiveMonth] = React.useState(
    searchParams.get("month") || new Date().getMonth() + 1
  );
  const [expensesData, setExpensesData] = React.useState<
    Record<string, { amount: number; categories: string[] }>
  >({});

  React.useMemo(() => {
    if (state.months[activeMonth]) {
      const clubExpenses = () =>
        state.months[activeMonth]?.expenses.reduce(
          (acc, ex) => ({
            ...acc,
            [ex.expense]: {
              ...acc[ex.expense],
              amount:
                (acc[ex.expense]?.amount || 0) +
                (ex.transaction === Expenses.credit ? ex.amount : -ex.amount),
              categories: [
                ...(acc[ex.expense]?.categories || []),
                ex.reason,
              ].filter((v) => !!v),
            },
          }),
          {} as Record<string, { amount: number; categories: string[] }>
        );
      setExpensesData(clubExpenses());
    }
  }, [state, activeMonth]);

  React.useEffect(() => {
    setLoading(!state.months[activeMonth]);
  }, [state, activeMonth]);
  React.useEffect(() => {
    if (!loading) setTotal(calculateTotal(activeMonth));
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
              setSearchParams({ year: e.target.value });
            }}
            duration="year"
          />
          <IconButton onClick={handlePrint}>
            <Print />
          </IconButton>
        </Box>
      </Stack>
      <Stack p={matches ? 3 : 1} ref={printRef}>
        <Stack alignItems={"center"}>
          <img
            src="https://images.pexels.com/photos/2077937/pexels-photo-2077937.jpeg"
            alt="apartment"
            className="w-32"
          />
          <Typography variant="h6" textAlign={"center"}>
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
        </Stack>
        <Divider
          sx={{
            my: 2,
            borderBottomWidth: 4,
            borderColor: (theme) => theme.palette.common.black,
          }}
        />
        {loading ? (
          <Loader />
        ) : !state.months[activeMonth]?.expenses.length ? (
          <p>No Expenses!</p>
        ) : (
          Object.keys(expensesData)?.map((ex, index, arr) => (
            <React.Fragment key={ex}>
              <Stack
                direction={"row"}
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Stack>
                  <Typography variant="body1">{ex}</Typography>
                  <Typography variant="caption">
                    {expensesData[ex].categories.length > 0
                      ? expensesData[ex].categories.join(", ")
                      : ""}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color={
                    isPositive(expensesData[ex].amount)
                      ? "success.main"
                      : "error.main"
                  }
                >
                  {expensesData[ex].amount}
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
            my: 2,
            borderBottomWidth: 4,
            borderColor: (theme) => theme.palette.common.black,
          }}
        />
        <Stack direction={"row"} justifyContent="right" gap={4}>
          <Typography variant="h6">{MonthlyInvoice.totalAmount}</Typography>
          <Typography
            variant="h6"
            color={isPositive(total) ? "success.main" : "error.main"}
          >
            {total}
          </Typography>
        </Stack>
        {MonthlyInvoice.amountInWords}
        <Typography variant="body1" fontWeight={500}>
          {getWordsFromNum(total)}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {MonthlyInvoice.note}
        </Typography>
        {MonthlyInvoice.notes.map((r, index) => (
          <Typography variant="body1" key={r.text}>
            {index + 1} . {r.text}
          </Typography>
        ))}
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
              {MonthlyInvoice.signMember}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default YearlyBalanceSheet;
