import Screen from "../../layout/Screen";
import GroupsList from "../../groups/GroupsList";
import CreateNew from "../../atoms/buttons/CreateNew";

const GroupsScreen = () => {
  return (
    <Screen topBarProps={{ rightChild: <CreateNew label="New Group" to="create" /> }}>
      <GroupsList />
    </Screen>
  );
};

export default GroupsScreen;
