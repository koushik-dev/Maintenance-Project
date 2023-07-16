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
import { editExpenses } from "../../api";
import { useUtility } from "../../hooks";
import { Expenses } from "../../MetaData";
import { Actions } from "../../model";
import { useStore } from "../../Providers";
import { Modal } from "../Modal";

export const DeleteExpense: React.FC<
  DialogProps & { onClose: () => void; month: string; exId: number }
> = ({ open, onClose, exId, month }) => {
  const [loading, setLoading] = React.useState(false);
  const [state, dispatch] = useStore();
  const { filter } = useUtility();
  const deleteEx = () => {
    setLoading(true);
    const filteredExpenses = filter(
      state.months[month].expenses,
      (e) => e.id !== exId
    );
    editExpenses(filteredExpenses)
      .then(() => {
        toast.success(Expenses.delete_expense_success);
        dispatch({
          type: Actions.MONTHLY_EXPENSES,
          payload: { [month]: { expenses: filteredExpenses } },
        });
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
