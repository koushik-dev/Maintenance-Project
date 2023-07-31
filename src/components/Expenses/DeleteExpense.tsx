import {
  Button,
  DialogActions,
  DialogContent,
  DialogProps,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-hot-toast";
import { Loader } from "..";
import { updateClosingBalances, updateExpenses } from "../../api";
import { useCalculate, useUtility } from "../../hooks";
import { Expenses } from "../../MetaData";
import { Actions, TExpense } from "../../model";
import { useStore } from "../../Providers";
import { Modal } from "../Modal";

export const DeleteExpense: React.FC<
  DialogProps & { onClose: () => void; month: string; exId: number }
> = ({ open, onClose, exId, month }) => {
  const [loading, setLoading] = React.useState(false);
  const [, dispatch] = useStore();
  const { filter } = useUtility();
  const { monthlyData, calculateClosingBalance } = useCalculate();
  const deleteEx = () => {
    setLoading(true);
    const filteredExpenses: TExpense[] = filter(
      monthlyData[month]?.expenses,
      (e) => e.id !== exId
    );
    const deletedExpense = filter(
      monthlyData[month]?.expenses,
      (e) => e.id === exId
    )[0];
    const result = {
      expenses: filteredExpenses,
      closing_balances: calculateClosingBalance(
        (deletedExpense.transaction === Expenses.credit ? -1 : 1) *
          deletedExpense.amount,
        +month
      ),
    };
    updateExpenses(month, result)
      .then((_) => updateClosingBalances(result.closing_balances))
      .then(() => {
        toast.success(Expenses.delete_expense_success);
        dispatch({
          type: Actions.MONTHLY_EXPENSES,
          payload: {
            months: { [month]: result },
            closing_balances: result.closing_balances,
          },
        });
      })
      .catch((err) => {
        toast.error(Expenses.delete_expense_error);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    onClose();
  };
  return (
    <Modal {...{ open, onClose, title: Expenses.delete_expense }}>
      <DialogContent dividers>
        {loading ? <Loader /> : null}
        <Typography variant="body1">
          Are you sure you want to delete the expense?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={deleteEx}>
          Delete
        </Button>
      </DialogActions>
    </Modal>
  );
};
