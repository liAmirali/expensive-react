import { Button, ButtonGroup, Grid, MenuItem, Select, Typography } from "@mui/material";
import Screen from "../../layout/Screen";
import { useState } from "react";
import Input from "../../atoms/inputs/formik/Input";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface CreateExpenseForm {
  value: number;
  currency: string;
  category: string;
  description: string;
  dateTime: dayjs.Dayjs;
}

const AddExpenseScreen = () => {
  const [type, setType] = useState<"expense" | "income">("expense");

  const handleFormSubmit = (values: CreateExpenseForm) => {
    const { value, currency, category, description } = values;
    const dateTime = dayjs(values.dateTime).toISOString();

    console.log(value);
  };

  const formik = useFormik<CreateExpenseForm>({
    initialValues: {
      value: 0,
      currency: "IRR",
      category: "",
      description: "",
      dateTime: dayjs(), // now
    },
    onSubmit: handleFormSubmit,
  });

  return (
    <Screen topBarProps={{ showBackButton: true }}>
      <Typography variant="h4">Add new Expense</Typography>
      <ButtonGroup
        disableElevation
        fullWidth
        aria-label="Disabled elevation buttons"
        sx={{ mt: 4 }}
      >
        <Button
          onClick={() => setType("expense")}
          variant={type === "expense" ? "contained" : "outlined"}
        >
          Expense
        </Button>
        <Button
          onClick={() => setType("income")}
          variant={type === "income" ? "contained" : "outlined"}
        >
          Income
        </Button>
      </ButtonGroup>

      <Grid component="form" container mt={4} spacing={2} onSubmit={formik.handleSubmit}>
        <Grid item xs={9}>
          <Input fullWidth formik={formik} name="value" label="Value" />
        </Grid>

        <Grid item xs={3}>
          <Select
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            fullWidth
            label="Currency"
          >
            <MenuItem value="IRR">IRR</MenuItem>
            <MenuItem value="IRT">IRT</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={6}>
          <Input fullWidth formik={formik} name="category" label="Category" />
        </Grid>

        <Grid item xs={6}>
          <DatePicker
            value={formik.values.dateTime}
            onChange={(value) => formik.setFieldValue("dateTime", value)}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <Input fullWidth formik={formik} name="category" label="Description" />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
            Create
          </Button>
        </Grid>
      </Grid>
    </Screen>
  );
};

export default AddExpenseScreen;
