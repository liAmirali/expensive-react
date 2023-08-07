import Screen from "../layout/Screen";
import GroupsList from "../groups/GroupsList";

const GroupsScreen = () => {
  return (
    <Screen topBarProps={{ rightChild: <p>create group</p> }}>
      <GroupsList />
    </Screen>
  );
};

export default GroupsScreen;
