import { FC, useEffect, useMemo, useState } from "react";
import Screen from "../../layout/Screen";
import { Button, Chip, Grid, MenuItem, OutlinedInput, Typography } from "@mui/material";
import FormikInput from "../../atoms/inputs/formik/FormikInput";
import { FormikProvider, useFormik } from "formik";
import { CURRENCIES } from "../../../constants/currencies";
import FormikSelect from "../../atoms/inputs/formik/FormikSelect";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateOccasionExpenseData,
  createOccasionExpense,
  getOccasionMembers,
} from "../../../api/groups";
import { getMappedValues, getUserDisplayName } from "../../../utils/getters";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ApiResponse } from "../../../api/config";

interface CreateExpenseForm {
  value: number;
  title: string;
  currency: string;
  category: string;
  description: string;
  dateTime: dayjs.Dayjs;
  payerId: string;
  assignees: string[];
}

const AddOccasionExpenseScreen: FC = () => {
  const { occasionId, groupId } = useParams();
  const navigate = useNavigate();

  const [membersList, setMembersList] = useState<ITrimmedUser[]>([]);

  const usersMap = useMemo(() => getMappedValues(membersList), [membersList]);

  const occasionMembersQuery = useQuery({
    queryFn: getOccasionMembers,
    queryKey: ["occasionMembers", { groupId: groupId!, occasionId: occasionId! }],
  });

  const occasionExpenseMutation = useMutation({
    mutationFn: createOccasionExpense,
  });

  const formik = useFormik<CreateExpenseForm>({
    initialValues: {
      value: 0,
      currency: CURRENCIES[0].abbr,
      title: "",
      category: "",
      description: "",
      dateTime: dayjs(), // now
      payerId: "",
      assignees: [],
    },
    onSubmit: (values) => {
      if (!values.payerId) {
        toast("You must select a payer.", { type: "error" });
        return;
      }

      const data: CreateOccasionExpenseData = {
        params: {
          occasionId: occasionId!,
        },
        body: {
          groupId: groupId!,
          value: values.value,
          currency: values.currency,
          title: values.title,
          description: values.description,
          category: values.category,
          paidBy: values.payerId,
          assignedTo: values.assignees,
        },
      };

      occasionExpenseMutation.mutate(data);
    },
  });

  useEffect(() => {
    if (occasionMembersQuery.isSuccess) {
      setMembersList(occasionMembersQuery.data.data.data.members);
    }
  }, [occasionMembersQuery.isSuccess, occasionMembersQuery.data]);

  useEffect(() => {
    if (occasionExpenseMutation.isSuccess) {
      toast("Occasion expense was created successfully", { type: "success" });
      navigate("./../");
    }
  }, [occasionExpenseMutation.isSuccess, navigate]);

  useEffect(() => {
    if (occasionExpenseMutation.isError) {
      const apiError = occasionExpenseMutation.error as AxiosError<ApiResponse<null>>;
      toast(apiError.response?.data.message || "An unknown error has occurred", { type: "error" });
    }
  }, [occasionExpenseMutation.isError, occasionExpenseMutation.error]);

  const handleDeselectAssignee = (id: string) => {
    formik.setFieldValue(
      "assignees",
      formik.values.assignees.filter((i) => i !== id)
    );
  };

  return (
    <Screen topBarProps={{ showBackButton: true }}>
      <Typography variant="h4">Add new Expense</Typography>

      <FormikProvider value={formik}>
        <Grid component="form" container mt={4} spacing={2} onSubmit={formik.handleSubmit}>
          <Grid item xs={9}>
            <FormikInput fullWidth name="value" label="Value" type="number" />
          </Grid>

          <Grid item xs={3}>
            <FormikSelect name="currency" label="Currency" fullWidth>
              {CURRENCIES.map((currency) => (
                <MenuItem key={currency.abbr} value={currency.abbr}>
                  {currency.abbr}
                </MenuItem>
              ))}
            </FormikSelect>
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
            {formik.values.assignees.map((userId) => (
              <Chip
                key={userId}
                label={"@" + usersMap.get(userId)!.username}
                onDelete={() => handleDeselectAssignee(userId)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Grid>

          <Grid item xs={12}>
            <FormikSelect
              name="assignees"
              multiple
              input={<OutlinedInput />}
              renderValue={() => (
                <Typography>Select who should take part in the payment</Typography>
              )}
              fullWidth
              displayEmpty
            >
              {membersList.map((m) => (
                <MenuItem key={m._id} value={m._id}>
                  {getUserDisplayName(m)}
                </MenuItem>
              ))}
            </FormikSelect>
          </Grid>

          <Grid item xs={12}>
            <FormikSelect
              name="payerId"
              input={<OutlinedInput />}
              renderValue={(value) => (
                <Typography>
                  {value
                    ? `${getUserDisplayName(usersMap.get(value as string)!)} paid for this.`
                    : "No payer is selected."}
                </Typography>
              )}
              fullWidth
              displayEmpty
            >
              {membersList.map((m) => (
                <MenuItem key={m._id} value={m._id}>
                  {getUserDisplayName(m)}
                </MenuItem>
              ))}
            </FormikSelect>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              disabled={occasionExpenseMutation.isLoading}
              sx={{ mt: 4 }}
              fullWidth
              variant="contained"
            >
              {occasionExpenseMutation.isLoading ? "Please wait..." : "Create"}
            </Button>
          </Grid>
        </Grid>
      </FormikProvider>
    </Screen>
  );
};

export default AddOccasionExpenseScreen;
