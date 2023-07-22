import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Stack
        className="h-screen gap-4"
        direction={"column"}
        justifyContent="center"
      >
        <Typography variant="h5" textAlign={"center"}>
          Oops! This page is not available.
        </Typography>
        <Box textAlign={"center"}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go back to Home
          </Button>
        </Box>
      </Stack>
    </Layout>
  );
};

export default ErrorPage;
