export enum Errors {
  USER_EXISTS = "Username already exists!",
  USER_NOT_FOUND = "Username or Password is incorrect.",
  PASSWORD_LENGTH = "Password should be at least 6 characters.",
}

export const UsersCollectionName = "Users";
export const ExpensesCollectionName = "expenses";
export const AppBarTexts = {
  title: "Casagrand",
  logout: "Log Out",
  admin: "Admin",
};
export const SideBarTexts = {
  options: [
    {
      name: "Home",
      route: "/",
      icon: "Home",
    },
    {
      name: "Expenses",
      route: "/expenses",
      icon: "Payments",
    },
    {
      name: "Month Receipt",
      route: "/receipt",
      icon: "Receipt",
    },
    {
      name: "Monthly Balance Sheet",
      route: "/bsmonthly",
      icon: "DocumentScanner",
    },
  ],
};
export const Expenses = {
  add_expense: "Add Expense",
  expense: "Expense",
  reason: "Reason",
  amount: "Amount",
  spent_date: "Spent Date",
  credit: "credit",
  debit: "debit",
  add: "Add",
  cancel: "Cancel",
  expense_types: [
    {
      name: "Water Load Purchased",
      id: "water_load_purchased",
      required: false,
      icon: "WaterDrop",
    },
    {
      name: "Sewage Tank Cleaned",
      id: "sewage_cleaned",
      required: false,
      icon: "Shower",
    },
    {
      name: "Building Maintenance",
      id: "maintenance",
      required: true,
      icon: "WaterDrop",
    },
    {
      name: "Miscellaneous Expenses",
      id: "misc_expenses",
      required: true,
      icon: "MiscellaneousServices",
    },
  ],
  reason_types: [
    "Sump Cleaning",
    "Overhead Tank Cleaning",
    "Common Area Cleaning",
    "Garbage Picking Vehicle",
    "Common Eletrical Bill",
  ],
  add_expense_success: "Expense added successfully.",
  delete_expense: "Delete Expense",
  delete_expense_success: "Expense deleted successfully.",
  edit_expense_success: "Expense updated successfully.",
  edit: "Update",
  edit_expense: "Update Expense",
  expense_table_titles: [
    { key: "nos", value: "No", align: "left" },
    { key: "expense", value: "Expense", align: "left" },
    { key: "reason", value: "Reason", align: "right" },
    { key: "amount", value: "Amount", align: "right" },
    { key: "date", value: "Date", align: "right" },
    { key: "actions", value: "Actions", align: "center" },
  ],
};
export const MonthlyInvoice = {
  title: "Invoice",
  note: "Note:",
  amountInWords: "Amount In Words: ",
  totalAmount: "Total",
  invoiceNo: "Invoice No: ",
  signMember: "President / Secretary / Treasurer",
  notes: [{ text: "We will accept only cash." }],
  address1: "Casagrand The Address Association,",
  address2: "Riverview residency 2nd street,",
  city: "West Mambalam, Chennai.",
  pincode: "600097",
};
