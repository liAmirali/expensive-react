import { useEffect } from "react";
import LoginForm from "../auth/LoginForm";
import { useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  return <LoginForm />;
};

export default LoginScreen;
