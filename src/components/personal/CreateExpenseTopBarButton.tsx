import { AddRounded, PlusOneOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CreateExpenseTopBarButton = () => {
  return (
    <Link to="add">
      <Button size="large" startIcon={<AddRounded />}>
        <Typography fontSize="large">New Expense</Typography>
      </Button>
    </Link>
  );
};

export default CreateExpenseTopBarButton;
