import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../firebase";
import { UserCredential } from "firebase/auth";
import { useAuth } from "../hooks";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setUser, user } = useAuth();
  const [prompt, setPrompt] = useState<any>();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", function (e: any) {
      e.preventDefault();
      setPrompt(e);
    });
  }, []);
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const login = () => {
    logIn("admin", "Admin@123").then((resp) => {
      setUser({
        ...(resp as UserCredential)?.user,
      });
      prompt?.prompt?.();
      navigate("/");
    });
  };

  return (
    <button onClick={login}>
      Login
      {user?.uid}
    </button>
  );
};

export default Login;
