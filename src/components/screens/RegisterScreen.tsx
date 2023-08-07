import { useNavigate } from "react-router-dom";
import RegisterForm from "../auth/RegisterForm";
import { useAppSelector } from "../../store";
import { useEffect } from "react";
import Screen from "../layout/Screen";

const RegisterScreen = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  return (
    <Screen>
      <RegisterForm />
    </Screen>
  );
};

export default RegisterScreen;
