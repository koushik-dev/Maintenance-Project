import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Actions } from "../../model";
import { useStore } from "../../Providers";
import { Loader, Modal } from "..";
import { Expenses } from "../../MetaData";
import { editExpenses } from "../../api";
import { toast } from "react-hot-toast";
import { useCalculate, useUtility } from "../../hooks";

export const EditExpense: React.FC<
  DialogProps & { onClose: () => void; month: string; exId: number }
> = ({ exId, month, open, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const [, dispatch] = useStore();
  const {
    filter,
    map,
    getDateFromTimestamp,
    getTimestampFromDate,
    capitalize,
  } = useUtility();
  const { monthlyData, calculateClosingBalance } = useCalculate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      expense: "",
      reason: "",
      amount: 0,
      transaction: Expenses.credit,
    },
  });

  const onSubmit = (formValues: any) => {
    setLoading(true);
    const updatedExpenses = map(monthlyData[month].expenses, (e) =>
      e.id === exId
        ? {
            ...formValues,
            date: getTimestampFromDate(new Date(formValues.date)),
            amount: +formValues.amount,
            updatedOn: new Date(),
          }
        : e
    );
    const result = {
      opening_balance: monthlyData[month]?.opening_balance,
      expenses: updatedExpenses,
      closing_balance: calculateClosingBalance(
        updatedExpenses,
        monthlyData[month]?.opening_balance
      ),
    };
    editExpenses(result)
      .then(() => {
        toast.success(Expenses.edit_expense_success);
        dispatch({
          type: Actions.MONTHLY_EXPENSES,
          payload: { [month]: result },
        });
      })
      .catch((err) => {
        toast.error(Expenses.edit_expense_error);
        console.log(err);
      })
      .finally(() => setLoading(false));
    onClose?.();
  };
  const hasError = (id: string) => Object.keys(errors).includes(id);
  React.useEffect(() => {
    setLoading(true);
    if (monthlyData[month]) {
      const filteredExpense = filter(
        monthlyData[month].expenses,
        (e) => e.id === exId
      )[0];
      reset({
        ...filteredExpense,
        date: getDateFromTimestamp(filteredExpense.date)
          .toISOString()
          .split("T")[0],
      });
      setLoading(false);
    }
  }, [monthlyData]);
  return (
    <Modal title={Expenses.edit_expense} {...{ open, onClose }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ p: 0 }} dividers>
          {loading ? <Loader /> : null}
          <Stack gap={2} px={3} pb={3} pt={2}>
            <Controller
              control={control}
              name="expense"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <FormControl sx={{ minWidth: 120, flex: 2 }}>
                  <InputLabel id="Expense-label">Expense*</InputLabel>
                  <Select
                    error={hasError("expense")}
                    labelId="Expense-label"
                    label={Expenses.expense}
                    onChange={onChange as any}
                    value={value || ""}
                  >
                    {Expenses.expense_types.map(({ name }) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="reason"
              render={({ field: { onChange, value, ref } }) => (
                <Autocomplete
                  id="reason"
                  sx={{
                    opacity: Expenses.expense_types
                      .reduce(
                        (a, e) => (e.required ? [...a, e.name] : a),
                        [] as string[]
                      )
                      .includes(watch("expense"))
                      ? 1
                      : 0.5,
                  }}
                  freeSolo
                  onChange={(_, data) => onChange(data || "")}
                  value={value || ""}
                  ref={ref}
                  options={Expenses.reason_types.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      ref={ref}
                      onChange={onChange}
                      label={Expenses.reason}
                    />
                  )}
                  disabled={
                    !Expenses.expense_types
                      .reduce(
                        (a, e) => (e.required ? [...a, e.name] : a),
                        [] as string[]
                      )
                      .includes(watch("expense"))
                  }
                />
              )}
            />

            <TextField
              type="number"
              error={hasError("amount")}
              label={`${Expenses.amount}*`}
              {...register("amount", { required: true })}
            />
            <TextField
              type="date"
              label={`${Expenses.spent_date}*`}
              {...register("date")}
              required
            />
            <FormControl>
              <FormLabel id="radio-buttons-group-label">Transaction</FormLabel>
              <Controller
                rules={{ required: true }}
                control={control}
                name="transaction"
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value={Expenses.credit}
                      control={<Radio />}
                      label={capitalize(Expenses.credit)}
                    />
                    <FormControlLabel
                      value={Expenses.debit}
                      control={<Radio />}
                      label={capitalize(Expenses.debit)}
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {Expenses.cancel}
          </Button>
          <Button variant="contained" type="submit">
            {Expenses.edit}
          </Button>
        </DialogActions>
      </form>
    </Modal>
  );
};
