import { Route, Routes } from "react-router-dom";
import GroupsScreen from "../screens/groups/GroupsScreen";
import CreateGroupsScreen from "../screens/groups/CreateGroupScreen";
import GroupViewScreen from "../screens/groups/GroupViewScreen";
import OccasionViewScreen from "../screens/groups/OccasionViewScreen";
import CreateOccasionScreen from "../screens/groups/CreateOccasionScreen";

const GroupsRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<GroupsScreen />} />
        <Route path="create" element={<CreateGroupsScreen />} />
        <Route path=":groupId" element={<GroupViewScreen />} />
        <Route path=":groupId/create-occasion" element={<CreateOccasionScreen />} />
        <Route path=":groupId/:occasionId" element={<OccasionViewScreen />} />
      </Route>
    </Routes>
  );
};

export default GroupsRouter;
