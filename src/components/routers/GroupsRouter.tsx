import { Route, Routes } from "react-router-dom";
import GroupsScreen from "../screens/groups/GroupsScreen";
import CreateGroupsScreen from "../screens/groups/CreateGroupScreen";
import GroupViewScreen from "../screens/groups/GroupViewScreen";

const GroupsRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<GroupsScreen />} />
        <Route path="create" element={<CreateGroupsScreen />} />
        <Route path=":groupId" element={<GroupViewScreen />} />
      </Route>
    </Routes>
  );
};

export default GroupsRouter;
