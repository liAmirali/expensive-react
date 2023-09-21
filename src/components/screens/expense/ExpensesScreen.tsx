import PersonalExpenseList from "../../personal/PersonalExpenseList";
import Screen from "../../layout/Screen";
import CreateNew from "../../atoms/buttons/CreateNew";

const ExpensesScreen = () => {
  return (
    <Screen topBarProps={{ rightChild: <CreateNew label="New Expense" to="create" /> }}>
      <PersonalExpenseList />
    </Screen>
  );
};

export default ExpensesScreen;
