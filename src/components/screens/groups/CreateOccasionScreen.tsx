import {
  Button,
  Chip,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Screen from "../../layout/Screen";
import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { createOccasion, getGroupDetails } from "../../../api/groups";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMappedValues, getUserDisplayName } from "../../../utils/getters";
import { ApiResponse } from "../../../api/config";
import { AxiosError } from "axios";
import { useAppSelector } from "../../../store";

const CreateOccasionScreen = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const navigate = useNavigate();

  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  const [occasionName, setOccasionName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [groupMembers, setGroupMembers] = useState<ITrimmedUser[]>([]);

  const usersMap = useMemo(() => getMappedValues(groupMembers), [groupMembers]);

  const occasionMutation = useMutation({
    mutationFn: createOccasion,
  });

  const groupDetailsQuery = useQuery({
    queryFn: getGroupDetails,
    queryKey: ["groupDetails", "groupId", { groupId: groupId! }],
  });

  useEffect(() => {
    if (groupDetailsQuery.isSuccess) {
      const members = groupDetailsQuery.data.data.data.group.members as ITrimmedUser[];

      setGroupMembers(members.filter((m) => m._id !== loggedInUserId));
    }
  }, [groupDetailsQuery.isSuccess, groupDetailsQuery.data, loggedInUserId]);

  useEffect(() => {
    if (occasionMutation.isSuccess && occasionMutation.data) {
      toast("Occasion was created successfully.", { type: "success" });
      console.log("occasionMutation.data :>> ", occasionMutation.data);

      navigate("./../"); // Goes one level up, which will be the group details page
    }
  }, [occasionMutation.isSuccess, occasionMutation.data, navigate]);

  useEffect(() => {
    const apiError = occasionMutation.error as AxiosError<ApiResponse<null>>;
    if (occasionMutation.isError && occasionMutation.error) {
      toast(apiError.response?.data.message || "An unknown error has occurred.", {
        type: "error",
      });
    }
  }, [occasionMutation.isError, occasionMutation.error]);

  const handleSelectUser = (userIds: string[]) => {
    setSelectedUserIds(userIds);
  };

  const handleDeselectUser = (userId: string) => {
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (occasionName === "") {
      toast("Occasion name cannot be empty.", { type: "error" });
      return;
    }

    if (selectedUserIds.length === 0) {
      toast("At least add one user to the occasion.", { type: "error" });
      return;
    }

    const dataToSend = {
      groupId: groupId!,
      name: occasionName,
      members: selectedUserIds,
    };
    occasionMutation.mutate(dataToSend);
  };

  return (
    <Screen topBarProps={{ showBackButton: true }}>
      <Typography variant="h4">Create new Occasion</Typography>

      <Grid component="form" container mt={4} spacing={2} onSubmit={handleFormSubmit}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={occasionName}
            onChange={(event) => setOccasionName(event.target.value)}
            name="name"
            label="Occasion Name"
          />
        </Grid>

        <Grid item xs={12}>
          {selectedUserIds.map((userId) => (
            <Chip
              key={userId}
              label={"@" + usersMap.get(userId)!.username}
              onDelete={() => handleDeselectUser(userId)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Select
            name="selectedMember"
            multiple
            value={selectedUserIds}
            onChange={(e) => handleSelectUser(e.target.value as string[])}
            input={<OutlinedInput />}
            renderValue={() => <Typography>Select Members</Typography>}
            fullWidth
          >
            {groupMembers.map((groupMember) => (
              <MenuItem key={groupMember._id} value={groupMember._id}>
                {getUserDisplayName(groupMember)}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            disabled={occasionMutation.isLoading}
            sx={{ mt: 4 }}
            fullWidth
            variant="contained"
          >
            {occasionMutation.isLoading ? "Please wait..." : "Create"}
          </Button>
        </Grid>
      </Grid>
    </Screen>
  );
};

export default CreateOccasionScreen;
