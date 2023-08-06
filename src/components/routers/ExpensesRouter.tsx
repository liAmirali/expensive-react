import { Route, Routes } from "react-router-dom";
import ExpensesScreen from "../screens/expense/ExpensesScreen";
import AddExpenseScreen from "../screens/expense/AddExpenseScreen";

const ExpensesRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ExpensesScreen />} />
        <Route path="add" element={<AddExpenseScreen />} />
      </Route>
    </Routes>
  );
};

export default ExpensesRouter;
