import { Button } from "@mui/material";
import { MaterialSymbol } from "react-material-symbols";
import { Link } from "react-router-dom";

const CreateGroupTopBarButton = () => {
  return (
    <Link to="create">
      <Button size="large" startIcon={<MaterialSymbol icon="add" weight={200} size={25} />}>
        New Group
      </Button>
    </Link>
  );
};

export default CreateGroupTopBarButton;
