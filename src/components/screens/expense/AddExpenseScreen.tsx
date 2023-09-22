import { Button, ButtonGroup, Grid, MenuItem, Select, Typography } from "@mui/material";
import Screen from "../../layout/Screen";
import { useState } from "react";
import FormikInput from "../../atoms/inputs/formik/FormikInput";
import { FormikProvider, useFormik } from "formik";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { addPersonalExpense } from "../../../api/expenses";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { CURRENCIES } from "../../../constants/currencies";

interface CreateExpenseForm {
  value: number;
  title: string;
  currency: string;
  category: string;
  description: string;
  dateTime: dayjs.Dayjs;
}

const AddExpenseScreen = () => {
  const [type, setType] = useState<ExpenseType>("EXPENSE");

  const expenseMutation = useMutation({
    mutationFn: addPersonalExpense,
    onSuccess: () => {
      toast("Expense was successfully added.", { type: "success" });
    },
  });

  const handleFormSubmit = (values: CreateExpenseForm) => {
    const { value, currency, title, category, description } = values;
    const dateTime = dayjs(values.dateTime).toISOString();

    expenseMutation.mutate({ type, value, title, currency, category, description, dateTime });
  };

  const validationSchema = Yup.object({
    value: Yup.number().min(0, "Minimum value can be 0.").required("Required"),
  });

  const formik = useFormik<CreateExpenseForm>({
    initialValues: {
      value: 0,
      currency: CURRENCIES[0].abbr,
      title: "",
      category: "",
      description: "",
      dateTime: dayjs(), // now
    },
    onSubmit: handleFormSubmit,
    validationSchema,
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
          onClick={() => setType("EXPENSE")}
          variant={type === "EXPENSE" ? "contained" : "outlined"}
        >
          Expense
        </Button>
        <Button
          onClick={() => setType("INCOME")}
          variant={type === "INCOME" ? "contained" : "outlined"}
        >
          Income
        </Button>
      </ButtonGroup>

      <FormikProvider value={formik}>
        <Grid component="form" container mt={4} spacing={2} onSubmit={formik.handleSubmit}>
          <Grid item xs={9}>
            <FormikInput fullWidth name="value" label="Value" />
          </Grid>

          <Grid item xs={3}>
            <Select
              name="currency"
              value={formik.values.currency}
              onChange={formik.handleChange}
              fullWidth
              label="Currency"
            >
              {CURRENCIES.map((currency) => (
                <MenuItem key={currency.abbr} value={currency.abbr}>
                  {currency.abbr}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <FormikInput fullWidth name="title" label="Title" />
          </Grid>

          <Grid item xs={6}>
            <FormikInput fullWidth name="category" label="Category" />
          </Grid>

          <Grid item xs={6}>
            <DateTimePicker
              value={formik.values.dateTime}
              onChange={(value) => formik.setFieldValue("dateTime", value)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormikInput fullWidth name="description" label="Description" />
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={expenseMutation.isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
            >
              {expenseMutation.isLoading ? "Creating..." : "Create"}
            </Button>
          </Grid>
        </Grid>
      </FormikProvider>
    </Screen>
  );
};

export default AddExpenseScreen;
