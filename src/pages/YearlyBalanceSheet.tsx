import {
  Box,
  Button,
  Divider,
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
import { TMonth } from "../model";
const clubMonthlyExpenses = (
  monthlyData: Record<string, TMonth>,
  activeMonth: string | number
) =>
  monthlyData[activeMonth]?.expenses.reduce(
    (acc, ex) => ({
      ...acc,
      [ex.expense]: {
        ...acc[ex.expense],
        amount:
          (acc[ex.expense]?.amount || 0) +
          (ex.transaction === Expenses.credit ? ex.amount : -ex.amount),
        categories: [...(acc[ex.expense]?.categories || []), ex.reason].filter(
          (v) => !!v
        ),
      },
    }),
    {} as Record<string, { amount: number; categories: string[] }>
  );

// TODO: handle year switch from the dropdown
const YearlyBalanceSheet = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const printRef = React.useRef(null);
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  const [state] = useStore();
  const { monthlyData } = useCalculate();
  const { isPositive, getWordsFromNum } = useUtility();
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [activeMonth] = React.useState(
    searchParams.get("month") || new Date().getMonth() + 1
  );
  const [activeyear, setActiveyear] = React.useState(
    searchParams.get("year") || new Date().getFullYear()
  );
  const [expensesData, setExpensesData] = React.useState<
    Record<string, { amount: number; categories: string[] }>
  >({});

  React.useMemo(() => {
    const months = Object.keys(monthlyData);
    if (months.length) {
      const clubExpenses = () =>
        months.reduce((result, month) => {
          const monthlyExpenses = clubMonthlyExpenses(monthlyData, month);
          Object.keys(monthlyExpenses).map(
            (clubbedExpense) =>
              (result[clubbedExpense] = {
                amount:
                  (result[clubbedExpense]?.amount || 0) +
                  (monthlyExpenses[clubbedExpense]?.amount || 0),
                categories: [
                  ...(result[clubbedExpense]?.categories || []),
                  ...monthlyExpenses[clubbedExpense]?.categories,
                ],
              })
          );
          return result;
        }, {} as Record<string, { amount: number; categories: string[] }>);
      const finalResult = clubExpenses();
      setExpensesData(finalResult);
      setTotal(
        Object.values(finalResult).reduce((a, { amount }) => a + amount, 0)
      );
    }
  }, [state]);

  React.useEffect(() => {
    setLoading(!monthlyData);
  }, [state]);
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        pt={matches ? 3 : 1}
        px={matches ? 3 : 1}
      >
        <Box>
          <Button variant="outlined" onClick={handlePrint}>
            <Print sx={{ mr: 1 }} />
            Print
          </Button>
        </Box>
        <Box display={"flex"} gap={2}>
          <TimeRange
            value={activeyear}
            onChange={(e) => {
              setActiveyear(+e.target.value);
              setSearchParams({ year: e.target.value });
            }}
            duration="year"
          />
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
          <Typography variant="h6" textAlign={"center"}>
            Balance Sheet for the financial year {activeyear} -{" "}
            {+activeyear + 1}
          </Typography>
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
        <Typography variant="body2" sx={{ mt: 2 }}>
          {MonthlyInvoice.amountInWords}
        </Typography>
        <Typography variant="body2" fontWeight={400}>
          <code>{getWordsFromNum(total)}</code>
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
