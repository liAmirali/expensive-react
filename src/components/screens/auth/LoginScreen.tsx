import { useEffect } from "react";
import LoginForm from "../../auth/LoginForm";
import { useAppSelector } from "../../../store";
import { useNavigate } from "react-router-dom";
import Screen from "../../layout/Screen";

const LoginScreen = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Screen>
      <LoginForm />
    </Screen>
  );
};

export default LoginScreen;
