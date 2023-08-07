import { Button } from "@mui/material";
import { MaterialSymbol } from "react-material-symbols";
import { Link } from "react-router-dom";

const CreateExpenseTopBarButton = () => {
  return (
    <Link to="add">
      <Button size="large" startIcon={<MaterialSymbol icon="add" weight={200} size={25} />}>
        New Expense
      </Button>
    </Link>
  );
};

export default CreateExpenseTopBarButton;
