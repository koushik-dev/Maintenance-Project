export enum Errors {
  USER_EXISTS = "Username already exists!",
  USER_NOT_FOUND = "Username or Password is incorrect.",
  PASSWORD_LENGTH = "Password should be at least 6 characters.",
}
export const SuperUser = "Admin";
export const UsersCollectionName = "Users";
export const ExpensesCollectionName = "expenses";
export const AppBarTexts = {
  title: "Casagrand",
  logout: "Log Out",
  admin: "Admin",
};
export const Details = {
  association: "Casagrand The Address Association",
  address2: "Riverview residency 2nd street",
  city: "West Mambalam, Chennai.",
  pincode: "600097",
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
    {
      name: "Users",
      route: "/users",
      icon: "Group",
    },
  ],
};
export const BottomNavigationTexts = {
  options: [
    {
      name: "Home",
      route: "/",
      icon: "Home",
      forUser: true,
      forAdmin: true,
    },
    {
      name: "Me",
      route: "/myself",
      icon: "Person",
      forUser: true,
    },
    {
      name: "Reports",
      route: "/reports",
      icon: "Assessment",
      forAdmin: true,
    },
    {
      name: "Expenses",
      route: "/expenses",
      icon: "RequestQuote",
      forAdmin: true,
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
  openingBalance: "opening balance",
  closingBalance: "closing balance",
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
  add_expense_error: "Error: Not able to add the Expense",
  delete_expense: "Delete Expense",
  delete_expense_success: "Expense deleted successfully.",
  delete_expense_error: "Error: Not able to delete the Expense",
  edit_expense_success: "Expense updated successfully.",
  edit_expense_error: "Error: Not able to edit the Expense",
  edit: "Update",
  edit_expense: "Update Expense",
  expense_table_titles: [
    { key: "expense", value: "Expense", align: "left" },
    { key: "reason", value: "Reason", align: "left" },
    { key: "credit", value: "Credit", align: "right" },
    { key: "debit", value: "Debit", align: "right" },
    { key: "date", value: "Date", align: "right" },
    { key: "actions", value: "Actions", align: "center" },
  ],
  noData: "No Data",
};
export const MonthlyInvoice = {
  title: "Invoice",
  note: "Note:",
  amountInWords: "Balance Amount In Words: ",
  totalAmount: "Balance",
  totalCredits: "Credits",
  totalDebits: "Debits",
  invoiceNo: "Invoice No: ",
  signMember: "President / Secretary / Treasurer",
  notes: [{ text: "We will accept only cash." }],
  ...Details,
};
export const MyselfTexts = {
  cards: [
    {
      name: "Maintenance Receipts",
      route: "/receipt",
    },
    {
      name: "All Expenses",
      route: "/expenses",
    },
    {
      name: "Vehicles",
      route: "/receipt",
    },
    {
      name: "Complaints",
      route: "/expenses",
      disabled: true,
    },
  ],
};
