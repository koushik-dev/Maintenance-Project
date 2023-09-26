import * as MuiIcon from "@mui/icons-material";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  useMediaQuery,
  Theme,
  Button,
  Card,
  DialogContent,
  Box,
} from "@mui/material";
import React from "react";
import { Loader } from "../Loader";
import { AddExpense, DeleteExpense, EditExpense } from ".";
import { Expenses as ExpensesMeta } from "../../MetaData";
import { useAuth, useCalculate, useUtility } from "../../hooks";
import { Modal } from "..";
import { TExpense } from "../../model";

export const ExpenseTable: React.FC<{
  search: string;
  addOpen: boolean;
  addClose: () => void;
  activeMonth: string | number;
}> = ({ search, addOpen, addClose, activeMonth }) => {
  const { isAdmin } = useAuth();
  const matchesMD = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [mobileActions, setMobileActions] = React.useState(false);
  const editClose = () => setEditOpen(false);
  const deleteClose = () => setDeleteOpen(false);
  const [loading, setLoading] = React.useState(true);
  const [activeExpense, setActiveExpense] = React.useState({
    id: 0,
    month: "",
  });
  const [filteredExpenses, setFilteredExpenses] = React.useState<TExpense[]>(
    []
  );
  const { filter, getDateFromTimestamp, getIconFromTypes } = useUtility();
  const { monthlyData } = useCalculate();
  const generateIcon = (variation: keyof typeof MuiIcon, props = {}) => {
    const IconName = MuiIcon[variation];
    return <IconName {...props} />;
  };

  React.useEffect(() => {
    if (!Object.keys(monthlyData).length) {
      setLoading(true);
    } else {
      setLoading(false);
      setFilteredExpenses(monthlyData[activeMonth]?.expenses);
    }
  }, [monthlyData]);
  React.useEffect(() => {
    setFilteredExpenses(
      filter(monthlyData[activeMonth]?.expenses, (e) =>
        (e.expense + e.reason)
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      )
    );
  }, [search]);
  React.useEffect(() => {
    setFilteredExpenses(monthlyData[activeMonth]?.expenses);
  }, [activeMonth]);
  return (
    <>
      {loading && <Loader />}
      {matchesMD ? (
        <TableContainer
          component={Paper}
          className="border-t-4 border-solid border-blue-300 my-4"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {ExpensesMeta.expense_table_titles.map(
                  (e) =>
                    (!e.isAdmin || isAdmin) && (
                      <TableCell key={e.key} align={e.align as any}>
                        {e.value}
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {!monthlyData[activeMonth]?.expenses?.length ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography variant="body1" p={2} textAlign="center">
                      {ExpensesMeta.noData}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses?.map((ex) => (
                  <TableRow
                    key={ex.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {generateIcon(getIconFromTypes(ex.expense), {
                        sx: { mr: 1 },
                      })}
                      <Typography variant="body1" display={"inline"}>
                        {ex.expense}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{ex.reason}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontSize: "1rem",
                        color: "success.main",
                      }}
                    >
                      {ex.transaction === ExpensesMeta.credit
                        ? "+" + ex.amount
                        : ""}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontSize: "1rem",
                        color: "error.main",
                      }}
                    >
                      {ex.transaction === ExpensesMeta.debit
                        ? "-" + ex.amount
                        : ""}
                    </TableCell>
                    <TableCell align="right">
                      {getDateFromTimestamp(ex.date).toLocaleDateString()}
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <Stack
                          direction={"row"}
                          justifyContent="center"
                          gap={1}
                        >
                          <Button
                            variant="outlined"
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
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
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
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack gap={1} my={2}>
          {filteredExpenses?.map((ex) => (
            <Card
              key={ex.id}
              className="border border-solid border-slate-400 p-2 flex justify-between"
              sx={{ borderRadius: "0.5rem" }}
              onClick={() => {
                setActiveExpense({
                  id: ex.id,
                  month: (
                    getDateFromTimestamp(ex.date).getMonth() + 1
                  ).toString(),
                });
                setMobileActions(true);
              }}
            >
              <Stack>
                <Typography variant="subtitle2" fontWeight={400}>
                  {ex.reason || ex.expense}
                </Typography>
                <Typography variant="overline" fontWeight={400}>
                  {getDateFromTimestamp(ex.date).toLocaleDateString()}
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                textAlign={"right"}
                color={
                  ex.transaction === ExpensesMeta.debit
                    ? "error.main"
                    : "success.main"
                }
              >
                {ex.transaction === ExpensesMeta.debit ? "-" : "+"}
                {ex.amount}
              </Typography>
            </Card>
          ))}
          {!filteredExpenses?.length && (
            <Typography variant="body1" p={2} textAlign="center">
              {ExpensesMeta.noData}
            </Typography>
          )}
        </Stack>
      )}

      <Box display={"flex"} justifyContent="space-between">
        <Typography>Total Rows: {filteredExpenses?.length || 0}</Typography>
        <Typography>
          Total Amount:{" "}
          {filteredExpenses?.reduce((a, e) => a + e.amount, 0) || 0}
        </Typography>
      </Box>
      {addOpen ? (
        <AddExpense open={addOpen} onClose={addClose} {...{ activeMonth }} />
      ) : null}
      {editOpen ? (
        <EditExpense
          open={editOpen}
          onClose={editClose}
          exId={activeExpense.id}
          month={activeExpense.month}
        />
      ) : null}
      {isAdmin && (
        <DeleteExpense
          open={deleteOpen}
          onClose={deleteClose}
          exId={activeExpense.id}
          month={activeExpense.month}
        />
      )}
      {/* Mobile Actions Modal */}
      {!matchesMD && isAdmin && (
        <Modal
          title="Actions"
          open={mobileActions}
          onClose={() => setMobileActions(false)}
        >
          <DialogContent dividers>
            <Stack direction={"row"} justifyContent="center" gap={1}>
              <Button
                variant="outlined"
                onClick={() => {
                  setMobileActions(false);
                  setEditOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setMobileActions(false);
                  setDeleteOpen(true);
                }}
              >
                Delete
              </Button>
            </Stack>
          </DialogContent>
        </Modal>
      )}
    </>
  );
};
