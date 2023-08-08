import Screen from "../../layout/Screen";
import GroupsList from "../../groups/GroupsList";
import CreateGroupTopBarButton from "./CreateGroupTopBarButton";

const GroupsScreen = () => {
  return (
    <Screen topBarProps={{ rightChild: <CreateGroupTopBarButton /> }}>
      <GroupsList />
    </Screen>
  );
};

export default GroupsScreen;
