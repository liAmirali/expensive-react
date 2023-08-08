import PersonalExpenseList from "../../personal/PersonalExpenseList";
import Screen from "../../layout/Screen";
import CreateExpenseTopBarButton from "../../personal/CreateExpenseTopBarButton";

const ExpensesScreen = () => {
  return (
    <Screen topBarProps={{ rightChild: <CreateExpenseTopBarButton /> }}>
      <PersonalExpenseList />
    </Screen>
  );
};

export default ExpensesScreen;
