import { Autocomplete, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import Screen from "../../layout/Screen";
import { useMutation, useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../../api/user";
import { FormEventHandler, useEffect, useState } from "react";
import { CreateGroupData, createGroup } from "../../../api/groups";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../store";

const CreateGroupsScreen = () => {
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState<ITrimmedUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<ITrimmedUser[]>([]);

  const userSearch = useQuery({
    queryFn: searchUsers,
    queryKey: ["users", "search", { q: userSearchQuery }],
    enabled: userSearchQuery.length > 3,
  });

  const groupMutation = useMutation({
    mutationKey: ["group"],
    mutationFn: createGroup,
    onSuccess: () => {
      toast("Your new group was successfully created.", { type: "success" });
    },
  });

  useEffect(() => {
    if (userSearch.data) setFetchedUsers(userSearch.data.data.data.users);
  }, [userSearch.isSuccess, userSearch.data]);

  useEffect(() => {
    if (groupMutation.isError) {
      console.log(groupMutation.error);
    }
  }, [groupMutation.isError, groupMutation.error]);

  const handleMemberSelect = (value: ITrimmedUser | null) => {
    if (value === null) return;

    const found = selectedUsers.find((user) => user._id === value._id);
    if (!found) setSelectedUsers((prevUsers) => [...prevUsers, value]);
    else setSelectedUsers((prevUsers) => prevUsers.filter((user) => user._id !== value._id));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (groupName === "") {
      toast("Group name cannot be empty.", { type: "error" });
      return;
    }

    if (selectedUsers.length === 0) {
      toast("At least add one user to the group.", { type: "error" });
      return;
    }

    const dataToSend: CreateGroupData = {
      name: groupName,
      members: selectedUsers.map((user) => user._id),
    };
    groupMutation.mutate(dataToSend);
  };

  return (
    <Screen topBarProps={{ showBackButton: true }}>
      <Typography variant="h4">Create new Group</Typography>

      <Grid component="form" container mt={4} spacing={2} onSubmit={handleFormSubmit}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            name="name"
            label="Group Name"
          />
        </Grid>

        <Grid item xs={12}>
          {selectedUsers.map((user) => (
            <Chip
              key={user.username}
              label={"@" + user.username}
              onDelete={() => handleMemberSelect(user)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            onChange={(_event, value) => handleMemberSelect(value)}
            fullWidth
            options={fetchedUsers}
            filterOptions={(x) => x.filter((u) => u._id !== loggedInUserId)}
            getOptionLabel={(option) => "@" + option.username}
            noOptionsText="No user found"
            loading={userSearch.isFetching}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                value={userSearchQuery}
                onChange={(event) => setUserSearchQuery(event.target.value)}
                name="userSearchQuery"
                label="Search Users"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            disabled={groupMutation.isLoading}
            sx={{ mt: 4 }}
            fullWidth
            variant="contained"
          >
            {groupMutation.isLoading ? "Please wait..." : "Create"}
          </Button>
        </Grid>
      </Grid>
    </Screen>
  );
};

export default CreateGroupsScreen;
