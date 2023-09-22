import { Box, BoxProps, TextField, TextFieldProps, Typography } from "@mui/material";
import { useField } from "formik";
import { FC } from "react";

type Props = {
  name: string;
  boxProps?: BoxProps;
} & TextFieldProps;

const FormikInput: FC<Props> = ({ name, boxProps, ...props }) => {
  const [fields, meta] = useField(name);

  return (
    <Box {...boxProps}>
      <TextField {...fields} {...props} />
      {meta.error && meta.touched && (
        <Typography color="error" variant="body2">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default FormikInput;
