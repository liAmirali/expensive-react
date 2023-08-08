import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { useAppDispatch, useAppSelector } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { verifyMe } from "../../api/auth";
import { authActions } from "../../store/auth";
import { useEffect } from "react";
import GroupsScreen from "../screens/groups/GroupsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ExpensesRouter from "./ExpensesRouter";
import GroupsRouter from "./GroupsRouter";

const RootRouter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userVerification = useMutation({
    mutationFn: verifyMe,
    onSuccess: ({ data }) => {
      console.log("Verification successful:", data);

      dispatch(authActions.setUser(data.data.user));
    },
    onError: (error) => {
      console.log("Verification error:", error);

      window.localStorage.removeItem("accessToken");
      dispatch(authActions.setUser(null));

      navigate("/login");
    },
  });

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user === null) {
      if (typeof window !== "undefined") {
        const storedAccessToken = window.localStorage.getItem("accessToken");
        if (storedAccessToken === null) navigate("/login");
        else userVerification.mutate();
      } else navigate("/login");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/expenses/*" element={<ExpensesRouter />} />
        <Route path="/groups/*" element={<GroupsRouter />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<p>yo 404</p>} />
      </Route>
    </Routes>
  );
};

export default RootRouter;
