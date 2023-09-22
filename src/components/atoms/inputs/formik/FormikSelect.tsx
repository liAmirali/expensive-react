import { Box, BoxProps, Select, SelectProps, Typography } from "@mui/material";
import { useField } from "formik";
import { FC } from "react";

type Props = {
  name: string;
  boxProps?: BoxProps;
} & SelectProps;

const FormikSelect: FC<Props> = ({ name, boxProps, ...props }) => {
  const [fields, meta] = useField(name);

  return (
    <Box {...boxProps}>
      <Select {...fields} {...props}></Select>
      {meta.error && meta.touched && (
        <Typography color="error" variant="body2">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default FormikSelect;
