import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { logIn } from "../firebase";
import { UserCredential } from "firebase/auth";
import { useAuth } from "../hooks";
import {
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Details, Errors } from "../MetaData";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, logInUser } = useAuth();
  const [prompt, setPrompt] = useState<any>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const hasError = (id: string) => Object.keys(errors).includes(id);

  const onSubmit = ({
    username,
    secret,
  }: {
    username: string;
    secret: string;
  }) => {
    setLoading(true);
    logIn(username, secret)
      .then((resp) => {
        logInUser({
          ...(resp as UserCredential)?.user,
        });
        prompt?.prompt?.();
      })
      .catch((err) => {
        if (
          err.code.includes("user-not-found") ||
          err.code.includes("wrong-password")
        )
          setError(Errors.USER_NOT_FOUND);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", function (e: any) {
      e.preventDefault();
      setPrompt(e);
    });
  }, []);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <Stack
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#8757d1",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: "white", borderRadius: "5px", padding: 24 }}
      >
        <Typography variant="h6" textAlign="center" p={2}>
          {Details.association}
        </Typography>
        <Stack p={2} gap={2}>
          <TextField
            error={hasError("username")}
            label={`Username`}
            {...register("username", { required: true })}
          />
          <TextField
            type="password"
            error={hasError("secret")}
            label={`Secret`}
            {...register("secret", { required: true })}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          {!!error ? (
            <Typography variant="body1" color="error" textAlign="center">
              {error}
            </Typography>
          ) : null}
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
