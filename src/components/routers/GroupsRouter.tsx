import { Route, Routes } from "react-router-dom";
import GroupsScreen from "../screens/groups/GroupsScreen";
import CreateGroupsScreen from "../screens/groups/CreateGroupScreen";

const GroupsRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<GroupsScreen />} />
        <Route path="create" element={<CreateGroupsScreen />} />
      </Route>
    </Routes>
  );
};

export default GroupsRouter;
