import { AttachMoney, Close, Delete, Edit, Search } from "@mui/icons-material";
import * as MuiIcon from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Loader } from "../components";
import { AddExpense, DeleteExpense, EditExpense } from "../components/Expenses";
import { useUtility } from "../hooks";
import { useStore } from "../Providers";
import { Expenses as ExpensesMeta } from "../MetaData";
import { useCalculate } from "../hooks/useCalculate";

const monthSelected = "7";

const Expenses = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [activeExpense, setActiveExpense] = React.useState({
    id: 0,
    month: "",
  });
  const [state] = useStore();
  const { filter, getDateFromTimestamp, isPositive, getIconFromTypes } =
    useUtility();
  const { calculate } = useCalculate();
  const addClose = () => setAddOpen(false);
  const editClose = () => setEditOpen(false);
  const deleteClose = () => setDeleteOpen(false);
  const total = calculate(monthSelected);

  const generateIcon = (variation: keyof typeof MuiIcon, props = {}) => {
    const IconName = MuiIcon[variation];
    return <IconName {...props} />;
  };

  React.useEffect(() => {
    if (!Object.keys(state.months).length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [state.months]);

  return (
    <Stack p={matches ? 3 : 1}>
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Typography variant="h5">Expenses</Typography>
        <Button variant="contained" onClick={() => setAddOpen(true)}>
          Add Expense
        </Button>
      </Box>
      <Box display={"flex"} alignItems={"center"} sx={{ my: 2 }}>
        <TextField
          label="Search Expenses"
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
        <Box sx={{ flex: 1 }} textAlign="right">
          <Typography variant="body1">
            <AttachMoney />
            Total Expenses
          </Typography>
          <Typography
            variant="h6"
            color={isPositive(total) ? "success.main" : "error.main"}
          >
            {total}
          </Typography>
        </Box>
      </Box>

      {/* Expense Table */}
      {matchesMD ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {ExpensesMeta.expense_table_titles.map((e) => (
                  <TableCell key={e.key} align={e.align as any}>
                    {e.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell>
                    <Loader />
                  </TableCell>
                </TableRow>
              ) : (
                filter(state.months[monthSelected]?.expenses, (e) =>
                  (e.expense + e.reason).toLocaleLowerCase().includes(search)
                ).map((ex, index) => (
                  <TableRow
                    key={ex.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">
                      {generateIcon(getIconFromTypes(ex.expense), {
                        sx: { mr: 1 },
                      })}
                      <Typography variant="body1" display={"inline"}>
                        {ex.expense}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{ex.reason}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontSize: "1rem",
                        color:
                          ex.transaction === ExpensesMeta.credit
                            ? "success.main"
                            : "error.main",
                      }}
                    >
                      {ex.transaction === ExpensesMeta.credit ? "+" : "-"}
                      {ex.amount}
                    </TableCell>
                    <TableCell align="right">
                      {getDateFromTimestamp(ex.date).toDateString()}
                    </TableCell>
                    <TableCell>
                      <Stack direction={"row"} justifyContent="center" gap={1}>
                        <IconButton
                          onClick={() => {
                            setActiveExpense({
                              id: ex.id,
                              month: (
                                getDateFromTimestamp(ex.date).getMonth() + 1
                              ).toString(),
                            });
                            setEditOpen(true);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setActiveExpense({
                              id: ex.id,
                              month: (
                                getDateFromTimestamp(ex.date).getMonth() + 1
                              ).toString(),
                            });
                            setDeleteOpen(true);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No expense</p>
      )}
      {addOpen ? <AddExpense open={addOpen} onClose={addClose} /> : null}
      {editOpen ? (
        <EditExpense
          open={editOpen}
          onClose={editClose}
          exId={activeExpense.id}
          month={activeExpense.month}
        />
      ) : null}
      <DeleteExpense
        open={deleteOpen}
        onClose={deleteClose}
        exId={activeExpense.id}
        month={activeExpense.month}
      />
    </Stack>
  );
};

export default Expenses;
