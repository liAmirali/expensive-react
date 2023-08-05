import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useAppDispatch, useAppSelector } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { verifyMe } from "../../api/auth";
import { authActions } from "../../store/auth";
import { useEffect } from "react";

const AppRoutes = () => {
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
        <Route index element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;