import { Box, BoxProps, TextField, TextFieldProps, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";

type Props = {
  name: string;
  label: string;
  type?: string;
  id?: string;
  formik: FormikProps<any>;
  boxProps?: BoxProps;
} & TextFieldProps;

const Input: FC<Props> = ({ name, label, type, id, formik, boxProps, ...props }) => {
  return (
    <Box {...boxProps}>
      <TextField
        label={label}
        type={type || "text"}
        id={id}
        {...formik.getFieldProps(name)}
        {...props}
      />
      {formik.errors[name] && formik.touched[name] && (
        <Typography color="error" variant="body2">
          {formik.errors[name] as string}
        </Typography>
      )}
    </Box>
  );
};

export default Input;
