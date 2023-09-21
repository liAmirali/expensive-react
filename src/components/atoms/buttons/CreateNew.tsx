import { Button } from "@mui/material";
import { FC } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Link } from "react-router-dom";

type Props = {
  label?: string;
  to?: string;
};

const CreateNew: FC<Props> = ({ label = "Add New", to = "create" }) => {
  return (
    <Link to={to}>
      <Button size="large" startIcon={<MaterialSymbol icon="add" weight={200} size={25} />}>
        {label}
      </Button>
    </Link>
  );
};

export default CreateNew;
