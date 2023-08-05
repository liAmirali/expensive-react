import { useNavigate } from "react-router-dom";
import RegisterForm from "../auth/RegisterForm";
import { useAppSelector } from "../../store";
import { useEffect } from "react";

const RegisterScreen = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  return <RegisterForm />;
};

export default RegisterScreen;
